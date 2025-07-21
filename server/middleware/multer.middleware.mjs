import multer from 'multer';


const storage = multer.memoryStorage();

// Middleware for single file upload (if you still need it)
export const singleUpload = multer({ storage }).single('image');

// Middleware for multiple file uploads
export const multipleUpload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 2 // Maximum 2 files
  }
}).fields([
  { name: 'signature', maxCount: 1 },
  { name: 'covid', maxCount: 1 }
]);