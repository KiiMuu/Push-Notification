const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVabidKey = 'BMj47HhUThLJqw1k_V3vwRYAsiq2gUSY43yhbnvW3gDPU39Aokb6pURb4ztat3kmcAReydSt9o9XcjNjFLK_qkA';
const privateVabidKey = 'T_hUZlZqiD-GWl6AjECTs-7pDeOpK-utVjJp3XTLuh8';

webpush.setVapidDetails('mailto:ex@ex.com', publicVabidKey, privateVabidKey);

// subscribe route
app.post('/subscribe', (req, res) => {
    // get push subscription object
    const subscription = req.body;

    // send 201 - resource created
    res.status(201).json({});

    // create payload
    const payload = JSON.stringify({title: 'Push Notification'});

    // pass object into sendNotification function
    webpush.sendNotification(subscription, payload).catch(err => {
        console.error(err);
    });
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});