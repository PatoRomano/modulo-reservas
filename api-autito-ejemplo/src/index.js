const express = require('express');
const morgan = require('morgan');
const app = express();

const cors = require("cors");

const corsOptions = {
  origin: "http://127.0.0.1:5173",
};

app.use(cors(corsOptions));
//configuraciones
app.set('port',process.env.PORT || 3000)
app.set('json spaces',2);
//middleware //combiend nos da info de las peticiones que recibe el server, con dev tenes - info
app.use(morgan('combined'));
app.use(express.urlencoded({
    extended:false
}));
app.use(express.json());

//routes
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
//empezando server




app.listen(app.get('port'),() =>{
    console.log(`Server on port  ${app.get('port')}`);
}
)