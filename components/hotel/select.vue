<template>
  <div class="select">
    <el-row>
      <!-- 目的地 -->
      <el-col :span="5">
        <el-autocomplete
          v-model="selectPlace"
          :fetch-suggestions="placeSearch"
          :trigger-on-focus="false"
          @select="handlePlace"
          class="inline-input"
          placeholder="目的地"
        />
      </el-col>
      <!-- 日期 -->
      <el-col :span="5">
        <div class="grid-content bg-purple-light">
          <el-date-picker
            v-model="getDate"
            @change="changeDate"
            type="daterange"
            range-separator="-"
            start-placeholder="入住日期"
            end-placeholder="离店日期"
            value-format="yyyy-MM-dd"
          />
        </div>
      </el-col>
      <!-- 人数 -->
      <el-col :span="4" @click="clickMenber">
        <el-input v-model="people" @click="clickMenber" placeholder="请输入内容">
          <i
            slot="suffix"
            class="iconfont iconuser el-input__icon "
          />
          <!-- <span>每间</span> -->
        </el-input>
        <el-button type="primary">
          查看价格
        </el-button>
      </el-col>
    </el-row>
    <div v-if="isMenber" class="showmenber">
      <el-popover
        v-model="visible"
        placement="top"
        width="150"
      />
      <el-row>
        <el-col :span="8">
          <div>每间</div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in peopleoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                size="mini"
              />
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in peopleoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                size="mini"
              />
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-button type="primary" size="mini">
          确定
        </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      // 目的地
      selectPlace: '',
      //   所有酒店信息
      allHotel: [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': '三全鲜食', 'address': '长宁' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' }
      ],
      allMenber: [],
      //   日期选择
      getDate: '',
      peopleoptions: [{
        people: '选项1',
        label: '1'
      }, {
        people: '选项2',
        label: '2'
      }],
      people: '',
      isMenber: false
    }
  },
  methods: {
    clickMenber () {
      console.log(123)
      this.isMenber = !this.isMenber
      console.log(this.isMenber)
    },
    //   获取选择目的地
    placeSearch (queryString, cb) {
      console.log(queryString)
      //   const hotel = this.allHotel
      const results = queryString ? this.allHotel.filter(this.createFilter(queryString)) : this.allHotel
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (hotel) => {
        // console.log(hotel)  // hotel获取的所有数据
        return (hotel.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 选择目的地
    handlePlace (item) {
      console.log(item)
    },
    // 选择日期
    changeDate (item) {
      console.log(item)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .my-autocomplete {
    name {
        width: 100px;
    }
    ul {
        li {
            width: 100px;
        }
    }
}
</style>
