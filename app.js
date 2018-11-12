const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const request = require('request');
var qs = require('querystring')

const app = express();
//For post data...
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//For view engine..
app.set('view engine' , 'ejs');

app.get('/',(req,res)=>{ res.send('Now Server is running!!'); });

app.get('/file',(req,res)=>{ res.sendFile(path.join(__dirname,'ui','home.html')); });

//app.get('/form',(req,res)=>{ res.sendFile(path.join(__dirname,'ui','form.html')); });
//TEMPLATE..
var name = "";

function temp(num){
  if(num == 1){  
      var template1 = `
      <html>
      <head>
        <title> Resume</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/css?family=Sawarabi+Mincho|Crimson+Text" rel="stylesheet">
        <link rel="shortcut icon" type="icon/gif" href="/images/resum.png" />
      <style>
      .main{
          max-width: 800px;
          margin: 0 auto;
          background: white;
          font-family: Crimson Text;
      }
      .pi{
          
          font-family: Crimson Text;
      }
      .objective{
         
      }
      .education{
         
      }
      .skills{
          
      }
      .certificate{
          
      }
      p{
          margin-bottom: -12px;
      }
      </style>
      </head>
      <body bgcolor="darkslategrey">
        <div class="main">
          <div class="pi">
            <h1 style="color: #468cdd;margin-bottom: -10px;font-weight: normal;">${name}</h1>
            <p>Phone:- </p>
            <p>Address:- </p>
            <p style="margin-bottom: 5px;">Email:-</p>
          </div>

          <div class="objective">
            <h3 style="border-bottom: 1px dashed black;font-weight: normal;">OBJECTIVE</h3>
            <p style="margin-bottom: 5px;"><%= data.obj %></p>
          </div>

          <div class="education">
            <h3 style="border-bottom: 1px dashed black;font-weight: normal;">QUALIFICATION</h3>
            <p style="margin-bottom: 5px;"><%= data.edu %></p>
          </div>

          <div class="skills">
            <h3 style="border-bottom: 1px dashed black;font-weight: normal;">SKILLS</h3>
            <p style="margin-bottom: 5px;"><%= data.skill %></p>
          </div>

          <div class="certificate">
            <h3 style="border-bottom: 1px dashed black;font-weight: normal;">CERTIFICATIONS</h3>
            <p style="margin-bottom: 5px;"><%= data.cert %></p>
          </div>

          <i style="font-size: 15px;margin: 2% 0% 1% 4%;color: gray;">I hereby declare that above mentioned information is correct and best to my knowledge.</i>

          </div>
      </body>
      </html>

      `;
        return template1;
  }
  if(num == 2){
    return 'template <b style="color:red;">two</b>';
  }
}

//To convert template to pdf....
app.get('/temp/:num',(req,res)=>{
  var num = req.params.num;
  var url= 'https://annusharma-developer-edition.ap4.force.com/test';
  //res.send(temp(num));
  
  request.post(url+ '?' + qs.stringify({temp: temp(num)})).pipe(res);
});

//For pdf....
// app.get('/pdf',(req,res)=>{
//   var tem = '<i style="color:red">Testing....</i>';
//   console.log('https://annusharma-developer-edition.ap4.force.com/test'+ '?' + qs.stringify({temp: tem}));
//   request.get('https://annusharma-developer-edition.ap4.force.com/test'+ '?' + qs.stringify({temp: tem})).pipe(res);
// });

app.post('/musa',(req,res)=>{
  console.log(req.body);
  res.render('data',{data: req.body});
});

//For Template....
var viewName = "";
app.post('/temp',(req,res)=>{
  console.log(req.body);
  if(req.body.temp_number == 0){
  	viewName = "temp"+req.body.temp_number;
    console.log("File Name :"+viewName)
    res.render(viewName,{data: req.body});
  }else{
	  name = req.body.name;
	  viewName = "temp"+req.body.temp_number;
	  console.log("File Name :"+viewName)
	  res.render(viewName,{data: req.body});
  }
});

//For Loading Images...
app.get('/images/:image',(req,res)=>{
    var image = req.params.image;
    res.sendFile(path.join(__dirname,'images',image));
});

//For Loading js and css files...
app.get('/ui/:file',(req,res)=>{
    var file = req.params.file;
    res.sendFile(path.join(__dirname,'ui',file));
});

//App is running on Port 3000!
app.listen(3000,()=> console.log('Server is runnin on port 3000!'));