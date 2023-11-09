const CSV = require("../models/CSVFile");

module.exports.homePage = async function (req, res) {
  const allFiles = await CSV.find();
  console.log(allFiles);

  return res.render("home", {
    title: "HomePage",
    allFiles: allFiles,
  });
};
