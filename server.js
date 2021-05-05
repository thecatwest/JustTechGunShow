const path = require('path');
const exphbs = require('express-handlebars');
const routes = require('./controllers/');
const hbs = exphbs.create({});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));