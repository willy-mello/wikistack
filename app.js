const morgan = require('morgan');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended:false}));
//setting up our url..extended??
app.use(express.static(path.join(__dirname, 'public')));
//this allows navigation on windows and mac/ linux shizz
app.use(morgan('dev'))
//calling development on morgan so we see a development version of morgan

app.get('/',(req,res,next)=>{
  res.send('jello squirreled')
});

const PORT =1337;
 app.listen(PORT, ()=>{
   console.log(`App listening in port ${PORT}`)
 });
 
