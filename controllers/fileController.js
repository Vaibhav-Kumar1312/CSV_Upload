const CSV = require("../models/CSVFile");
const path = require("path");
const fs = require("fs");
const csvParser = require("csv-parser");

exports.uploadFile = function uploadFile(req, res) {
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
  return res.status(200).redirect("/");
};

exports.viewFile = async function viewFile(req, res) {
  try {
    console.log(req.params.id);
    const result = [];
    const csvFile = await CSV.findById(req.params.id);
    // console.log(csvFile);
    // console.log();
    fs.createReadStream(path.join(__dirname, "..", csvFile.CSVfile))
      .pipe(csvParser())
      .on("data", (data) => {
        result.push(data);
      })
      .on("end", () => {
        console.log(result);
      });

    return res.status(200).redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteFile = async function deleteFile(req, res) {
  try {
    await CSV.findByIdAndDelete(req.params.id);
    return res.status(204).redirect("/");
  } catch (err) {
    console.log(err);
  }
};
