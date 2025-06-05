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

//미들웨어
app.use(static(__dirname)); //dir은 Node.js에서 제공하는 전역 변수로,
//현재 파일이 있는 디렉토리(폴더)의 전체 경로를 문자열로 담고 있다. 현재 폴더 전체를 웹에서 열게 하겠다.
app.use(express.urlencoded()); //HTML 폼(form)이 전송하는 기본 데이터 형식을 파싱하기 위한 미들웨어야.
app.use(express.json());//클라이언트가 JSON 형식으로 보낸 요청 데이터를
//req.body에서 읽을 수 있게 해주는 미들웨어야.
//라우터
router.route('/').get(function(req,res){ // 클라이언트가 /경로, 루트페이지로 겟요청 보내면,
   res.redirect('/source/jquery.html'); //서버는 클라이언트를 ('링크')로 리다이렉트함. 
   //브라우저를 자동으로 다른 url로 보내는 것것
});
router.get('/routetest').get(function(req, res){ //클라이언트가 /routetest 경로로 GET 요청을 보내면,
   res.redirect('http://www.google.com'); //서버는 응답으로 "구글로 가세요"라는 지시를 보냄 → 브라우저는 자동으로 google.com으로 이동함.
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

app.use('/',router); //메인 앱에 라우터 등록


// ✅ 이 아래에 404 핸들러 추가
app.all('*', function(req, res) {
  res.status(404).send('<h2>에러 - 페이지를 찾을 수 없습니다.</h2>'); 
});

http.createServer(app).listen(app.get('port'), app.get('host'), ()=>{
   console.log('Express server running at ' + app.get('port')+app.get('host'));
});
//Express 앱을 HTTP서버로 실행시켜, 지정한 포트와 주소에서 클라이언트 요청을 받을 준비를 하고, 성공하면, 콘솔에 로그를 찍자. 
const PORT = 8000;
https.createServer(options,app).listen(PORT, app.get('host'), ()=>{
console.log('Express HTTPS server running at https://' + app.get('host') + ':' + PORT);
});
