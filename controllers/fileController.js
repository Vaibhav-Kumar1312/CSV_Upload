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
    // console.log(req.query.page);
    // console.log(req.query.limit);
    const result = [];
    let resultHeaders;
    const csvFile = await CSV.findById(req.params.id);
    // console.log(csvFile);
    // console.log();
    fs.createReadStream(path.join(__dirname, "..", csvFile.CSVfile))
      .pipe(csvParser())
      .on("headers", (header) => {
        resultHeaders = header;
        // console.log(resultHeaders);
      })
      .on("data", (data) => {
        result.push(data);
      })
      .on("end", () => {
        // console.log(result);
        // let newResult = []
        let si = (Number(req.query.page) - 1) * Number(req.query.limit);
        let ei = si + Number(req.query.limit);
        if (si > result.length - 1) {
          return res.redirect("/");
        }
        let newResult = result.slice(si, ei);
        let totalPages = Math.ceil(result.length / Number(req.query.limit));
        return res.status(200).render("csv_file", {
          title: csvFile.name,
          pages: totalPages,
          pageNumber: req.query.page,
          headers: resultHeaders,
          csvData: newResult,
        });
      });
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
