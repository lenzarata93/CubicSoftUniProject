const express = require('express');
const  app = express();
const expressConfig=require('./config/expressConfig');
const handlebarsConfig=require('./config/handlebarsConfig');
const homeController = require('./controllers/homeController');

const PORT =5000;

expressConfig(app);
handlebarsConfig(app);

app.use(homeController)




app.listen(PORT,()=> console.log(`Server is running on port ${PORT}....`));