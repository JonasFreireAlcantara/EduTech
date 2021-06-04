const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({
  url: "mongodb+srv://admin:admin@cluster0.ewelv.mongodb.net/test?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/*"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-edutech-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: "imagetest",
      filename: `${Date.now()}-edutech-${file.originalname}`
    };
  }
});

var uploadFile = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
