<template>
  <div class="main">
      <!-- 头部 -->
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
                        <h1>{{postRelated.title}}</h1>
                    </el-row>

                    <!-- 文章详情内容 -->
                    <el-row class="content-details" v-html="postRelated.content"></el-row>

                    <!-- 文章分享部分 -->
                    <el-row type="flex" class="share">
                        <a href="javascript:;" class="share-icon"  @click="focusState">
                            <i class="el-icon-edit-outline"></i>
                            <p>评论({{postRelated.comments.length}})</p>
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
                            <p @click="handelLike">点赞({{postRelated.like}})</p>
                        </a>
                    </el-row>

                    <!-- 评论部分 -->
                    <el-row style="width:700px;">
                        <el-form class="comment">
                                <p>评论</p>
                                <el-form-item>
                                    <el-input
                                    type="textarea"
                                    resize="none"
                                    ref="commentUser"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="textarea">
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
                                    <!-- action必须是服务器地址的路径 -->
                                <el-upload
                                    action="http://liangwei.tech:1337/upload"
                                    list-type="picture-card"
                                    :on-success='imgSuccess'
                                    name="files"
                                    :limit="3"
                                    multiple
                                    :on-remove="handleRemove">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                </el-form-item>
                                <input @click="submitComment" type="button" class="submit" value="提交">
                         </el-form>
                    </el-row>

                    <!-- 用户评论列表 -->
                    <el-row class="commntenList" style="width:700px; text-align:center;">
                        <commentList :data="commentsList" v-if="postRelated.comments.length"></commentList>
                        <div v-else>暂无用户评论</div>
                    </el-row>

                    <!-- 分页部分 -->
                    <el-row type="flex" style="justify-content:center;width:700px;" >
                         <div class="block" style="flex:1">
                            <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="1"
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
     

  </div>
</template>

<script>
// 引入单组件文件
import relatedPost from "@/components/post/relatedPost.vue"
import commentList from "@/components/post/commentList.vue"
export default {
    data () {
        return {
            postRelated:{
                comments:[]
            },//文章详情数据
            textarea:'',
             reList:'', //推荐文章列表参数
             commentDate:{
                 content:'',//评论内容
                 pics:[],//图片文件数组
                //  follow:'',//回复id
                 post:''//文章id
             },
             commentsList:{
                 
             },
             PostList:{//获取评论列表的数据参数
                 post:'',
                 _sort:'',
                 _limit:10,
                 _start:0
             }
        }
    },
    components: {
        relatedPost,commentList
    },
    methods: {
        // 提交评论
        submitComment () {
            // this.commentDate.follow = this.postRelated.account.id
            this.commentDate.post = this.$route.query.id
            this.commentDate.content = this.textarea
            let token = this.$store.state.user.userInfo.token
            this.$axios({
                url:"/comments",
                method:'POST',
                data:this.commentDate,
                headers: {
                     "Authorization" : "Bearer " + token
                     
                }
            }).then(res => {
                this.$message({
                    type:'success',
                    message:'提交成功'
                })

            })
        },
        // 获取文章详情数据
        getPostDate() {
              const id = this.$route.query.id || 5
                // 文章详情数据请求
                this.$axios({
                    url:'/posts',
                    params:{ id }
                }).then(res=>{
                    this.postRelated = res.data.data[0]
                    console.log(this.postRelated);
                })
        },
        // 实现点赞功能
        handelLike () {
            const id = this.$route.query.id || 5
            let token = this.$store.state.user.userInfo.token
            if(token){
                this.$axios({
                url:'/posts/like',
                params:{ id },
                headers:{
                    Authorization : "Bearer " +  token
                },
                }).then( res => {
                    this.postRelated.like += 1
                    if(!res.message=="用户已点赞") {
                        this.postRelated.like += 1
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }else {
                this.$message({
                    message:'请先登录账号'
                })
                this.$router.push({path:"/login"})
            }
        },
        // 上传文件成功时调用的函数
        // response请求成功时响应回来的结果数据
        // file当前上传当个文件的数据
        // fileList多份文件上传的数据
        imgSuccess (response) {
            if(response[0].url){
                // 存储上传的文件数据
                this.fileList.push(response[0])
               this.commentDate.pics.push(response[0]) 
            }
             
        },
        //删除上传文件时调用
        handleRemove (file, fileList){
            // files删除的文件数据
            // fileList剩下未删除的文件数据信息
         fileList[0].response.forEach(item => {
             this.commentDate.pics = []
             this.commentDate.pics.push(item)
         })
        
        },
        // 点击评论实现聚集功能
        focusState () {
            this.$refs.commentUser.focus()
        },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    mounted () {
        this.getPostDate()
        
        const id = this.$route.query.id || 5
        // 实现获取表论列表数据
          this.PostList.post = id*1
        this.$axios({
            url:'/posts/comments',
            data:this.PostList
        }).then(res => {
             this.commentsList = res.data.data.map(value => {
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
            console.log( this.commentsList);
        })
        // 文章推荐求情
        this.$axios({
            url:'/posts/recommend',
            params:{ id }
         }).then(res => {
            // 时间的格式转化毫秒转化为标准时间
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
    /deep/.content-detail{
        /deep/p:nth-child(5){
            img{
            width: 70px !important;
            height: 70px !important;
            }
        }
    }
</style>