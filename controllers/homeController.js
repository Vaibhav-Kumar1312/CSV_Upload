const CSV = require("../models/CSVFile");

/**
 * Loads all types of file from the database and sends the data
 * to the client
 * @param {*} req
 * @param {*} res
 * @returns render's the home page and sends the data to home.ejs
 */
module.exports.homePage = async function (req, res) {
  try {
    const allFiles = await CSV.find({});
    return res.render("home", {
      status: "success",
      title: "HomePage",
      allFiles: allFiles,
    });
  } catch (err) {
    conaole.log(err);
  }
};
