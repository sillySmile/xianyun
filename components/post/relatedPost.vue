<template>
  <div class="related">
      <el-row class="header">
          <p>相关攻略</p>
      </el-row>
      <a :href="`/post/postDetails?id=${item.id}`" v-for="(item,index) in data" :key="index">
          <div class="content">
                <div class="info">
                    <div class="left">
                        <img :src="item.images[0]" alt="">
                    </div>
                    <div class="right">
                        <p>{{item.title}}</p>
                        <p>{{item.created_at}}&nbsp;阅读&nbsp;{{item.watch}}</p>
                    </div>
                </div>
           </div>
      </a>
  </div>
</template>

<script>
export default {
    props: ["data"]
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
                        text-overflow: -o-ellipsis-lastline;
                    }
                    p:nth-child(1){
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    }
                }
            }
        }
  }
</style>