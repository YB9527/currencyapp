<template>
	<view>
		<my_form :data="data" :moduleArray="moduleArray" @ok="ok">
			
			<template #sfzzm>
				<view>
					<view >
						<text class="title">身份证正面</text> 
						<text class="sectitle">点击预览样例</text> 
					</view>
					<view>
						
					</view>
				</view>
			</template>
			<template #sfzfm>
				<view>
					身份证反面
				</view>
			</template>
		</my_form>
	</view>
</template>

<script>
	import DicJson from '@/common/js/DicJson.js'
	import my_form from '@/components/my/my_form.vue'
	
	export default {
		components:{my_form},
		data() {
			//console.log(111,this.$Tool.mapToArray)
			return {
				data:{
					hzxm:"谢良洲",
					hzzjhm:"511027195211242418",
					txdz:"成都高新区玉成乡海鸣村1组10号",
					xb:"1",
					lxdh:"15968711521"
				},
				moduleArray:[
						{title:"个人信息",titleclass:"",class:"", array:[
							{type:"input",class:"row",labelclass:"",valueclass:"",text:"户主姓名",prop:"hzxm"},
							{type:"idcard", class:"row",labelclass:"",valueclass:"",text:"证件号码",prop:"hzzjhm"},
							{type:"input", class:"row",labelclass:"",valueclass:"",text:"通信地址",prop:"txdz"},
							{type:"datapicker", class:"row",labelclass:"",valueclass:"",text:"性别",prop:"xb",options:
								[
									{value:"aa",text:"一级",children:[
										{value:"dd",text:"1-2级",children:[{value:"ff",text:"1-3级"},]},
										{value:"hhh",text:"1-2-2级"},
										{value:"ijkh",text:"1-2-3级"},
									]},
									{value:"bb",text:"二级"},
								]
							},
							{type:"tel", class:"row",labelclass:"",valueclass:"",text:"电话",prop:"15968711521"},
						]},
					]
				}
		},
		methods: {
			ok(){
				console.log(11,this.data);
			}
		}
	}
</script>

<style lang="scss">
	.title{
		font-size: $uni-font-size-title;
		margin-right: 20rpx;
	}
	.sectitle{
		font-size: var(--fontlabel);
		color: var(--danger);
	}
</style>
