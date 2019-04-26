const express = require('express');
const app = express();
require('./database/startup/db')();
require('./database/startup/middleware')(app);
app.listen(2210, function () {
  console.log("Server running @ localhost:2210");
});

