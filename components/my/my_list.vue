<template>
	<!-- 列表，如果要加载下页数据必须要添加高度 -->
		<scroll-view class="listvue"  scroll-y @scrolltolower="scrolltolower" >
			<!-- 列表内容,滚动分页 -->

			<view class="list" v-if="dataArray ">
				 <transition-group name="fade" >
				   <view class="selflistitem"
					:class="{'touch-move-active':touchstateMap[index]&&touchstateMap[index].isTouchMove}"
					v-for="(item,index) in dataArray" 
					:key="item[datakey]"
					@touchstart="touchstart"
					@touchmove="touchmove" 
					:data-index='index'>
						<view class="list-count" 
						:class="[listitemclass,showsideslipArray?'list-count-btn'+(sideslipArray.length):'']"
								>
							<slot  :item="item" :index="index">
								{{item}}
							</slot>
							<view  
								class="btnitem centerboth" 
								:class="btnitem.class"
								:style="'right:'+(-(j+1)*65)+'px'"
								v-for="(btnitem,j) in sideslipArray" 
								:key="btnitem.label"
								@click.stop="btnClick(btnitem,dataArray,item,index)">
								<text>{{btnitem.label}}</text>
							</view>
						</view>
				   </view>
			   </transition-group>
			</view>
			<view class="loadover" v-if="isloadover && showisloadover">
				<!-- 数据加载完语句 --> 
				<slot name="loadover">
					<text class="label">
						--没有更多数据了--
					</text>
				</slot>
			</view>
		</scroll-view>
</template>

<script>

	export default{
		props:{
			showisloadover:{
				type:Boolean,
				default:true
			},
			
			datakey:{
				type:String,
				default:"id"
			},
			dataArray:Array,//显示数据
			listitemclass:String,
			totalcount:{
				type:Number,
				default:0,//数据数量
			},
			showsideslipArray:Boolean,
			sideslipArray:{
				type:Array,
				default:function(){
					return [
						{label:"编辑",class:"editbtn", click(){console.log("编辑")}},
						{id:"delete",label:"删除",class:"deletebtn", click(){console.log("删除")}},
					]
				}
			},
			loadNextPageData:Function,//加载下页数据,如果返回false，那么就是加载完成数据了
		},
		data(){
			let touchstateMap= {};
			for (let i = 0; i < this.totalcount; i++) {
				touchstateMap[i+""] = {isTouchMove:false};
			}
			return{
				 user:{
					"lastName":"bar",
					"firstName":"foo"
				},
				startX: 0, //开始坐标
				startY: 0,
				touchstateMap,
				isloadover:false,
			}
		},
		computed:{
			
		},
		watch:{
			"dataArray.length"(){
				this.checkLoadOver();
			}
		},
		created() {
			this.checkLoadOver();
		},
		methods:{
			checkLoadOver(){
				if(this.totalcount !== undefined && this.dataArray.length === this.totalcount){
					this.isloadover = true;
				}else{
					this.isloadover = false;
				}
				
			},
			delThis(item,index){
				console.log("删除",item);
				this.$emit('delBtn',item,index)
			},
			touchstart(e) {
				let touchstateMap = this.touchstateMap;
				var index = e.currentTarget.dataset.index; //当前索引
				//console.log(index);
				
				//开始触摸时 重置所有删除
				this.startX = e.changedTouches[0].clientX;
				this.startY = e.changedTouches[0].clientY;
				this.$emit('touchEv',index);
			},
			//滑动事件处理
			touchmove(e) {
				this.clearSlide();
				let touchstateMap = this.touchstateMap;
				//console.log(2)
				var index = e.currentTarget.dataset.index, //当前索引
					startX = this.startX, //开始X坐标
					startY = this.startY, //开始Y坐标
					touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
					touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
					//获取滑动角度
					angle = this.angle({
						X: startX,
						Y: startY
					}, {
						X: touchMoveX,
						Y: touchMoveY,
					});
				for(let key in touchstateMap){
					let v = touchstateMap[key];
					//滑动超过30度角 return
					
					if (Math.abs(angle) > 30) return;
					if (key == index) {
						if (touchMoveX > startX) //右滑
							v.isTouchMove = false
						else //左滑
							v.isTouchMove = true
					}
				}
				//console.log(touchstateMap);
				//更新数据
				//this.$emit('touchEv',listData);
			},
			angle(start, end) {
				let _X = end.X - start.X,
					_Y = end.Y - start.Y
				//返回角度 /Math.atan()返回数字的反正切值
				return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
			},
			clearSlide(){
				let touchstateMap = this.touchstateMap;
				for(let key in touchstateMap){
					//清空以前滑动
					if (touchstateMap[key].isTouchMove){
						touchstateMap[key].isTouchMove = false;
					}
					
				}
			},
			btnClick(btnitem,dataArray,item,index){
				if(btnitem.id === "delete"){
					this.clearSlide();
				}
				btnitem.click && btnitem.click(dataArray,item,index);
			},
			async scrolltolower(){
				if(!this.isloadover && this.loadNextPageData){
					let flag =  await  this.loadNextPageData();
					if(!flag){
						this.isloadover = true;
					}else if(this.totalcount !== undefined && this.dataArray.length === this.totalcount){
						this.isloadover = true;
					}
				}
				//console.log("滚到底部了")
			},
		}
	}
</script>

<style lang="scss" >
	.listvue{
		height: 100%;
		width: 100%;
		 //background-color: #1AAD19;
		.loadover{
			text-align: center;
			line-height: 120rpx;
			.label{
				color: #999999;
			}
			
		}
		
		.selflistitem{
			font-size: 28rpx;
			width: 100%;
			height: 100%;
			overflow: hidden;
			.title{
				font-size: 32rpx;
				color: #333;
			}
			.label{
				color: #999999;
			}
			.value{
				color: #333;
			}
		}
		.list-box .count{
			font-size: 32rpx;
		}
		
		.list-count {
			width: 100%;
			position: relative;
			-webkit-transition: all 0.4s;
			transition: all 0.4s;
		}
		.list-count-btn1{
			-webkit-transform:translateX(130rpx);
			transform: translateX(130rpx);
			margin-left: -130rpx;
		}
		
		.list-count-btn2{
			-webkit-transform:translateX(250rpx);
			transform: translateX(250rpx);
			margin-left: -250rpx;
		}
		.list-count-btn3{
			-webkit-transform:translateX(370rpx);
			transform: translateX(370rpx);
			margin-left: -370rpx;
		}
		.list-count-btn4{
			-webkit-transform:translateX(430rpx);
			transform: translateX(430rpx);
			margin-left: -430rpx;
		}
		.btnitem {
			display: flex;
			position: absolute;
			right: -130rpx;
			top: 0;
			width: 120rpx;
			height: 100%;
			text-align: center;
			background: none;
			color: #3F68B2;
			font-size: 30rpx;
			z-index: 99;
			color: #FFFFFF;
			/* -webkit-transition: all 0.4s;
			transition: all 0.4s;
			-webkit-transform: translateX(70px);
			transform: translateX(70px); */
			text{
				margin: auto auto;
			}
		}
		.editbtn{
			background-color: #1AAD19;
		}
		.deletebtn{
			background-color: #DD524D;
		}
		.btnitem .iconfont{
			font-size: 40rpx;
			
		}
		.del-icon{
			
		}
		
		.touch-move-active .list-count,
		.touch-move-active .btnitem {
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
		
		.touch-move-active .dleBtn {
			//right: -180rpx;
		}
		.btnitem image{
			width: 51rpx;
			height: 55rpx;
			
		}
		
		/* start 移除，添加条目 */

		
		.fade-item {
		  display: inline-block;
		  margin-right: 10px;
		}
		.fade-enter-active, .fade-leave-active {
		  transition: all .5s;
		}

		.fade-level{
			opacity: 1;
		}
		.fade-leave-to {
		  opacity: 0.2;
		  transform: translateY(-100rpx);
		}
		
		.fade-enter{
			opacity: 0.2;
			transform: translateY(-200rpx);
		}
		.fade-enter-to {
		  opacity: 1;
		}
		.fade-move {
		  transition: transform 1s;
		}
	}
</style>
