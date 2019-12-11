<template>
  <div class="main">
      <!-- 头部 -->
        <header></header>

        <!-- 内容部分 -->
        <div class="content">
               <!-- 左侧内容部分 -->
               <div class="content-left">
                   <!-- 面包屑导航 -->
                   <el-row>
                       <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
                            <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
                        </el-breadcrumb>
                   </el-row>
                    <!-- 文章标题 -->
                    <el-row class="title">
                        <h1>远东行：用好奇心打量这座城 —— 最值得收藏的海参崴出行攻略</h1>
                    </el-row>

                    <!-- 文章详情内容 -->
                    <div class="content-details"></div>
               </div>

               <!-- 右侧部分 -->
               <div class="content-right"></div>
        </div>
     

      <!-- 底部 -->
      <footer></footer>
  </div>
</template>

<script>
import header from "@/components/header.vue"
import footer from "@/components/footer.vue"
export default {
    components: {
        header, footer
    }
}
</script>

<style lang="less" scoped>
    .main{
        padding-top: 20px;
        .content{
            display:flex;
            width: 1000px;
            margin: 0 auto;
            .content-left{
                flex: 7;
            .title{
                padding:20px 0;
                border-bottom: 1px solid #ccc;
                margin-bottom: 10px;
                >h1{
                    font-size: 2em;
                }
            }
            }
            .content-right{
                flex:3;
            }
        }
    }
</style>