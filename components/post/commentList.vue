<template>
  <div class="comment">
      <div class="name">
          <div class="suer">
              <span>头像</span>&nbsp;
              <span>地球发动机</span>&nbsp;
              <span>2019-12-10 7:08</span>
          </div>
          <span>1</span>
      </div>
      <div class="content-img">
          <div class="img">
              <img src="" alt="">
          </div>
          <span>回复</span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 .comment{
     padding: 20px 20px 5px 20px !important;
     border: 1px solid #999;
     width: 1000px;
     border-bottom:  dashed 1px #999;
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
     .content-img{
         display: flex;
         width: 100%;
         position: relative;
         justify-content: space-between;
         .img{
             margin: 20px 0;
             width: 80px;
             height: 80px;
             background-color: skyblue;
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
</style>