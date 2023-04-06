const { response } = require("express");
const express = require("express");
const OPENAI_API_KEY = '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'
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    //apiKey: process.env.OPENAI_API_KEY,
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app =  express();

app.use(cors());

app.use(express.json());

app.get('/ping', (req, res) => {
    res.json({
        message: "pong",
    })
})

app.post('/chat', (req, res) => {

    const question = req.body.question;

    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
      }).then(response => {
        return response?.data?.choices?.[0].text;
      }).then(answer => {
        const array = answer?.split("\n").filter ((value) => value).map((value) => value.trim());
        return array;
      })
      .then(answer => {
        res.json({
            answer: answer,
            prompt: question,
        });
      });
    console.log({question});
});

app.listen(3000, ()=> {
    console.log("Server is listening on port 3000");
});