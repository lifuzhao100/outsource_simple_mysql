
let Koa = require('koa');
let Router = require('koa-router');
let staticCache = require('koa-static-cache');
let bodyParser = require('koa-bodyparser');
let moment = require('moment');
let mysql = require('mysql');
let app = new Koa();
let router = new Router();
let pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '1qaz2wsxpl,okm',
	database: 'simple_mysql'
});
router.post('/message/add', async ctx => {
	let { name, email, message } = ctx.request.body;
	let create_time = moment().format('YYYY-MM-DD HH:mm');
	if(!name){
		ctx.body = {
			err_code: 1,
			message: '缺少必要参数name'
		};
		return;
	}else if(!email){
		ctx.body = {
			err_code: 2,
			message: '缺少必要参数email'
		};
		return;
	}else if(!message){
		ctx.body = {
			err_code: 3,
			message: '缺少必要参数message'
		};
		return;
	}
	let returnResults = () => {
		return new Promise((resolve) => {
			pool.getConnection((err, connection) => {
				name = JSON.stringify(encodeURIComponent(name));
				email = JSON.stringify(encodeURIComponent(email));
				message = JSON.stringify(encodeURIComponent(message));
				create_time = JSON.stringify(create_time);
				if(err) throw err;
				connection.query(`INSERT INTO message_list (name, email, message, create_time) VALUES (${name}, ${email}, ${message}, ${create_time})`, (error, results, field) => {
					connection.release();
					if(error) throw error;
					resolve({
						err_code: 0,
						message: '新增成功',
						id: results.insertId
					});
				})
			})
		})
	};
	ctx.body = await returnResults();
});
router.get('/message/list', async ctx => {
	let returnResults = () => {
		return new Promise((resolve) => {
			pool.getConnection((err, connection) => {
				if(err) throw err;
				connection.query(`SELECT * FROM message_list`, (error, results) => {
					connection.release();
					if(error) throw error;
					let decodeResults = results.map(result => {
						let decodeResult = {};
						for(let key in result){
							decodeResult[key] = decodeURIComponent(result[key]);
						}
						return decodeResult;
					});
					resolve({
						error_code: 0,
						message: '获取成功',
						data: decodeResults
					});
				});
			});
		})
	};
	ctx.body = await returnResults();
});
app.use(bodyParser());
let files = {};
app.use(staticCache(require('path').join(__dirname, 'statics'), {
	// maxAge: 365 * 24 * 60 * 60,
	// gzip: true
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
