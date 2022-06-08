<template>
	<view class="content">
		<view class="top_bar" ref="tb">
			<view class="top_bar_left" > 
			</view>
			<view class="top_bar_center">
				星辰
				<!-- <image src="../../static/img/title.png" mode=""></image> -->
			</view>
			<view class="top_bar_right">
				<view class="search">
					<image src="../../static/img/search.png" mode="" @tap="toSearch"></image>
				</view>
				<view class="add">
					<image src="../../static/img/adds.png" mode="" @tap="addMore"></image>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" ref="scr" class="scr" @scroll="scroll" :style="{'height':h+'px'}">
			<view class="main" v-if="friReqLen>0" @tap="toFriReq">
				<!-- 好友申请 -->
				<view class="apply">
					<view class="friends">
						<view class="friends_lists">
							<view class="friends_lists_left">
								<text class="tip">{{this.friReqLen}}</text>
								<image src="../../static/img/reqFri.png" mode=""></image>
								
							</view>
							<view class="friends_lists_right">
								<view class="top">
									<view class="name">
										好友申请
									</view>
									<view class="time">
										{{changeTime(this.friReqTime)}}
									</view>
								</view>
								<view class="info">
								 你与星辰
								</view>
							</view>
							
						</view>
					</view>
				</view>
				<!-- 消息列表 -->
				<view class="friends">
					<view class="friends_lists" v-for="(item,index) in friends" :keys="item.id" @tap="toChat(item)" ref="mesAll">
						<view class="friends_lists_left">
							<text class="tip">{{item.tip}}</text>
							<image :src="item.imgUrl" mode=""></image>
							
						</view>
						<view class="friends_lists_right">
							<view class="top">
								<view class="name">
									{{item.name}}
								</view>
								<view class="time">
									{{changeTime(item.time)}}
								</view>
							</view>
							<view class="info">
								{{item.info}}
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</scroll-view>
		
		
		<up @linkDetail="linkDetail"
			ref="up"
			:imgurl="imgurl"
		></up>
		
	</view>
</template>

<script>
	import datas from '../../common/js/datas.js'
	import utils from '../../common/js/utils.js'
	import up from "../../components/jtc-xf/jtc-xf.vue"
	export default {
		data() {
			return {
				title: 'Hello',
				friends:[],
				uid:'',
				imgurl:'',
				token:'',
				//阶梯动画开启
				advance:0,
				lists:[],
				h:'',
				scrTop:'',
				friReqLen:'',
				friReqTime:''
			}
		},
		components: {
			up
		},
		
		
		methods: {
			onReady(){
				 this.getElementStyle()
				 // this.h=this.lists[this.lists.length-1].$el.offsetTop
				 // // console.log(this.$refs.scr.$el.offsetTop)
				 // console.log(this.$refs.tb)
				 
				 // console.log(this.h)
			},
			onLoad(options) {
			 
			  this.getLocalStorage()
			  console.log(options);
			  if (options.id&&options.token) {
				  console.log('youid');
			  	this.uid=options.id
				this.token=options.token
			  }
			  this.getFriRequests()
			  this.getFriends()
			},
			toFriReq(){
				console.log('tofri');
				uni.navigateTo({
				    url: '../friendreq/friendreq',
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			scroll(e){
				console.log(e)
				this.scrTop=e.detail.scrollTop+92
				let len=this.lists.length
				for (var i = 0; i < len; i++) {
					let tempOST1=this.lists[i].$el.offsetTop
					if (i+1!=len) {
						let tempOST2=this.lists[i+1].$el.offsetTop
						let split=(tempOST2-tempOST1)/5
						if (this.scrTop>tempOST1&&this.scrTop<tempOST2) {
							
							if (this.scrTop+18<(tempOST1+split)) {
								this.advance=18
							}else if (this.scrTop>(tempOST1+split)&&this.scrTop<(tempOST1+2*split)) {
								this.advance=36
							}else if (this.scrTop>(tempOST1+2*split)&&this.scrTop<(tempOST1+3*split)) {
								this.advance=54
							}else if (this.scrTop>(tempOST1+3*split)&&this.scrTop<(tempOST1+4*split)) {
								this.advance=72
							}else if (this.scrTop>(tempOST1+4*split)&&this.scrTop<(tempOST1+5*split)) {
								this.advance=90
							}
							console.log(this.scrTop+'     '+i+'快区域一次经过')
							if (this.$refs.mesAll) {
								this.$refs.mesAll[i].$el.style.transform=`rotateX(${this.advance}deg)`
							}
						}
					}else{
						break
					}
					
				}
				
			},
			getElementStyle(){
				    if (this.$refs.mesAll) {
						
						// console.log(this.$refs.mesAll[0].$el.style.transform='rotateX(70deg)')
				    	for (var i = 0; i < this.$refs.mesAll.length; i++) {
				    		this.lists.push(this.$refs.mesAll[i])
				    	}
				    }
					console.log(this.lists)
			},
			linkDetail(e){
				//flag为0则为自己，应该显示退出登录
				//flag为1则为好友，应该显示退删除好友
				//flag为2则为陌生人，应该显示添加好友
				uni.navigateTo({
				    url: '../userdetails/userdetails?id='+this.uid+'&flag='+0,
					animationType: 'pop-in',
					animationDuration: 300
				});
				if (e) {
					this.$nextTick(()=>{
						this.$refs.up.isC=false
					})
				}
				
			},
			getLocalStorage(){
				try {
				    const e = uni.getStorageSync('user');
				    if (e) {
						this.uid=e.id
						this.imgurl=e.imgurl
						if (this.imgurl=='user.png') {
							this.imgurl=this.serveUrl+'/user/user.png'
						}
						
						this.token=e.token
				    }else{
						uni.navigateTo({
						    url: '../login/login',
							animationType: 'pop-in',
							animationDuration: 300
						});
					}
				} catch (e) {
				    // error
				}
			},
			getFriRequests(){
				console.log('res');
				uni.request({
					url:this.serveUrl+'/index/getfriendlist',
					data:{
						uid:this.uid,
						state:1,
						token:this.token
					},
					method:'POST',
					success:(res)=>{
						console.log(res)
						if (res.data.status==200) {
							this.friReqLen=res.data.result.length
							if (this.friReqLen>0) {
								for (var i = 0; i < this.friReqLen; i++) {
									if (this.friReqTime<res.data.result[i].lasttime) {
										this.friReqTime=res.data.result[i].lasttime
									}
								}
							}
							
							
						}else if(res.data.status==300){
							
							uni.showToast({
							    title: '登录过期，请重新登录',
								icon:'none',
							    duration: 2000
							});
							let name=this.name
							setTimeout(function(e) {
								uni.navigateTo({
									url: '../login/login?name='+e,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}, 3000,name);
							
							
						}else if(res.data.status==500){
							uni.showToast({
							    title: '服务器内部错误~',
								icon:'none',
							    duration: 2000
							});
						}
						
					}
				})
			},
            getFriends(){
				// this.friends=datas.friends()
				// for(let i=0;i<this.friends.length;i++){
				// 	this.friends[i].imgUrl='../../static/img/'+this.friends[i].imgUrl
				// }
				console.log('getfri');
				console.log(this.uid);
				console.log(this.token);
				uni.request({
					url:this.serveUrl+'/index/getfriendlist',
					data:{
						uid:this.uid,
						state:0,
						token:this.token
					},
					method:'POST',
					success:(res)=>{
						console.log(res)
						if (res.data.status==200) {
							let result=res.data.result
							let len=result.length
							
						    for(let i=0;i<len;i++){
								
								if (result.imgurl=='user.png') {
									result[i].imgurl=this.serveUrl+'/user/user.png'
								}
								this.friends.push(result[i])
						    }
							
						}else if(res.data.status==300){
							
							uni.showToast({
							    title: '登录过期，请重新登录',
								icon:'none',
							    duration: 2000
							});
							let name=this.name
							setTimeout(function(e) {
								uni.navigateTo({
									url: '../login/login?name='+e,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}, 3000,name);
							
							
						}else if(res.data.status==500){
							uni.showToast({
							    title: '服务器内部错误~',
								icon:'none',
							    duration: 2000
							});
						}
						
					}
				})
				console.log(this.friends);
			},
			changeTime(date){
				return utils.dateTime(date)
			},
			toSearch(){
				uni.navigateTo({
				    url: '../search/search',
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			addMore(){
				console.log('addclick');
			},
			detail(){
				console.log('detailclick');
			},
			toChat(item){
				uni.navigateTo({
					url: '../chatroom/chatroom?userinfo='+JSON.stringify(item),
					success: res => {
						console.log(res);
					},
					fail: () => {},
					complete: () => {}
				});
				console.log(item);
			}
		}
	}
</script>

<style lang="scss">
	
	@import "../../common/css/mycss.scss";
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: var(--status-bar-height);
		padding-bottom: $uni-spacing-col-base;
	}
    
    .main{
		width: 100%;
		box-sizing: border-box;
		padding-top: 92rpx;
		background: linear-gradient(91deg,#f8c390,#d279ee 25%,#a5bcff);
		opacity:0.9;
	}
	.friends_lists{
		transform-origin: 20% 40% 100%; 
		perspective: 150;
		transform-style: preserve-3d;
		-webkit-perspective: 150;
		transform: rotateY(0);
		height: 96rpx;
		padding: 16rpx $uni-spacing-col-base;
		border-bottom: 1px solid $uni-bg-color-grey;
		border-radius: 10rpx;
		background: linear-gradient(91deg,#f1eefc,#9dc6ff 70%,#a5bcff);
		&:active{
			background:linear-gradient(135deg,#56c8ff,#6f99fc) no-repeat;
		}
		.friends_lists_left{
			position: relative;
			float: left;
			
			image{
				// box-shadow:0 30rpx 70rpx rgba(0,0,0,0.2),0 6rpx 20rpx rgba(0,0,0,0.1);
				width: 96rpx;
				height: 96rpx;
				border-radius: $uni-border-radius-base;
			}
			.tip{
				z-index: 10;
				position: absolute;
				top: -6rpx;
				left: 68rpx;
				max-width: 48rpx;
				min-width: 36rpx;
				height: 36rpx;
				padding: 4rpx 6rpx;
				background: $uni-color-warning;
				border-radius: 50%;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-inverse;
				line-height: 36rpx;
				text-align: center;
			}
		}
		.friends_lists_right{
			padding-left: 128rpx;
			.top{
				height: 50rpx;
				.name{
					float: left;
					font-size: 36rpx;
					color: $uni-text-color;
					line-height: 50rpx;
				}
				.time{
					// display: none;
					float: right;
					font-size: $uni-font-size-sm;
					color: $uni-text-color-disable;
					line-height: 50rpx;
				}
			}
			.info{
				font-size: $uni-font-size-base;
				color: $uni-text-color-grey;
				line-height: 40rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
			}
		}
		
	}
</style>
