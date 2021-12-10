const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require("./models/User");
mongoose.connect("mongodb://localhost/userData");

const port = 8000;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users', (req, res) => {
  User.create(
    {
      name: req.body.newData.name,
      email: req.body.newData.email,
      password: req.body.newData.password
    },
    (err, data) => sendResponse(err, res, data))
})

app.route('/users/:id')
  // READ
  .get((req, res) => {
    User.findById(req.params.id,
      (err, data) => sendResponse(err, res, data)
    )
  })
  // UPDATE
  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      {
        new: true
      },
      (err, data) => sendResponse(err, res, data)
    )
  })
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(
      req.params.id,
      (err, data) => sendResponse(err, res, data)
    )
  })

function sendResponse(err, res, data) {
  if (err) {
    res.json({
      success: false,
      message: err
    });
  } else if (!data) {
    res.json({
      success: false,
      message: "Not found"
    });
  } else {
    res.json({
      success: true,
      data: data
    });
  }
}
