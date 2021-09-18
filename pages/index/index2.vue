<template>
	<view>
		<!-- <button type="primary" @click="readIconInCss">读取图标文件</button> -->
		<view class="iconcontent">
			<view  class="item" v-for="(item,index) in iconArray" :key="index" @click="copy(item)">
			   <text :class="item" class="iconview"></text>
			   <text :selectable="true" :user-select="true">{{item}}</text>
			</view>
		</view>
		 
	</view>
</template>

<script>
	 //在需要解密的页面引用该文件

	export default {
		data() {
			return {
				iconArray:[],
			}
		},
		onShow() {
		
		},
		created() {
			this.readIconInCss();
		},
		methods: {
			
			 getPhoneNumber(e) {
				 console.log(e);
			   if (!e.target.iv) {
			     uni.showModal({
			       content: '获取手机号失败！',
			       showCancel: false
			     })
			     return;
			   }
			   uni.checkSession({
			     success: _ => {
			       bindMobileApi({
			         ivdata: e.target.iv,
			         encrypdata: e.target.encryptedData,
			       }).then(res => {
			         this.$emit('callback',true);
			         store.dispatch('getInfo', false)
			         uni.showModal({
			           content: '登录成功',
			           showCancel: false
			         })
			       }).catch(err => {
			         store.dispatch('getInfo', false)
			       })
			     },
			     fail: res => {
			       store.dispatch('getInfo', false)
			       uni.showModal({
			         content: '获取手机号失败，请再次尝试!',
			         showCancel: false
			       })
			     }
			   })
			 },
			copy(value){
				console.log(value);
				/* #ifndef H5 */		
				uni.setClipboardData({
					data:value,//要被复制的内容
					success:()=>{//复制成功的回调函数
					  uni.showToast({//提示`
						title:'复制成功'
					  })
					}
				  });
				 /* #endif */
			},
			//读取图标文件
			readIconInCss(){
				/* #ifdef H5 */
				let filePath = "/static/css/colorui/icon.css";
				let xhr = null, okStatus = document.location.protocol === 'file' ? 0 : 200
				xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')      
				xhr.open('GET', filePath, false);
				
				xhr.overrideMimeType('text/html;charset=utf-8')
				xhr.send(null)
				let  text =  xhr.status === okStatus ? xhr.responseText : null;
				let start = text.indexOf(".")+1;
				let end = text.indexOf("{",start)
				while(start !== 0 && end !== -1 ){
					let cl = text.substring(start,end);
					
					if(cl.indexOf("cuIcon") !== -1){
						if(cl.indexOf(":") !== -1){
							end = text.indexOf(":",start)
							cl = text.substring(start,end);
						}
						if(cl.length < 15){
							this.iconArray.push(cl);
						}
						
					}
					start =  text.indexOf(".",end)+1;
					end =  text.indexOf("{",start);
				}
				/* #endif */
				
				//console.log(this.iconArray)
			}
		}
	}
</script>

<style lang="scss">
	.wxicon{
		font-size: 50rpx;
		color: red;
	}
	.iconcontent{
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 30%;
			margin-bottom: 30rpx;
		}
	}
	.iconview{
		font-size: 30px;
		
	}
</style>
