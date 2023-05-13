require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URL)
.catch(function(err) {
    console.log(err);
});

// Routes for the API
const ApiRoutes = require('./api/routes');
app.use("/api", ApiRoutes);

app.listen(process.env.PORT, () => console.log(`Server started at PORT: ${process.env.PORT}`));