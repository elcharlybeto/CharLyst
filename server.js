const express = require('express'); 
const app = express(); 
const port= process.env.PORT || 3000; 


app.use(express.static('public')); //indicamos cuál es nuestra carpeta pública
//app.use(express.json()); //otro middleware que escucha las peticiones y las transforma automáticamente a json





app.listen(port, ()=>{  
    console.log("Servidor escuchando en el http://localhost:"+port);
});