
/**
 * 根据key 获取 strongdata
 * @param {Object} key
 */
export var getStorageData = function (key) {
	return new Promise((resole,reject)=>{
		uni.getStorage({
				key,
				success:  (storage)=> {
					resole(storage.data);
				},fail(e) {
					resole(undefined);
				}
			});
	});
 
};


/**
 * 设置 strong
 * @param {Object} key
 * @param {Object} data
 */
export var setStorageData = function(key,data){
	uni.setStorage({
	    key,
	    data
	});
}


/**
 * 弹出确定按钮
 * @param {Object} tip
 */
export var showModalTip = function(tip,data={showCancel:false}){
	return new Promise((resole,reject)=>{
		uni.showModal({
			content:tip,
			showCancel:data.showCancel,
			success(){
				resole(true);
			}
		});
	})
}

export var showMoal = function(content,data={}){
	return new Promise((resole,reject)=>{
		uni.showModal({
			title:data.title?data.title:"提示",
			content:content,
			showCancel:data.showCancel,
			 success: function (res) {
			        if (res.confirm) {
			            resole(true);
			        } else if (res.cancel) {
			            resole(false);
			        }
			    }
		});
	})
}


export var showToast = function(title,data={icon:"none"}){
	 uni.showToast({
	 	title,
		icon:data.icon
	 })
 }
 
var isShowLoading = false;


/**
 * 显示loading
 */
export var showLoading = function(title="请稍等...",showcover=true){
	
	
	if(showcover || !isShowLoading){
		uni.showLoading({
			title,
		})
		isShowLoading = true;
	}
	
}
/**
 * 隐藏loading
 */
export var hideLoading = function(){
	uni.hideLoading();
	isShowLoading = false;
}



/**
 * 预览对象里面的图片
 */
export var previewImageInDataArray = function(index,dataArray,key="url"){
	if(dataArray){
		let urls = [];
		dataArray.forEach(data=>{
			urls.push(data[key]);
		});
		previewImage(urls[0],urls);
	}
}


/**
 * 预览图片
 * @param {Object} url
 * @param {Object} urlArray
 */
export var previewImage = function(url,urlArray){
	uni.previewImage({current:url,urls:urlArray});
}


/**
 * 选择文件上传
 */
export var chooseFile = function(data = {extension:['.zip','.rar'],count:1}){
	return new Promise((resole,reject)=>{
		// #ifdef H5
		uni.chooseFile({
		  count: data.count, //默认100
		  extension:data.extension,
			success: function (res) {
				let tempFiles = res.tempFiles;
				resole(tempFiles);
			},
			fail(e) {
				reject(e);
			},
			
		});
		// #endif
	})
}


export var downloadFile = function(url){
	window.open(url);
	return;
	return new Promise((resolve,reject)=>{
		uni.downloadFile({
			url: url, //仅为示例，并非真实的资源
			success: (res) => {
				if (res.statusCode === 200) {
					console.log('下载成功');
					resolve(true);
				}else{
					reject(res);
				}
			},
			fail:(e)=> {
				console.log(e);
				showModalTip("资源链接失败");
				reject(e);
			}
		});
	});
	
}

