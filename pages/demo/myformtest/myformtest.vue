<template>
	<view>
		<my_form :moduleArray="moduleArray">
			
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
	import Tool from '@/common/js/Tool.js'
	import my_form from '@/components/my/my_form.vue'
	
	export default {
		components:{my_form},
		data() {
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
							{type:"datapicker", class:"row",labelclass:"",valueclass:"",text:"性别",prop:"xb",options:Tool.mapToArray(DicJson.XB,"value","text")},
							{type:"tel", class:"row",labelclass:"",valueclass:"",text:"电话",prop:"15968711521"},
						]},
						
						{slot:"sfzzm"},//身份證正面
						{slot:"sfzfm"},//身份證反面
						{title:"个人信息2",  titleclass:"",class:"", array:[
							{type:"input",class:"",labelclass:"",valueclass:"",text:"户主姓名",prop:"hzxm"},
							{type:"idcard", class:"",labelclass:"",valueclass:"",text:"证件号码",prop:"hzzjhm"},
							{type:"input", class:"",labelclass:"",valueclass:"",text:"通信地址",prop:"txdz"},
							{type:"radio", class:"",labelclass:"",valueclass:"",text:"性别",prop:"xb",dic:DicJson.XB},
							{type:"tel", class:"",labelclass:"",valueclass:"",text:"电话",prop:"15968711521"},
						]},
					]
				}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.title{
		font-size: var(--fonttile);
		margin-right: 20rpx;
	}
	.sectitle{
		font-size: var(--fontlabel);
		color: var(--danger);
	}
</style>
