<template>
<div style="border: 1px solid #999;">
  <div class="userComment" v-for="(item, index) in data" :key="index">
      <userComment :data="item"></userComment>
  </div>
</div>
</template>

<script>
import userComment from "@/components/post/userComment.vue"
export default {
  // name:"UserList",
  props: ["data"],
  components: {
    userComment
  }
}
</script>

<style lang="less" scoped>
.userComment {
  position: relative;
  padding: 10px 20px 5px 20px;
  border-bottom: dashed 1px #999;
  &:hover{
      >span{
          display: block;
      }
  }
     > span {
        position: absolute;
        font-size: 12px;
        line-height: 20px;
        color: #6475c1;
        display: none;
        bottom: 0;
        right: 10px;
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
  .comment {
    .name {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 14px;
        color: #666;
      }
      span:nth-child(3) {
        color: #999;
      }
    }
    .user {
      display: flex;
      .user_img {
        display: block;
        width: 16px;
        height: 16px;
      }
    }
    .content-img {
      width: 100%;
      position: relative;
      justify-content: space-between;
      > p {
        text-align: left;
        padding-left: 25px;
        font-size: 14px;
      }
      .img {
        padding:10px 15px 20px 0;
        padding-left: 15px;
        display: flex;
       >div{
           width:80px;
          height: 80px;
           padding: 5px;
           margin-right: 10px;
           border: dashed 1px #999;
            img {
           width:80px;
          height: 80px;
          background-size: cover;
          text-align: left;
        }
       }
       
      }
    }
  }
}
</style>
