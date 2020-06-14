const express = require('express');
const bodyParser = require('body-parser');
const Promotion = require('../models/promotion');
const authenticate = require('../authenticate');

const promotionRouter = express.Router();

promotionRouter.route('/:promotionId')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotion.findById(req.params.promotionId)
    .then(promotion => {
        if (promotion) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotion);
        } else {
            err = new Error(`Partner ${req.params.promotionId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.end(`Deleting promotion: ${req.params.promotionId}`);
});

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) => {
    Promotion.find()
    res.end(`Will send all the promotions to you`);
})

.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Campsite Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})

.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotion.find()
    res.statusCode = 403;
    res.end(`PUT operation not supported on /promotions/${req.params.promotionId}`);
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    Promotion.find()
    res.end(`Deleting promotion: ${req.params.promotionId}`);
});

module.exports = promotionRouter;