<template>
  <div class="hotelmap">
    <div class="map-left" flex="3">
      <div class="area">
        <div class="title">
          区域:
        </div>
        <div :class="showAllArea?'':'hidden'" class="area-content">
          <a href>全部</a>
          <a
            v-for="(val,index) in scenics"
            :key="index"
            href="javascript:;"
          >&nbsp;{{ val.name }}&nbsp;</a>
          <br>
        </div>
        <span @click="showArea">
          <i :class="showAllArea?'up':'down'" class="el-icon-d-arrow-right" />等43个区域
        </span>
      </div>
      <div class="method" type="flex" justify="space-between" flex="1">
        <div class="title">
          攻略:
        </div>
        <div>北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</div>
      </div>
      <div class="price">
        <div class="title">
          均价:
        </div>
        <span>
          <i class="iconfont iconhuangguan" />
          <i class="iconfont iconhuangguan" />
          <i class="iconfont iconhuangguan" />
          ￥332
        </span>
      </div>
    </div>
    <div class="map-right" flex="2">
      2
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      AllInfo: [],
      scenics: [],
      showAllArea: false
    }
  },
  mounted () {
    this.$axios({
      url: '/cities',
      params: {
        name: '南京市'
      }
    }).then((res) => {
      console.log(res.data.data[0].scenics)
      this.scenics = res.data.data[0].scenics
    }).then(this.$axios({
      url: '/province/search?',
      params: {
        id: 9
      }
    }).then((res) => {
      console.log(res)
    }))
  },
  methods: {
    showArea () {
      console.log(1)
      this.showAllArea = !this.showAllArea
    }
  }
}
</script>

<style lang="less" scoped>
.map {
  display: flex;
  justify-items: space-between;
  .map-left {
    width: 100%;
  }
  .map-right {
    background-color: slateblue;
    width: 100%;
  }
}
.map {
  margin-top: 20px;
  .map-left {
    .area,
    .method,
    .price {
      margin-bottom: 20px;
    }
    .title {
      width: 12%;
      float: left;
      box-sizing: border-box;
    }
    .area-content {
      a:focus {
        background: #eee;
        cursor: auto;
        text-decoration: none;
        color: #999;
      }
      a:first-child {
        background: #eee;
        cursor: auto;
        text-decoration: none;
        color: #999;
      }
    }
  }
}
.down {
  transform: rotate(90deg);
  color: orange;
}
.up {
  transform: rotate(270deg);
  color: orange;
}
.hidden {
  max-height: 3em;
  overflow: hidden;
}
</style>
