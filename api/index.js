const app = require('./app')
const dotenv = require ("dotenv");
dotenv.config();

app.listen(process.env.PORT, ()=> {console.log ("listening on port 3001")})