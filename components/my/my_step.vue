<template>
	<view class="stepvue">
		<view class="list"  :class="{horizontal:!isvertical}">
			<view  class="item" v-for="(item,index) in nodeArray" :key="index">
				<view>
					<text class="fontgray">{{item.text1}}</text>
					<view class="descrip"><text>{{item.text2}}</text></view>
					<view class="row">
						<view :class="active < index ? 'criclegray':'criclegreen'"></view>
						<view  :class="active < index+1 ? 'steplinegray':'steplinegreen'"  v-if="nodeArray.length-1 !== index"></view>
					</view>
					
				</view>
				
				<!-- <view class="right">
					<view class="descrip"><text>{{item.text2}}</text></view>
					<view><text class="fontgray">{{item.text3}}</text></view>
				</view> -->
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			isvertical:{//是否是垂直
				type:Boolean,
				default:true,
			},
			active:{
				type:Number,
				default:-1,
			},
			nodeArray:{
				type:Array,
				default:()=>{
					return [
						{"text1":"",text2:"宅基地申请",text3:"",},
						{"text1":"",text2:"村级审查",text3:"",},
						{"text1":"",text2:"乡镇审批",text3:"",},
						{"text1":"",text2:"建房监管",text3:"",},
						{"text1":"",text2:"竣工验收",text3:"",},
					]
				}
			}
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	.stepvue{
		.horizontal{
			display: flex;
			flex-wrap: wrap;
			text-align: left;
			.criclegray {
				background-color: gray;
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
			}
			.criclegreen {
				background-color: #08C182;
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				
			}
			.steplinegray{
				width: 140rpx;
				height: 20rpx;
				line-height: 40rpx;
				border-bottom: 2px solid gray;
			}
			.steplinegreen {
				width: 140rpx;
				height: 20rpx;
				line-height: 40rpx;
				border-bottom: 2px solid #08C182;
			}
		}
		
		.item {
			display: flex;
			
			.steplinegreen {
			
			}

			.fontgray {
		
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #999999;
			}
			.descrip{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #333333;
			}
		}
	}
	
	/* 最后一个调整距离 */
	.stepvue>.item:last-child>.right {
		margin-left: 10px;
	}
</style>
