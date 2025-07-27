const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fileType = require('file-type');
const fs = require('fs/promises'); // ✅ fix missing fs

// ✅ Allowed mime types for deep validation
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp'
];


// ✅ Filter based on mimetype + extension
const SignupBusinessProfileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeType && extName) {
    cb(null, true);
  } else {
    const err = new Error('Only image files (JPG, PNG, WEBP) are allowed');
    err.code = 'LIMIT_FILE_TYPES';
    cb(err, false);
  }
};

// ✅ Multer storage with disk saving
const storageForBusinessProfiles = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp_uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${crypto.randomBytes(8).toString('hex')}-${file.originalname}`);
  }
});

const SingupBusinessProfileUpload = multer({
  storage: storageForBusinessProfiles,
  fileFilter: SignupBusinessProfileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024 // Max 1MB
  }
}).single('Signupbusiness_profile');

// ✅ Error handler with real content validation
const SignupBusinessProfilesErrorHandler = (req, res, next) => {
  SingupBusinessProfileUpload(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        req.BusinessProfileValidationError = 'File must be under 1MB';
      } else if (err.code === 'LIMIT_FILE_TYPES') {
        req.BusinessProfileValidationError = err.message;
      } else {
        req.BusinessProfileValidationError = 'File upload failed';
      }
      return next();
    }

  //   npm uninstall file-type
  // npm install file-type@16.5.3

    if (!req.file) {
      req.BusinessProfileValidationError = 'No file uploaded.';
      return next();
    }

    try {
      const buffer = await fs.readFile(req.file.path);
      const realType = await fileType.fromBuffer(buffer);

      if (!realType) {
        await fs.unlink(req.file.path);
        req.BusinessProfileValidationError = 'Uploaded file is not a valid image.';
        req.file = undefined;
      } else if (!allowedMimeTypes.includes(realType.mime)) {
        await fs.unlink(req.file.path);
        req.BusinessProfileValidationError = `Invalid image type: ${realType.mime}`;
        req.file = undefined;
      } else {
        req.BusinessProfileValidationError = '';
      }

    } catch (error) {
      console.error('File validation error:', error);
      req.BusinessProfileValidationError = 'Error validating uploaded file';
    }

    next();
  });
};

module.exports = {
  SignupBusinessProfilesErrorHandler
};
