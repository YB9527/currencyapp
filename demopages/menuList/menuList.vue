<template>
	<view class="matchparent menuListVue">
		<my_menu_list  
			:menuArray="menuArray"
			@menuChange="menuChange"
			:config="menuCofing">
			<template v-slot:content="{menu}">
				<view v-if="dataArray">
					<view v-for="(item,index) in dataArray" :key="index">
						{{item}}
					</view>
				</view>
			</template>
		</my_menu_list>
	</view>
</template>

<script>
	import my_menu_list from '@/components/my/my_menu_list'
	export default {
		components:{my_menu_list},
		data() {
			return {
				menuCofing:{
					scrollTop:0,
				},
				menuArray:[
					{name:"a",label:"AAAA"},
					{name:"b",label:"BBBB"},
					{name:"c",label:"CCCC"},
					{name:"d",label:"DDDD"},
					{name:"f",label:"FFFF"},
				],
				dataArray:[]
			}
		},
		created() {
			let menu = this.menuArray[0];
			this.menuChange(menu);
			
		},
		methods: {
			menuChange(menu,callback){
				//debugger
				this.$UniTool.showLoading();
				
				let dataArray = [];
				for (var i = 0; i < 100; i++) {
					dataArray.push(menu.label+i);
				}
				setTimeout(()=>{
					callback && callback(0);
					this.$Tool.arrayReplace(this.dataArray,dataArray);
					this.$UniTool.hideLoading();
				},1000)
			},
			
		}
	}
</script>

<style lang="scss">

</style>
