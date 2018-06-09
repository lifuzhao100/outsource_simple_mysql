let Koa = require('koa');
let Router = require('koa-router');
let staticCache = require('koa-static-cache');
let bodyParser = require('koa-bodyparser');
let moment = require('moment');
let mysql = require('mysql');
let app = new Koa();
let router = new Router();
let connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '1qaz2wsxpl,okm',
	database: 'simple_mysql'
});
connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

router.post('/message/add', async ctx => {

});
router.get('/message/list', async ctx => {

});
app.use(bodyParser());
let files = {};
app.use(staticCache(require('path').join(__dirname, 'statics'), {
	maxAge: 365 * 24 * 60 * 60,
	gzip: true
}, files));
for (let file in files){
	if(/\.html$/.test(file)){
		files[file].maxAge = 0;
	}
}
app
	.use(router.routes())
	.use(router.allowedMethods());
app.listen(6666);
