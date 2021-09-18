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
			<view v-if="!module.slot" class="title" :class="module.titleclass" ><text> {{module.title}}</text></view>
			<view v-if="!module.slot" class="modulecontent" :class="module.modulecontentclass">
				
				<view v-for="(row,j) in module.array"  v-if="!(row.show === false)">
					<slot v-if="row.type === 'slot' "  :data="data" :modulerow="row"></slot>
					<view v-else :class="row.class" >
						<view class="label" ><text> {{row.text}} </text></view>
						<view class="value">
							<input
								@blur="childCheck(row)"
								v-if="row.type === 'input'" type="text"  v-model="data[row.prop]"   :placeholder="row.placeholder"/>
							<input
								@blur="childCheck(row)"
								v-if="row.type === 'number'" type="number"  v-model="data[row.prop]"   :placeholder="row.placeholder"/>
							<input
								@blur="childCheck(row)"
								v-else-if="row.type === 'idcard'" type="idcard"    v-model="data[row.prop]"  :placeholder="row.placeholder"/>
							<input
								@blur="childCheck(row)"
								v-else-if="row.type === 'tel'"  type="tel"  v-model="data[row.prop]"  :placeholder="row.placeholder" />
							<input
								@blur="childCheck(row)"
								v-else-if="row.type === 'digit'"  type="digit"  v-model="data[row.prop]"  :placeholder="row.placeholder" />
							<view 
								@blur="childCheck(row)"
								v-else-if="row.type === 'textarea'" >
								  <textarea  
									@blur="childCheck(row)"
									:disabled="row.disabled"
								    v-model="data[row.prop]" 
								    :placeholder="row.placeholder"/>
							</view>
							<radio-group   v-else-if="row.type === 'radio'" @change="radioChange($event,data,row.prop,row)">
								<label class="gender-item" v-for="(radio,j) in row.options" :key=j>
									<radio :checked="data[row.prop] == radio.key" class="gender-item-radio"  :value="radio.key" />
									<text class="gender-item-text">{{radio.value}}</text>
								</label>
							</radio-group>
							<uni-datetime-picker
								v-else-if="row.type === 'date'"
								class="datepicker"
								:disabled="row.disabled"
								type="date" v-model="data[row.prop]">
							</uni-datetime-picker>
							<uni-data-picker 
								:isshow="true"
								v-else-if="row.type === 'datapicker'"
								:placeholder="row.placeholder" 
								v-model="data[row.prop]"
								:popup-title="row.placeholder" 
								:localdata="row.options"
								:step-searh="true" self-field="code" parent-field="parent_code"
								@change="onchange" 
								@nodeclick="onNodeClick($event,data,row.prop,row)">
							</uni-data-picker>
						</view>
					</view>
					<view :class="row.class" class="error" v-if="row.error">
						<view class="label"></view>
						<view class="value">
							<text>*{{row.error}}</text>
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
	export default{
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
			haveback:{
				type:Boolean,
				default:true,
			},
			backtext:{
				type:String,
				default:"返回"
			},
			backClick:Function,
					
			haveok:{
				type:Boolean,
				default:true,
			},
			oktext:{
				type:String,
				default:"确定"
			},
			okClick:Function,
		},
		data(){
			return{
			}
		},
		computed:{
			
		},
		watch:{
			
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
				this.childCheck(row);
			},
			back(){
				this.clearClick && this.clearClick();
			},
			ok(){
				this.okClick && this.okClick();
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
					for(let item of module.array){
						if(item.show === false){
							continue;
						}
						let error = this.childCheck(item);
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
			childCheck(item){
				let data = this.data;
				
				let error="";
				if(item.check && item.prop){
					if(item.check instanceof Array){
						error  = item.check[0](this.data[item.prop],item.check[1]);
					}else{
						error  = item.check(this.data[item.prop]);
					}
				}
				item.error = error;
				return error;
			}
		}
	}
</script>

<style lang="scss" >
	.my_formvue{
		.title{
			font-size:  var(--fonttitle); 
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
			color: var(--danger);
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
				background-color: var(--primary);
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
