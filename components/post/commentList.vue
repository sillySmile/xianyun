<template>
  <div class="main">
     <div class="comment" v-for="(item,index) in data" :key="index">
          <div class="name">
          <div class="user">
              <!-- {{item.account.defaultAvatar}} -->
              <img class="user_img" :src="`${$axios.defaults.baseURL}${item.account.defaultAvatar}`" alt="">&nbsp;
              <span>{{item.account.nickname}}</span>&nbsp;
              <span>{{item.created_at}}</span>
          </div>
          <span>1</span>
      </div>
      <div class="content-img">
          <p>{{item.content}}</p>
          <div class="img" v-for="(value,index) in item.pics" :key="index" v-if="value.url">
              <img  :src="`${$axios.defaults.baseURL}${value.url}`" alt="" >
          </div>
          <span>回复</span>
      </div>
     </div>
  </div>
</template>

<script>
export default {
    props: ["data"],
    data () {
        return {
            
        }
    },
    mounted () {
        console.log(this.data);

    }
}
</script>

<style lang="less" scoped>
 .main{
     border: 1px solid #999;
     .comment:last-child{
         border-bottom: none;
     }
     .comment{
     padding: 20px 20px 5px 20px !important;
     border-bottom:  dashed 1px #999;
     margin-bottom:10px; 
     .name{
         display: flex;
        justify-content: space-between;
        span{
            font-size: 14px;
            color: #666;
        }
        span:nth-child(3){
            color: #999;
        }
         
     }
     .user{
         display: flex;
         .user_img{
             display: block;
             width: 16px;
             height: 16px;
         }
     }
     .content-img{
        //  display: flex;
        padding-left: 20px;
         width: 100%;
         position: relative;
         justify-content: space-between;
         >p{
             text-align: left;
             font-size: 14px;
         }
         .img{
             margin: 20px 0;
             width: 80px;
             height: 80px;
             border: 1px solid #ccc;
            //  background-color: skyblue;
             img{
                 width: 100%;
             }
         }
         >span{
             position: absolute;
             font-size: 12px;
             line-height: 20px;
             color: #6475c1;
             display: none;
             bottom: 0;
             right: 10px;
             &:hover{
                 text-decoration: underline;
                 cursor: pointer;
             }
         }
         &:hover{
             span{
                 display: block;
             }
         }
     }
 }
 }
</style>