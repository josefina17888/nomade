const app = require('./app')

const db = require('./db')
const dotenv = require ("dotenv");

dotenv.config();

app.listen(process.env.PORT, ()=> {console.log ("listening on port 3001")})