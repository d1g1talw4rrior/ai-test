const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// Etusivu
app.get("/", (req, res) => {
  res.send("Tekoäly-API toimii! Käytä POST /chat päästäksesi juttelemaan.");
});

// Chat endpoint
app.post("/chat", async (req, res) => {
  const userMsg = req.body.message;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMsg }]
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_KEY}` }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Render tarvitsee tämän
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
