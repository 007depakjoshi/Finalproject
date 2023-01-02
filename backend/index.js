const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cors = require("cors");
const sql = require('../backend/db');

const corsOptions = {
    origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/events', (req, res) => {
    sql.query('Select * from events as e INNER JOIN venue AS v ON v.venue_id = e.venue_id', (err, rows) => {
        if (!err) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(
                {
                    'result': 'success',
                    'data': rows
                })
            );
        } else {
            res.status(400).send(err);
        }
    })
})

app.post('/login', (req, res) => {
    console.log('tester', req.body);
    const email = req.body.email;
    const password = req.body.password;
    sql.query('Select * from customer where email = ? and password = ?', [email, password], (err, rows) => {
        //console.log('checkresponse', res)
        if (!err) {
            if (rows.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Login Successfully',
                        'data': rows[0]
                    })
                );
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify(
                    {
                        'status': 400,
                        'result': 'No Result Found',
                        'data': ''
                    })
                );
            }
        } else {
            res.status(400).send(err);
        }
    })
})

app.post('/register', (req, res) => {
    console.log('register', req.body);
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const password = req.body.password;
    sql.query('INSERT INTO customer (name, phone, email, password) VALUES (?, ?, ?, ?)',
        [name, phone, email, password], (err, rows) => {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Registered Successfully',
                        'data': rows[0]
                    })
                );
            } else {
                res.status(400).send(err);
            }
        })
})

app.post('/venueLogin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    sql.query('Select * from venue_owner where email = ? and password = ?', [email, password], (err, rows) => {
        //console.log('checkresponse', res)
        if (!err) {
            if (rows.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Provider LoggedIn Successfully',
                        'data': rows[0]
                    })
                );
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify(
                    {
                        'status': 400,
                        'result': 'No Result Found',
                        'data': ''
                    })
                );
            }
        } else {
            res.status(400).send(err);
        }
    })
})

app.post('/venueRegister', (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const address = req.body.address;
    const facilites = req.body.facilites;
    const owner_id = req.body.owner_id;
    sql.query('INSERT INTO venue (owner_id, name, description, location, address, facilites) VALUES (?, ?, ?, ?, ?, ?)',
        [owner_id, name, description, location, address, facilites], (err, rows) => {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Information Saved Successfully',
                        'data': rows[0]
                    })
                );
            } else {
                res.status(400).send(err);
            }
        })
})

app.get('/search', (req, res) => {
    var keyword = req.query.q;
    var squery = 'Select * from events as e INNER JOIN venue AS v ON v.venue_id = e.venue_id WHERE e.title LIKE "%' + keyword + '%"';
    console.log('query', squery)

    sql.query(squery, (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Search Successful',
                        'data': rows
                    })
                );
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify(
                    {
                        'status': 400,
                        'result': 'No Result Found',
                        'data': ''
                    })
                );
            }
        } else {
            res.status(400).send(err);
        }
    })
})

app.post('/book', (req, res) => {
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let full_date = year + "-" + month + "-" + date

    console.log('tester', req.body);
    const app_date = req.body.eve_date;
    const event_id = req.body.event_id;

    sql.query('INSERT INTO booking (event_id, created_date, eve_date, status) VALUES (?, ?, ?, ?)',
        [event_id, full_date, app_date, 'P'], (err, rows) => {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Information Saved Successfully',
                        'data': rows[0]
                    })
                );
            } else {
                res.status(400).send(err);
            }
        })
})

app.post('/attendees', (req, res) => {

    const customer_id = req.body.customer_id;
    const event_id = req.body.event_id;

    sql.query('INSERT INTO attendees (event_id, customer_id) VALUES (?, ?)',
        [event_id, customer_id], (err, rows) => {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Information Saved Successfully',
                        'data': rows[0]
                    })
                );
            } else {
                res.status(400).send(err);
            }
        })
})

app.get('/eventDetails/:id', (req, res) => {

    var squery = 'Select * from events as e INNER JOIN venue AS v ON v.venue_id = e.venue_id WHERE e.event_id =' + req.params.id;
    console.log('query', squery)

    sql.query(squery, (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Search Successful',
                        'data': rows[0]
                    })
                );
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify(
                    {
                        'status': 400,
                        'result': 'No Result Found',
                        'data': ''
                    })
                );
            }
        } else {
            res.status(400).send(err);
        }
    })
})

app.get('/venueDetails/:id', (req, res) => {

    var squery = 'Select * from venue WHERE venue_id =' + req.params.id;
    console.log('query', squery)

    sql.query(squery, (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(
                    {
                        'status': 200,
                        'result': 'Search Successful',
                        'data': rows[0]
                    })
                );
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify(
                    {
                        'status': 400,
                        'result': 'No Result Found',
                        'data': ''
                    })
                );
            }
        } else {
            res.status(400).send(err);
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})