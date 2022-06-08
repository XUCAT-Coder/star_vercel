<template>
	<view class="login_content">
		<view class="top_bar">
			<view class="top_bar_left" @tap="back">
				<image src="../../static/img/back_oth.png" mode=""></image>
			</view>
			<view class="top_bar_center" @tap="back">
				修改密码
			</view>
		</view>
		<view class="login_img" @tap="testToken">
			<image src="../../static/img/login.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">
				魂谷
			</view>
			<view class="login_tip">
				您好，欢迎来到魂谷！
			</view>
			<view class="inputs">
				<input type="password" value="" placeholder="请输入原密码" class="orgpsw" v-model="form.orgpassword" />
				<input type="password" value="" placeholder="请输入现密码" class="password" v-model="form.password" />
			</view>			
		</view>
		<view class="submit" @tap="changed" v-if="canChanged">
			修改
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				form:{
					orgpassword:'',
					password:''
				},
				token:'',
				id:'',
				name:'',
			}
		},
		computed: {
			canChanged() {
				if (this.form.orgpassword.length>5&&this.form.password.length>5) {
					
					return true
				}else{
					return false
				}
			}
		},
		watch: {
			canChanged:{
				handler(newVal,oldVal){
					this.form.orgpassword&&this.form.password
					
				},
				deep:true
				
			}
		},
		methods: {
			onLoad(options){
				this.token=options.token
				this.id=options.id
				this.name=options.name
			},
			changed(){
				if(this.form.orgpassword!=''&&this.form.password!=''){
					uni.request({
						url:this.serveUrl+'/user/update',
						data:{
							id:this.id,
							psw:this.form.orgpassword,
							type:'psw',
							data:this.form.password,
							token:this.token
						},
						method:'POST',
						success:(res)=>{
							console.log(res)
							if (res.data.status==200) {
								   uni.showToast({
								       title: '修改成功',
								   	icon:'none',
								       duration: 2000
								   });
								   setTimeout(function() {
									   uni.navigateTo({
									   	url: '../login/login?name='+this.name,
									   	success: res => {},
									   	fail: () => {},
									   	complete: () => {}
									   });
								   }, 3000);
									
							}else if(res.data.status==302){
								this.form.orgpassword=''
								this.form.password=''
								uni.showToast({
								    title: '与原密码不匹配',
									icon:'none',
								    duration: 2000
								});
								
							}
							else if(res.data.status==303){
								this.form.orgpassword=''
								this.form.password=''
								uni.showToast({
								    title: '新旧密码不能相同',
									icon:'none',
								    duration: 2000
								});
								
							}
							else if(res.data.status==300){
								
								uni.showToast({
								    title: '登录过期，请重新登录',
									icon:'none',
								    duration: 2000
								});
								setTimeout(function() {
									uni.navigateTo({
										url: '../login/login?name='+this.name,
										success: res => {},
										fail: () => {},
										complete: () => {}
									});
								}, 3000);
								
								
							}
							else if(res.data.status==301){
								this.form.password=''
								uni.showToast({
								    title: '密码不能相同',
									icon:'none',
								    duration: 2000
								});
								
							}
							else if(res.data.status==500){
								uni.showToast({
								    title: '服务器内部错误~',
									icon:'none',
								    duration: 2000
								});
							}
							
						}
					})
				
				}				
			},
			//返回相关
			back(){
				uni.navigateTo({
				    url: '../userdetails/userdetails',
				});
			}
			
		}
	}
</script>

<style lang="scss">
.login_content{
		height: 100vh;
		padding-top: var(--status-bar-height);padding-bottom: $uni-spacing-col-base;
	    background: linear-gradient(91deg,#f8c390,#d279ee 50%,#a5bcff);
}
.top_bar{
		z-index: 99;
		border-bottom: 1px solid $uni-border-color;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 92rpx;
		// box-sizing: border-box;
		background: linear-gradient(91deg,#f8c390,#d279ee 70%,#a5bcff);;
		//为了兼容不同手机头部
		padding-top: var(--status-bar-height);
		box-shadow: 0 1 0 0 rgba(0,0,0,0.10);
		.top_bar_left{
			float: left;
			margin-left: 26rpx;
		    
            
			image{
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 56rpx;
				height: 56rpx;
				
				
				border-radius: 50%;
			}
		}
		.top_bar_center{
			position: absolute;
			text-align: center;
			align-items: center;
			font-family: 'FZShouJinShu-S10S';
			font-weight: 300;
			font-size: 36rpx;
			
			left: 0;
		    right: 0;
			top: 50%;
			transform: translateY(-50%);
			
			image{
				width: 128rpx;
				height: 68rpx;
				margin-top: 10rpx;
			}
		}
		
	}
.login_img{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image{
		padding-top: 200rpx;
		width: 300rpx;
		height: 280rpx;
		margin: 0 auto;
		display: inline-block;
		
	}
	
}
.main{
	margin-top: 30rpx;
	padding: 0 $uni-spacing-row-lg;
	margin-bottom: 24rpx;
	.title{
		font-size: 60rpx;
		font-weight: 500;margin-bottom: 24rpx;
		color: $uni-text-color;
		line-height: 88rpx;
		
	}
	.login_tip{
		font-size: 40rpx;
		font-weight: 400;
		color: rgba(39,40,50,0.5);
		line-height: 56rpx;
	}
	.inputs{
		
		input{
			padding-top: 40rpx;
			height: 88rpx;
			font-size: 40rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 40rpx;
			border-bottom: 1px solid rgba(0,0,0,0.6);
		}
	}
	.tips{
		padding-top: 20rpx;
		float: left;
		font-size: 40rpx;
		font-weight: 600;
		color: red;
		line-height: 56rpx;
	}
}
.submit{
	margin: 0 auto;
	margin-top: 120rpx;
	width: 420rpx;
	height: 96rpx;
	background: linear-gradient(91deg,#f1eefc,#9dc6ff 70%,#a5bcff);
	border-radius: 16rpx;
	text-align: center;
	align-items: center;
	line-height: 96rpx;
	&:active{
		background: linear-gradient(91deg,#f1eefc,#9dc6ff 95%,#a5bcff);
	}
	font-size: 64rpx;
	font-weight: 500;
}

</style>
