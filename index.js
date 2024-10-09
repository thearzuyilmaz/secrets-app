import express from "express";
import axios from "axios";
import { yourUsername, yourPassword, yourAPIKey, yourBearerToken } from "./secrets.js";


const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "/random");
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: result.secret });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/basicAuth", async(req, res) => {
  try {
    const response = await axios.get(API_URL + "/all?page=2", { 
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    const result = response.data;
    const resultJSON = JSON.stringify(result); // from JS to JSON to put all the content on browser
    console.log(resultJSON);
    res.render("index.ejs", {content: resultJSON});

  } catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message,
    });

  }

});

app.get("/apiKey", async (req, res) => {

 
  try {
    const response = await axios.get(API_URL + "/filter", {
      params: {
        apiKey: yourAPIKey,
        score: 5,
      },
    });
    const result = response.data;
    const resultJSON = JSON.stringify(result); // from JS to JSON to put all the content on browser
    console.log(resultJSON);
    res.render("index.ejs", {content: resultJSON});

  } catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message,
    });

  }
});

app.get("/bearerToken", async (req, res) => {

  try {
    const response = await axios.get(API_URL + "/secrets/42", {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`
      },
    });
    const result = response.data;
    const resultJSON = JSON.stringify(result); // from JS to JSON to put all the content on browser
    console.log(resultJSON);
    res.render("index.ejs", {content: resultJSON});

  } catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      content: error.message,
    });

  }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
