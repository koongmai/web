// express 기본 모듈 불러오기
var express =require('express'),http=require("http"),path =require('path');
// express 미들웨어 불러오기
var static = require('serve-static');
// express 객체 생성
var app = express();
var router = express.Router();

//기본 속성 설정
app.set('port', process.env.PORT||8080); //static ip를 공유해서 쓴다? , 사설ip는 외부에서는 안 보이지만,,
app.set('host', '127.0.0.1'); //호스트에는 루프백..

//static 서버 미들웨어 사용
app.use(static(__dirname)); //현재 폴더에 대한 정적 접근 허용

app.get('/', function(req, res) {
    res.redirect('/source/jquery.html');
});

app.get('/routetest', function(req, res) {
    res.redirect('http://www.google.com');
});


app.use(function(req,res,next){
	console.log('첫 번째 미들웨어에서 요청을 처리함.');
	req.user = 'mike';
	next();
})

app.use('/',function(req,res,next){
	console.log('두번 째 미들웨어에서 요청을 처리함.');
	res.writeHead('200',{'Content-Type' : 'text/html;charset=utf8'});
	res.end('<h1>Express 서버에서 ' + req.user + '가 응답한 결과입니다.</h1>');
})

app.use(express.urlencoded());
app.use(express.json());
//http 서버 생성
http.createServer(app).listen(app.get('port'),app.get('host'),()=>{
	console.log('Express server running at'+app.get('port')+app.get('host'));
});
