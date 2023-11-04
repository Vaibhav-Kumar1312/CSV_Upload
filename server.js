// TO-DO = make environment variable file

const app = require("./index.js");
const port = 3000;

app.listen(port, (err) => {
  console.log(`App is running on ${port}`);
});
