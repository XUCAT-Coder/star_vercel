<template>
	<view>
		<view class="all" v-if="isC" @click="isC=false"></view>
		<view class="qiu" :style="'transform: translate('+ x +'px,' + y +'px);'"
		 :class="{chu:isC}"
		  @click="isC=!isC"
		   @touchstart="touchS"
			@touchmove.stop.prevent="touchM"
			 @touchend="touchE"
			   >
			<image :class="{zhuan:isC}" :src="imgurl" mode=""></image>
		</view>
		<view class="model" :style="'transform: translate('+ x +'px,' + (y+52) +'px);'" :class="{model1:isC}">
			<view class=""><view class="yuan" @tap="my">我</view>我的</view>
			<view class=""><view class="yuan" @tap="circle">圈</view>好友</view>
			<view class=""><view class="yuan" @tap="showConnection">官方</view>合作</view>
		</view>
	</view>
</template> 

<script>
export default {
	data() {
		return {
			isC:false,
			start:{
				left:0,
				top:0
			},
			x:0,
			y:0,
			oldx:0,
			oldy:0,
			
		}
	},
	props: {
		imgurl: {
			type: String,
			default: ''
		},
	},
	methods: {
		my(){
			this.$emit('linkDetail',this.isC)
		},
		circle(){
			console.log('cir')
		},
		showConnection(){
			console.log('con')
		},
		touchS(val){
			this.isMove=true
			this.start.left = val.changedTouches[0].clientX 
			this.start.top = val.changedTouches[0].clientY 
		},
		touchM(val){
			if(this.isMove==false){
				return
			}
			this.x = this.oldx + val.changedTouches[0].clientX  - this.start.left 
			this.y = this.oldy + val.changedTouches[0].clientY  - this.start.top 
		},
		touchE(val){
			this.x=0
			
			this.oldx=this.x
			this.oldy=this.y
			this.isMove=false
		},
	}
};
</script>

<style scoped lang="scss">
.all{
	background-color: rgba(#000000, 0.3);
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
}
.qiu{
	position: fixed;
	top: 45%;
	right: -20rpx;
	width: 42px;
	height: 42px;
	border-radius: 50%;
	background: linear-gradient(91deg,#f8c390,#d279ee 25%,#a5bcff);
	
	transition-property: right,top,height,width;
	transition-duration:0.5s;
	display: flex;
	justify-content: center;
	align-items: center;
	image{
		border-radius: 50%;
		width: 60rpx;
		height: 60rpx;
		transition: all 0.4s;
	}
}
.zhuan{
	border-radius: 50%;
	width: 24px !important;
	height: 24px !important;
}
.chu{
	right: calc(50% - 16px);
	top: 32%;
	z-index: 101;
	width: 32px;
	height: 32px;
}
.model{
	position: fixed;
	z-index: 101;
	opacity: 0;
	transition: all 0.5s;
	background: linear-gradient(150deg, #1F4F73 0%,#4A655E 100%);
	box-shadow: 2px 2px 8px 2px rgba($color: #1F4F73, $alpha: 0.5);
	border-radius: 10px;
	width: 50%;
	display: flex;
	justify-content: space-around;
	padding: 10px;
	left: calc(25% - 10px);
	top: 30%;
	color: #fff;
	text-align: center;
	font-size: 14rpx;
	.yuan{
		height: 36px;
		width: 36px;
		font-weight: 800;
		font-size: 16rpx;
		line-height: 36px;
		text-align: center;
		background: linear-gradient(91deg,#f8c390,#d279ee 12.5%,#a5bcff);
		border-radius: 18px;
		margin-bottom: 4px;
		color: #333;
	}
}
.model1{
	opacity: 1;
}
</style>