<template>
  <div>
      <div class="userComment">
    <div class="comment" >
      <div class="name">
            <div class="user">
                <img
                    class="user_img"
                    :src="`${$axios.defaults.baseURL}${data.account.defaultAvatar}`"
                    alt
                />&nbsp;
                <span>{{ data.account.nickname }}</span>&nbsp;
                <span>{{ data.created_at }}</span>
            </div>
         <span>1</span>
      </div>
      <UserList v-if="data.parent" :data="data.parent"></UserList>
      <div class="content-img">
            <p>{{ data.content }}</p>
            <div class="img">
               <div v-for="(value, index) in data.pics" :key="index" v-if="value.url">
                   <img  :src="`${$axios.defaults.baseURL}${value.url}`"   />
               </div>
            </div>
      </div>
    </div>
    <span @click.stop="reply(data)">回复</span>
  </div>
  </div>
</template>

<script>
// 引入事件总线
import { EventBus } from "@/components/eventBus.js"
export default {
    name:"UserList",
    props: ["data"],
    methods: {
        reply (data) {
      EventBus.$emit("reply",data)

      }
    }
}
</script>

<style lang="less" scoped>
 .userComment {
  position: relative;

  padding: 10px 20px 5px 20px;
//   margin: 0 20px;
  background-color: #fff;
  border: solid 1px #999;
  /deep/.userComment{
  position: relative;
    padding: 10px 10px 5px 10px;
  border-bottom: dashed 1px #999;
  background-color: #f9f9f9;
  }
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