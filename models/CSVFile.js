const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const CSV_FILE_PATH = path.join("/uploads/CSVfiles");

const CSVfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    CSVfile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(
        path.win32.normalize(__dirname),
        "..",
        path.win32.normalize(CSV_FILE_PATH)
      )
    );
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

CSVfileSchema.statics.uploadedCSVFile = multer({ storage: storage }).single(
  "csvFile"
);
CSVfileSchema.statics.avatarPath = CSV_FILE_PATH;

const CSV = mongoose.model("CSV", CSVfileSchema);

module.exports = CSV;
