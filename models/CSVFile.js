const mongoose = require("mongoose");
const multer = require("multer");
const path = require("node:path");
const CSV_FILE_PATH = "uploads/CSVfiles";

const CSVfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    CSVfile: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(CSV_FILE_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

CSVfileSchema.statics.uploadedCSVFile = multer({ storage: storage }).single(
  "csvFile"
);
CSVfileSchema.statics.csvFilePath = CSV_FILE_PATH;

const CSV = mongoose.model("CSV", CSVfileSchema);

module.exports = CSV;
