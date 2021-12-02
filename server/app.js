'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { httpError } = require('./utils/error');
const passport = require('./utils/passport');

const authRoute = require('./routes/authRoute.js');
const userRoute = require('./routes/userRoute');
const imageRoute = require('./routes/imageRoute');

app.use(passport.initialize());
app.use(express.static('uploads'));

app.use('/auth', authRoute);
app.use('/', passport.authenticate('jwt', { session: false }), userRoute);
app.use('/', passport.authenticate('jwt', { session: false }), imageRoute);

app.use((req, res, next) => {
  const err = httpError('Not found', 404);
  next(err);
});

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'internal error' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
