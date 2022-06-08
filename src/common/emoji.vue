<template>
	<view class="emoji">
		<scroll-view scroll-y="true" scroll-with-animation="true" class="emoScr">
			<view class="emoji_row" v-for="(row,i1) in emo" :key="i1">
				
					<view class="emoji_col" v-for="(col,i2) in row" :key="i2" @tap="click(col)">
						{{col}}
					</view>
				
				
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				    emo:[
						    ['😀','😁','😂','🤣','😃'],
							['😄','😅','😉','😊','😋'],
							['😎','😍','😘','🙂','😒'],
							['😎','😍','😘','🙂','😒'],
							['😎','😍','😘','🙂','😒'],
							['😎','😍','😘','🙂','😒'],
							['😎','😍','😘','🙂','😒'],
						  ],
				   }
				},
				methods: {
					click(e) {
						console.log(e,'click');
						this.$emit('emoaction',e)
					}
				},
	}
</script>
<style lang="scss">
	.emoji{
		
		// bottom: 100rpx;
		z-index: 110;
		width:100vw;
		// border: 1px solid red;
	}
	.emoScr{
		width: 100%;
		height: 100%;
	}
	.emoji_row{
		width:100vw;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		.emoji_col{
			margin-top: 20rpx;
			margin-bottom: 5rpx;
		}
	}
</style>
