<template>
	<view>
		<view>	动态组件 </view>
		<button type="primary" @click="test1">测试</button>
		<!-- #ifdef H5 -->
		<component  :is="apps" v-if="apps && show"></component>
		<!-- #endif -->
		<A ></A>
	</view>
</template>

<script>
	import A from './components/A.vue'
	
	export default {
		components:{A},
		data() {
			return {
				 apps: undefined,
				 show:true,
				post: {
					 id: 1,
					 title: 'My Journey with Vue'
				 }
			}
		},
		async beforeMount() {
			this.test1();
		   //this.apps=() => import(str);
		},
		mounted() {
			
			
		},
		methods: {
			async test1(){
				/* let array = ['components/A','components/B'];
				let res=  require(`@/${array[parseInt( Math.random()*2)]}.vue`);
				this.apps=res.default; */
			}
		}
	}
</script>

<style>

</style>
