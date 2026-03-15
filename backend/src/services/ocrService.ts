import Tesseract from 'tesseract.js';
import sharp from 'sharp';

export interface OCRResult {
  text: string;
  confidence: number;
  fields: Array<{ label: string; value: string; confidence: number }>;
  documentType: string;
  processingTime: number;
}

// Document patterns for Indian IDs
const documentPatterns = {
  aadhaar: {
    keywords: ['aadhaar', 'uidai', 'भारत', 'government of india'],
    idPattern: /\d{4}\s?\d{4}\s?\d{4}/,
    type: 'Aadhaar',
  },
  pan: {
    keywords: ['income tax', 'permanent account number', 'department'],
    idPattern: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
    type: 'PAN',
  },
  voter: {
    keywords: ['election', 'electoral', 'elector', 'photo identity'],
    idPattern: /[A-Z]{3}[0-9]{7}/,
    type: 'Voter ID',
  },
  license: {
    keywords: ['driving', 'license', 'dl no', 'transport'],
    idPattern: /[A-Z]{2}[\s-]?\d{2}[\s-]?\d{4}[\s-]?\d{7}/,
    type: 'Driving License',
  },
  passport: {
    keywords: ['passport', 'republic of india', 'ministry of external affairs'],
    idPattern: /[A-Z][0-9]{7}/,
    type: 'Passport',
  },
  bank: {
    keywords: ['bank', 'debit', 'credit', 'card', 'valid thru'],
    idPattern: /\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}/,
    type: 'Bank Card',
  },
};

export const preprocessImage = async (imagePath: string): Promise<Buffer> => {
  try {
    const processedBuffer = await sharp(imagePath)
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: false })
      .grayscale()
      .normalize()
      .sharpen({ sigma: 1, flat: 1, jagged: 2 })
      .linear(1.2, -0.1)
      .png()
      .toBuffer();

    return processedBuffer;
  } catch (error) {
    console.error('Image preprocessing failed:', error);
    throw new Error('Failed to preprocess image');
  }
};

const detectDocumentType = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  for (const [key, config] of Object.entries(documentPatterns)) {
    const hasKeywords = config.keywords.some(keyword => lowerText.includes(keyword));
    const hasIdPattern = config.idPattern.test(text);
    
    if (hasKeywords || hasIdPattern) {
      return config.type;
    }
  }
  
  return 'Other';
};

const extractFields = (text: string, documentType: string): Array<{ label: string; value: string; confidence: number }> => {
  const fields: Array<{ label: string; value: string; confidence: number }> = [];
  
  // Name extraction
  const nameMatch = text.match(/(?:name|nm)[\s:]*(\w+\s+\w+)/i);
  if (nameMatch && nameMatch[1]) {
    fields.push({ label: 'Name', value: nameMatch[1].trim(), confidence: 85 });
  }

  // Document-specific extraction
  switch (documentType) {
    case 'Aadhaar':
      const aadhaarMatch = text.match(/(\d{4}\s?\d{4}\s?\d{4})/);
      if (aadhaarMatch) {
        fields.push({ label: 'Aadhaar Number', value: aadhaarMatch[1], confidence: 95 });
      }
      break;
      
    case 'PAN':
      const panMatch = text.match(/([A-Z]{5}[0-9]{4}[A-Z]{1})/);
      if (panMatch) {
        fields.push({ label: 'PAN Number', value: panMatch[1], confidence: 95 });
      }
      break;
      
    case 'Voter ID':
      const voterMatch = text.match(/([A-Z]{3}[0-9]{7})/);
      if (voterMatch) {
        fields.push({ label: 'EPIC Number', value: voterMatch[1], confidence: 90 });
      }
      break;
  }

  // DOB extraction
  const dobMatch = text.match(/(?:dob|date of birth)[\s:]*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i);
  if (dobMatch) {
    fields.push({ label: 'Date of Birth', value: dobMatch[1], confidence: 82 });
  }

  // Gender
  const genderMatch = text.match(/\b(male|female|m|f)\b/i);
  if (genderMatch) {
    const gender = genderMatch[1].toLowerCase();
    const normalized = gender === 'm' ? 'Male' : gender === 'f' ? 'Female' : gender;
    fields.push({ label: 'Gender', value: normalized, confidence: 78 });
  }

  return fields;
};

export const processImage = async (imagePath: string, documentType?: string): Promise<OCRResult> => {
  const startTime = Date.now();
  
  try {
    const processedBuffer = await preprocessImage(imagePath);
    const tempPath = imagePath + '.processed.png';
    
    await require('fs').writeFileSync(tempPath, processedBuffer);
    
    const result = await Tesseract.recognize(tempPath, 'eng', {
      logger: (m: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(m);
        }
      },
    });

    const text = result.data.text;
    const confidence = result.data.confidence;
    
    const detectedType = documentType || detectDocumentType(text);
    const fields = extractFields(text, detectedType);
    
    const processingTime = Date.now() - startTime;

    // Cleanup
    try {
      require('fs').unlinkSync(tempPath);
    } catch (e) {}

    return {
      text,
      confidence,
      fields,
      documentType: detectedType,
      processingTime,
    };
  } catch (error) {
    console.error('OCR processing failed:', error);
    throw new Error('Failed to process image with OCR');
  }
};
