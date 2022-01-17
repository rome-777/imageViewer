"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var path = require('path');

var express = require('express');

var app = express(); // const { db, syncAndSeed } = require('./db');
// const a = require('../public/')

var PORT = process.env.PORT || 3000;
var PUBLIC_PATH = path.join(__dirname, '../dist/public');
var DIST_PATH = path.join(__dirname, '../dist'); // body parsing middleware

app.use(express.json()); // app.use(express.urlencoded({ extended: false }))

app.use(express["static"](PUBLIC_PATH));
app.use(express["static"](DIST_PATH)); // mount api routes
// app.use('/api', require('./api'));
// serve index.html
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });
// error handlilng middleware

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
}); // initiate server + start listening + catch errors

var init = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              if (process.env.SEED) {// await syncAndSeed();
              } else {// await db.sync();
              }

              app.listen(PORT, function () {
                return console.log("Server listening on PORT: ".concat(PORT));
              });
            } catch (err) {
              console.log(err);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

init();