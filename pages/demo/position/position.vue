<template>
	<view class="main ">
		<view class="relative">
			relative
			
			
		</view>
		<view class="absolute">
			absolute
		</view>
		<view class="fixed">
			fixed
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.main{
		background: #aaffff;
		height: 500px;
	}
	.relative{
		background: #1CBBB4;
		height: 50px;
		width: 50px;
		position: relative;
		top: 100px;
		left: 50px;
	}
	.absolute{
		background: #ffaa7f;
		height: 50px;
		width: 50px;
		position: absolute;
		position: fixed;
		bottom: 20px;
	}
	.fixed{
		background: #aaaa00;
		height: 50px;
		width: 50px;
		position: fixed;
		bottom: 100px;
	}
	
</style>
