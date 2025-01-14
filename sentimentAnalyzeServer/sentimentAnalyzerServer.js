const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstaningV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstaning = NaturalLanguageUnderstaningV1({
        version: '2021-06-20',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceURL: api_url,
    });
    return naturalLanguageUnderstaning;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion",getNLUInstance(), (req,res) => {

    return res.json({"happy":"90","sad":"10"});
});

app.get("/url/sentiment",getNLUInstance(), (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion",getNLUInstance(), (req,res) => {
    return res.json({"happy":"10","sad":"90"});
});

app.get("/text/sentiment",getNLUInstance(), (req,res) => {
    return res.json("text sentiment for "+ req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
