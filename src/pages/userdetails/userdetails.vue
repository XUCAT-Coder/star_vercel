<template>
	<view class="details">
		<view class="top_bar" @tap="back">
			<!-- <view class="top_bar_left" @tap="back">
				<image src="../../static/img/back_oth.png" mode=""  class="left_img"></image>
			</view> -->
				
			<view class="top_bar_center">
				{{title}}
			</view>
		</view>
		<view class="main" v-if="flag==0">
			<view class="column heads">
				<view class="row head">
					<view class="title">
						头像
					</view>
					<view class="cont"  @tap="changeImg">
						<image :src="imgurl" mode="" class="user_img"></image>
						
					</view>
					<cut :url="url" @ok="confirm" @cancel="cancel"  :width="300" :height="300" class="cut"></cut>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 2 -->
				<view class="row head">
					<view class="title">
						签名
					</view>
					<input type="text" :value="intro" class="cont" v-if="IntroSwitch" auto-focus="true" @blur="upToSign"/>
					<view class="cont" @tap="changeIntro" v-if="!IntroSwitch">
						{{this.intro}}
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 3 -->
				<view class="row head">
					<view class="title">
						入住
					</view>
					<view class="cont">
						{{this.time}}
					</view>
				</view>
			</view>
			<!-- 二 -->
			<view class="column heads">
				<view class="row head">
					<view class="title">
						昵称
					</view>
					<view class="cont">
						{{this.name}}
					</view>
				</view>
				<!-- 2 -->
				<view class="row head">
					<view class="title">
						性别
					</view>
					<view class="cont">
						<picker @change="bindPickerChange" :value="index" :range="array">
						    <view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit" ></image>
					</view>
				</view>
				<!-- 3 -->
				<view class="row head">
					<view class="title">
						生日
					</view>
					<view class="cont">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						       <view class="uni-input">{{date}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 4 -->
				<view class="row head">
					<view class="title">
						电话
					</view>
					<input type="text" :value="phone" class="cont" v-if="PhoneSwitch" auto-focus="true" @blur="upToPhone"/>
					<view class="cont" v-if="!PhoneSwitch" @tap="changePhone">
						{{this.phone}}
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 5 -->
				<view class="row head">
					<view class="title">
						邮箱
					</view>
					<input type="text" :value="email" class="cont" v-if="EmailSwitch" auto-focus="true" @blur="upToEmail"/>
					<view class="cont" v-if="!EmailSwitch" @tap="changeEmail">
						{{this.email}}
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 6 -->
				<view class="row head" v-if="flag==0">
					<view class="title">
						密码
					</view>
					<view class="cont"  @tap="toChangePsw">
						⭐修⭐改⭐密⭐码⭐
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <sign></sign> -->
		<view class="main" v-if="flag!=0">
			<view class="column heads">
				<view class="row head">
					<view class="title">
						头像
					</view>
					<view class="cont" >
						<image :src="imgurl" mode="" class="user_img"></image>
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 2 -->
				<view class="row head">
					<view class="title">
						签名
					</view>
					<view class="cont">
						{{this.intro}}
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 3 -->
				<view class="row head">
					<view class="title">
						入住
					</view>
					<view class="cont">
						{{this.time}}
					</view>
				</view>
			</view>
			<!-- 二 -->
			<view class="column heads">
				<view class="row head">
					<view class="title">
						昵称
					</view>
					<view class="cont">
						{{this.name}}
					</view>
				</view>
				<!-- 2 -->
				<view class="row head">
					<view class="title">
						性别
					</view>
					<view class="cont">
						<picker disabled>
						    <view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit" ></image>
					</view>
				</view>
				<!-- 3 -->
				<view class="row head">
					<view class="title">
						生日
					</view>
					<view class="cont">
						<picker mode="date" disabled>
						       <view class="uni-input">{{date}}</view>
						</picker>
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 4 -->
				<view class="row head">
					<view class="title">
						电话
					</view>
					<view class="cont" >
						{{this.phone}}
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
				<!-- 5 -->
				<view class="row head">
					<view class="title">
						邮箱
					</view>
					<view class="cont" >
						{{this.email}}
					</view>
					<view class="more">
						<image src="../../static/img/point.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom_btn" @tap="logout" v-if="flag==0">
			退出登录
		</view>
		<view class="bottom_btn" @tap="delFri" v-if="flag==1">
			删除好友
		</view>
		<view class="bottom_btn" @tap="addFri" v-if="flag==2">
			添加好友
		</view>
	</view>
</template>

<script>
	//details页面传进来的有可能是现登录用户本身的id，也可能是没加好友的陌生人id，二者统一归为id进行网络请求相应的数据
	//如果不是自身，儿是陌生人或者是好友，那么应该根据flag标识，建立相应的uid，uid也就是当前登录用户本身的id
	import cut from "../../components/ksp-image-cutter/ksp-image-cutter.vue"
	export default {
		data() {
			 const currentDate = this.getDate({
			            format: true
			        })
			return {
				 array: ['男', '女', '未知'],
				 index:1,
				 date: currentDate,
				 uid:'',
				 id:'',
				 token:'',
				 name:'',
				 imgurl:'',
				 email:'',
				 sex:'',
				 time:'',
				 intro:'',
				 birth:'',
				 phone:'待补充手机号',
				 title:'个人详情',
				 IntroSwitch:false,
				 PhoneSwitch:false,
				 EmailSwitch:false,
				 url:'',
				 flag:''
			}
		},
		components: {
			cut
		},
		methods: {
			delFri(){
				console.log('del');
				uni.showModal({
				    title: '提示',
				    content: '是否删除好友？',
				    success:(res)=> {
				        if (res.confirm) {
				           uni.request({
				           	url:this.serveUrl+'/friend/refuseorrejectfriend',
				           	data:{
				           		uid:this.uid,
				           		fid:this.id,
				           		token:this.token
				           	},
				           	method:'POST',
				           	success:(res)=>{
				           		console.log(res)
				           		if (res.data.status==200) {
				           			uni.showToast({
				           			    title: '删除成功',
				           				icon:'none',
				           			    duration: 2000
				           			});
				           		}else if(res.data.status==300){
				           			uni.showToast({
				           			    title: '登录过期，请重新登录',
				           				icon:'none',
				           			    duration: 2000
				           			});
				           			if (this.flag==0) {
				           				let name=this.name
				           				setTimeout(function(e) {
				           					uni.navigateTo({
				           						url: '../login/login?name='+e,
				           						success: res => {},
				           						fail: () => {},
				           						complete: () => {}
				           					});
				           				}, 3000,name);
				           			}else{
				           				setTimeout(function() {
				           					uni.navigateTo({
				           						url: '../login/login',
				           						success: res => {},
				           						fail: () => {},
				           						complete: () => {}
				           					});
				           				}, 3000);
				           			}
				           			
				           		}
				           		else if(res.data.status==500){
				           			uni.showToast({
				           			    title: '删除失败~',
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
				        } else if (res.cancel) {
				            
				        }
				    }
				});
				
				
			},
			addFri(){
				console.log('add');
				//flag为0则为自己，应该显示退出登录
				//flag为1则为好友，应该显示退删除好友
				//flag为2则为陌生人，应该显示添加好友
				uni.navigateTo({
					url: '../userhome/userhome?id='+this.id+'&flag='+2+'&uid='+this.uid+'&token='+this.token+'&name='+this.name,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			confirm(res){

				this.url = ""
						const uploadTask = uni.uploadFile({
						    url: this.serveUrl+'/files/upload', //仅为示例，非真实的接口地址
						    filePath: res.path,
						    name: 'file',
						    formData: {
						         url:'user',
								 name:this.id,
								 token:this.token
						    },
						    success: (uploadFileRes) => {
								let path=uploadFileRes.data
							    this.imgurl=''
								this.imgurl=this.serveUrl+path

								try {
								    uni.setStorageSync('user',{
										'id':this.id,
										'name':this.name,
										'imgurl':this.imgurl,
										'token':this.token
									});
								} catch (e) {
								    // error
									uni.showToast({
									    title: '本地存储错误~',
										icon:'none',
									    duration: 2000
									});
								}
								
						    }
						});
										
						uploadTask.onProgressUpdate((res) => {
						    console.log('上传进度' + res.progress);
							if (res.progress==100) {
								console.log('finish');
								uni.request({
									url:this.serveUrl+'/user/update',
									data:{
										id:this.id,
										token:this.token,
										type:'imgurl',
										data:this.imgurl
									},
									method:'POST',
									success:(res)=>{
										
										console.log(res)
										if(res.data.status==200){
											// setTimeout(() => {
											// 	this.$router.go(0)
											// }, 400)
											setTimeout(function(id) {
												uni.navigateTo({
													url: '../userdetails/userdetails?id='+id,
													success: res => {},
													fail: () => {},
													complete: () => {}
												});
											}, 2000,this.id);
											uni.request({
												url:this.serveUrl+'/user/detail',
												data:{
													id:this.id,
													token:this.token
												},
												method:'POST',
												success:(res)=>{
													console.log(res)
													if (res.data.status==200) {
														
														try {
														   this.name=res.data.result.name
														   this.uid=res.data.result._id
														   if (res.data.result.imgurl=='user.png') {
														   	this.imgurl=this.serveUrl+'/user/'+res.data.result.imgurl
														   }else{
															this.imgurl=res.data.result.imgurl
														   }
														   this.email=res.data.result.email
														   this.sex=res.data.result.sex
														   this.time=res.data.result.time.replace('T',' ').split('.')[0]
														   if (res.data.result.birth) {
														   	this.birth=res.data.result.birth.split('T')[0]
														   }
														   if (res.data.result.intro) {
														   	this.intro=res.data.result.intro
														   }
														   if (res.data.result.phone) {
														   	this.phone=res.data.result.phone
														   }else{
															this.phone='待补充手机号'
														   }
														   
														   if (this.sex=='asexual') {
														   	//中性
														   	this.index=2
														   }else if(this.sex=='male'){
														   	//男的
														   	this.index=0
														   }else if(this.sex=='female'){
														   	this.index=1
														   }
														   if (this.birth) {
														   	this.date=this.birth
														   }else{
															   uni.request({
															   	url:this.serveUrl+'/user/update',
															   	data:{
															   		id:this.id,
															   		token:this.token,
															   		type:'birth',
															   		data:this.date
															   	},
															   	method:'POST',
															   	success:(res)=>{
															   		console.log(res)
															   		if(res.data.status==300){
															   			
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
											uni.showToast({
											    title: '头像修改成功~',
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
						    console.log('已经上传的数据长度' + res.totalBytesSent);
						    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
										
						    // 测试条件，取消上传任务。
						    // if (res.progress > 50) {
						    //     uploadTask.abort();
						    // }
						});
			},
			cancel(res){
				console.log(res)
				this.url = ""
			},
			toChangePsw(){
				uni.navigateTo({
				    url: `../changepsw/changepsw?id=${this.id}&token=${this.token}&name=${this.name}`,
				});
			},
			changeImg(){
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: (res)=> {
						// const filePaths=res.tempFilePaths
						this.url = res.tempFilePaths[0]
						// console.log(this.url)
				
						
				    }
				});
			},
			upToSign(e){
				let info=e.detail.value
				uni.request({
					url:this.serveUrl+'/user/update',
					data:{
						id:this.id,
						token:this.token,
						type:'intro',
						data:info
					},
					method:'POST',
					success:(res)=>{
						this.intro=info
						this.IntroSwitch=false
						console.log(res)
						if(res.data.status==300){
							
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
			},
			changeIntro(){
				this.IntroSwitch=true
			},
			upToPhone(e){
				let info=e.detail.value
				uni.request({
					url:this.serveUrl+'/user/update',
					data:{
						id:this.id,
						token:this.token,
						type:'phone',
						data:info
					},
					method:'POST',
					success:(res)=>{
						this.phone=info
						this.PhoneSwitch=false
						console.log(res)
						if(res.data.status==300){
							
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
			},
			changePhone(){
				this.PhoneSwitch=true
			},
			upToEmail(e){
				let info=e.detail.value
				let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
				if (reg.test(info)) {
					uni.request({
						url:this.serveUrl+'/user/update',
						data:{
							id:this.id,
							token:this.token,
							type:'email',
							data:info
						},
						method:'POST',
						success:(res)=>{
							this.email=info
							this.EmailSwitch=false
							console.log(res)
							if(res.data.status==300){
								
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
				}else{
					this.EmailSwitch=false
					uni.showToast({
					    title: '邮箱格式错误~',
						icon:'none',
					    duration: 2000
					});
				}
				
			},
			changeEmail(){
				this.EmailSwitch=true
			},
			logout(){
				uni.navigateTo({
				    url: '../login/login',
				});
			},
			getLocalStorage(){
				try {
				    const e = uni.getStorageSync('user');
				    if (e) {
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
			onLoad(options){
				this.getLocalStorage()
				// console.log(options.id)
				//flag为0则为自己，应该显示退出登录
				//flag为1则为好友，应该显示退删除好友
				//flag为2则为陌生人，应该显示添加好友
				if (options.flag) {
					if (options.flag==0) {
						this.flag=0
					}else if (options.flag==1) {
						this.flag=1
					}else if (options.flag==2) {
						this.flag=2
					}
				}
				if (options.uid) {
					this.uid=options.uid
				}
				if (options.id) {
					this.id=options.id
					console.log(this.id);
					console.log(this.uid);
					uni.request({
						url:this.serveUrl+'/user/detail',
						data:{
							id:this.id,
							token:this.token
						},
						method:'POST',
						success:(res)=>{
							
							if (res.data.status==200) {
								console.log(res.data.result.imgurl=='user.png')
								
									this.name=res.data.result.name
									// this.uid=res.data.result._id
									if (res.data.result.imgurl=='user.png') {
										this.imgurl=this.serveUrl+'/user/'+res.data.result.imgurl
									}else{
										this.imgurl=res.data.result.imgurl
									}
								   this.email=res.data.result.email
								   this.sex=res.data.result.sex
								   console.log(this.sex);
								   this.time=res.data.result.time.replace('T',' ').split('.')[0]
								   if (res.data.result.birth) {
								   	this.birth=res.data.result.birth.split('T')[0]
								   }
								   
								   this.intro=res.data.result.intro
								   if (res.data.result.phone) {
								   	this.phone=res.data.result.phone
								   }else{
								    this.phone='待补充手机号'
								   }
								   
								   if (this.sex=='asexual') {
								   	//中性
								   	this.index=2
								   }else if(this.sex=='male'){
								   	//男的
								   	this.index=0
								   }else if(this.sex=='female'){
								   	this.index=1
								   }
								   if (this.birth) {
								   	this.date=this.birth
								   }else{
									   uni.request({
									   	url:this.serveUrl+'/user/update',
									   	data:{
									   		id:this.id,
									   		token:this.token,
									   		type:'birth',
									   		data:this.date
									   	},
									   	method:'POST',
									   	success:(res)=>{
									   		console.log(res)
									   		if(res.data.status==300){
									   			
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
				console.log(this.uid);//小明
				console.log(this.id);
			},
			back(){
				uni.navigateTo({
					url: '../index/index?id='+this.uid+'&token='+this.token,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
				
			},
			//性别选择器
			 bindPickerChange: function(e) {
			      // console.log('picker发送选择改变，携带值为', e.target.value)
			      //修改性别，如果还是原来的性别则不变
				  let changed = e.target.value
				  if (this.index==changed) {
				  	return ;
				  }else{
					  let info=''
					  if (changed==0) {
					  	info='male'
						this.index=0
					  }else if(changed==1){
						info='female'
						this.index=1
					  }else if(changed==2){
						info='asexual'
						this.index=2
					  }
					  
					  uni.request({
					  	url:this.serveUrl+'/user/update',
					  	data:{
					  		id:this.id,
					  		token:this.token,
							type:'sex',
							data:info
					  	},
					  	method:'POST',
					  	success:(res)=>{
					  		console.log(res)
					  		if(res.data.status==300){
					  			
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
			//日期选择器
			bindDateChange: function(e) {
			      let changed = e.target.value
				  if (this.date==changed) {
				  	return ;
				  }else{
					  this.date=changed
					  uni.request({
					  	url:this.serveUrl+'/user/update',
					  	data:{
					  		id:this.id,
					  		token:this.token,
					  		type:'birth',
					  		data:changed
					  	},
					  	method:'POST',
					  	success:(res)=>{
					  		console.log(res)
					  		if(res.data.status==300){
					  			
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
			getDate(type) {
			            const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			}
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		},
	}
</script>

<style lang="scss">
	.cut{
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
	}
.left_img{
	   display: inline-block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 52rpx;
		height: 52rpx;}
.top_bar{
	background: linear-gradient(91deg,#f8c390,#d279ee 70%,#a5bcff);
	// display: flex;
	// flex-direction: row;
	align-items: center;
	// text-align: center;
		z-index: 120;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100rpx;
		border-bottom: 3rpx solid rgba(39,40,50,0.4);
		//为了兼容不同手机头部
		padding-top: var(--status-bar-height);
		// box-shadow: 0 1 0 0 rgba(0,0,0,0.10);
		
		.top_bar_left{
			float: left;
			margin: auto;
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
			top: 75%;
			transform: translateY(-75%);
			
			image{
				width: 128rpx;
				height: 68rpx;
				margin-top: 10rpx;
			}
		}
		
	}
	.main{
		background: linear-gradient(91deg,#f8c390,#d279ee 100%,#a5bcff);
		padding-top: 130rpx;
		display: flex;
		flex-direction: column;
		.column{
			display: flex;
			flex-direction: column;
			padding-top: 12rpx;
			width: 100%;
			.row{
				display: flex;
				flex-direction: row;
			}
			.title{
				flex: none;
				padding:0 32rpx;
				font-size: 36rpx;
				color: $uni-text-color;
				line-height: 80rpx;
			}
			.cont{
				flex: auto;
				// padding-top: 12rpx;
				padding-left: 32rpx;
				font-size: 30rpx;
				color: $uni-text-color-grey;
				line-height: 60rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				// display: flex;
				align-items: center;
			}
			.more{
				flex: none;
				align-items: center;
				display: flex;
				// padding-top: 32rpx;
				image{
					width: 80rpx;
					height: 42rpx;
				}
				
			}
		}
	}
	.user_img{
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
	}
	.head{
		height: 144rpx;
		display: flex;
		align-items: center;
	}
	.bottom_btn{
		background: linear-gradient(240deg,#f8c390,#d279ee 90%,#a5bcff);
		font-size: 38rpx;
		text-align: center;
		line-height: 88rpx;
	}
</style>
