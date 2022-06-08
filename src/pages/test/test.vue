<template>
	<view class="test">
		<button type="default" @tap="upload">点我上传</button>
		<view class="img" v-for="(item,index) in imgs">
			<image :src="item" mode="aspectFill"></image>
			{{item}}
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'dladalsdlajlsd',
				imgs:[],
				urls:'user'
			}
		},
		methods: {
			upload(){
				
				uni.chooseImage({
					 count: 6, //默认9
					 sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					 sourceType: ['album','camera'], //从相册选择
				     success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						for (var i = 0; i < tempFilePaths.length; i++) {
							const uploadTask = uni.uploadFile({
							    url: this.serveUrl+'/files/upload', //仅为示例，非真实的接口地址
							    filePath: tempFilePaths[i],
							    name: 'file',
							    formData: {
							         url:this.urls,
									 name:new Date().getTime()+this.id+i
							    },
							    success: (uploadFileRes) => {
									console.log(uploadFileRes)
									let path=this.urls+'/'+uploadFileRes.data.replace('user','')
									console.log(path)
									this.imgs.push(`${this.serveUrl}/`+path)
									// console.log(path)
							        // console.log(uploadFileRes.data);
							    }
							});
											
							uploadTask.onProgressUpdate((res) => {
							    console.log('上传进度' + res.progress);
							    console.log('已经上传的数据长度' + res.totalBytesSent);
							    console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
											
							    // 测试条件，取消上传任务。
							    // if (res.progress > 50) {
							    //     uploadTask.abort();
							    // }
							});
						}
				        
				    }
				});
			}
		}
	}
</script>

<style>
.test{
	text-align: center;
	align-items: center;
}
</style>
