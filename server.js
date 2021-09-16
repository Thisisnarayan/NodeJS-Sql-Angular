require('rootpath')();
const express = require('express');
var path = require("path");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./app/middleware/error-handler');
const compression = require('compression');
const dataFillToDB = require("./app/helpers/db-datafill");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use(express.static(process.cwd()+"/front-end/niramai-front/dist/niramai-front"));


// api routes
app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/front-end/niramai-front/dist/niramai-front/index.html")
  });
app.use('/api', require('./app/controllers/tumor.controller'));

// global error handler
app.use(errorHandler);

dataFillToDB.fillData().then( res => {
  // start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));
})
