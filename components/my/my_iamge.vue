<template>
	<!-- 模板 -->
	<view class="myIamge matchparent" >
		<image
			@click="click"
			v-if="!loaderror && src"
			mode="aspectFill"
			:src="src" 	
			@error="error"></image>
		<image
			v-else-if="losturl"
			mode="aspectFill"
			:src="losturl" 	
			></image>
		<view v-else class="error">
			<slot name="error">
				<text>{{errortext}}</text>
			</slot>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			src:String,
			model:String,
			losturl:String,
			errortext:{
				type:String,
				default:"加载失败"
			}
		},
		data(){
			return{
				loaderror:false,
			}
		},
		computed:{
			
		},
		watch:{
			
		},
		created() {
			
		},
		methods:{
			error(){
				this.loaderror = true
			},
			click(){
				
				this.$emit("click");
			}
		}
	}
</script>

<style lang="scss" >
	.myIamge{
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 100%;
			height: 100%;
		}
		.error{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			color: #c0c4cc;
			vertical-align: middle;
			background: #f5f7fa;
		}
	}
</style>
