const express = require('express');
const  app = express();
const expressConfig=require('./config/expressConfig');
const handlebarsConfig=require('./config/handlebarsConfig')

const PORT =5000;

expressConfig(app);
handlebarsConfig(app);

//Routes
app.get('/',(req,res)=>{
res.render('index')
});

app.listen(PORT,()=> console.log(`Server is running on port ${PORT}....`));