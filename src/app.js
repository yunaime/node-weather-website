const path = require('path');
const express = require('express'); // express is a function
const hbs = require('hbs'); // need this when work with partials

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

console.log(__dirname);
console.log(__filename);

console.log(path.join(__dirname, '../public'));

const app = express();

//////////////// Documentation at expressjs.com ///////////////

/////////////////// Define paths for Express config /////////////////////////

const publicDirectoryPath = path.join(__dirname, '../public');
const templatePath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

///////////////// Setup handlebars engine and views locations /////////////////////////

// we want to use hadlebars to create dinamic web pages and here we are setting it to be used after 'npm i hbs'
// we need to create view folther as project child folder where to create templates
// also we can delete index.html from public/ we created before when we wanted to use only static pages
// now we need the router previouly deleted because we did not needed it when we had public/index.html
// but we ned it when use hbs to render templates
app.set('view engine', 'hbs');
// by default express search for views directory but we can set it a different name as template and use app.set('views', templatePath)
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

// after this and pages creation we do not need routers when we want to work with static pages.

////////////////////////// Setup static directory to serve /////////////// 
app.use(express.static(publicDirectoryPath));



// app.com
// app.com/help
// app.com/about

// after having index.html defined this is not used
// this is used when we do nor have static index and when we want to render templates with hbs
app.get( '/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>'); // this is when we do not have public/inde.html (static page)
    // res.render('index'); // we pass the template name when using hbs
    res.render('index', {
        title: "Weather App",
        name: 'Yunaime Noda'
    }); // we can send data to the template
})

// app.get( '/help', (req, res) => {
//     res.send([
//         {
//             name: 'Yunaime',
//             age: 38
//         },
//         {
//             name: 'Andreina',
//             age: 33
//         }
//     ]);
// })

// activated after create help.hbs and delete help.html static page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'How can I help you?',
        title: 'Help',
        name: 'Yunaime Noda'
    })
})

// activated after delete public/about.hml and create views/about.hbs
app.get( '/about', (req, res) => {
    // res.send('<h1>About page</h1>');
    res.render('about', {
        title: 'About me',
        name: 'Yunaime Noda'
    });
})

// example 1 with JSON respnose
// app.get( '/weather', (req, res) => {
//     const address = req.query.address;
//     if(!address) {
//         return res.send({
//             error: 'You must provide an address.'
//         });
//     }

//     res.send({
//         temerature: 10,
//         location: address
//     });
// })

// example 2 using utils and request library
app.get( '/weather', (req, res) => {
    
    const address = req.query.address;

    if(!address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode( address, (error, {lat, lng, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(lat, lng, (error, forecastData = '') => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            });
        })
        
    })
})

// generic 404 errors
// need to be before '*' which is the last option
// app.get('/help/*', (req, res) => {
//     res.send('Help article not found');
// })

// // it is executed if wasn't found a router
// app.get('*', (req, res) => {
//     res.send('My 404 error');
// })

// render 404 with handlebars 

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404',
        name: 'Yunaime Noda'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        title: '404',
        name: 'Yunaime Noda'
    });
})


app.listen(3000, () => {
    console.log('Listenning on port 3000');
});