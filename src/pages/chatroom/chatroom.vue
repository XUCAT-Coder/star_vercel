<template>
	<view class="content">
		<view class="top_bar" :style="{top:cTop}">
			<view class="top_bar_left" :style="{marginTop:mt}">
				<image src="../../static/img/back_oth.png" mode="" @tap="back"></image>
			</view>
			<view class="top_bar_center" :style="{marginTop:mtc}">
				<view class="title" style="font-weight: 300;">
					用户名
				</view>
			</view>
			<view class="top_bar_right" :style="{marginTop:mt}">
				<view class="empty">
					<image src="../../static/img/login.png" mode=""></image>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="chat" :scroll-with-animation="swAnimation" :scroll-into-view="scrollToView"
		             :style="{height:sh}"
					 @scrolltoupper="nextPage">
			<view class="chat_main" @tap="quitAll">
				<view class="loading" :style="{display:showLoading}">
					<image src="../../static/img/waiting.png"
					mode=""
					class="loading-img"
					:animation="animationData"></image>
				</view>
				<view class="chat_block" v-for="(item,index) in msgs" :key="index" :id="'msg'+item.tip">
					<view class="chat_time" v-if="item.time!=''">{{changeTime(item.time)}}</view>
					<view class="msg-m msg-left" v-if="item.id!='b'">
						<image :src="item.imgUrl" mode="" class="user-img"></image>
						<view class="message" v-if="item.types==0">
							<view class="info">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types==1">
							<image :src="item.message" mode="widthFix" class="msg-img" @tap="previewImg(item.message)"></image>
							
						</view>
						<view class="message" v-if="item.types==2">
							<view class="info voice" :style="{width:item.message.time*5+'rpx'}"  @tap="playVoice(item.message.voice)">
								<image src="../../static/img/voicing.png" mode=""></image>
								{{item.message.time}}"
							</view>
						</view>
						<view class="message" v-if="item.types==3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<view class="map_main">
									<image src="../../static/img/location.png" mode=""></image>
									{{item.message.name}}
								</view>
							</view>
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.id=='b'">
						<image :src="item.imgUrl" mode="" class="user-img"></image>
						<view class="message" v-if="item.types==0">
							<view class="info">
								{{item.message}}
							</view>
						</view>
						<view class="message" v-if="item.types==1">
							<image :src="item.message" mode="widthFix" class="msg-img"  @tap="previewImg(item.message)"></image>
							
						</view>
						<view class="message" v-if="item.types==2">
							<view class="info voice" :style="{width:item.message.time*5+'rpx'}" @tap="playVoice(item.message.voice)">
								{{item.message.time}}"
								<image src="../../static/img/voicing.png" mode=""></image>
							</view>
						</view>
						<view class="message" v-if="item.types==3">
							<view class="msg-map" @tap="openLocation(item.message)">
								<view class="map-name">{{item.message.name}}</view>
								<view class="map-address">{{item.message.address}}</view>
								<view class="map_main">
									<image src="../../static/img/location.png" mode=""></image>
									{{item.message.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<!-- <view class="padbt"></view> -->
			<!-- <emoji></emoji>	 -->
		</scroll-view>
		
		<submit @mes="res"
		 @passSignToTop="changeTop"
		  @passSignBack="backOrg"
		   @changesh="changesh"
			class="floatTop"
			@changeosh="changeosh"
			@passHeight="Height"
			ref="submit"
			@changeRsh="changeRsh"
			@noticePhotoSh="noticePhotoSh"
			@noticeCameraSh="noticeCameraSh"
			@noticePosSh="noticePosSh"
			></submit>
	</view>
	
</template>

<script>
	import datas from "../../common/js/datas.js"
	import utils from '../../common/js/utils.js'
	import submit from "../../common/submit.vue"
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				msgs:[],
				imgMsg:[],
				oldTime:new Date(),
				scrollToView:'',
			    cTop:0,
				mt:'12rpx',
				mtc:'0rpx',
				sh:'100%',
				h:'0',
				animationData: {},
				nowpage:0,
				loading:'',
				showLoading:'none',
				maxpages:0,
				page:0,
				swAnimation:true,
				beginLoading:true
			}
		},
		components: {
			submit,
			
		},
		methods: {
			back(){
				uni.navigateBack({
				    delta: 1,
				   
				});
			},
			onLoad(option){
				this.getMsg(this.nowpage);
			},
			//处理时间
			changeTime(date){
				return utils.dateTimeChat(date)	
			},
			//获取聊天数据
			getMsg(page){
				let msg=datas.message()
				this.page=page
				this.maxpages=msg.length
				if (msg.length>(page+1)*10) {
					this.maxpages=(page+1)*10
					this.nowpage++
				}else{
					this.nowpage=-1
				}
				for (var i = page*10; i < this.maxpages; i++) {
					msg[i].imgUrl='../../static/img/'+msg[i].imgUrl
					//时间间隔
					if (i<msg.length-1) {
						let t=utils.spaceTime(this.oldTime,msg[i].time)
						if(t){
							this.oldTime=t
						}
						msg[i].time=t
					}
					//补充图片地址
					if (msg[i].types==1) {
						msg[i].message='../../static/img/'+msg[i].message
						this.imgMsg.unshift(msg[i].message)
					}
					
					this.msgs.unshift(msg[i])
				}
				this.$nextTick(function() {
					this.swAnimation=false
					this.scrollToView='msg'+this.msgs[this.maxpages-(page*10)-1].tip
				})
				clearInterval(this.loading)
				//noneloading
				this.showLoading='none'
				this.beginLoading=true
			},
			// 预览图片
			previewImg(e){
				//定位到点击图片位置
				let index=0
				for (var i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i]==e) {
						index=i
					}
				}
				uni.previewImage({
					current:index,
				    urls: this.imgMsg,
				    longPressActions: {
				        itemList: ['发送给朋友', '保存图片', '收藏'],
				        success: function(data) {
				            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				        },
				        fail: function(err) {
				            console.log(err.errMsg);
				        }
				    }
				});
			},
			res(e){
				//获取子组件传递过来的info
				this.swAnimation=true
				let len=this.msgs.length+1;
				let nowTime=new Date()
				//时间间隔
					let t=utils.spaceTime(this.oldTime,nowTime)
					if(t){
						this.oldTime=t
					}
					nowTime=t
				
				let data={
				        id:'b',
						imgUrl:'../../static/img/test.jpg',
						message:e.message,
						types:e.types,
						time:nowTime,
						tip:len
					};
				this.msgs.push(data)
				if (e.types==1) {
					this.imgMsg.push(e.message)
				}
				console.log(data)
				this.$nextTick(function() {
					this.scrollToView='msg'+len
					// this.goBottom()
				})
			},
			//获取高度
			Height(e){
                this.h=e
				this.$nextTick(function(){
					this.goBottom()
				})
			},
			//滚动到底部
			goBottom(){
				this.swAnimation=true
				this.scrollToView=''
				this.$nextTick(function(){
					
					let len=this.msgs.length-1
					this.scrollToView='msg'+this.msgs[len].tip
				})
			},
			changeTop(e){
				if (e) {
					this.goBottom()
				}

			},
			backOrg(e){
				if (e) {
					
				}
			},
			changesh(flag){
				if (flag) {
					this.sh=`85%`

				} else{
					this.sh='100vh'
				}
			},
			changeosh(flag){
				if (flag) {
					this.sh=`85%`
					
				} else{
					this.sh='100vh'
				}
			},
			changeRsh(flag){
				if (flag) {
					this.sh=`85%`
					
				} else{
					this.sh='100vh'
				}
			},
			playVoice(e){
				innerAudioContext.src = e;
				innerAudioContext.play();
			},
			covers(e){
				let map=[{
					latitude:e.latitude,
					longitude:e.longitude,
					iconPath: '../../static/img/location.png'
				}]
				this.goBottom()
				this.$nextTick(()=>{
					this.$refs.submit.showMore=false
					this.$refs.submit.actBt='0'
				})
				return (map)
			},
			openLocation(e){
				uni.openLocation({
				    latitude: e.latitude,
				    longitude: e.longitude,
					name:e.name,
					address:e.address,
				    success: function () {
				        console.log('success');
				    }
				});
			},
			nextPage(){
				//showloading
				if (this.nowpage>0&&this.beginLoading) {
					this.showLoading='block'
					var animation = uni.createAnimation({
					  duration: 1000,
					    timingFunction: 'step-start',
					})
					this.beginLoading=false
					this.animation = animation
					let i=1
					this.loading=setInterval(function(){
						animation.rotate(i*30).step()
						this.animationData = animation.export()
						i++
						if(i>20){
							this.getMsg(this.nowpage)
						}
					}.bind(this), 100)
				}
				
			},
			quitAll(){
				this.sh='100vh'
				this.$refs.submit.showEmo=false
				this.$refs.submit.showMore=false
				this.$refs.submit.actBt='0'
			},
			noticePhotoSh(){
				this.sh='100%'
			},
			noticeCameraSh(){
				this.sh='100%'
			},
			noticePosSh(){
				this.sh='100%'
			}
		},
	
	}
</script>

<style lang="scss">
	
	page{
		height: 100%;
	}
	.content{
		height: 100%;
		background-color: rgba(244,244,244,1);
	}
.top_bar{
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 92rpx;
		background: linear-gradient(91deg,#f8c390,#d279ee 70%,#a5bcff);

		//为了兼容不同手机头部
		padding-top: var(--status-bar-height);
		box-shadow: 0 1 0 0 rgba(0,0,0,0.10);
		.top_bar_left{
			float: left;
			margin-left: 12rpx;
			height: auto;
			image{
				padding: 18rpx 0 0 18rpx;
				width: 64rpx;
				height: 52rpx;
				border-radius: 16rpx;
			}
		}
		.top_bar_center{
			// height: auto;
			position: absolute;
			text-align: center;
			align-items: center;
			font-family: 'FZShouJinShu-S10S';
			font-weight: 800;
			font-size: 36rpx;
			
			left: 50%;
		    right: 0;
			top: 75%;
			transform: translate(-50%,-75%);
			
			image{
				width: 128rpx;
				height: 68rpx;
				margin-top: 10rpx;
			}
		}
		.top_bar_right{
			height: auto;
			margin-top: 12rpx;
			margin-right: 12rpx;
			float: right;
			.empty{
				border-radius: 50%;
				image{
					width: 84rpx;
					height: 88rpx;
					
				}
			}
			
		}
		
	}
	.chat{
		height: 100%;
		.padbt{
			padding-top: var(--status-bar-height);
			width: 100%;
		}
		.chat_main{
			margin-top: 44rpx;
			.loading{
				margin-top: 44rpx;
				text-align: center;
				.loading-img{
					opacity: 0.5;
					width: 52rpx;
					height: 52rpx;
				}
			}
			padding-left: 32rpx;
			padding-right: 32rpx;
			padding-top: 100rpx;
			padding-bottom: 120rpx;
			display: flex;
			flex-direction: column;
		}
		.chat_block{
			.chat_time{
				font-size: 24rpx;
				color: rgba(39,40,50,0.3);
				line-height: 34rpx;
				padding: 20rpx 0;
				text-align: center;
			}
			.msg-left{
				flex-direction: row;
				.info{
					background-color: #FFFFFF;
					border-radius: 0px 20px 20px 20px;
					margin-left: 16rpx;
				}
				.voice{
					min-width: 100rpx;
					max-width: 240rpx;
					text-align: right;
					image{
						padding-top: 6rpx;
						float: left;
						width: 36rpx;
						height: 36rpx;
					}
				}
				.msg-img{
					margin-left: 16rpx;
				}
				.msg-map{
					border-radius: 0px 20px 20px 20px;
					margin-left: 16rpx;
				}
			}
			.msg-right{
				flex-direction: row-reverse;
				.info{
					background-color: rgba(170, 255, 255, 0.7);
					border-radius:  20px 0 20px 20px;
					margin-right: 16rpx;
				}
				.voice{
					min-width: 100rpx;
					max-width: 240rpx;
					text-align:left;
					image{
						
						padding-bottom: 4rpx;
						transform: rotate(180deg);
						float: right;
						width: 36rpx;
						height: 36rpx;
					}
				}
				.msg-img{
					margin-right: 16rpx;
				}
				.msg-map{
					border-radius:  20px 0 20px 20px;
					margin-right: 16rpx;
				}
			}
			.msg-m{
				display: flex;
				padding: 20rpx 0;
				.user-img{
					width: 72rpx;
					height: 72rpx;
					border-radius: 50%;
					flex: none;
				}
				.message{
					flex: none;
					max-width: 480rpx;
					.info{
						font-size: 32rpx;
						color: rgba(39,40,50,1);
						line-height: 44rpx;
						padding: 16rpx 24rpx;
						word-break: break-all;
						word-wrap: break-word;
						white-space: normal;
					}
					.msg-img{
						max-width: 400rpx;
						border-radius: 20rpx;
						
					}
					
					.msg-map{
						background-color: #FFFFFF;
						width: 460rpx;
						height: 284rpx;
						overflow: hidden;
						
						.map-name{
							
							font-size: 30rpx;
							line-height: 44rpx;
							padding: 9rpx 0 12rpx 18rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
						.map-address{
							padding: 0 18rpx 4rpx;
							font-size: 24rpx;
							line-height: 30rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
						.map_main{
							position: relative;
							image{
								position: absolute;
								left: 50%;
								top: 35%;
								transform: translate(-50%,-70%);
								width: 64rpx;
								height: 64rpx;
							}
							font-size: 20rpx;
							font-weight: 300;
							align-items: center;
							line-height: 180rpx;
							text-align: center;
							width: 460rpx;
							height: 180rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
							background: url(../../static/img/falsemap.png);
						}
						
					}
				}
			}
		}
	}
	.floatTop{
		position: fixed;
		bottom: 0;
	}
</style>
