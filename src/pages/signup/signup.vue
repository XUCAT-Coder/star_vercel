<template>
	<view class="login_content">
		<view class="top_bar">
			<view class="top_bar_left">
				<image src="../../static/img/back.png" mode="" @tap="toLogin()
				"></image>
			</view>
		</view>
		<view class="register_img">
			<image src="../../static/img/register.png" mode=""></image>
		</view>
		<view class="main">
			<view class="title">
				注册
			</view>
			<view class="login_tip">
				您好，欢迎来到星辰！
			</view>
			<view class="inputs">
				<view class="inputs_lists">
					<input type="text" value="" placeholder="请输入用户名" class="user" @blur="checkUser" />
					<view class="employ" v-if="isHasUser">
						已占用
					</view>
					<view  v-if="user_warning">
						<image src="../../static/img/warning.png" mode="" class="right" v-if="!canUseUser"></image>
					</view>
					<view  v-if="!user_warning">
						<image src="../../static/img/light.png" mode="" class="right" v-if="!canUseUser"></image>
						<image src="../../static/img/lights.png" mode="" class="right" v-if="canUseUser"></image>
					</view>
					
				</view>
				<view class="inputs_lists">
					<input type="text" value="" placeholder="请输入邮箱" class="email" @blur="isEmail"/>
					<view class="employ exists" v-if="isHasEmail">
						已存在
					</view>
					<view class="invalid" v-if="emailInvalid">
						！邮箱无效
					</view>
					<view class="invalid" v-if="emailTip">
						！请填写邮箱
					</view>
					<view v-if="email_warning">
						<image src="../../static/img/warning.png" mode="" class="right" v-if="!canUseEmail"></image>
					</view>
					<view v-if="!email_warning">
						<image src="../../static/img/light.png" mode="" class="right" v-if="!canUseEmail"></image>
						<image src="../../static/img/lights.png" mode="" class="right" v-if="canUseEmail"></image>
					</view>
					
				</view>
				<view class="inputs_lists">
					<input :type="type_1"  placeholder="请输入密码" class="password" @blur="getPwd_1" />
					<input :type="type_2"   placeholder="请再次输入密码" class="password"  @input="getPwd_2"/>
					<view class="invalid" v-if="passInvalid">
						！密码格式错误
					</view>
					<image src="../../static/img/look.png" mode="" class="look" v-if="isCanLook" @tap="looks"></image>
					<image src="../../static/img/unlook.png" mode="" class="look" v-if="!isCanLook" @tap="looks"></image>
					<view v-if="password_warning">
						<image src="../../static/img/warning.png" mode="" class="right" v-if="!canUsePassword"></image>
					</view>
					<view v-if="!password_warning">
						<image src="../../static/img/light.png" mode="" class="right" v-if="!canUsePassword"></image>
						<image src="../../static/img/lights.png" mode="" class="right" v-if="canUsePassword"></image>
					</view>
					
					<view class="warnning" v-if="!fit">
						！两次输入的密码不一致
					</view>
				</view>
	
				
			</view>
			<transition  name="xwl2">
				<view class="tips" v-if="flag">
					！用户名,密码,或邮箱不能为空
				</view>
			</transition>
			
		</view>
		<transition name="xwl">
			<view :class="[{submit:isFill}]" @tap="submit" v-show="isShowSubmit">
				注册
			</view>
		</transition>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type_1:'password',
				type_2:'password',
				
				form:{
					user:'',
					password:'',
					email:''
				},
				
				flag:false,//用于登录校验
				
				
				isHasUser:false,//用户名是否被占用;''
				canUseUser:false,//是否能使用用户名的指示灯
				user_warning:false,//用户警告和正常指示灯的切换
				
				passwordBat:'',//再次输入的密码
				fit:false,//两次输入密码是否一致
				password_warning:false,//密码警告和正常指示灯的切换
				canUsePassword:false,//密码是否可用
				passInvalid:false,//密码格式是否正确
				isCanLook:false,//密码是否可见
				
				canUseEmail:false,//是否能使用邮箱的指示灯
				isHasEmail:false,//邮箱是否已经存在
				emailInvalid:false,//判断邮箱是否有效
				emailTip:false,//填写邮箱提示
				email_warning:false,//邮箱警告和正常指示灯的切换
		        
				isChange:false//是否让按钮变灰色
				
				
				
			}
		},
		computed:{
			//表单是否全部填写
			isFill:function(){
				//判断各项输入是否为空
				if(!this.flag){
					if(this.form.user==''||this.form.password==''||this.form.email==''){
						this.flag=true
					}
				}
				//单针对密码是否匹配
				if(this.form.password.length>5){
				    this.passInvalid=false
					this.flag=false
					this.fit=(this.form.password===this.passwordBat)
					if (this.fit) {
						this.canUsePassword==true
					}else{
						this.canUsePassword==false
					}
					if(!this.fit){
						this.password_warning=true
					}else{
						this.canUsePassword=true
						this.password_warning=false
					}
				}else if(this.form.password.length==0&&this.passwordBat.length==0){
					this.passInvalid=false
					this.password_warning=false
					this.canUsePassword=false
				}else{
					this.passInvalid=true
				}
				
				
				//全项符合
				return (this.canUseUser&&this.canUseEmail&&this.fit&&(!this.flag)&&this.form.user.length>0)
				
			},
			//是否显示注册按钮
			isShowSubmit:function(){
				this.isChange=this.isFill
				return this.isFill
			}
		},
		watch:{
			isFill:{
				handler(newVal,oldVal){
					this.form.password
				},
				deep:true
				
			}
		},
		methods: {
			//验证相关
			checkUser(e){
				this.form.user=e.detail.value
				if (this.form.user.length>0) {
					uni.request({
						url:this.serveUrl+'/signup/judge',
						data:{
							data:this.form.user,
							type:'name'
						},
						method:'POST',
						success:(res)=>{
							console.log(res)
							if (res.data.status==200) {
								//用户名已存在
								if (res.data.result>0) {
									this.isHasUser=true
									this.canUseUser=false
									this.user_warning=true
								}else{
									//用户名不存在
									this.isHasUser=false
									this.canUseUser=true
									this.user_warning=false
								}
							}else if(res.data.status==500){
								uni.showToast({
								    title: '服务器内部错误',
									icon:'none',
								    duration: 2000
								});
							}
						}
					})
				}
			},
			getPwd_1(e){
				this.form.password=e.detail.value
			},
			getPwd_2(e){
				this.passwordBat=e.detail.value
			},
			//提交相关
			submit(){
				//判断各项输入是否为空
				if(this.isFill){
					
				}
				//测试
				uni.request({
					url:this.serveUrl+'/signup/add',
					data:{
						name:this.form.user,
						mail:this.form.email,
						psw:this.form.password
					},
					method:'POST',
					success:(res)=>{
						console.log(res)
						if (res.data.status==200) {
							//向用户邮箱发送问候
							console.log('这儿进来了')
							uni.request({
							    url: this.serveUrl+'/mail', 
							    data: {
							        mail:this.form.email
							    },
								method:'POST',
							    success: (res2) => {
							       console.log(res2)
								   uni.navigateTo({
								   	url: '../login/login?user='+this.form.user,
								   	success: res => {},
								   	fail: () => {
								   		
								   	},
								   	complete: () => {}
								   });
								   if (res2.data.status==200) {
									   //跳转到登录页
								   	
								   }
							    }
							});
							
						}else if(res.data.status==500){
								uni.showToast({
								    title: '服务器内部错误',
									icon:none,
								    duration: 2000
								});
						}
					}
				})
				
			},
			
			//密码相关
			looks(){
				if(this.isCanLook){
					this.type_1='password'
					this.type_2='password'
				}else{
					this.type_1='text'
					this.type_2='text'
				}
				this.isCanLook=!this.isCanLook
			},
			//邮箱相关
			isEmail(e){
				this.form.email=e.detail.value
				if (this.form.email.length>0) {
					console.log(this.form.email)
					let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
					if(this.form.email.length==0){
						this.emailTip=true
						this.email_warning=true
						this.emailInvalid=false
					}else if(this.form.email.length>0){
						if(reg.test(this.form.email)){
							//验证邮箱是否存在
							uni.request({
								url:this.serveUrl+'/signup/judge',
								data:{
									data:this.form.email,
									type:'email'
								},
								method:'POST',
								success:(res)=>{
									console.log(res)
									if (res.data.status==200) {
										//邮箱已存在
										if (res.data.result>0) {
											this.isHasEmail=true
											this.canUseEmail=false
											this.email_warning=true
										}else{
											//邮箱不存在
											this.isHasEmail=false
											this.canUseEmail=true
											this.email_warning=false
										}
									}else if(res.data.status==500){
										uni.showToast({
										    title: '服务器内部错误',
											icon:none,
										    duration: 2000
										});
									}
								}
							})
							this.canUseEmail=true
							this.email_warning=false
							this.emailInvalid=false
							this.emailTip=false
							return ;
						}else{
							this.canUseEmail=false
							this.emailInvalid=true
							this.email_warning=true
							this.emailTip=false
						}
					}
					
				}
			
				
			},
			//跳转相关
			toLogin(){
				uni.navigateBack({
				    delta: 1,
				    animationType: 'pop-out',
				    animationDuration: 300
				})
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
		// background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, #e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25, #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);
		
		// padding-left: $uni-spacing-col-base;
		//为了兼容不同手机头部
		padding-top: var(--status-bar-height);
		box-shadow: 0 1 0 0 rgba(0,0,0,0.10);
		.top_bar_left{
			float: left;
			margin-left: 26rpx;
		
            
			image{
				box-shadow: 0 2px 2px rgba(10,16,20,.24),0 0 2px rgba(10,16,20,.12);
				transform: scaleX(1.5);
				width: 68rpx;
				height: 68rpx;
				margin-top: 10rpx;
				
				border-radius: 16rpx;
			}
		}
		
		.top_bar_right{
			float: right;
			.login{
				font-family: 'FZShouJinShu-S10S';
				font-weight: 600;
				align-items: center;
				text-align: center;
				font-size: 40rpx;
				width: 100rpx;
				height: 88rpx;
				line-height: 80rpx;
				margin-right: 12rpx;
				box-shadow:0 4rpx 12rpx rgba(0, 0, 0, 0.3), 0 0 40rpx rgba(0, 0, 0, 0.1) inset;
			}
			
		}
	}
.register_img{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	image{
		padding-top: 140rpx;
		width: 340rpx;
		height: 250rpx;
		margin: 0 auto;
		display: inline-block;
		
	}
	
}
.main{
	margin-top: 60rpx;
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
			
			padding-top: 20rpx;
			height: 88rpx;
			font-size: 40rpx;
			font-weight: 500;
			color: $uni-text-color;
			line-height: 40rpx;
			border-bottom: 1px solid rgba(0,0,0,0.6);
		}
		.inputs_lists{
			position: relative;
			.warnning{
				padding-top: 20rpx;
				float: left;
				font-size: 40rpx;
				font-weight: 600;
				color: red;
				line-height: 56rpx;
			}
		}
		.employ{
			position: absolute;
			right: 60rpx;
			top: 24rpx;
			font-size: 36rpx;
			font-family: '微软雅黑';
			font-weight: 500;
			color: red;
			line-height: 88rpx;
		}
		.invalid{
			position: absolute;
			right: 150rpx;
			top: 20rpx;
			font-size: 36rpx;
			font-family: '微软雅黑';
			font-weight: 500;
			color: red;
			line-height: 88rpx;
		}
		.right{
			width: 46rpx;
			height: 36rpx;
			position: absolute;
			right: 0;
			top: 50rpx;
		}
		.look{
			width: 46rpx;
			height: 36rpx;
			position: absolute;
			right: 75rpx;
			top: 50rpx;
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
	margin-bottom: 80rpx;
	width: 420rpx;
	height: 96rpx;
	background: linear-gradient(91deg,#f1eefc,#9dc6ff 70%,#a5bcff);
	border-radius: 0 24rpx;
	text-align: center;
	align-items: center;
	line-height: 96rpx;
	&:active{
		background: linear-gradient(91deg,#f1eefc,#9dc6ff 95%,#a5bcff);
	}
	font-size: 64rpx;
	font-weight: 500;
}

.xwl-enter-from,.xwl-leave-to{
	opacity: 0;
}
.xwl-enter-to,.xwl-leave-from{
	opacity: 1;
}
.xwl-leave-active {
    transition: opacity 0 ease;
  } 
.xwl-enter-active{
	 transition: opacity 0.2s ease;
}
  
.xwl2-enter-from,.xwl2-leave-to{
  	opacity: 0;
}
.xwl2-enter-to,.xwl2-leave-from{
  	opacity: 1;
}
  
.xwl2-leave-active {
    transition: opacity 0s linear;
} 
.xwl2-enter-active{
	transition: opacity 1s ease;
}
</style>
