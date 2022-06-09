<template>
  <view class="login_content">
    <view class="top_bar">
      <view class="top_bar_left" @tap="back">
        <image src="../../static/img/back.png" mode=""></image>
      </view>

      <view class="top_bar_right">
        <view class="register" @tap="toRegister()"> 注册 </view>
      </view>
    </view>
    <view class="login_img" @tap="testToken">
      <image src="../../static/img/login.png" mode=""></image>
    </view>
    <view class="main">
      <view class="title"> 登录 </view>
      <view class="login_tip"> 您好，欢迎来到星辰！ </view>
      <view class="inputs">
        <input
          type="text"
          value=""
          placeholder="用户名/邮箱/手机号"
          class="user"
          v-model="form.user"
        />
        <input
          type="password"
          value=""
          placeholder="密码"
          class="password"
          v-model="form.password"
        />
      </view>
      <!-- <transition  name="xwl">
				<view class="tips" v-if="flag">
					！输入用户或密码错误
				</view>
			</transition> -->
    </view>
    <view class="submit" @tap="login"> 登录 </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
      token: "",
    };
  },
  methods: {
    onLoad(options) {
      if (options.user) {
        this.form.user = options.user;
        uni.showToast({
          title: "注册成功!请登录~",
          icon: "none",
          duration: 2000,
        });
      }
      if (options.name) {
        this.form.user = options.name;
      }
    },
    //跳转相关
    toRegister() {
      uni.navigateTo({
        url: "../signup/signup",
        animationType: "pop-in",
        animationDuration: 300,
      });
    },
    //登录相关
    login() {
      if (this.form.user != "" && this.form.password != "") {
        console.log(typeof this.form.password);
        uni.request({
          url: this.serveUrl + "/login/match",
          header: { "content-type": "application/json" },
          data: {
            user: this.form.user,
            psw: this.form.password,
          },
          method: "POST",
          success: (res) => {
            console.log(this.serveUrl);
            console.log(res);
            if (res.data.status == 200) {
              this.token = res.data.back.token;

              try {
                uni.setStorageSync("user", {
                  id: res.data.back.id,
                  name: res.data.back.name,
                  imgurl: res.data.back.imgurl,
                  token: res.data.back.token,
                });
              } catch (e) {
                // error
                uni.showToast({
                  title: "本地存储错误~",
                  icon: "none",
                  duration: 2000,
                });
              }
              uni.navigateTo({
                url:
                  "../index/index?id=" +
                  res.data.back.id +
                  "&token=" +
                  this.token,
                success: (res) => {},
                fail: () => {},
                complete: () => {},
              });
            } else if (res.data.status == 400) {
              this.form.password = "";
              uni.showToast({
                title: "用户与密码不匹配",
                icon: "none",
                duration: 2000,
              });
            } else if (res.data.status == 500) {
              uni.showToast({
                title: "服务器内部错误~",
                icon: "none",
                duration: 2000,
              });
            }

            // if (res.statusCode==200) {

            // }
          },
        });
      }
      // uni.request({
      // 	url:this.serveUrl+'/files/upload',
      // 	data:{
      // 		url:'login',
      // 		name:''
      // 	},
      // 	method:'POST',
      // 	success:(res)=>{
      // 		console.log(res)
      // 		// if (res.statusCode==200) {
      // 		// 	uni.navigateTo({
      // 		// 		url: '../index/index',
      // 		// 		success: res => {},
      // 		// 		fail: () => {},
      // 		// 		complete: () => {}
      // 		// 	});
      // 		// }
      // 	}
      // })
    },
    testToken() {
      // uni.request({
      // 	url:'http://192.168.1.101:3000/login/token',
      // 	data:{
      // 		token:this.token
      // 	},
      // 	method:'POST',
      // 	success:(res)=>{
      // 		console.log(res)
      // 		// if (res.statusCode==200) {
      // 		// 	uni.navigateTo({
      // 		// 		url: '../index/index',
      // 		// 		success: res => {},
      // 		// 		fail: () => {},
      // 		// 		complete: () => {}
      // 		// 	});
      // 		// }
      // 	}
      // })
      // uni.request({
      // 	url:'http://192.168.1.101:3000/search/user',
      // 	data:{
      // 		data:'小'
      // 	},
      // 	method:'POST',
      // 	success:(res)=>{
      // 		console.log(res)
      // 		// if (res.statusCode==200) {
      // 		// 	uni.navigateTo({
      // 		// 		url: '../index/index',
      // 		// 		success: res => {},
      // 		// 		fail: () => {},
      // 		// 		complete: () => {}
      // 		// 	});
      // 		// }
      // 	}
      // })
    },
    //返回相关
    back() {
      uni.navigateTo({
        url: "../index/index",
        animationType: "pop-out",
        animationDuration: 300,
      });
      console.log("s");
    },
  },
};
</script>

<style lang="scss">
.login_content {
  height: 100vh;
  padding-top: var(--status-bar-height);
  padding-bottom: $uni-spacing-col-base;
  background: linear-gradient(91deg, #f8c390, #d279ee 50%, #a5bcff);
}
.top_bar {
  z-index: 99;
  border-bottom: 1px solid $uni-border-color;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 92rpx;
  // box-sizing: border-box;
  background: linear-gradient(91deg, #f8c390, #d279ee 70%, #a5bcff);
  // background:linear-gradient(to right, #bb313e25, #bb313e25, #d7222925, #dd4a1625, #e4761525, #f5c50025, #f0e92725, #b1ce2425, #48a93525, #03944525, #157c4f25, #176a5825, #1b556325, #1d386f25, #1d386f25, #20277825, #52266325, #8a244b25);

  // padding-left: $uni-spacing-col-base;
  //为了兼容不同手机头部
  padding-top: var(--status-bar-height);
  box-shadow: 0 1 0 0 rgba(0, 0, 0, 0.1);
  .top_bar_left {
    float: left;
    margin-left: 26rpx;

    image {
      box-shadow: 0 2px 2px rgba(10, 16, 20, 0.24),
        0 0 2px rgba(10, 16, 20, 0.12);
      transform: scaleX(1.5);
      width: 68rpx;
      height: 68rpx;
      margin-top: 10rpx;

      border-radius: 50%;
    }
  }

  .top_bar_right {
    float: right;
    .register {
      font-family: "FZShouJinShu-S10S";
      font-weight: 600;
      align-items: center;
      text-align: center;
      font-size: 40rpx;
      width: 108rpx;
      height: 88rpx;
      line-height: 88rpx;
      margin-right: 24rpx;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(0, 0, 0, 0.1) inset;
    }
  }
}
.login_img {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  image {
    padding-top: 200rpx;
    width: 300rpx;
    height: 280rpx;
    margin: 0 auto;
    display: inline-block;
  }
}
.main {
  margin-top: 30rpx;
  padding: 0 $uni-spacing-row-lg;
  margin-bottom: 24rpx;
  .title {
    font-size: 60rpx;
    font-weight: 500;
    margin-bottom: 24rpx;
    color: $uni-text-color;
    line-height: 88rpx;
  }
  .login_tip {
    font-size: 40rpx;
    font-weight: 400;
    color: rgba(39, 40, 50, 0.5);
    line-height: 56rpx;
  }
  .inputs {
    input {
      padding-top: 40rpx;
      height: 88rpx;
      font-size: 40rpx;
      font-weight: 500;
      color: $uni-text-color;
      line-height: 40rpx;
      border-bottom: 1px solid rgba(0, 0, 0, 0.6);
    }
  }
  .tips {
    padding-top: 20rpx;
    float: left;
    font-size: 40rpx;
    font-weight: 600;
    color: red;
    line-height: 56rpx;
  }
}
.submit {
  margin: 0 auto;
  margin-top: 120rpx;
  width: 420rpx;
  height: 96rpx;
  background: linear-gradient(91deg, #f1eefc, #9dc6ff 70%, #a5bcff);
  border-radius: 16rpx;
  text-align: center;
  align-items: center;
  line-height: 96rpx;
  &:active {
    background: linear-gradient(91deg, #f1eefc, #9dc6ff 95%, #a5bcff);
  }
  font-size: 64rpx;
  font-weight: 500;
}
.xwl-enter-from,
.xwl-leave-to {
  opacity: 0;
}
.xwl-enter-to,
.xwl-leave-from {
  opacity: 1;
}
.xwl-enter-active,
.xwl-leave-active {
  transition: opacity 2s ease;
}
</style>
