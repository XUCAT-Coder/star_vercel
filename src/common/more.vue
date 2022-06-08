<template>
	<view class="more">
		<scroll-view scroll-y="true" class="src">
			<view class="more-box">
				<view class="frag" @tap="upPhoto">
					<image src="../static/img/photos.png" mode=""></image>
					<view class="photo">照片</view>
				</view>
				<view class="frag" @tap="upCamera">
					<image src="../static/img/pg.png" mode=""></image>
					<view class="photo">拍摄</view>
				</view>
				<view class="frag" @tap="choosePos">
					<image src="../static/img/pos.png" mode=""></image>
					<view class="photo">位置</view>
				</view>
				<view class="frag">
					<image src="../static/img/hb.png" mode=""></image>
					<view class="photo">红包</view>
				</view>
				<view class="frag">
					<image src="../static/img/file.png" mode=""></image>
					<view class="photo">文件</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			upPhoto() {
				this.$emit('passPhoto','album')
			},
			upCamera(){
				this.$emit('passCamera','camera')
			},
			choosePos(){
				this.$emit('passPos')
			}
		},
	}
</script>

<style lang="scss">
	.more{
		z-index: 110;
		position: fixed;
			bottom: 0;
			width: 100vw;
			height: 205rpx;
		.more-box{
			// width: 80%;
			display: flex;
			flex-flow:row wrap;
			justify-content: space-between;
			.frag{
				text-align: center;
				font-size: 24rpx;
				padding: 5%;
				image{
					width: 64rpx;
					height: 64rpx;
				}
			}
		}
	}
	
	.src{
		height: inherit;
	}
</style>
