const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.route('/:promotionId');

promotionRouter.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

promotionRouter.get('/', (req, res) => {
    res.end(`Will send all the promotions to you`);
})

promotionRouter.post('/', (req, res) => {
    res.statusCode = 403;
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})

promotionRouter.put('/:promotionId', (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /promotions/${req.params.promotionId}`);
})

promotionRouter.delete('/:promotionId', (req, res) => {
    res.end(`Deleting promotion: ${req.params.promotionId}`);
})

promotionRouter.use(bodyParser.json());



module.exports = promotionRouter;