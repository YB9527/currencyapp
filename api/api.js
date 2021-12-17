class Api {
	constructor(data = {
		path: ""
	}) {
		let path = data.path ? data.path : ''
		this.path = path;
		if (Api.config) {
			this.baseurl = Api.config.ip + "/" + this.path;
			this.ip = Api.config.ip;
		} else {
			this.findConfig();
		}

	}
	findConfig() {
		
		//#ifdef MP-WEIXIN
		let data = require('@/static/json/config.json');
		this.getConfigByResData(data);
		// #endif
		//#ifdef H5 
		if (!Api.config) {
			return this.requestOrg({
				url: "/static/json/config.json",
			}).then(res => {
				this.getConfigByResData(res.data);
				//console.log(Api.config);
				//console.log(res);
			}).catch(e => {
				Api.config = {};
			});
			
		} else {
			return true;
		}
		// #endif
	}
	getConfigByResData(data){
		let config;
		if (typeof(data) === "string") {
			config = uni.vue.$Tool.parse(data);
		} else {
			config = data;
		}
		Api.config = config[config.state];
		this.baseurl = Api.config.ip + "/" + this.path;
		this.ip = Api.config.ip;
		this.imgpriewurl  = this.ip+"/imgpriew/";
	}
	static config;
	static param2URL(url, data) {
		if (data) {
			url = url + "?";
			for (let key in data) {
				url = url + key + "=" + data[key] + "&";
			}
			url = url.substring(0, url.length - 1);
		}
		return url;
	}
	/**
	 * 原生请求
	 */
	requestOrg({
		method,
		url,
		data
	}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url, //仅为示例，并非真实接口地址。
				method: method,
				data,
				success: (res) => {
					resolve(res);
				},
				fail(e) {
					reject(e);
				}
			});
		});
	}

	request(data) {
		return this.requestOrg(data).then(res => {
			if (res.data.isOk) {
				return res.data.data;
			}
		});
	}
	/**
	 * get请求
	 */
	get({
		url,
		data
	}) {
		url = this.baseurl + url;
		url = Api.param2URL(url, data);
		return this.request({
			url
		});

	};

	/**
	 * post请求
	 */
	post({
		url,
		data,
		headers
	}) {
		return new Promise((resolve, reject) => {
			uni.request({
				url, //仅为示例，并非真实接口地址。
				method: "POST",
				data,
				headers: headers || {
					"Content-Type": "application/json"
				},
				timeout: 5000,
				success: (res) => {
					if (res.statusCode === 401) {
						//token失效了，转到登录界面
						redirectToLogin();
					} else if (res.data.code === 500) {
						console.log(res.data.msg);
						reject(res);
					} else {
						resolve(res);
					}
				},
				fail(e) {
					reject(e);
				}
			})
		});
	}

	/**
	 * 查找单条数据
	 */
	findDataOne({
		url,
		data
	}) {
		//debugger
		return this.get({
				url,
				data
			})
			.then(data => {
				if (data) {
					if (data instanceof Array && data.length > 0) {
						return data[data.length - 1];
					} else {
						return data;
					}
				} else {
					return undefined;
				}
			});
	};

	/**
	 * 找到总数
	 */
	findTotal(searchdata, url = "findTotal") {
		let data = {};
		if (searchdata !== undefined) {
			if (searchdata instanceof Array) {
				data.searchkey = JSON.stringify(searchdata);
			} else {
				data.searchkey = searchdata;
			}
		}
		return this.post({
			url,
			data
		});
	}
	/**
	 * 根据id查找
	 */
	findDataById(id, url = "findDataById") {
		return this.findDataOne({
			url,
			data: {
				id
			}
		});
	}
	/**
	 * 查找分页数据
	 */
	findDataPage(searchdata, pagenum, pagecount, url = "findDataPage") {
		let querydata = {};
		if (searchdata !== undefined) {
			if (searchdata instanceof Array) {
				querydata.searchkey = JSON.stringify(searchdata);
			} else {
				querydata.searchkey = searchdata;
			}
		}
		querydata.pagenum = pagenum;
		querydata.pagecount = pagecount;

		return this.post({
			url,
			data: querydata
		});
	}
	/**
	 * 查找所有数据
	 */
	findDataAll(searchdata, url = "findDataAll") {
		let querydata = {};
		if (searchdata !== undefined) {
			if (searchdata instanceof Array) {
				querydata.searchkey = JSON.stringify(searchdata);
			} else {
				querydata.searchkey = searchdata;
			}
		}
		return this.post({
			url,
			data: querydata
		});
	}
	/**修改对象
	 * @param {Object} data
	 */
	updateData(data, url = "updateData") {
		return this.post({
			url,
			data
		});
	}
	/**保存对象
	 * @param {Object} data
	 */
	saveData(data, url = "saveData") {
		return this.post({
			url,
			data
		});
	}
	/**删除对象
	 * @param {Object} data
	 */
	deleteData(data, url = "deleteData") {
		return this.post({
			url,
			data
		});
	}
}
export default Api = Api;
