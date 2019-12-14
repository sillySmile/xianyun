<template>
  <div class="detail">
    <div class="title">
      <span>{{ hotelInfo.name }}</span>
      <span v-if="hotelInfo.stars === 1" class="star"><i class="iconfont iconhuangguan" /></span>
      <span v-if="hotelInfo.stars === 2" class="star"><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /></span>
      <span v-if="hotelInfo.stars === 3" class="star"><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /></span>
      <span v-if="hotelInfo.stars === 4" class="star"><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /></span>
      <span v-if="hotelInfo.stars === 5" class="star"><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /><i class="iconfont iconhuangguan" /></span>
      <br>
      <p>{{ hotelInfo.alias }}</p>
      <p>
        <i class="iconfont iconlocation" />{{ hotelInfo.address }}
      </p>
    </div>
    <div class="picture">
      <el-row>
        <el-col :span="16" class="left">
          <div class="bigImg">
            <img :src="hotelInfo.photos" alt>
          </div>
        </el-col>
        <el-col :span="8" class="right">
          <el-row v-for="(val,index) in hotelInfo.pics" :key="index">
            <el-col :span="12">
              <div class="smallImg">
                <img :src="`http://157.122.54.189:9095${val.url}`" alt>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="tableList">
      <el-table :data="hotelInfo.products" style="width: 100%">
        <el-table-column prop="name" label="价格来源" width="400" />
        <el-table-column prop="bestType" label="低价房型" width="400" />
        <el-table-column prop="price" label="最低价格/每晚" />
      </el-table>
    </div>
    <div class="map">
      <p>地图</p>
    </div>
    <div class="hotelInfo">
      <div class="base">
        <el-row>
          <el-col :span="4">
            <span>基本信息</span>
          </el-col>
          <el-col :span="5">
            <span>入住时间: 14:00之后</span>
          </el-col>
          <el-col :span="5">
            <span>离店时间: 12:00之前</span>
          </el-col>
          <el-col :span="5">
            <span>{{ hotelInfo.creation_time }} / {{ hotelInfo.renovat_time }}</span>
          </el-col>
          <el-col :span="5">
            <span>酒店规模: {{ hotelInfo.roomCount }}间客房</span>
          </el-col>
        </el-row>
      </div>
      <div class="assets">
        <el-row>
          <el-col :span="4">
            <span>主要设施</span>
          </el-col>
          <el-col :span="20">
            <span v-for="(val,index) in hotelInfo.hotelassets" :key="index" class="assets-info">{{ val.name }}</span>
          </el-col>
        </el-row>
      </div>
      <div class="park">
        <el-row>
          <el-col :span="4">
            <span>停车服务</span>
          </el-col>
          <el-col :span="20">
            <span>{{ hotelInfo.parking }}</span>
          </el-col>
        </el-row>
      </div>
      <div class="brand">
        <el-row>
          <el-col :span="4">
            <span>品牌信息</span>
          </el-col>
          <el-col :span="20">
            <span>{{ hotelInfo.hotelbrand.name }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="comment">
      <h4>0条真实用户评论</h4>
      <div class="comment-info">
        <el-row>
          <el-col :span="5">
            <div class="comment-mark">
              <p>总评数：{{ hotelInfo.all_remarks }}</p>
              <p>好评数：{{ hotelInfo.good_remarks }}</p>
              <p>差评数：{{ hotelInfo.bad_remarks }}</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="box1">
              <path
                d="M 35 2, A 35,35 0 1 1 2.260214856622234,39.13599670762205"
                fill="none"
                stroke="rgb(255, 153, 0)"
                stroke-width="2"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hotelInfo: {
        pics:[],
        hotelbrand: {
          name: ''
        }
      }
    }
  },
  mounted () {
    // console.log(this.$route.query.id)
    this.$axios({
      url: '/hotels',
      params: {
        id: this.$route.query.id
      }
    }).then((res) => {
    //   console.log(res.data.data[0])
      const orgin = res.data.data[0]
      orgin.products.forEach((element) => {
        element.price = '￥' + element.price + '元'
      })
      if (!orgin.hotelbrand) {
        orgin.hotelbrand = { name: '' }
        console.log(orgin)
      }
      this.hotelInfo = orgin
      console.log(this.hotelInfo);
    })
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .title {
    span {
      font-size: x-large;
    }
    p {
      color: #666;
      font-size: 14px;
      margin: 0.3em;
    }
    .iconhuangguan {
      color: orange;
    }
  }
  .picture {
    margin: 40px 0;
    .left {
      padding-right: 10px;
      box-sizing: border-box;
    }
    .bigImg {
      width: 100%;
      img {
        // width: 640px;
        // height: 360px;
        max-width: 100%;
      }
    }
    .smallImg {
      width: 100%;
      padding-left: 20px;
      box-sizing: border-box;
      img {
        max-width: 100%;
        // width: 160px;
        // height: 110px;
      }
    }
  }
  .tableList {
    margin: 40px 0;
  }
  .map {
    margin: 40px 0;
    width: 100%;
    height: 360px;
    background: skyblue;
  }
  .hotelInfo {
    margin: 40px 0;
    .base,
    .assets,
    .park,
    .brand {
      padding: 20px 10px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
    }
    .assets {
      .assets-info {
        border: 1px solid #eee;
        padding: 4px 10px;
        margin-right: 10px;
        border-radius: 4px;
        background-color: #eee;
        color: #666;
      }
    }
  }
  .comment {
    h4 {
      font-size: 20px;
    }
    .comment-info {
      color: #666;
      padding: 20px 0;
      font-size: 18px;
    }
    .comment-mark {
    }
    .box1 {
      width: 70px;
      height: 70px;
      path {
        width: 70px;
        height: 70px;
      }
    }
  }
}
</style>
