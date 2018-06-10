let { FtpSrv } = require('ftp-srv');
let { resolve } = require('path');
let ftpServer = new FtpSrv('ftp://0.0.0.0:6667', {
	pasv_range: 6668,
	file_format: 'ls'
});
ftpServer.on('login', ({username, password}, resolve, reject) => {
	console.log('user:', username, '&pass:', password);
	if(username === 'amazing' && password === 'excellent_job'){
		console.log('resolve it');
		resolve({
			root: 'statics',
			whitelist: [
				'DELE',
				'RNFR',
				'RNTO',
				'STOR',
				'APPE',
				'CWD',
				'CDUP',
				'LIST',
				'NLST',
				'STAT',
				'MKD',
				'RETR',
				'PWD'
			]
		})
	}else{
		reject('请输入正确的用户名或密码');
	}
});
ftpServer.listen();