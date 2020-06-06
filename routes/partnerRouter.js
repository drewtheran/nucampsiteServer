const express = require('express');
const bodyParser = require('body-parser');

const partnerRouter = express.Router();

partnerRouter.route('/:partnerId')

partnerRouter.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

partnerRouter.put('/partners/:partnerId', (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /partners`);
});

partnerRouter.delete('/partners/:partnerId', (req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
});


partnerRouter.use(bodyParser.json());

partnerRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) => {
    res.end(`Will send all the partners to you`);
})

.post((req, res) => {
    res.statusCode = 403;
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})

.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /partners/${req.params.partnerId}`);
})

.delete((req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
});

module.exports = partnerRouter;