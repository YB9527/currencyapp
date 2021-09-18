<template>
	<view>
		<view style="background: #1CBBB4;height: 100rpx;">
			<text>Bstate：</text>
			{{bcount}}
		</view>
		<view style="background: #1CBBB4;height: 100rpx;">
			<text>state：</text>
			{{$store.state.a.count}}
		</view>
		<view style="background: #00aaff;height: 100rpx;">
			<text>getters：</text>
			{{$store.getters.count}}
		</view>
		<view style="background: #00aaff;height: 100rpx;">
			<text>countstate：</text>
			<text>{{countstate}}</text>
			
		</view>
		<view style="background: #aaffff;height: 100rpx;">
			<text>js：</text>
			{{jscount}}
		</view>
		
		<button type="primary" @click="addCount">ADD</button>
		<button type="primary" @click="getCount">get</button>
		<button type="primary" @click="dispatchCount">dispatch</button>
		<input v-model="message">
		<button type="primary" @click="lookMessage">lookMessage</button>
	</view>
</template>

<script>
	import * as testjs from './testjs.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				jscount:testjs.count,
			}
		},
		watch:{
			
		},
		/* computed: mapState({
			countstate:state=>state.count,
		}), */
		computed:{
			
			countstate(){
				return this.$store.getters.count;
			},
			bcount(){
				return this.$store.state.b.count;
			},
			 message: {
			    get () {
			      return this.$store.state.a.obj.message;
			    },
			    set (value) {
			      this.$store.commit('setMessage', value)
			    }
			  }
		},
		methods: {
			addCount(){
				this.$store.commit("addCount");
				//this.$store.commit("addOtherCount",1,2);
				
			},
			getCount(){
				let a = this.$store.getters.count2("3333");
				console.log(a);
			},
			dispatchCount(){
				this.$store.dispatch('addCount')
			},
			lookMessage(){
				console.log(this.message);
			}
		}
	}
</script>

<style>

</style>
