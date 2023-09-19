const express = require('express');

const  app = express();
const expressConfig=require('./config/expressConfig');
const handlebarsConfig=require('./config/handlebarsConfig');
const homeController = require('./controllers/homeController');
const cubeController = require('./controllers/cubeController');
const dbConnect = require('./config/dbConfig');
const accController = require('./controllers/accessoryController');




const PORT =5000;


expressConfig(app);
handlebarsConfig(app);


dbConnect()
.then(()=> console.log('DB Connected....'))
.catch(err =>{
    console.log('DB error:', err);
});

app.use(homeController);
app.use('/cubes', cubeController);
app.use('/accessories', accController);

app.get('*',(req,res)=>{
res.redirect('/404');
});



app.listen(PORT,()=> console.log(`Server is running on port ${PORT}....`));