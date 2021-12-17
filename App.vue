<script>
	export default {
		onLaunch: function() {
			uni.vue = this;
		},
		onShow: function() {
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	@import  '/common/css/glob.css';
	// 导入colorUI
	@import '/static/css/colorui/main.css';
	@import '/static/css/colorui/icon.css';
	@import '/static/css/colorui/animation.css';
	// 导入阿里巴巴矢量图标库
	/*#ifdef MP*/
	@import './static/css/iconfont/iconfont.css';
	/*#endif*/
	/*#ifndef MP*/
	@import url('https://at.alicdn.com/t/font_1823374_98c45zxwb3c.css');
	/*#endif*/
	@import './static/css/reset.scss';
	@import './static/css/uni.scss';
	
	uni-button[type=primary] {
	    color: #fff;
	    background-color: $uni-color-primary;
	}
	.button-hover[type=primary]{
		background-color: $uni-color-primary-hover;
	}
</style>
