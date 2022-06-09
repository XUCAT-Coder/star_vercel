<template>
  <view class="frireq">
    <view class="top_bar">
      <view class="top_bar_left">
        <image src="../../static/img/back_oth.png" mode="" @tap="back"></image>
      </view>
      <view class="top_bar_center">
        <view class="title"> 好友请求 </view>
      </view>
      <view class="top_bar_right">
        <view class="empty"> </view>
      </view>
    </view>
    <scroll-view scroll-y="true" class="scr">
      <view class="main">
        <view class="requestor" v-for="(item, index) in requests" :key="index">
          <view class="req_left">
            <image :src="item.imgUrl" mode=""></image>
          </view>
          <view class="req_center">
            <view class="name">{{ item.name }}</view>
            <view class="notice">
              {{ item.info }}
            </view>
          </view>
          <view class="right">
            <view class="yes"> 接受 </view>
            <view class="no"> 拒绝 </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import datas from "../../common/js/datas.js";
import utils from "../../common/js/utils.js";
export default {
  data() {
    return {
      requests: [],
    };
  },
  onLoad() {
    this.getRequests();
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
        animationType: "pop-out",
        animationDuration: 300,
      });
    },
    getRequests: function () {
      this.requests = datas.friends();
      for (let i = 0; i < this.requests.length; i++) {
        this.requests[i].imgUrl = "../../static/img/" + this.requests[i].imgUrl;
      }
      console.log(this.requests);
    },
    changeTime: function (date) {
      return utils.dateTime(date);
    },
  },
};
</script>

<style lang="scss">
.top_bar {
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 92rpx;
  border-bottom: 1px solid gray;
  //为了兼容不同手机头部
  padding-top: var(--status-bar-height);
  box-shadow: 0 1 0 0 rgba(0, 0, 0, 0.1);
  background: linear-gradient(91deg, #f8c390, #d279ee 25%, #a5bcff);
  .top_bar_left {
    float: left;
    margin-left: 26rpx;

    image {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      // padding: 24rpx 0 0 18rpx;
      width: 48rpx;
      height: 48rpx;
      // border-radius: 16rpx;
    }
  }
  .top_bar_center {
    position: absolute;
    text-align: center;
    align-items: center;
    font-family: "FZShouJinShu-S10S";
    font-weight: 300;
    font-size: 36rpx;

    left: 50%;
    right: 0;
    top: 50%;
    transform: translate(-50%, -50%);

    image {
      width: 128rpx;
      height: 68rpx;
      margin-top: 10rpx;
    }
  }
  .top_bar_right {
    float: right;
  }
}
.scr {
  height: 100vh;
}
.main {
  padding-top: 120rpx;
  background: linear-gradient(91deg, #f8c390, #d279ee 70%, #a5bcff);
  // height: auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.requestor {
  // padding-top: 20rpx;
  // justify-content: flex-start;
  justify-content: space-around;
  width: 100vw;
  flex: 1;
  // margin-top: 20rpx;

  .req_left {
    margin-left: 48rpx;
    float: left;
    image {
      border-radius: 50%;
      width: 80rpx;
      height: 80rpx;
    }
  }
  .req_center {
    width: 180rpx;
    margin-left: 48rpx;
    align-items: center;
    line-height: 40rpx;
    float: left;

    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .notice {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .right {
    width: 180rpx;
    text-align: center;
    align-items: center;
    height: 80rpx;
    line-height: 80rpx;
    float: right;
    margin-right: 24rpx;
    .yes {
      float: left;
      margin-right: 24rpx;
    }
  }
}
</style>
