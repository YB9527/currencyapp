export default {
	// 权限路由 在main.js可实现路由拦截 所以路由都需要注册 待完善
	defaultAuth:true,
	auths:{
		requiresAuth:[
			{name: 'projectList',label:"项目列表",path: '/pages/programLog/projectList',},
		],
		// 非权限路由
		noAuth:[
			{name: 'login',label:"登录",path: '/pages/user/login/login'},
		],
	}
};
