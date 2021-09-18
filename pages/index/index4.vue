<template>
	<view class="">
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
					{label:"myform测试",url:"/pages/demo/myformtest/myformtest"},
					{label:"动画组测试",url:"/pages/demo/transitionGroup/transitionGroup"},
					{label:"自定义指令",url:"/pages/demo/directive/directive"},
					{label:"定位",url:"/pages/demo/position/position"},
					{label:"store",url:"/pages/demo/store/store"},
					{label:"动态组件",url:"/pages/demo/dynamicCompontent/dynamicCompontent"},
				]
			}
		},
		onLoad() {

		},
		methods: {
			goto(page){
				let url = page.url;
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>
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
</style>
