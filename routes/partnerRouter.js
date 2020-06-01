const express = require('express');
const bodyParser = require('body-parser');

const partnerRouter = express.Router();

partnerRouter.route('/:partnerId');

partnerRouter.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

partnerRouter.get('/', (req, res) => {
    res.end(`Will send all the partners to you`);
})

partnerRouter.post('/', (req, res) => {
    res.statusCode = 403;
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})

partnerRouter.put('/:partnerId', (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /partners/${req.params.partnerId}`);
})

partnerRouter.delete('/:partnerId', (req, res) => {
    res.end(`Deleting partner: ${req.params.partnerId}`);
})

partnerRouter.use(bodyParser.json());



module.exports = partnerRouter;