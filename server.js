
const express = require('express');
const app = express();
const port = 4000;

const bodyParser = require('body-parser');
const https = require("https");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.get('/',((req, res) => {
    res.sendFile(__dirname+'/index.html')
}))
app.get('/about',((req, res) => {
    res.sendFile(__dirname+'/about.html')
}))
app.get('/registration', (req, res) => {
    res.sendFile(__dirname + "/registration.html");
})
app.post("/registration", function (req, res) {
    const email = req.body._email;
    const pass = req.body._pass;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    PASSWORD: pass
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/39a952edc1";
    const options = {
        method: "POST",
        auth:"nur:c529b24734a0ceff71347dd48ca7c6bb-us14"
    }

    const request = https.request(url, options, function (responce) {
        if(responce.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else res.sendFile(__dirname + "/error.html");
        responce.on("data", function (data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
