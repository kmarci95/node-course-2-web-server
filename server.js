const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

let app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome here!'
    });
});

app.get('/about', (req,res) => {
    //res.send('About page');
    res.render('about.hbs',{
        pageTitle: 'About page'
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to connect'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});



