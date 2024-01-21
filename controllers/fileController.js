const CSV = require("../models/CSVFile");
const path = require("node:path");
const fs = require("fs");
const csvParser = require("csv-parser");

/**
 * Checks the file type and stores the file in the database
 * @param {req object containing csv file data} req
 * @param {server response object} res
 */
exports.uploadFile = function uploadFile(req, res) {
  CSV.uploadedCSVFile(req, res, async (err) => {
    if (err) {
      console.log(err);
      return;
    }
    if (req.file.mimetype !== "text/csv") {
      console.log("okay");
      return res.send(
        "<h1>Upload only CSV File can not upload any other file type</h1>"
      );
    }

    const newCsvFile = await CSV.create({
      name: req.body.name,
      CSVfile: path.win32.normalize(`${CSV.csvFilePath}/${req.file.filename}`),
      // CSVfile: path.resolve(`/${CSV.csvFilePath}`, req.file.filename),
    });
    return res.status(200).redirect("/");
  });
};

/**
 * Reads the CSV file data from the database and sends the data
 * with limit of 100 to the client
 * @param {*} req
 * @param {*} res
 */
exports.viewFile = async function viewFile(req, res) {
  try {
    const result = [];
    let resultHeaders;
    const csvFile = await CSV.findById(req.params.id);

    dbFilePath = path.resolve(csvFile.CSVfile);
    // console.log(path.posix.join(...dbFilePath.split("\\")));
    fs.createReadStream(path.posix.join(...dbFilePath.split("\\")))
      .pipe(csvParser())
      .on("headers", (header) => {
        resultHeaders = header;
      })
      .on("data", (data) => {
        result.push(data);
      })
      .on("end", () => {
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
    throw new Error(error);
  }
};

/**
 * handles the delete request by finding the file by its id
 * and delete's from the database
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteFile = async function deleteFile(req, res) {
  try {
    await CSV.findByIdAndDelete(req.params.id);
    return res.status(204).redirect("/");
  } catch (err) {
    throw new Error(err);
  }
};
