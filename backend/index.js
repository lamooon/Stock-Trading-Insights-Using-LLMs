const express = require('express');
const app = express();
const fs = require('fs');

const port = 8080;
const router = express.Router();

const htmlFiles = fs.readdirSync('./pages', {withFileTypes: true})
    .map(file => file.name);

app.use(express.static('static'));
app.use(express.static('static/logo'));

fs.readFile('./pages/404.html', (err, data) => {
    let errorPage = data;
});

htmlFiles.forEach(file => {
    let route = '/' + file.slice(0, -5);
    console.log(route);
    route = file === 'landing-page.html' ? '/' : route;
    router.get(route, (req, res) => {
        fs.readFile(`./pages/${file}`, (err, data) => {
            if (err) {
                console.log("hi?", err.message);
            }
            else {
                res.status(200).set('Content-Type', 'text/html');
                res.send(data);
                res.end();
            }
        });
    });
});

app.use('/', router);

// Make sure Github Actions have worked
app.get('/version', (req, res) => {
    res.send('1'); //change this version name once new version has been deployed
})

app.listen(port, function () {
    console.log(`Listening at port ${port}`);
});