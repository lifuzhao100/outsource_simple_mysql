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
				"ABOR",
				"ALLO",
				"APPLE",
				"AUTH",
				"CDUP",
				"CWD",
				"DELE",
				"EPRT",
				"EPSV",
				"FEAT",
				"HELP",
				"LIST",
				"MDTM",
				"MKD",
				"MODE",
				"NLST",
				"NOOP",
				"OPTS",
				"PASS",
				"PASV",
				"PBSZ",
				"PORT",
				"PROT",
				"PWD",
				"QUIT",
				"REST",
				"RETR",
				"RMD",
				"RNFR",
				"RNFO",
				"SIZE",
				"STAT",
				"STOR",
				"STOU",
				"STRU",
				"SYST",
				"TYPE",
				"USER"
			]
		})
	}else{
		reject('请输入正确的用户名或密码');
	}
});
ftpServer.listen();