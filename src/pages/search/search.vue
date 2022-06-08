<template>
	<view class="search_main">
		<view class="top_bar">
			
			<view class="top_bar_left">
				<view class="text">
					<input type="search" placeholder="搜索用户/群" class="search_content" @input="searching"/>
				</view>
				<!-- <view class="search">
					<image src="../../static/img/search.png" mode=""></image>
				</view> -->
			</view>
			<view class="top_bar_center">
				<view class="search">
					<image src="../../static/img/search.png" mode=""></image>
				</view>
			</view>
			<view class="cancel" @tap="back">
				取消
			</view>
			
			
		</view>
		<!-- 测试1 -->
		<view class="main">
			<scroll-view scroll-y="true" class="search_main">
				<view class="res">
					<view class="list user" v-for="(item,index) in userArr" :key="item.id"> 
						<navigator :url="`../userhome/userhome?uid=${uid}&fid=${item._id}&token=${token}&tip=${item.tip}&name=${name}`" >
							<image :src="item.imgurl" mode=""></image>
						</navigator>
						
						<view class="info">
							<view class="name" v-html="item.name"></view>
							<view class="email" v-html="item.email"></view>
						</view>
						<view :class="[{tip:item.tip==1},{add:item.tip==0}]">
							<button type="default" size="mini" v-if="item.tip==1" @tap="toChat(item)">发消息</button>
							<button type="default" size="mini" v-if="item.tip==0" @tap="toAddFriend(item)">加好友</button>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
		
	</view>
</template>

<script>
	import datas from '../../common/js/datas.js'
	export default {
		data() {
			return {
				isHas:false,
				userArr:[],
				token:'',
				uid:'',
				name:'',
				imgurl:''
			}
		},
		methods: {
			toChat(item){
				console.log('发消息',item);
			},
			toAddFriend(item){
				uni.navigateTo({
				    url: `../userhome/userhome?uid=${this.uid}&fid=${item._id}&token=${this.token}&tip=${item.tip}&name=${this.name}`,
				});
			},
			onLoad(options){
				this.getLocalStorage()
				
			},
			getLocalStorage(){
				try {
				    const e = uni.getStorageSync('user');
				    if (e) {
						this.uid=e.id
						if (this.imgurl=='user.png') {
							this.imgurl=this.serveUrl+'/user/'+e.imgurl
						}else{
							this.imgurl=e.imgurl
						}
						this.name=e.name
						this.token=e.token
						console.log(this.token)
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
			back(){
				uni.navigateBack({
				    delta: 1,
				    animationType: 'pop-out',
				    animationDuration: 300
				});
			},
			//填充关键词
			searching(e){
				this.userArr=[]
				let searchVal=e.detail.value
				
				if (searchVal.length>=1) {
					this.debounce(this.searched(searchVal),2000)
					
				}
				
			},
			//关键词匹配用户对象列表
			searched(key){
				uni.request({
					url:this.serveUrl+'/search/user',
					data:{
						data:key,
						token:this.token
					},
					method:'POST',
					success:(res)=>{
						console.log(res)
						if (res.data.status==200) {
							
							try {
							   let arr=res.data.result
							   // let exp=eval("/"+key+"/g")//关键词匹配正则
							   //搜索结果处理
							   arr.forEach((item)=>{
							   	if (item['name'].search(key) != -1||item['email'].search(key)!=-1) {
							   		   //执行好友哨兵
							   		   this.isFriend(item,key)
							   			// //图片路径处理
							   			// item.imgUrl=this.imgurl
							   			// //关键词高亮处理
							   			// item.name=item.name.replace(exp,"<span style='color:#f2709c'>"+key+"</span>")
							   			// item.email=item.email.replace(exp,"<span style='color:#4aaaff'>"+key+"</span>")
							   			// this.userArr.push(item)  
							   	}
							   })
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
			//好友哨兵：判断是否为好友
			isFriend(item,key){
				
				let exp=eval("/"+key+"/g")//关键词匹配正则
				let tip=0;//1为好友，0不是好友
				if (item._id==this.uid) {
					//排除自己
					tip=2
					item.tip=tip
					//图片路径处理
					if (item.imgurl=='user.png') {
						item.imgurl=this.serveUrl+'/user/user.png'
					}
					//关键词高亮处理
					item.name=item.name.replace(exp,"<span style='color:#f2709c'>"+key+"</span>")
					item.email=item.email.replace(exp,"<span style='color:#4aaaff'>"+key+"</span>")
					this.userArr.push(item) 
				}else{
					uni.request({
						url:this.serveUrl+'/search/isfriend',
						data:{
							uid:this.uid,
							fid:item._id,
							token:this.token
						},
						method:'POST',
						success:(res)=>{
							console.log(res)
							if (res.data.status==200) {
								//是好友
								try {
								   tip=1
								} catch (e) {
								    // error
									uni.showToast({
									    title: '未知错误',
										icon:'none',
									    duration: 2000
									});
								}
							
							}else if(res.data.status==400){
								//不是好友
								tip=0
							}
							else if(res.data.status==300){
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
							}
							item.tip=tip
							//图片路径处理
							if (item.imgurl=='user.png') {
								item.imgurl=this.serveUrl+'/user/'+item.imgurl
							}
							//关键词高亮处理
							item.name=item.name.replace(exp,"<span style='color:#f2709c'>"+key+"</span>")
							item.email=item.email.replace(exp,"<span style='color:#4aaaff'>"+key+"</span>")
							this.userArr.push(item)  
						}
					})
				}
				console.log(this.userArr)
			},
			//防抖函数
			debounce(func, wait=500) {
			    let timer;
			    return function() {
			      let context = this; // 注意 this 指向
			      let args = arguments; // arguments中存着e
			         
			      if (timer) clearTimeout(timer);
			 
			      timer = setTimeout(() => {
			        func.apply(this, args)
			      }, wait)
			    }
			}
		}
	}
</script>

<style lang="scss">

.search_main {
	height: 100vh;
	padding-top: var(--status-bar-height);padding-bottom: $uni-spacing-col-base;
	background: #9796f0;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #fbc7d4, #9796f0);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #fbc7d4, #9796f0); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
.text{
	border: 1px solid gray;
	background: #E0EAFC;  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #CFDEF3, #E0EAFC);  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #CFDEF3, #E0EAFC); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

	border-radius: 48rpx;
	position: absolute;
	width: 68%;
	right: 28%;
	top: 78%;
	transform: translateY(-78%);
	input{
		padding-left: 15rpx;
	}
	
	
}

.top_bar{
		z-index: 120;
		border-bottom: 1px solid $uni-border-color;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 92rpx;
		// box-sizing: border-box;
		// background: linear-gradient(91deg,#f8c390,#d279ee 70%,#a5bcff);
		// background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, #e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25, #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);
		
		// padding-left: $uni-spacing-col-base;
		//为了兼容不同手机头部
		padding-top: var(--status-bar-height);
		
		box-shadow: 0 1 0 0 rgba(0,0,0,0.10);
		
	    .search{
			display: inline-block;
			position: absolute;
			right: 132rpx;
			top: 81%;
			transform: translateY(-81%);
			image{
				width: 48rpx;
				height: 48rpx;
				
				border-radius: 16rpx;
			}
		}
		
	}
.cancel{
	float: right;
		width: 88rpx;
		height: 88rpx;
		display: inline-block;
		line-height: 88rpx;
		text-align: center;
		align-items: center;
		margin-right: 24rpx;	
}
.main{
    font-size: 32rpx;
	margin-left: 4%;
	padding-top: 5rpx;
	.res{
		// padding-top: 44rpx;
		
	}
	
	.list{
		width: 100vw;
		padding-bottom:  5rpx;
		margin-top: 128rpx;

		image{
			float: left;
			// box-shadow:0 30rpx 70rpx rgba(0,0,0,0.2),0 6rpx 20rpx rgba(0,0,0,0.1);
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}
		.info{
			float: left;
		}
		.tip{
			button{
				width: 24%;
				height: 24%;
				float: right;
				margin-right: 48rpx;
				background: #acb6e5;  /* fallback for old browsers */
				background: -webkit-linear-gradient(to right, #86fde8, #acb6e5);  /* Chrome 10-25, Safari 5.1-6 */
				background: linear-gradient(to right, #86fde8, #acb6e5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

			}
			
		}
		.add{
			button{
				width: 24%;
				height: 24%;
				float: right;
				margin-right: 48rpx;
			    background: #fd746c;  /* fallback for old browsers */
				background: -webkit-linear-gradient(to right, #ff9068, #fd746c);  /* Chrome 10-25, Safari 5.1-6 */
				background: linear-gradient(to right, #ff9068, #fd746c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
				
			}
			
		}
	}
}
</style>
