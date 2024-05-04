const multer = require(`multer`);
const path = require(`path`);
const fs = require("fs");

const createDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
};

/** storage configuration */
const storage = multer.diskStorage({
  /** define storage folder */
  destination: (req, file, cb) => {
    const destinationPath = path.join(__dirname, "../images");
    createDirectory(destinationPath);
    cb(null, destinationPath);
  },
  /** define filename for upload file */
  filename: (req, file, cb) => {
    cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  /** storage configuration */
  storage: storage,
  /** filter uploaded file */
  fileFilter: (req, file, cb) => {
    /** filter type of file */
    const acceptedType = [`image/jpg`, `image/jpeg`, `image/png`];
    if (!acceptedType.includes(file.mimetype)) {
      cb(null, false); /** refuse upload */
      return cb(`Invalid file type (${file.mimetype})`);
    }
    /** filter size of file */
    const fileSize = req.headers[`content-length`];
    const maxSize = 1 * 1024 * 1024; /** max: 1MB */
    if (fileSize > maxSize) {
      cb(null, false); /** refuse upload */
      return cb(`File size is too large`);
    }
    cb(null, true); /** accept upload */
  },
});

module.exports = upload;
