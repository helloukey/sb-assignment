const fs = require("fs");
const axios = require("axios");
const ejs = require("ejs");
const express = require("express");
const app = express();

const apiEndpoint = "https://www.boredapi.com/api/activity";

async function generatePages() {
  try {
    const data = [];
    const numPages = 1;

    for (let i = 1; i <= numPages; i++) {
      const url = apiEndpoint;
      const response = await axios.get(url);
      data.push(response.data);
    }

    const pageSize = 1;
    for (let i = 0; i < pageSize; i++) {
      const renderedHtml = await ejs.renderFile("./views/template.ejs", {
        title: `Page ${i + 1}`,
        data: data[i],
      });

      const fileName = `page${i + 1}.html`;
      fs.writeFileSync(fileName, renderedHtml);
      console.log(`Generated page: ${fileName}`);
    }

    console.log(`Generated pages.`);
  } catch (error) {
    console.error(error);
  }
}

generatePages();

const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public")); // Serve files from the root of the project
app.listen(port, () => {
  console.log(
    `Static site generator app listening at http://localhost:${port}`
  );
});
