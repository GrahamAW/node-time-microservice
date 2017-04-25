'use strict';

const express = require('express');
const moment = require('moment');
const chrono = require('chrono-node');
const chalk = require('chalk');

const app = express();

// listen to get requests on any url
app.get('*', (req, res) => {
  // get the url, without the leading '/'
  const dateString = decodeURIComponent(req.url.slice(1));
  console.log('------');
  console.log(chalk.white('String from the url is: ') + chalk.yellow(dateString));

  // try first to see if we can cast the string to a number and get a
  // valid moment object
  let date = moment.unix(parseInt(dateString,10));

  // if we could not get a valid date from above, the date is not a unix
  // timestamp. Now try to parse the string into a date.
  if (!date.isValid()) {
    date = moment(chrono.parseDate(dateString));
  }

  let valid = date.isValid();

  console.log('Date is', valid ? chalk.yellow('valid.') : chalk.red('not valid.'));

  // if the date is valid, send the JSON, if not send null
  res.send({
    'unix': valid ? date.unix() : 'null',
    'natural': valid ? date.format('MMMM D, Y') : 'null'
  });
});

app.listen(80);
