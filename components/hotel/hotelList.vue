<template>
  <div class="hotelList">
    <el-row>
      <el-col :span="4">
        <div class="choosePrice">
          <div class="PriceText">
            <span>价格</span>
            <span>0-{{ priceBar*1 }}</span>
          </div>
          <div class="block">
            <el-slider v-model="priceBar" />
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="hotelStyle">
          <p>住宿等级</p>
          <el-select v-model="level" @change="change" collapse-tags placeholder="不限" multiple>
            <el-option
              v-for="(item,index) in AllInfo.levels"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="hotelStyle">
          <p>住宿类型</p>
          <el-select v-model="type" @change="change" placeholder="不限" multiple collapse-tags>
            <el-option
              v-for="(item,index) in AllInfo.types"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="hotelStyle">
          <p>酒店设施</p>
          <el-select v-model="asset" @change="change" placeholder="不限" multiple collapse-tags>
            <el-option
              v-for="(item,index) in AllInfo.assets"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="hotelStyle brand">
          <p>酒店品牌</p>
          <el-select v-model="brand" @change="change" placeholder="不限" multiple collapse-tags>
            <el-option
              v-for="(item,index) in AllInfo.brands"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      priceBar: 4000,
      level: '',
      type: '',
      asset: '',
      brand: '',
      AllInfo: {}
    }
  },
  mounted () {
    this.$axios({
      url: '/hotels/options'
    }).then((res) => {
      this.AllInfo = res.data.data
      console.log(this.AllInfo)
      // console.log(res.data.data)
    })
  },
  methods: {
    // 价格变化条
    formatTooltip (val) {
      return val / 4000
    },
    // 筛选
    change () {
      const changeInfo = { ...this.AllInfo }
      // 筛选等级
      if (this.level.length !== 0) {
        let changeLevel = []
        changeLevel = changeInfo.levels.filter((ele) => {
          this.level.forEach((val) => {
            if (ele.id === val) {
              changeLevel.push(ele)
            }
          })
          changeInfo.levels = changeLevel
          return true
        })
      }
      // 筛选类型
      if (this.type.length !== 0) {
        let changeType = []
        changeType = changeInfo.types.filter((ele) => {
          this.type.forEach((val) => {
            if (ele.id === val) {
              changeType.push(ele)
            }
          })
          changeInfo.types = changeType
          return true
        })
      }
      // 筛选酒店设施
      if (this.asset.length !== 0) {
        let changeAsset = []
        changeAsset = changeInfo.assets.filter((ele) => {
          this.asset.forEach((val) => {
            if (ele.id === val) {
              changeAsset.push(ele)
            }
          })
          changeInfo.assets = changeAsset
          return true
        })
      }
      // 筛选酒店品牌
      if (this.brand.length !== 0) {
        let changebrand = []
        changebrand = changeInfo.brands.filter((ele) => {
          this.brand.forEach((val) => {
            if (ele.id === val) {
              changebrand.push(ele)
            }
          })
          changeInfo.brands = changebrand
          return true
        })
      }
      // console.log(changeInfo)
      this.$emit('Allchange', changeInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.hotelList {
  border: 1px solid #ddd;
  margin: 20px 0;
  .choosePrice {
      padding: 5px 20px;
      border-right: 1px solid #ddd;
      box-sizing: border-box;
    .PriceText {
      display: flex;
      justify-content: space-between;
    }
  }
  .hotelStyle {
      margin: 5px 20px;
      box-sizing: border-box;
      border-right: 1px solid #ddd;
      /deep/input {
          border: none !important;
      }
  }
  .brand {
         border-right: none;
      }
}
</style>
