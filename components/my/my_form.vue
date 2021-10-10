<template>
	<!-- 模板 -->
	<!-- 模块标题、键值对关系、编辑、修改、显示、隐藏、数据格式化 -->
	<!--text，input，textarea， checkbox、 radio、单个date，date范围、button，文件上传预览，下载 -->
	<!-- 表单校验 -->
	<view class="my_formvue">
		<!-- {{moduleArray[1].array[5]}} -->
		<view  
			v-for="(module,index) in moduleArray"
			v-if="module.show !== false"
			:key="index"
			class="module"
			:class="module.class">
			
			<slot v-if="module.slot" ></slot>
			<view class="modulecontent">
				<view v-if="!module.slot" class="title titletag" :class="module.titleclass" ><text> {{module.title}}</text></view>
				<view v-if="!module.slot"  :class="module.modulecontentclass">
					
					
					<view v-for="(column,j) in module.array"  v-if="!(column.show === false)">
						<slot v-if="column.type === 'slot' "  :data="data" :modulerow="column"></slot>
						<view v-else :class="column.class" >
							<view class="label" ><text> {{column.text}} </text></view>
							<view class="value">
								<text v-if="column.type === 'text'" >{{data[column.prop] | textfileter(column.optionmap)}}</text>
								<input
									@blur="childCheck(column)"
									v-if="column.type === 'input'" type="text"  v-model="data[column.prop]"   :placeholder="column.placeholder"/>
								<input
									@blur="childCheck(column)"
									v-if="column.type === 'number'" type="number"  v-model="data[column.prop]"   :placeholder="column.placeholder"/>
								<input
									@blur="childCheck(column)"
									v-else-if="column.type === 'idcard'" type="idcard"    v-model="data[column.prop]"  :placeholder="column.placeholder"/>
								<input
									@blur="childCheck(column)"
									v-else-if="column.type === 'tel'"  type="tel"  v-model="data[column.prop]"  :placeholder="column.placeholder" />
								<input
									@blur="childCheck(column)"
									v-else-if="column.type === 'digit'"  type="digit"  v-model="data[column.prop]"  :placeholder="column.placeholder" />
								<view 
									@blur="childCheck(column)"
									v-else-if="column.type === 'textarea'" >
									  <textarea  
										@blur="childCheck(column)"
										:disabled="column.disabled"
									    v-model="data[column.prop]" 
									    :placeholder="column.placeholder"/>
								</view>
								<radio-group   v-else-if="column.type === 'radio'" @change="radioChange($event,data,column.prop,column)">
									<label class="gender-item" v-for="(radio,j) in column.options" :key=j>
										<radio :checked="data[column.prop] == radio.key" class="gender-item-radio"  :value="radio.key" />
										<text class="gender-item-text">{{radio.value}}</text>
									</label>
								</radio-group>
								<uni-datetime-picker
									v-else-if="column.type === 'date'"
									class="datepicker"
									:disabled="column.disabled"
									type="date" v-model="data[column.prop]">
								</uni-datetime-picker>
								<uni-data-picker 
									:isshow="true"
									v-else-if="column.type === 'datapicker' 
										|| column.type === 'cascader' 
										|| column.type === 'select'"
									:placeholder="column.placeholder" 
									v-model="data[column.prop]"
									:popup-title="column.placeholder" 
									:localdata="column.options"
									:step-searh="true" self-field="code" parent-field="parent_code"
									@change="onchange" 
									@nodeclick="onNodeClick($event,data,column.prop,column)">
								</uni-data-picker>
								<div v-else-if="column.type === 'fj'">
									<!-- <webUploadFile :elupload="column.upload" :idname="column.name"></webUploadFile> -->
									<myUploadFile  :uploadAttr="column.upload" ></myUploadFile>
								</div>
							</view>
						</view>
						<view :class="column.class" class="error" v-if="column.error">
							<view class="label"></view>
							<view class="value">
								<text>*{{column.error}}</text>
							</view>
							
						</view>
					</view>
				</view>
						
			</view>
			
		</view>
	`	<view class="subgroup aroundrow" v-if="haveback || haveok">
			<view class="cancerbtn  itemchild" v-if="haveback"  @click="back">
				 <text  class="button label">
					{{backtext}}
				 </text>
			</view>
			<view class="okbtn itemchild"  v-if="haveok"  @click="ok()">
				 <text  class="button label">
					{{oktext}}
				 </text>
			</view>
		</view>
	</view>
</template>

<script>
	import DicJson from '@/common/js/DicJson.js'
	import Tool from '@/common/js/Tool.js'
	import myUploadFile from './my-uploadFile'
	export default{
		components:{myUploadFile},
		props:{
			
			data:{
				type:Object,
				default:function(){
					return {
						hzxm:"谢良洲",
						hzzjhm:"511027195211242418",
						txdz:"成都高新区玉成乡海鸣村1组10号",
						xb:"1",
						lxdh:"15968711521"
					}
				}
			},
			moduleArray:{
				type:Array,
				default:function(){
					return [
						{title:"个人信息",titleclass:"",class:"", array:[
							{type:"input",class:"row",labelclass:"",valueclass:"",text:"户主姓名",prop:"hzxm"},
							{type:"idcard", class:"row",labelclass:"",valueclass:"",text:"证件号码",prop:"hzzjhm"},
							{type:"input", class:"row",labelclass:"",valueclass:"",text:"通信地址",prop:"txdz"},
							// {type:"datapicker", class:"row",labelclass:"",valueclass:"",text:"性别",prop:"xb",options:Tool.mapToArray(DicJson.XB,"value","text")},
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
			haveback:{
				type:Boolean,
				default:true,
			},
			backtext:{
				type:String,
				default:"返回"
			},
			
			haveok:{
				type:Boolean,
				default:true,
			},
			oktext:{
				type:String,
				default:"确定"
			},
			
		},
		data(){
			return{
			}
		},
		computed:{
			
		},
		watch:{
			
		},
		filters:{
			textfileter(text,optionmap,column){
		
				if(optionmap && optionmap[text]){
		
					return optionmap[text]
				}
				return text;
			}
		},
		created() {
			//console.log(DicJson)
			//console.log(this.$DicJson.XB)

		},
		methods:{
			init(){

			},
			radioChange(e,data,prop,row) {
				 data[prop] = e.target.value
				 this.childCheck(row);
			},
			onNodeClick(node,data,prop,row){
				data[prop] = node.value;
				console.log(data);
				//console.log(data[prop],node,row);
				this.childCheck(row);
			},
			back(){
				this.$emit("back");
				
			},
			ok(){
				this.$emit("ok");

			},
			onchange(e) {
				const value = e.detail.value
			},
			check(){
				let flag = true;
				for (let module of this.moduleArray) {
					if(module.show === false){
						continue;
					}
					for(let column of module.array){
						if(column.show === false){
							continue;
						}
						let error = this.childCheck(column);
						if(error){
							flag = false;
						}
					}
				}
				if(!flag){
					return false;
				}else{
					return true;
				}
			},
			childCheck(column){
				let data = this.data;
				
				let error="";
				if(column.check && column.prop){
					if(column.check instanceof Array){
						error  = column.check[0](this.data[column.prop],column.check[1]);
					}else{
						error  = column.check(this.data[column.prop]);
					}
				}
				column.error = error;
				return error;
			}
		}
	}
</script>

<style lang="scss" >
	.my_formvue{
		.title{
			font-size:  $uni-font-size-title; 
		}
		.titletag{
			border-left: 12rpx solid $uni-color-title;
			padding-left: 20rpx;
		}
		.row{
			display: flex;
			align-items: center;
			height: 100rpx;
			.value{
				width: 550rpx;
			}
		}
		.label{
			min-width: 220rpx;
			font-size:  var(--fontlabel);
		}
		.error{
			margin-top: -20rpx;
			height: 50rpx;
			color: $uni-color-error;
		}
		.value{
			
		}
		.uni-data-tree-input{
			::v--deep .input-value-border {
			    border: 0px solid #e5e5e5!important;
			    border-radius: 5px;
			}
		}
		uni-radio-group{
			display: flex;
			justify-content: space-between;
			.gender-item-radio{
				margin-right: 10rpx;
			}
		}
		.module{
			margin-bottom: 20rpx;
		}
		.modulecontent{
			padding: 10px;
			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
			background: #FFFFFF;
		}
	
		input{
			border-bottom: solid 2px #F1F1F1;
		}
		.subgroup{
			display: flex;
			justify-content: space-around;
			button{
				width: 46%;
			}
		}
		.subgroup{
			height: 100rpx;
			align-items: center;
			text-align: center;
			position: relative;
			letter-spacing: 8rpx;
			.cancerbtn{
				width: calc(50% - 40px);
				height: 60rpx;
				line-height: 60rpx;
				background-color: #FFFFFF;
			}
			.okbtn{
				width: calc(50% - 40px);
				height: 60rpx;
				line-height: 60rpx;
				background-color: $uni-color-primary;
				//background-color: #FFAA7F;
				.label{
					color: #FFFFFF;
				}
			}
		}
		.aroundrow{
			display: flex;
			justify-content: space-around;
			
		}
		
	}
	textarea{
		border: solid 2px #F1F1F1;
		width: 100%;
		
	}
	.uni-textarea-placeholder{
		font-size: 26rpx;
		color: #dc9f9f;
	}

	.wraprow{
		.value{
			width: 100%;
		}
		
		
		
	}
</style>
