var restify = require('restify');
var orm = require("orm");
var xss = require('xss');
// var algo = require('../index.js');

// 把后台数据显示到前台，根据tab切换不同的数据
function respond(req, res, next) {
  //res.send('hello ' + req.params.name);

	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
	  if (err) throw err;
	 
	    var News = db.define("news", {
	        newsid      : {
	        	type:'serial',
	        	key:true
	        },
	        newstitle   : String,
	        newsimg       : String, // FLOAT 
	        newstext      : String,
	        newsdate    : Date, // BLOB/BINARY 
	        navdate      : Number // JSON encoded 
	    });

	    News.find({
	    	navdate:req.params.number
	    },["newsid","Z"], function (err, news) {
	    	if (err) throw err;
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	res.json(news);
	    });


	});

}

// 把后台数据全部显示到前台
function respond1(req, res, next) {
  //res.send('hello ' + req.params.name);

	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
	  if (err) throw err;
	 
	    var News = db.define("news", {
	        newsid      : {
	        	type:'serial',
	        	key:true
	        },
	        newstitle   : String,
	        newsimg       : String, // FLOAT 
	        newstext      : String,
	        newsdate    : Date, // BLOB/BINARY 
	        navdate      : Number // JSON encoded 
	    });

	    News.find({
	    	// navdate:req.params.number
	    },["newsid","Z"],function (err, news) {
	    	if (err) throw err;
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	// res.json(algo.quicksort.sort(news.newsid,"desc"));
	    	res.json(news);
	    });


	});

}

// 给后台数据增加一条数据
function respond2(req, res, next) {
  //res.send('hello ' + req.params.name);

	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
	  if (err) throw err;
	 
	    var News = db.define("news", {
	        newsid      : {
	        	type:'serial',
	        	key:true
	        },
	        newstitle   : String,
	        newsimg       : String, // FLOAT 
	        newstext      : String,
	        newsdate    : Date, // BLOB/BINARY 
	        navdate      : Number // JSON encoded 
	    });

	    News.create({
	    	newstitle:xss(req.params.string),
	    	newsimg:xss(req.params.string1),
	    	newstext:req.params.string2,
	    	newsdate:xss(req.params.data),
	    	navdate:req.params.number
	    }, function (err, news) {
	    	// 出错时返给前端的信息
	    	if (err) {
	    		res.json({
	    			status:"addErr"
	    		});
	    	};
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	res.json(news);
	    });


	});

}

// 修改后台数据
function respond3(req, res, next) {
  //res.send('hello ' + req.params.name);

	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
	  if (err) throw err;
	 
	    var News = db.define("news", {
	        newsid      : {
	        	type:'serial',
	        	key:true
	        },
	        newstitle   : String,
	        newsimg       : String, // FLOAT 
	        newstext      : String,
	        newsdate    : Date, // BLOB/BINARY 
	        navdate      : Number // JSON encoded 
	    });

	    News.get(
	    	req.params.id
	    , function (err, news) {
	    	// 出错时返给前端的信息
	    	if (err){
	    		res.json({
	    			status:"changeErr"
	    		});
	    	}
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");


	    	news.save({
	    		newstitle:xss(req.params.strings),
	    		newsimg:xss(req.params.strings1),
	    		newstext:req.params.strings2,
	    		newsdate:xss(req.params.datas),
	    		navdate:req.params.numbers,
	    	},function(err){});

	    	res.charSet('utf-8');
	    	res.json(news);
	    });


	});

}


// 删除后台数据
function respond4(req, res, next) {
  //res.send('hello ' + req.params.name);

	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
	  if (err) throw err;
	 
	    var News = db.define("news", {
	        newsid      : {
	        	type:'serial',
	        	key:true
	        },
	        newstitle   : String,
	        newsimg       : String, // FLOAT 
	        newstext      : String,
	        newsdate    : Date, // BLOB/BINARY 
	        navdate      : Number // JSON encoded 
	    });

	    News.get(
	    	 req.params.idd
	    , function (err, news) {
	    	if (err){
	    		res.json({
	    			status:"deleteErr"
	    		});
	    	}
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	news.remove(function(err){});


	    	res.charSet('utf-8');
	    	res.json(news);
	    });


	});

}

// 根据条件查找数据
function respond5(req, res, next) {
  //res.send('hello ' + req.params.name);

	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
	  if (err) throw err;
	 
	    var News = db.define("news", {
	        newsid      : {
	        	type:'serial',
	        	key:true
	        },
	        newstitle   : String,
	        newsimg       : String, // FLOAT 
	        newstext      : String,
	        newsdate    : Date, // BLOB/BINARY 
	        navdate      : Number // JSON encoded 
	    });


	 if(req.params.idc!=""){

	    News.find({
	    	newsid:req.params.idc,
	    	// newstitle:req.params.stringc,
	    	// newsimg:req.params.stringc1,
	    	// newstext:req.params.stringc2,
	    	// newsdate:req.params.datac,
	    	// navdate:req.params.numberc
	    }, function (err, news) {
	    	// 出错时返给前端的信息
	    	if (err){
	    		res.json({
	    			status:"idcErr"
	    		});
	    	}
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	res.json(news);
	    });


	    }else if (req.params.stringc!="") {
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	// res.charSet('utf-8');
	    	// res.json({"look":"title"});

	    News.find({
	    	// newsid:req.params.idc,
	    	 newstitle:req.params.stringc,
	    	// newsimg:req.params.stringc1,
	    	// newstext:req.params.stringc2,
	    	// newsdate:req.params.datac,
	    	// navdate:req.params.numberc
	    }, function (err, news) {
	    	// 出错时返给前端的信息
	    	if (err){
	    		res.json({
	    			status:"stringcErr"
	    		});
	    	}
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	res.json(news);
	    });

	    }else if (req.params.stringc1!="") {
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	// res.charSet('utf-8');
	    	// res.json({"look":"img"});

	    News.find({
	    	// newsid:req.params.idc,
	    	// newstitle:req.params.stringc,
	    	newsimg:req.params.stringc1,
	    	// newstext:req.params.stringc2,
	    	// newsdate:req.params.datac,
	    	// navdate:req.params.numberc
	    }, function (err, news) {
	    	// 出错时返给前端的信息
	    	if (err){
	    		res.json({
	    			status:"stringc1Err"
	    		});
	    	}
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	res.json(news);
	    });

	    }else if (req.params.stringc2!="") {
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	// res.charSet('utf-8');
	    	// res.json({"look":"text"});

	    News.find({
	    	// newsid:req.params.idc,
	    	// newstitle:req.params.stringc,
	    	// newsimg:req.params.stringc1,
	    	newstext:req.params.stringc2,
	    	// newsdate:req.params.datac,
	    	// navdate:req.params.numberc
	    }, function (err, news) {
	    	// 出错时返给前端的信息
	    	if (err){
	    		res.json({
	    			status:"stringc2Err"
	    		});
	    	}
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	res.json(news);
	    });

	    }else if (req.params.datac!="") {
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	// res.charSet('utf-8');
	    	// res.json({"look":"time"});

	    News.find({
	    	// newsid:req.params.idc,
	    	// newstitle:req.params.stringc,
	    	// newsimg:req.params.stringc1,
	    	// newstext:req.params.stringc2,
	    	newsdate:req.params.datac,
	    	// navdate:req.params.numberc
	    }, function (err, news) {
	    	// 出错时返给前端的信息
	    	if (err){
	    		res.json({
	    			status:"datacErr"
	    		});
	    	}
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	res.json(news);
	    });

	    }else if (req.params.numberc!="") {
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	// res.charSet('utf-8');
	    	// res.json({"look":"nav"});

	    News.find({
	    	// newsid:req.params.idc,
	    	// newstitle:req.params.stringc,
	    	// newsimg:req.params.stringc1,
	    	// newstext:req.params.stringc2,
	    	// newsdate:req.params.datac,
	    	navdate:req.params.numberc
	    }, function (err, news) {
	    	// 出错时返给前端的信息
	    	if (err){
	    		res.json({
	    			status:"numbercErr"
	    		});
	    	}
	    	// 解决ajax跨域问题
	    	// res.header("Access-Control-Allow-Origin","*");
	    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
	    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    	res.charSet('utf-8');
	    	res.json(news);
	    });


	}





	});

}

// // id查找
// function respond_id(req, res, next) {
//   //res.send('hello ' + req.params.name);

// 	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
// 	  if (err) throw err;
	 
// 	    var News = db.define("news", {
// 	        newsid      : {
// 	        	type:'serial',
// 	        	key:true
// 	        },
// 	        newstitle   : String,
// 	        newsimg       : String, // FLOAT 
// 	        newstext      : String,
// 	        newsdate    : Date, // BLOB/BINARY 
// 	        navdate      : Number // JSON encoded 
// 	    });

// 	    News.find({
// 	    	newsid:req.params.idc
// 	    }, function (err, news) {
// 	    	// 解决ajax跨域问题
// 	    	res.header("Access-Control-Allow-Origin","*");
// 	    	res.header("Access-Control-Allow-Headers","X-Requested-With");
// 	    	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

// 	    	res.charSet('utf-8');
// 	    	res.json(news);
// 	    });


// 	});

// }

// // title查找
// function respond_title(req, res, next) {
//   //res.send('hello ' + req.params.name);

// 	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
// 	  if (err) throw err;
	 
// 	    var News = db.define("news", {
// 	        newsid      : {
// 	        	type:'serial',
// 	        	key:true
// 	        },
// 	        newstitle   : String,
// 	        newsimg       : String, // FLOAT 
// 	        newstext      : String,
// 	        newsdate    : Date, // BLOB/BINARY 
// 	        navdate      : Number // JSON encoded 
// 	    });

// 	    News.find({
// 	    	newstitle:xss(req.params.stringc)
// 	    }, function (err, news) {
// 	    	// 解决ajax跨域问题
// 	    	res.header("Access-Control-Allow-Origin","*");
// 	    	res.header("Access-Control-Allow-Headers","X-Requested-With");
// 	    	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

// 	    	res.charSet('utf-8');
// 	    	res.json(news);
// 	    });


// 	});

// }

// // img查找
// function respond_img(req, res, next) {
//   //res.send('hello ' + req.params.name);

// 	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
// 	  if (err) throw err;
	 
// 	    var News = db.define("news", {
// 	        newsid      : {
// 	        	type:'serial',
// 	        	key:true
// 	        },
// 	        newstitle   : String,
// 	        newsimg       : String, // FLOAT 
// 	        newstext      : String,
// 	        newsdate    : Date, // BLOB/BINARY 
// 	        navdate      : Number // JSON encoded 
// 	    });

// 	    News.find({
// 	    	newsimg:xss(req.params.stringc1)
// 	    }, function (err, news) {
// 	    	// 解决ajax跨域问题
// 	    	res.header("Access-Control-Allow-Origin","*");
// 	    	res.header("Access-Control-Allow-Headers","X-Requested-With");
// 	    	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

// 	    	res.charSet('utf-8');
// 	    	res.json(news);
// 	    });


// 	});

// }

// // text查找
// function respond_text(req, res, next) {
//   //res.send('hello ' + req.params.name);

// 	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
// 	  if (err) throw err;
	 
// 	    var News = db.define("news", {
// 	        newsid      : {
// 	        	type:'serial',
// 	        	key:true
// 	        },
// 	        newstitle   : String,
// 	        newsimg       : String, // FLOAT 
// 	        newstext      : String,
// 	        newsdate    : Date, // BLOB/BINARY 
// 	        navdate      : Number // JSON encoded 
// 	    });

// 	    News.find({
// 	    	newstext:req.params.stringc2
// 	    }, function (err, news) {
// 	    	// 解决ajax跨域问题
// 	    	res.header("Access-Control-Allow-Origin","*");
// 	    	res.header("Access-Control-Allow-Headers","X-Requested-With");
// 	    	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

// 	    	res.charSet('utf-8');
// 	    	res.json(news);
// 	    });


// 	});

// }

// // date查找
// function respond_date(req, res, next) {
//   //res.send('hello ' + req.params.name);

// 	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
// 	  if (err) throw err;
	 
// 	    var News = db.define("news", {
// 	        newsid      : {
// 	        	type:'serial',
// 	        	key:true
// 	        },
// 	        newstitle   : String,
// 	        newsimg       : String, // FLOAT 
// 	        newstext      : String,
// 	        newsdate    : Date, // BLOB/BINARY 
// 	        navdate      : Number // JSON encoded 
// 	    });

// 	    News.find({
// 	    	newsdate:xss(req.params.datac)
// 	    }, function (err, news) {
// 	    	// 解决ajax跨域问题
// 	    	res.header("Access-Control-Allow-Origin","*");
// 	    	res.header("Access-Control-Allow-Headers","X-Requested-With");
// 	    	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

// 	    	res.charSet('utf-8');
// 	    	res.json(news);
// 	    });


// 	});

// }

// // nav查找
// function respond_nav(req, res, next) {
//   //res.send('hello ' + req.params.name);

// 	orm.connect("mysql://root:@127.0.0.1/ps", function (err, db) {
// 	  if (err) throw err;
	 
// 	    var News = db.define("news", {
// 	        newsid      : {
// 	        	type:'serial',
// 	        	key:true
// 	        },
// 	        newstitle   : String,
// 	        newsimg       : String, // FLOAT 
// 	        newstext      : String,
// 	        newsdate    : Date, // BLOB/BINARY 
// 	        navdate      : Number // JSON encoded 
// 	    });

// 	    News.find({
// 	    	navdate:req.params.numberc
// 	    }, function (err, news) {
// 	    	// 解决ajax跨域问题
// 	    	res.header("Access-Control-Allow-Origin","*");
// 	    	res.header("Access-Control-Allow-Headers","X-Requested-With");
// 	    	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

// 	    	res.charSet('utf-8');
// 	    	res.json(news);
// 	    });


// 	});

// }







// 登录
function respond_login(req, res, next) {
  //res.send('hello ' + req.params.name);

	// orm.connect("mysql://root:@127.0.0.1/login", function (err, db) {
	//   if (err) throw err;
	 
	    // var News = db.define("home", {
	    //     username       : String, // FLOAT 
	    //     password      : Number // JSON encoded 
	    // });

	    if (req.params.username=="king" && req.params.password=="123456") {
	    	
		    	// res.header("Access-Control-Allow-Origin","*");
		    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
		    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

		    	res.charSet('utf-8');
		    	res.json({"status":"sucess"});
	    	
	    }else if(req.params.username!="king" && req.params.password!="123456"){

		    	// res.header("Access-Control-Allow-Origin","*");
		    	// res.header("Access-Control-Allow-Headers","X-Requested-With");
		    	// res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

		    	res.charSet('utf-8');
		    	res.json({"status":"erro"});

	    }
	    // News.find({
	    // 	req.params.username:"king",
	    // 	req.params.password:"123456"
	    // }, function (err, news) {
	    // 	// 解决ajax跨域问题
	    // 	res.header("Access-Control-Allow-Origin","*");
	    // 	res.header("Access-Control-Allow-Headers","X-Requested-With");
	    // 	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	    // 	res.charSet('utf-8');
	    // 	res.json(news);
	    // });


	 // });

}

// 转义特殊字符
// function Escape(sHtml) {
//  return sHtml.replace(/[<>&".|]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;','.':'&middot;','|':'&brvbar;'}[c];});
// }


var server = restify.createServer();
// 用post请求时，比用get请求时多的一句
server.use(restify.bodyParser());
// 解决全部跨域问题
server.use(function(req, res, next){

	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");

	next();
});

// 根据tab的切换显示不同的数据
server.get('/hello/:number', respond);
// 全部数据显示出来
server.get('/hello1/:number', respond1);
//增加
server.get('/hello2/:string/:string1/:string2/:data/:number', respond2);
//修改
server.post('/change', respond3);
// 删除
server.get('/hello4/:idd', respond4);
// 查找
server.post('/lookup', respond5);

// // id查找
// server.get('/lookId/:idc',respond_id);
// // title查找
// server.get('/lookTitle/:stringc',respond_title);
// // img查找
// server.get('/lookImg/:stringc1',respond_img);
// // text查找
// server.get('/lookText/:stringc2',respond_text);
// // date查找
// server.get('/lookDate/:datac',respond_date);
// // nav查找
// server.get('/lookNav/:numberc',respond_nav);
// // server.get('/hello5/:idc', respond5);

// 登录
server.get('/login/:username/:password', respond_login);

//server.head('/hello/:name', respond);

server.listen(3900, function() {
  console.log('%s listening at %s', server.name, server.url);
});
