const CSV = require("../models/CSVFile");
const path = require("path");

module.exports.uploadFile = function uploadFile(req, res) {
  CSV.uploadedCSVFile(req, res, async (err) => {
    if (err) {
      console.log(err);
      return;
    }
    const newCsvFile = await CSV.create({
      name: req.body.name,
      CSVfile: path.win32.normalize(`${CSV.csvFilePath}/${req.file.filename}`),
    });
    console.log(newCsvFile);
    console.log(req.body);
    console.log(req.file);
  });
  //   console.log("okay");
  return res.redirect("/");
};
