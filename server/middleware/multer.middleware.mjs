import multer from 'multer';

const storage = multer.memoryStorage();

 const SingleUpload = multer({ 
  storage,
  limits: {
    // fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 2 // Maximum 2 files
  }
}).fields([
  { name: 'covid', maxCount: 1 },
  { name: 'signature', maxCount: 1 }
]);

export default SingleUpload;