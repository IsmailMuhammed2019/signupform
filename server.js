// filepath: /server.js
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const cors = require("cors"); // Import CORS

const app = express();
const PORT = 5000;

// Enable CORS for all origins
app.use(cors());
app.use(bodyParser.json());

app.post("/submit-to-zapier", async (req, res) => {
  const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/22344880/2ccv5po/";

  try {
    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (response.ok) {
      res.status(200).send({ message: "Form submitted successfully!" });
    } else {
      res.status(500).send({ message: "Failed to submit the form to Zapier." });
    }
  } catch (error) {
    console.error("Error submitting form to Zapier:", error);
    res.status(500).send({ message: "An error occurred while submitting the form." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});