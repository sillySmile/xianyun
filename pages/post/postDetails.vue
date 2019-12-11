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
                    <el-row class="content-details" v-html="postRelated.content"></el-row>

                    <!-- 文章分享部分 -->
                    <el-row type="flex" class="share">
                        <a href="javascript:;" class="share-icon">
                            <i class="el-icon-edit-outline"></i>
                            <p>评论(100)</p>
                        </a>
                        <a href="javascript:;" class="share-icon">
                            <i class="el-icon-star-off"></i>
                            <p>收藏</p>
                        </a>
                        <a href="javascript:;" class="share-icon">
                            <i class="iconfont iconfenxiang"></i>
                            <p>分享</p>
                        </a>
                        <a href="javascript:;" class="share-icon">
                            <i class="iconfont iconding"></i>
                            <p>点赞(19)</p>
                        </a>
                    </el-row>

                    <!-- 评论部分 -->
                    <el-form class="comment ">
                        <p>评论</p>
                        <el-form-item>
                            <el-input
                            type="textarea"
                            resize="none"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="textarea">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                           <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                           </el-upload>
                            <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>
                        <input type="button" class="submit" value="提交">
                    </el-form>

                    <!-- 用户评论列表 -->
                    <el-row class="commntenList">
                        <commentList></commentList>
                    </el-row>
               </div>

               <!-- 右侧部分 -->
               <div class="content-right">
                   <relatedPost></relatedPost>
               </div>
        </div>
     

      <!-- 底部 -->
      <footer></footer>
  </div>
</template>

<script>
// 引入单组件文件
import header from "@/components/header.vue"
import footer from "@/components/footer.vue"
import relatedPost from "@/components/post/relatedPost.vue"
import commentList from "@/components/post/commentList.vue"
export default {
    data () {
        return {
            postRelated:{},
            textarea:'',
             dialogImageUrl: '',
             dialogVisible: false
        }
    },
    components: {
        header, footer ,relatedPost,commentList
    },
    methods: {
        handlePictureCardPreview () {

        },
        handleRemove (){

        }
    },
    mounted () {
        const id = 5
        this.$axios({
            url:'/posts',
            params:{ id }
        }).then(res=>{
            console.log(res);
            this.postRelated = res.data.data[0]
        })
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
                margin-right: 20px;
              .title{
                padding:20px 0;
                border-bottom: 1px solid #ccc;
                margin-bottom: 10px;
                  >h1{
                    font-size: 2em;
                  }
                }
              .content-details{
                    width: 700px;
                    /deep/img{
                        width: 100%;
                    }
                }
                .share{
                    justify-content: center;
                    padding: 50px 0;
                    .share-icon{
                        display: block;
                        text-align: center;
                        margin: 0 20px;
                        >i{
                            font-size: 28px;
                            color: #ffa518;
                            margin-bottom: 5px;
                        }
                        p{
                            font-size: 14px;
                        }
                    }
                }
                .comment {
                    padding: 20px 0;
                    position: relative;
                    >p{
                        font-size: 18px;
                        line-height: 40px;
                    }
                    .submit{
                        width: 50px;
                        height: 30px;
                        background-color: #409eff;
                        color: #fff;
                        border: none;
                        outline: none;
                        text-align: center;
                        border-radius: 5px;
                        position: absolute;
                        top: 130px;
                        right: 0;
                        &:hover{
                            color: #66b1ff;
                            cursor: pointer;
                            color: #fff;
                        }
                    }
                }
            }
            .content-right{
                flex:3;
            }
        }
    }
</style>