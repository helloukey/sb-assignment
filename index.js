const fs = require("fs");
const axios = require("axios");
const ejs = require("ejs");
const express = require("express");
const app = express();

// api endpoint
const apiEndpoint = "https://www.boredapi.com/api/activity";

// generatePages function to fetch api and inject data to template.ejs file
async function generatePages() {
  try {
    const data = [];
    const numPages = 10;

    for (let i = 1; i <= numPages; i++) {
      const url = apiEndpoint;
      const response = await axios.get(url);
      if (response && response.data) {
        data.push(response.data);
      }
    }

    const pageSize = 10;
    for (let i = 0; i < pageSize; i++) {
      const renderedHtml = await ejs.renderFile("./views/template.ejs", {
        title: `Page ${i + 1}`,
        data: data[i],
      });

      const fileName = `page${i + 1}.html`;
      fs.writeFileSync(fileName, renderedHtml);
    }

    console.log(`Generated pages.`);

    return Promise.resolve(); // resolve the promise when all pages have been generated
  } catch (error) {
    console.error(error);
    return Promise.reject(error); // reject the promise if there was an error
  }
}

generatePages();

app.set("view engine", "ejs");
app.use(express.static("public")); // Serve files from the root of the project

module.exports = { generatePages };
