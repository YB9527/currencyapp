<template>
	<!-- 测试 -->
	<view class="test1">

		<!-- 筛选栏、排序 -->
		<view>
		
		</view>
	</view>
</template>

<script>

	import child from './child.vue'
	import searchpage from '@/components/my/my_searchpage.vue'
	import list from '@/components/my/my_list.vue'
	import conditionalFilter from '@/components/my/my_conditionalFilter.vue'
	import conditionalFilterContent from '@/components/my/my_conditionalFilterContent.vue'

	
	export default{
		components:{child,searchpage,list,conditionalFilter,conditionalFilterContent},
		data(){
			return{ 
				showconditioncontent:false,
				searchdata:{
					tag:"巡查记录",//用于查找历史记录，//查找订阅
					placeholder:"被巡查人",
					showpage:false,
					showsubscribe:true,
					ok:(value)=>{
						
						console.log(value);
					},
					cancel:()=>{
						console.log("取消了");
					},
				},
				listprop:{
					dataArray:[1,2,3,4,5,6],//显示数据
					totalcount:20,
					page:0,
					pagecount:5,
					listitemclass:"listitem",
					sideslipArray:[
						{label:"编辑",class:"editbtn", click(){console.log("编辑");}},
						{id:"delete",label:"删除",class:"deletebtn", click:(dataArray,item,index)=>{
							console.log("删除")
							dataArray.splice(index,1);
							//dataArray.unshift(item);
						}},
					],
					loadNextPageData:()=>{
						let dataArray = this.listprop.dataArray;
						this.listprop.dataArray.push(...[1,2,3]);
						return false;
					},
				},
				conditionalfilterprop:{
					currentcontent:[],
					
					ordershow:false,
					showconditioncontent:false,
					click:(item,show)=>{
						this.$refs.conditionalFilter.reflushStyle();
						let conditionalfilterprop = this.conditionalfilterprop;
						conditionalfilterprop.showconditioncontent = show;
						if(show){
							this.$Tool.arrayReplaceAll(conditionalfilterprop.currentcontent,item.content);
						}
						//console.log(conditionalfilterprop.currentcontent);
					},
					dataArray:[
						{id:0,label:"重定义",have:false,show:false, 
							content:[
								{title:"建筑面积",key:"jzmj",itemarray:[
									{value:"150㎡以下",class:"",type:"button",text:"150㎡以下"},
									{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
									{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
									{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
									{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
								]},
								{title:"朝向",key:"chaoxiang",itemarray:[
									{type:"button",class:"",text:"南北"},
									{type:"button",class:"",text:"南北"},
									{type:"button",class:"",text:"南北"},
									{type:"button",class:"",text:"南北"},
									{type:"button",class:"",text:"南北"},
								]},
							]
							
						},
						{id:0,label:"价格",have:false,show:false,
							content:[
									{title:"建筑面积",key:"jzmj",itemarray:[
									{value:"50㎡以下",class:"",type:"button",text:"50㎡以下"},
									{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
									{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
									{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
									{value:"50-70㎡",class:"",type:"button",text:"50-70㎡"},
								]},          
							]},
						{id:0,label:"房型",have:false,show:false},
					]
				},
				
			
			}
		},
		computed:{
			
		},
		watch:{
			
		},
		created() {
			this.$FunctionTool.debounce("test1",this.init);
		},
		onReachBottom() {
			//滚动到底部 加载数据
			/* if(this.listprop.dataArray.length <= this.listprop.totalcount){
				setTimeout(()=>{
					
				});
			} */
		},
		methods:{
			init(){
				let array = [1,2,5,6,8,20,50,60,81];
				let index = this.binarySearch(2,array,0,array.length-1);
				//console.log(index,array[index]);
			},
			addItem(){
				let data =Math.random();
				console.log(data)
				this.listprop.dataArray.push(data);
			},
			binarySearch(target,array,lo,hi){
				if(lo > hi){
					return lo === 0?-1:-lo;
				}else{
					let mid =parseInt((lo + hi) /2);
					//console.log(lo,hi);
					if(array[mid] < target){
						//右边
						return this.binarySearch(target,array,mid+1,hi);
					}else if(array[mid] >target){
						//左边
						return this.binarySearch(target,array,lo,mid-1);
					}else{
						return mid;
					}
				}
			},
		}
	}
</script>

<style lang="scss" >
	.test1{

		::v-deep .listitem{
			padding: 0 20rpx;
			height: 300rpx;
		}
		
		
	}
	
</style>	

