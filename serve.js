let express = require('express');
let app = express();

app.use(express.static('build'));
app.listen(8001);

console.log("API Listening on port 8001...");
