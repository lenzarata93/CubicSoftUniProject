const express = require('express');

const  app = express();
const expressConfig=require('./config/expressConfig');
const handlebarsConfig=require('./config/handlebarsConfig');

const dbConnect = require('./config/dbConfig');
const routes = require('./routes');





const PORT =5000;


expressConfig(app);
handlebarsConfig(app);


dbConnect()
.then(()=> console.log('DB Connected....'))
.catch(err =>{
    console.log('DB error:', err);
});

app.use(routes);



app.listen(PORT,()=> console.log(`Server is running on port ${PORT}....`));