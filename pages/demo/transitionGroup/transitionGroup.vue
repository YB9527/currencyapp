<template>
	<view>
		<div id="list-complete-demo" class="demo">
		  <button v-on:click="shuffle">Shuffle</button>
		  <button v-on:click="add">Add</button>
		  <button v-on:click="remove">Remove</button>
		  <transition-group name="fade" mode="out-in">
		    <view
		      v-for="item in items"
		      v-bind:key="item.id"
		      class="selflistitem"
		    >
		      {{ item.id }}
		    </view>
		  </transition-group>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{id:0},{id:1},{id:2},{id:3},{id:4}],
				nextNum: 10
			}
		},
		methods: {
			randomIndex: function () {
			  return Math.floor(Math.random() * this.items.length)
			},
			add: function () {
			  this.items.splice(0, 0, {id:this.items.length*100+2})
			},
			remove: function () {
			  this.items.splice(0, 1)
			},
			shuffle: function () {
				/* for (var i = 0; i < this.items.length; i++) {
					for (var j = i; j < this.items.length-1; j++) {
						let temp= this.items[i];
						this.items.splice(j,1,temp);
					}
				} */
			}
		}
	}
</script>

<style>
	
	.fade-enter, .fade-leave-to{
	  opacity: 0;
	  transform: translateY(-30px);
	}
	.fade-leave-active {
	  position: absolute;
	}

	.fade-move {
	  transition: transform 1s;
	}
	.selflistitem {
	  transition: all 1s;
	  display: inline-block;
	  margin-right: 10px;
	  background-color: #1CBBB4;
	  width: 750rpx;
	  height: 300rpx;
	  margin-bottom: 30rpx;
	}
</style>
