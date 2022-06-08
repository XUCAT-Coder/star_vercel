<template>
	<view class="submit">
		<view class="bar" :style="{bottom:actBt}">
			<view class="left" >
				<button type="default"
				  size="mini"
				  v-if="isRecord" 
				  class="btn"
				  @touchstart="touchstart"
				  @touchend="touchend"
				  @touchmove="touchmove"> 按住 说话 </button>
				<textarea value="" 
				ref="tt" 
				auto-height="true" 
				 maxlength="240" 
				 class="chat-send btn" 
				 v-model="msg" 
				 v-if="!isRecord"
				 id="info"
				 adjust-position="false" 
				 @input="inputs"
				 @focus="showTop"
				 @blur="hide"/>
			</view>
			<view class="center"></view>
			<view class="right">
				<view class="search">
					<image src="../static/img/smile.png" mode="" @tap="emoji"></image>
				</view>
				<view class="voice">
					<image src="../static/img/voiced.png" mode="" v-if="isRecord" @tap="changeRec"></image>
					<image src="../static/img/voice.png" mode="" v-if="!isRecord" @tap="changeRec"></image>
				</view>
				<view class="add send" v-if="showSend" @tap="send">
					发送
				</view>
				<view class="add" v-if="!showSend">
					<image src="../static/img/adds.png" mode="" @tap="more"></image>
				</view>
			</view>
			
		</view>
		<emoji v-if="showEmo" @emoaction="emoHandle" class="emo"></emoji>
		<more v-if="showMore" 
			  @passPhoto="upPhoto"
			  @passCamera="upCamera"
			  @passPos="choosePos"
		></more>
		<view class="voice_bg" :style="{display:voiceBg}">
			<view class="voice_len" :style="{width:voiceWidth,height:voiceHeight}">
				<view class="voice_time" :style="{lineHeight:voiceHeight}">
					&nbsp;{{this.vLen+'s'}}
				</view>
			</view>
			<view class="voice_del">
				上滑取消录音
			</view>
		</view>
	</view>
</template>

<script>
	import emoji from "../common/emoji.vue"
	import more from "../common/more.vue"
	//录音
	const recorderManager = uni.getRecorderManager();
	export default{
		data() {
			return {
				msg:'',
				actBt:'0',
				showSend:false,
				isRecord:false,
				showEmo:false,
				showMore:false,
				timer:'',
				vLen:0,
				voiceBg:'none',
				voiceWidth:'120rpx',
				voiceHeight:'120rpx',
				pageY:0
			}
		},
		components: {
			emoji,
			more
		},
		methods: {
			onLoad(){
				
			},
			getHeight(){
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
						this.actBt=data.height+100+'px'
					if(this.showMore&&this.showEmo){
						this.actBt=data.height+'px'
					}
				 this.$emit('passHeight',this.actBt)
				  
				}).exec();
			},
			emoji() {
				this.isRecord=false
				this.showEmo=!this.showEmo
				if (this.showEmo) {
					this.getHeight()
				}else{
					this.actBt='0px'
				}
				this.showMore=false
				this.$emit('changesh',this.showEmo)
			},
			more(){
				this.isRecord=false
				this.showMore=!this.showMore
				if (this.showMore&&this.showEmo) {
					this.actBt=this.actBt.split('px')-100+'px'
				} else{
					if (this.showMore) {
						this.getHeight()
					
					}else{
						this.actBt='0px'
					}
				}
				this.showEmo=false
				this.$emit('changeosh',this.showMore)
			},
			
			upPhoto(e){
				this.showMore=false
				this.actBt='0'
				this.$emit('noticePhotoSh')
				this.sendImg(e)
			},
			upCamera(e){
				this.showMore=false
				this.actBt='0'
				this.$emit('noticeCameraSh')
				this.sendImg(e)
			},
			sendImg(e){
				let count=9
				if (e=='album') {
					count=9
				} else{
					count=1
				}
				uni.chooseImage({
				    count: count, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: [e], //从相册选择
				    success: (res)=> {
						const filePaths=res.tempFilePaths
						console.log(filePaths)
						for (var i = 0; i < filePaths.length; i++) {
							this.send(filePaths[i],1)
						}
				    }
				});
			},
			send(mes,type){
				if (this.msg!='') {
					let data={
						message:this.msg||mes,
						types:type||0
					}
					this.$emit('mes',data)
					this.msg=''
					this.showSend=false
				}
				if (type==1) {
					let data={
						message:this.msg||mes,
						types:type||0
					}
					this.$emit('mes',data)
				}
				if (type==2) {
					let data={
						message:this.msg||mes,
						types:type||0
					}
					this.$emit('mes',data)
				}
				if (type==3) {
					let data={
						message:this.msg||mes,
						types:type||0
					}
					this.$emit('mes',data)
				}
			},
			inputs(e){
				let info = e.detail.value
				let pos=info.indexOf('\n')
				if (pos!=-1&&info.length>1) {
				    if (this.msg!='') {
				    	this.send(this.msg,0)
						this.msg=''
				    }
				}
				if(this.msg!=''){
					this.showSend=true
				}else{
					this.showSend=false;
				}
			},
			changeRec(){
				if (this.isRecord) {
					this.showEmo=false
					this.showMore=false
					this.actBt='0'
					this.isRecord=false
				} else{
					this.$emit('changeRsh',this.isRecord)
					this.showEmo=false
					this.showMore=false
					this.actBt='0'
					this.isRecord=true
				}
			},
			emoHandle(e){
				this.msg=this.msg+e
				this.showSend=true
			},
			showTop(e){
				if(this.showEmo==true||this.showMore==true){
					this.actBt=0
				}
				this.showEmo=false
				this.showMore=false
				this.isRecord=false
				this.$emit('passSignToTop',e)
			},
			hide(e){
				this.actBt='0'
				this.$emit('passSignBack',e)
				this.showEmo=false
				this.showMore=false
				this.isRecord=false
			},
			touchstart(e){
				this.pageY=e.changedTouches[0].pageY
				this.voiceBg='block'
				let i=1
				this.vLen=0
				this.timer=setInterval(()=>{
					this.vLen=i
					i++
					this.voiceWidth=Number(this.voiceWidth.split('rpx')[0])+2+'rpx'
					this.voiceHeight=Number(this.voiceHeight.split('rpx')[0])+2+'rpx'
					if (i>60) {
						clearInterval(this.timer)
						this.touchend()
					}
				},1000)
				recorderManager.start();
			},
			touchmove(e){
				if (this.pageY-e.changedTouches[0].pageY>100) {
					this.voiceBg='none'
				}
			},
			touchend(e){
				clearInterval(this.timer)
				recorderManager.stop();
				recorderManager.onStop((res)=> {
					let data={
						voice:res.tempFilePath,
						time:this.vLen
					}
					if(this.voiceBg=='block'){
						this.send(data,2)
					}
					this.voiceBg='none'
				});
				
			},
			choosePos(){
				this.showMore=false
				this.actBt='0'
				this.$emit('noticePosSh')
				uni.chooseLocation({
				    success: (res)=> {
						let data={
							name:res.name,
							address:res.address,
							latitude:res.latitude,
							longitude:res.longitude
						}
						this.send(data,3)
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
				    }
				});

			}
		},
	}
	
	
	
</script>

<style lang="scss">
	
	.bar{
			z-index: 100;
			// height: auto;
			margin-bottom: env(safe-area-inset-bottom);
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100vw;
			height: auto;
			// box-sizing: border-box;
			background: linear-gradient(91deg,#f8c390,#d279ee 70%,#a5bcff);
			
			.left{
				// height: inherit;
					float: left;
					
				button{
					height: 68rpx;
					width: 360rpx;
					margin-left: 10%;
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					background: linear-gradient(91deg,#f8c390,#d279ee 50%,#a5bcff);
				}
				textarea{
					margin-top: 28rpx;
					margin-left: 24rpx;
					border: 1px solid sliver;
					margin-right: 12rpx;
					max-width: 420rpx;
					background-color: #fff;
					word-break: break-all;
					overflow-y: scroll; 
				}
			}
			.center{
				position: absolute;
				text-align: center;
				align-items: center;
				font-family: 'FZShouJinShu-S10S';
				font-weight: 800;
				font-size: 48rpx;
				
				textarea{
					
					text-align: left;
					background-color: #FFFFFF;
					margin-top: 10rpx;
					margin-left: 16%;
					bottom:5rpx;
					border: 1px solid gray;
					width: 420rpx;
					height: 60rpx;
				}
				left: 0;
			    right: 0;
				bottom: 75%;
				transform: translateY(75%);
				
				image{
					width: 128rpx;
					height: 68rpx;
					margin-top: 10rpx;
				}
			}
			.right{
				float: right;
				margin-top: 4rpx;
				margin-right: 24rpx;
				// margin: auto;
				.search{
					position: relative;
					width: 88rpx;
					height: 88rpx;
					line-height: 88rpx;
					display: inline-block;
					
				}
				.voice{
					width: 88rpx;
					height: 88rpx;
					line-height: 88rpx;
					display: inline-block;
				}
				.add{
				
					font-size: 36rpx;
					width: 72rpx;
					height: 64rpx;
					line-height: 64rpx;
					display: inline-block;
				
				}
				
				image{
					padding: 18rpx 0 0 18rpx;
					width: 52rpx;
					height: 52rpx;
				}
			}
		}
		.send{
			transform: translateY(-12%);
			margin-right: 12rpx;
			
		}
		.emo{
			bottom: 0;
			width: 100vw;
			height: 205rpx;
			
		}
		.voice_bg{
			height: 100%;
			width: 100%;
			background-color: rgba(0,0,0,0.3);
			position: fixed;
			top: 0;
			bottom: 0;
			z-index: 99;
			.voice_len{
				max-height: 240rpx;
				max-width: 240rpx;
				width: 120rpx;
				height: 120rpx;
				min-width: 120rpx;
				min-height: 120rpx;
				border-radius: 50%;
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				text-align: center;
				background: linear-gradient(91deg,#f8c390,#d279ee 50%,#a5bcff);
				.voice_time{
					display: inline-block;
					min-width: 120rpx;
					max-width: 240rpx;
					line-height: 120rpx;
					font-weight: 300;
					font-size: 58rpx;
				}
			}
			.voice_del{
				position: absolute;
				margin-bottom: env(safe-area-inset-bottom);
				bottom: 120rpx;
				font-size: 36rpx;
				width: 100%;
				text-align: center;
				color: white;
				
			}
		}
</style>
