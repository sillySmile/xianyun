<template>
  <div class="related">
      <el-row class="header">
          <p>相关攻略</p>
      </el-row>
      <a href="javascript:;">
          <div class="content">
        <div class="info">
            <div class="left">
                <img src="http://157.122.54.189:9095/uploads/9fab1e29d05245759bf18321b6fbf53c.jpg" alt="">
            </div>
            <div class="right">
                <p>大啊啊啊</p>
                <p>2019-12-11&nbsp;&nbsp;10:42&nbsp;阅读&nbsp;2</p>
            </div>
        </div>
    </div>
      </a>
  </div>
</template>

<script>
export default {

}   
</script>

<style lang="less" scoped>
  .related{
        .header{
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
        >p{
            font-size: 18px;
            font-weight: 400;
        }
        a{
            display: block;
        }
    }
    .content{
            padding: 20px 0;
            border-bottom: 1px solid #999;
            .info{
                display: flex;
                height: 80px;
                .left{
                    width: 100px;
                    margin-right: 10px;
                    img{
                        display: block;
                        width: 100px;
                        height: 80px;
                    }
                }
                .right{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    p:nth-child(2){
                        font-size: 12px;
                        color: #999;
                    }
                }
            }
        }
  }
</style>