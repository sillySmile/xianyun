<template>
  <div class="item">
    <div v-for="(val,index) in allInfo" :key="index" class="itemBox">
      <el-row>
        <el-col :span="10">
          <div class="picture">
            <a :href="`hotel/detail?id=${val.id}`">
              <img :src="val.photos">
            </a>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="hotelBody">
            <div class="left">
              <nuxt-link :to="`hotel/detail?id=${val.id}`">
                <h2>{{ val.name }}</h2>
              </nuxt-link>
              <p>
                {{ val.alias }}
                <i class="iconfont iconhuangguan" />
                <span>经济型</span>
              </p>
              <div class="pingjia">
                <i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);" />
                <span>3.5分</span>
                <span>30条评价</span>
                <span>60篇游记</span>
              </div>
              <div class="location">
                <i data-v-0a769ebc class="iconfont iconlocation" />
                <span>位于: {{ val.address }}</span>
              </div>
            </div>
            <div class="right">
              <a href="https://hotels.ctrip.com/hotel/694679.html" target="view_window">
                <div v-for="(val2,index) in val.products" :key="index" class="travelCom">
                  <span>{{ val2.name }}</span>
                  <span>￥{{ val2.price }}</span>
                  <span>起 ></span>
                </div>
              </a>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: ['allInfo'],
  mounted () {
    setTimeout(() => {
      console.log(this.allInfo)
    }, 2000)
  }
}

</script>

<style lang="less" scoped>
.item {
  .itemBox {
    padding: 25px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
  }
  .hotelBody {
    display: flex;
    justify-content: space-between;
  }
  .picture {
    margin-right: 40px;

    a {
      width: 100%;
      display: block;
      img {
        width: 100%;
        height: 276px;
      }
    }
  }
  .left {
    width: 100%;
    padding-right: 10px;
    box-sizing: border-box;
  }
  .right {
    width: 60%;
    position: relative;
    .travelCom {
      line-height: 23px;
      border-bottom: 1px solid #ebeef5;
      padding: 12px 10px;
      width: 100%;
      &:hover {
        background: #ebeef5;
        cursor: pointer;
      }
      span:first-child {
        margin-right: 20px;
        width: 50%;
      }
      span:nth-child(2) {
        font-size: 20px;
        color: #f90;
        width: 25%;
        position: absolute;
        right: 55px;
      }
      span:nth-child(3) {
        position: absolute;
        right: 5px;
      }
    }
  }
}
</style>
