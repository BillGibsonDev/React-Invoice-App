const router = require('express').Router();
let Invoice = require('../models/invoice.model');
const auth = require('../middleware/auth');


router.route('/').get((req, res) => {
    Invoice.find()
    .then(invoice => res.json(invoice))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = Date.parse(req.body.date);
    const amount = Number(req.body.amount);
    const balancedue = Number(req.body.balancedue);
    const customerName = req.body.customerName;
    const email = req.body.email;
    const address = req.body.address;
    const phone = Number(req.body.phone);
    const status = req.body.status;
    const invoiceNum = Number(req.body.invoiceNum);

    const newInvoice = new Invoice({
    username,
    description,
    date,
    amount,
    balancedue,
    email,
    address,
    customerName,
    phone,
    status,
    invoiceNum,
    });

    newInvoice.save()
    .then(() => res.json('Invoice Added!'))
    .catch(err => res.status(400).json('Error: ' + err));


    router.route('/:id').get((req, res) => {
        Invoice.findById(req.params.id)
          .then(invoice => res.json(invoice))
          .catch(err => res.status(400).json('Error: ' + err));
      });
      
      router.route('/:id').delete((req, res) => {
        Invoice.findByIdAndDelete(req.params.id)
          .then(() => res.json('invoice deleted.'))
          .catch(err => res.status(400).json('Error: ' + err));
      });
      
      router.route('/update/:id').post((req, res) => {
        Invoice.findById(req.params.id)
          .then(invoice => {
            invoice.username = req.body.username;
            invoice.description = req.body.description;
            invoice.amount = Number(req.body.amount);
            invoice.date = Date.parse(req.body.date);
            invoice.balancedue = Number(req.body.balancedue);
            invoice.customerName = req.body.customerName;
            invoice.email = req.body.email;
            invoice.address = req.body.address;
            invoice.status = req.body.status;
            invoice.phone = Number(req.body.phone);
            invoice.invoiceNum = Number(req.body.invoiceNum);
      
            invoice.save()
              .then(() => res.json('Invoice updated!'))
              .catch(err => res.status(400).json('Error: ' + err));
          })
          .catch(err => res.status(400).json('Error: ' + err));
      });
      
});

module.exports = router;