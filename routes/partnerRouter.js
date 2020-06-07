const express = require('express');
const bodyParser = require('body-parser');
const Partner = require('../models/partner');

const partnerRouter = express.Router();


partnerRouter.use(bodyParser.json());

partnerRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get((req, res) => {
    Partner.find()
    res.end(`Will send all the partners to you`);
})

.post((req, res, next) => {
    Partner.create(req.body)
    .then(partner => {
        console.log('Partner Created ', partner);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
    })
    .catch(err => next(err));
})

.put((req, res) => {
    Partner.find()
    res.statusCode = 403;
    res.end(`PUT operation not supported on /partners/${req.params.partnerId}`);
})

.delete((req, res) => {
    Partner.find()
    res.end(`Deleting partner: ${req.params.partnerId}`);
});

partnerRouter.route('/:partnerId')
.delete((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        if (partner) {
            partner.remove();
            partner.save()
            .then(partner => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(partner);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`Partner ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.get((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        if (partner) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partner.comments);
        } else {
            err = new Error(`Partner ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
})
.put((req, res) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
        if (partner) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(partner.comments);
        } else {
            err = new Error(`Partner ${req.params.partnerId} not found`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err))
});

module.exports = partnerRouter;