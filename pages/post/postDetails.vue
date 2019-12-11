<template>
  <div class="main">
      <!-- 头部 -->
        <header></header>

        <!-- 内容部分 -->
        <div class="content">
               <!-- 左侧内容部分 -->
               <div class="content-left">
                   <!-- 面包屑导航 -->
                   <el-row >
                       <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
                            <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
                        </el-breadcrumb>
                   </el-row>
                    <!-- 文章标题 -->
                    <el-row class="title"style="width:700px;">
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
                    <el-row style="width:700px;">
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
                    </el-row>

                    <!-- 用户评论列表 -->
                    <el-row class="commntenList" style="width:700px;">
                        <commentList></commentList>
                    </el-row>

                    <!-- 分页部分 -->
                    <el-row type="flex" style="justify-content:center;width:700px;" >
                         <div class="block" style="flex:1">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            current-page="1"
                            :page-sizes="[100, 200, 300, 400]"
                            :page-size="100"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="400">
                            </el-pagination>
                        </div>
                    </el-row>
               </div>

               <!-- 右侧部分 -->
               <div class="content-right">
                   <relatedPost :data="reList"></relatedPost>
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
            postRelated:{},//文章详情数据
            textarea:'',
             dialogImageUrl: '',
             dialogVisible: false,
             reList:'' //推荐文章列表参数
        }
    },
    components: {
        header, footer ,relatedPost,commentList
    },
    methods: {
        handlePictureCardPreview () {

        },
        handleRemove (){

        },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted () {
        const id = 5
        // 文章详情数据请求
        this.$axios({
            url:'/posts',
            params:{ id }
        }).then(res=>{
            console.log(res);
            this.postRelated = res.data.data[0]
        })
        // 文章推荐求情
        this.$axios({
            url:'/posts/recommend',
            params:{ id }
        }).then(res => {
            console.log(res.data.data.created_at);
            // this.reList = res.data.data
             this.reList = res.data.data.map(value => {
                const data = new Date (value.created_at*1)
                let year = data.getFullYear()
                let month = data.getMonth() + 1
                let day = data.getDate()
                let time = year + "-" + month + "-" + day
                return {
                    ...value,
                    created_at: time
                }
            })
            console.log(this.reList);
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
                flex: 7 !important;
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
                .block{
                    text-align: center;
                    padding: 20px 0;
                }
            }
            .content-right{
                flex:3;
            }
        }
    }
</style>