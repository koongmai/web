// Express는 외장 모듈로, npm install express로 설치해야 함
// serve-static은 정적 파일을 제공하기 위한 외장 미들웨어로, 특정 폴더의 파일을 특정 경로로 노출할 때 사용
let express = require('express');
let static = require('serve-static'); 

//node.js 내장 모듈, http, path, https, fs 이고, 호출은 require() 사용용
let http = require('http'); 
let path = require('path'); 
const https = require('https');
const fs = require('fs');

const options = {
   key: fs.readFileSync("cert.key"),
   cert: fs.readFileSync("cert.crt")
};
//express 객체 생성 app객체랑 router객체 
let app = express(); 
let router = express.Router(); 

//app.set (): 설정값을 저장하는 메서드드
app.set('port', process.env.PORT || 8080); //하나의 컴퓨터에서 어떤 서비스에 연결할 건지
app.set('host', '192.168.38.56'); //어디에 있는 컴퓨터인가? 컴퓨터 ip or localhost

app.use(static(__dirname));
app.use(express.urlencoded());
app.use(express.json());

router.route('/').get(function(req,res){
   res.redirect('/source/jquery.html');
});

router.route('/routetest').get(function(req, res){
   res.redirect('http://www.google.com');
});

router.route('/rss').get(function(req, res){
   console.log("rss data requested");
   let feed = "https://news.sbs.co.kr/news/headlineRssFeed.do?plink=RSSREADER";
   https.get(feed, function(httpres){
      let rss_res = "";
      httpres.on('data',function(chunk){
         rss_res += chunk;
      });
      httpres.on('end',function(){
         res.send(rss_res);
         console.log("rss response completed");
         res.end();
      });
   });
});

app.use('/',router);

http.createServer(app).listen(app.get('port'), app.get('host'), ()=>{
   console.log('Express server running at ' + app.get('port')+app.get('host'));
});

const PORT = 8000;
https.createServer(options,app).listen(PORT, app.get('host'), ()=>{
console.log('Express HTTPS server running at https://' + app.get('host') + ':' + PORT);
});
