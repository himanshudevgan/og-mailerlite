// const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
// const app = express();
// const router = require('./app/routes/route');
// app.set('view engine', 'ejs');
// app.use(expressLayouts);
// app.use('/', router);
// app.use(express.static(__dirname + './public'));
// app.listen(3001, () => {
//     console.log('Server started @ 3001');
// });

'use strict';
const http = require('http');
const port = process.env.PORT || 3001;
const app = require('./app/app');
const server = http.createServer(app);
server.listen(port, () => {
    console.log('server started on port', port);
});