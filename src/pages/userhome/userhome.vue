<template>
	<view class="userhome">
		<view class="top_bar">
			<view class="top_bar_left" @tap="back">
				<image src="../../static/img/back_oth.png" mode=""></image>
			</view>
			
			<view class="top_bar_right">
				<view class="point" @tap="more">
					<image src="../../static/img/point.png" mode=""></image>
				</view>
				
			</view>
		</view>
		<view class="under">
			<view class="under_fog"></view>
			<image :src="user.imgurl" mode="aspectFill" class="under_bg_img"></image>
		</view>
		<view class="main">
			<view class="user_header">
				<view class="sex" :style="{background:sexbg}">
					<image :src="sexy" mode=""></image>
				</view>
				<image :src="user.imgurl" mode="" class="user_img" @tap="test"></image>
			</view>
			<view class="user_info">
				<view class="name">{{user.name}}</view>
				<view class="nick">昵称:{{user.nick}}</view>
				<view class="intro">{{user.intro}}</view>
			</view>
		</view>
		<view class="bottmo_bar">
		    <view class="bottmo_btn" @tap="addFriAni" v-if="canAddFriend&&(!canSend)">
		    	添加好友
		    </view>
			<view class="bottmo_btn" @tap="send" v-if="(!canAddFriend)&&canSend">
				发消息
			</view>
		</view>
		<view class="loader"> 
		     <!-- @*第一条柱子*@ -->
		     <view class="loader_bar"></view>
		    <!-- @*第二条柱子*@ -->
		     <view class="loader_bar"></view>
		     <!-- @*第三条柱子*@ -->
		     <view class="loader_bar"></view>
		     <!-- @*第四条柱子*@ -->
		     <view class="loader_bar"></view>
		     <!-- @*第五条柱子*@ -->
		     <view class="loader_bar"></view>   
		     <!-- @*球*@    -->
		     <view class="loader_ball"></view>
		</view>
		<view class="add_dialog" :style="{height:addHeight,bottom:'-'+hidHeight}" :animation="animationData">
			<view class="name">{{user.name}}</view>
			<view class="add_main">
				<textarea v-model="applyInfo" placeholder="" maxlength="120" />
			</view>
		</view>
		<view class="add_btn" :animation="animationData">
			<view class="close" @tap="addFriAniQuit">
				取消
			</view>
			<view class="send"  @tap="addFriAniSend">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sexbg:'rgba(255,93,91,1)',
				user:{
					fid:'',
					name:'',
					nick:'',
					intro:'',
					imgurl:'',
					sexyMark:''
				},
				uid:'',
				name:'',
				applyInfo:'',
				addHeight:'',
				hidHeight:'',
				animation:'',
				animationData:'',
				isAdd:false,
				originHeight:'',
				token:'',
				sexy:'',
				sexyMark:'',
				canAddFriend:true,
				canSend:false,
				flag:'',
				udfflag:''
			}
		},
		onReady:function(){
			this.getElementStyle();
			
		},
		methods: {
			test(){
				console.log(this.uid);
				console.log(this.user.fid);
				uni.request({
									 	url:this.serveUrl+'/friend/updatefridendstate',
									 	data:{
									 		uid:this.uid,
											fid:this.user.fid,
									 		token:this.token
									 	},
									 	method:'POST',
									 	success:(res)=>{
									 		console.log(res)
									 		if (res.data.status==200) {
									 			uni.showToast({
									 			    title: '已同意好友请求',
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
									 			
									 			
									 		}else if(res.data.status==500){
									 			uni.showToast({
									 			    title: '服务器内部错误~',
									 				icon:'none',
									 			    duration: 2000
									 			});
									 		}
									 		
									 	}
									 })
									 setTimeout(function() {
									 	uni.navigateTo({
									 		url: '../index/index?id='+this.uid+'&token='+this.token,
									 		success: res => {},
									 		fail: () => {
									 			
									 		},
									 		complete: () => {}
									 	});
									 }, 2000);
			},
			more(){
				console.log('i am more');
				//flag为0则为自己，应该显示退出登录
				//flag为1则为好友，应该显示退删除好友
				//flag为2则为陌生人，应该显示添加好友
				uni.navigateTo({
					url: '../userdetails/userdetails?id='+this.user.fid+'&flag='+this.flag+'&uid='+this.uid,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			send(){
				console.log('i am send')
			},
			onLoad(options){
				if (options.name) {
					this.name=options.name
				}
				//tip 1为好友，0不是好友,2为自己
				//flag为0则为自己，应该显示退出登录
				//flag为1则为好友，应该显示退删除好友
				//flag为2则为陌生人，应该显示添加好友
				//userdetails传来的fid
				if (options.flag==2) {
					//展开发送添加好友弹窗
					this.udfflag=2
					this.user.fid=options.id
					this.uid=options.uid
					this.token=options.token
					
					uni.request({
						url:this.serveUrl+'/user/detail',
						data:{
							id:this.user.fid,
							token:this.token
						},
						method:'POST',
						success:(res)=>{
							console.log(res)
							if (res.data.status==200) {
								let last=res.data.result
								try {
								   this.user.name=last.name
								   this.user.nick=last.name
								   this.applyInfo=this.name+' 请求添加您为好友~'
								   if (last.imgurl=='user.png') {
								   	this.user.imgurl=this.serveUrl+'/user/user.png'
								   }
								   
								   this.user.intro=last.intro
								   this.user.sexyMark=last.sex
								   if (this.user.sexyMark=='asexual') {
								   	//中性
								   	this.sexy='../../static/img/asexual.png'
								   }else if(this.user.sexyMark=='male'){
								   	//男的
								   	this.sexy='../../static/img/male.png'
								   }else if(this.user.sexyMark=='female'){
								   	this.sexy='../../static/img/female.png'
								   }
								} catch (e) {
								    // error
									uni.showToast({
									    title: '未知错误',
										icon:'none',
									    duration: 2000
									});
								}
							
							}else if(res.data.status==300){
								
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
								
								
							}else if(res.data.status==500){
								uni.showToast({
								    title: '服务器内部错误~',
									icon:'none',
								    duration: 2000
								});
							}
							
						}
					})
					
					this.addFriAni()
				}
				console.log(options)
				if (options.tip==2) {
					this.canAddFriend=false
					this.canSend=false
					this.flag=0
				}else if(options.tip==1){
					this.canAddFriend=false
					this.canSend=true
					this.flag=1
				}else if(options.tip==0){
					this.flag=2
				}
				if (options.uid&&options.fid&&options.token) {
					this.user.fid=options.fid
					this.uid=options.uid
					this.token=options.token
					
					uni.request({
						url:this.serveUrl+'/user/detail',
						data:{
							id:this.user.fid,
							token:this.token
						},
						method:'POST',
						success:(res)=>{
							console.log(res)
							if (res.data.status==200) {
								let last=res.data.result
								try {
								   this.user.name=last.name
								   this.user.nick=last.name
								   
								   if (last.imgurl=='user.png') {
								   	this.user.imgurl=this.serveUrl+'/user/user.png'
								   }else{
									this.user.imgurl=last.imgurl
								   }
								   
								   this.user.intro=last.intro
								   this.user.sexyMark=last.sex
								   if (this.user.sexyMark=='asexual') {
								   	//中性
								   	this.sexy='../../static/img/asexual.png'
								   }else if(this.user.sexyMark=='male'){
								   	//男的
								   	this.sexy='../../static/img/male.png'
								   }else if(this.user.sexyMark=='female'){
								   	this.sexy='../../static/img/female.png'
								   }
								} catch (e) {
								    // error
									uni.showToast({
									    title: '未知错误',
										icon:'none',
									    duration: 2000
									});
								}
							
							}else if(res.data.status==300){
								
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
								
								
							}else if(res.data.status==500){
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
			back(){
				uni.navigateBack({
				    delta: 1,
				    animationType: 'pop-out',
				    animationDuration: 300
				});
			},
			getElementStyle(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.under').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				  this.addHeight=data.height-240+'px'
				  this.hidHeight=data.height+'px'
				  this.originHeight=data.height
				  // console.log(this.addHeight);
				}).exec();
			},
			addFriAni(){
				// console.log('isClicked');
				  this.isAdd=!this.isAdd
				  var animation = uni.createAnimation({
				      duration: 1000,
				        timingFunction: 'ease',
				    })
				  this.animation = animation
				   if (this.isAdd) {
					   this.applyInfo=this.name+' 请求添加您为好友~'
				   	 animation.bottom(60).step()
					 
				   } else{
				   	 animation.bottom(-this.originHeight).step()
				   }
				   
				
				    this.animationData = animation.export()
			},
			addFriAniQuit(){
				// console.log('isClicked');
				  this.isAdd=!this.isAdd
				  var animation = uni.createAnimation({
				      duration: 1000,
				        timingFunction: 'ease',
				    })
				  this.animation = animation
				   if (this.isAdd) {
				   	 animation.bottom(60).step()
				   } else{
				   	 animation.bottom(-this.originHeight).step()
				   }
				   
				
				    this.animationData = animation.export()
			},
			addFriAniSend(){
				// console.log('isClicked');
				  this.isAdd=!this.isAdd
				  var animation = uni.createAnimation({
				      duration: 1000,
				        timingFunction: 'ease',
				    })
				  this.animation = animation
				   if (this.isAdd) {
				   	 animation.bottom(60).step()
				   } else{
				   	 animation.bottom(-this.originHeight).step()
					 if (this.udfflag==2) {
					 	uni.request({
					 						 	url:this.serveUrl+'/friend/friendapply',
					 						 	data:{
					 						 		uid:this.uid,
					 								fid:this.id,
					 								mes:this.applyInfo,
					 						 		token:this.token
					 						 	},
					 						 	method:'POST',
					 						 	success:(res)=>{
					 						 		console.log(res)
					 						 		if (res.data.status==200) {
					 						 			uni.showToast({
					 						 			    title: '好友请求,发送成功~',
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
					 						 			
					 						 			
					 						 		}else if(res.data.status==500){
					 						 			uni.showToast({
					 						 			    title: '服务器内部错误~',
					 						 				icon:'none',
					 						 			    duration: 2000
					 						 			});
					 						 		}
					 						 		
					 						 	}
					 						 })
					 	}
					 else{
						 uni.request({
						 					 	url:this.serveUrl+'/friend/friendapply',
						 					 	data:{
						 					 		uid:this.uid,
						 							fid:this.user.fid,
						 							mes:this.applyInfo,
						 					 		token:this.token
						 					 	},
						 					 	method:'POST',
						 					 	success:(res)=>{
						 					 		console.log(res)
						 					 		if (res.data.status==200) {
						 					 			uni.showToast({
						 					 			    title: '好友请求,发送成功~',
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
						 					 			
						 					 			
						 					 		}else if(res.data.status==500){
						 					 			uni.showToast({
						 					 			    title: '服务器内部错误~',
						 					 				icon:'none',
						 					 			    duration: 2000
						 					 			});
						 					 		}
						 					 		
						 					 	}
						 					 })
						 }
					 }
					 
				   
				
				    this.animationData = animation.export()
			}
			
		}
	}
</script>

<style lang="scss">
.top_bar{
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 92rpx;
		
		//为了兼容不同手机头部
		padding-top: var(--status-bar-height);
		box-shadow: 0 1 0 0 rgba(0,0,0,0.10);
		.top_bar_left{
			float: left;
			margin-left: 26rpx;
			
			image{
				padding: 18rpx 0 0 18rpx;
				width: 72rpx;
				height: 72rpx;
				border-radius: 16rpx;
			}
		}
		
		.top_bar_right{
			float: right;
			.point{
				padding-top: 24rpx;
				padding-right: 48rpx;
				image{
					height: 72rpx;
					width: 72rpx;
				}
				
				
			}
			
		}
	}
	.under{
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: -2;
		.under_fog{
			
			width: 100%;
			height: 100%;
			// background-color: #eee;
		}
		.under_bg_img{
			z-index: -1;
			position: absolute;
			left: -10rpx;
			top: -10rpx;
			opacity: 0.4;
			width: 110%;
			height: 110%;
			filter: blur(8rpx);
		}
	}
	.main{
		text-align: center;
		padding-top: 25%;
		.user_header{
			margin: 0 auto;
			width: 412rpx;
			height: 400rpx;
			position: relative;
			.sex{
				z-index: 11;
				position: absolute;
				bottom: 8rpx;
				right: 16rpx;
				width: 64rpx;
				height: 64rpx;
				line-height: 64rpx;
				border-radius: 50%;
				image{
					padding: 12rpx;
					width: 42rpx;
					height: 42rpx;
				}
			}
			.user_img{
				z-index: 10;
				width: 400rpx;
				height: 400rpx;
				border-radius: 48rpx;
				border: 6rpx solid rgba(255,255,255,1);
			}
		}
		.user_info{
			padding-top: 42rpx;
			.name{
				font-size: 52rpx;
				line-height: 72rpx;
			}
			.nick{
				font-size: 36rpx;
				line-height: 42rpx;
			}
			.intro{
				padding: 20rpx 120rpx;
	            
				font-size: 28rpx;
				color: rgba(39,40,50,1);
				line-height: 48rpx;
			}
		}
	}
	.bottmo_bar{
		position: fixed;
		align-items: center;
		text-align: center;
		bottom: 12%;
		width: 100vw;
		height: 104rpx;
		
		.bottmo_btn{
			font-size: 36rpx;
			width: 684rpx;
			line-height: 104rpx;
			position: absolute;
			background: #fffc00;  /* fallback for old browsers */
			background: -webkit-linear-gradient(to right, #ffffff, #fffc00);  /* Chrome 10-25, Safari 5.1-6 */
			background: linear-gradient(to right, #ffffff, #fffc00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
		}
	}
	.loader{
	   position: absolute;
	   bottom: 23%;
	   left: 40%;
		margin :0 auto;
	}
	 /*柱子的样式*/
	.loader_bar{
	    width:10px;
	    height:110rpx;
	    background-color:#fff;
	    position:absolute;
	    bottom:0px;
	    transform-origin:bottom;/*起始点对齐*/
	    box-shadow:1px 1px 0 rgba(0,0,0,0.2);
	}
	/*球的样式*/
	.loader_ball{
	    width:10px;
	    height:10px;
	    border-radius:50%;
	    background:#fff;
	    position:absolute;
	    bottom:10px;
	    left:0px;
	    animation:ball 4s infinite;/*动画*/
	}
	 .loader_bar:nth-child(1){/*第一条柱子*/
	     left:0;
	     transform:scale(1,0.2);/*改变y轴的高度*/
	     animation:barUp1 4s infinite;/*让架构（barUp1）在4s无限运动*/
	        }
	 .loader_bar:nth-child(2){/*第二条柱子*/
	     left:15px; 
	     transform:scale(1,0.4);
	     animation:barUp2 4s infinite;
	 }
	 .loader_bar:nth-child(3){/*第三条柱子*/
	     left:30px;
	     transform:scale(1,0.6);
	     animation:barUp3 4s infinite;
	 }
	  .loader_bar:nth-child(4){/*第四条柱子*/
	     left:45px;
	     transform:scale(1,0.8);
	     animation:barUp4 4s infinite;
	 }
	 .loader_bar:nth-child(5){/*第五条柱子*/
	     left:60px;
	     transform:scale(1,1);
	     animation:barUp5 4s infinite;/*无限动画*/
	 }
	@keyframes ball{
	 /*球跳的去程*/
	  0%{
	       transform:translate(0,0);
	  }         
	  5%{
	      transform:translate(8px,-14px);
	  }
	  10%{
	  /*实现踩下的效果*/
	      transform:translate(15px,-10px);
	  }
	  15%{
	      transform:translate(23px,-24px);              
	  }
	  20%{
	   /*实现踩下的效果*/
	      transform:translate(30px,-20px);
	  }
	  25%{
	      transform:translate(38px,-34px);
	  }
	  30%{
	   /*实现踩下的效果*/
	      transform:translate(45px,-30px);
	  }
	  35%{
	      transform:translate(53px,-44px);
	  }
	  40%{
	   /*实现踩下的效果*/
	      transform:translate(60px,-40px);
	  }         
	  50%{
	      transform:translate(60px,0px);
	  }
	  /*球跳的回程*/
	  55%{
	      transform:translate(53px,-14px)
	  }
	  60%{
	   /*实现踩下的效果*/
	       transform:translate(45px,-10px)
	   }
	  65%{
	       transform:translate(37px,-24px)
	    }
	  70%{
	   /*实现踩下的效果*/
	       transform:translate(30px,-20px)
	   }
	  75%{
	       transform:translate(22px,-34px)
	     }
	  80%{
	   /*实现踩下的效果*/
	       transform:translate(15px,-30px)
	     }
	  85%{
	       transform:translate(7px,-44px)
	     }
	  90%{
	   /*实现踩下的效果*/
	       transform:translate(0px,-40px)
	     }
	 100%{
	       transform:translate(0,0)
	     }
	 }
	@keyframes barUp1{/*第一条柱子*/
	    0%{/*从左开始运动*/
	        transform:scale(1,0.2);/*当球运动4s内时柱子高度为原来的0.2倍*/
	    }
	    40%{
	        transform:scale(1,0.2);/*当球运动4s内时柱子高度为原来的0.2倍*/
	    }
	    50%{/*4s后结束，球将从右以0s开始运动*/
	        transform:scale(1,1)/*当球运动4s时柱子高度变成原来的高度*/
	    }
	    90%{
	        transform:scale(1,1);/*当球运动4s内时柱子高度为原来的高度*/
	    }
	    100%{
	        transform:scale(1,0.2);/*当球运动4s时柱子高度变成原来的0.2倍*/
	    }
	}
	
	@keyframes barUp2{/*第二条柱子*/
	    0%{/*从左开始运动*/
	        transform:scale(1,0.4);/*当球运动4s内时柱子高度为原来的0.4倍*/
	    }
	    40%{
	        transform:scale(1,0.4);
	    }
	    50%{/*4s后结束，球将从右以0s开始运动*/
	        transform:scale(1,0.8);/*当球运动4s时柱子高度变成原来的0.8倍*/
	    }
	    90%{
	        transform:scale(1,0.8);
	    }
	    100%{
	        transform:scale(1,0.4);
	    }
	}
	
	@keyframes barUp3{/*第三条柱子*/
	    0%{/*从左开始运动*/
	        transform:scale(1,0.6);/*当球运动4s内时柱子高度为原来的0.6倍*/
	    }             
	    100%{
	        transform:scale(1,0.6);
	    }
	}
	
	@keyframes barUp4{/*第四条柱子*/
	    0%{/*从左开始运动*/
	        transform:scale(1,0.8);/*当球运动4s内时柱子高度为原来的0.8倍*/
	    }
	    40%{
	        transform:scale(1,0.8);
	    }
	    50%{/*4s后结束，球将从右以0s开始运动*/
	        transform:scale(1,0.4);/*当球运动4s时柱子高度变成原来的0.4倍*/
	    }
	    90%{
	        transform:scale(1,0.4);
	    }
	    100%{
	        transform:scale(1,0.8);/*当球运动4s时柱子高度为原来的0.8倍*/
	    }
	}
	
	
	@keyframes barUp5{/*第五条柱子*/
	    0%{/*从左开始运动*/
	        transform:scale(1,1);/*当球运动4s内时柱子高度为原来的高度*/
	    }
	    40%{
	        transform:scale(1,1);
	    }
	    50%{/*4s后结束，球将从右以0s开始运动*/
	        transform:scale(1,0.2);/*当球运动4s时柱子高度变成原来的0.2倍*/
	    }
	    90%{
	        transform:scale(1,0.2);
	    }
	    100%{
	        transform:scale(1,1);/*当球运动4s时柱子高度为原来的高度*/
	    }
	}
	.add_dialog{
		position: fixed;
		box-sizing: border-box;
		// bottom: -1000px;
		// height: 1600rpx;
		width: 100%;
		padding: 0 56rpx;
		background: rgba(255,255,255,1.0);
		border-radius: 40rpx 40rpx 0 0 ;
		
		.name{
			padding: 220rpx 0 40rpx;
			font-size: 52rpx;
			color: rgba(39,40,50,1.0);
			line-height: 74rpx;
		}
		.add_main{
			box-sizing: border-box;
			width: 100%;
			padding: 9rpx 22rpx;
			height: 32%;
			background: rgba(243,244,246,1);
			border-radius: 20rpx;
			line-height: 42rpx;
			
		}
		
	}
	.add_btn{
		position: fixed;
		align-items: center;
		text-align: center;
		width: 100vw;
		height: 260rpx;
		bottom: -664rpx;
		box-sizing: border-box;
		padding: 2rpx $uni-spacing-col-base;
		display: flex;
		.close{
			z-index: 55;
			font-size: 36rpx;
			margin-left: 24rpx;
			width: 120rpx;
			line-height: 88rpx;
			background: $uni-bg-color-hover;
			border-radius: 20rpx;
		}
		.send{
			flex: auto;
			font-size: 36rpx;
			width: 420rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 36rpx;
			background: $uni-color-primary;
			margin-left: 32rpx;
			margin-right: 24rpx;
			
		}
	}
</style>
