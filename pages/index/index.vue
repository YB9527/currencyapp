<template>
	<view class="aa">
		<text class="bb">测试样式变量11</text>
		<button type="primary" @click="testSysApi">测试系统api</button>
		<view v-for="(page,index) in pageArray" 
			:key="index" 
			class="box"
			@click="goto(page)">
			<text>{{page.label}}</text>
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {
				pageArray:[
					{label:"myform测试",url:"/demopages/myformtest/myformtest"},
					{label:"动画组测试",url:"/demopages/transitionGroup/transitionGroup"},
					{label:"自定义指令",url:"/demopages/directive/directive"},
					{label:"定位",url:"/demopages/position/position"},
					{label:"store",url:"/demopages/store/store"},
					{label:"动态组件",url:"/demopages/dynamicCompontent/dynamicCompontent"},
					{label:"菜单",url:"/demopages/menuList/menuList"},
				]
			}
		},
		onLoad() {

		},
		methods: {
			goto(page){
				//debugger
				let url = page.url;
				//console.log(url)
				this.$Router.navigateTo({
					url
				})
				
			},
			async testSysApi(){
				let data =await this.$SysApi.getSystemDateTime();
				console.log("获取系统时间：",data);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.bb{
		color: $uni-color-primary;
	}
</style>
