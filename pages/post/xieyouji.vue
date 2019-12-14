<template>
  <div class="xieyouji">
    <!-- 左边部分 -->
    <div class="left">
      <h2>发表新攻略</h2>
      <p>分享你的个人游记，让更多人看到哦</p>
      <input type="text" placeholder="输入标题" v-model="title" />
      <!-- 下面是富文本框 -->
      <div id="app">
        <VueEditor :config="config" ref="vueEditor" />
      </div>
      <!-- 城市搜索 -->
      <el-row class="demo-autocomplete souCity">
        <el-col :span="3" class="sou">选择城市</el-col>
        <el-col :span="12">
          <el-autocomplete
            class="inline-input"
            v-model="chengshi"
            :fetch-suggestions="querySearch"
            placeholder="请搜索游玩城市"
            @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>
      <!-- 按钮 -->
      <el-row>
        <el-col :span="3">
          <div class="grid-content bg-purple-dark">
            <el-button type="primary" @click="public">发布</el-button>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark">
            <span>
              或者
              <a href="javascript:;" class="save" @click="save">保存到草稿</a>
            </span>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 右边部分 -->
    <div class="right">
      <div class="caogao">
        <!-- {{$store.state.caogao.caoInfo}} -->
        <h3>草稿箱({{$store.state.caogao.caoInfo.length}})</h3>
        <div class="caoList" v-for="(item,index) in $store.state.caogao.caoInfo" :key="index">
          <a href="javascript:;" class="caocao">
            <span class="title" @click="showCao(index)">{{item.title}}</span>
            <i class="el-icon-edit" @click="showCao(index)"></i>
            <i class="el-icon-delete" @click="del(index)"></i>
          </a>
          <span class="create_at">{{item.created_at}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
// nuxt就加下面这两行
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  methods: {
    //保存到草稿
    save() {
      const content = this.$refs.vueEditor.editor.root.innerHTML;
      const cao1 = {
        title: this.title,
        city: this.city,
        content: content,
        created_at: this.created_at,
        chengshi: this.chengshi
      };
      this.$store.commit("caogao/addCao", cao1);
    },
    // 点击草稿项显示出来
    showCao(dex) {
      var info = this.$store.state.caogao.caoInfo;
      (this.title = info[dex].title),
        (this.city = info[dex].city),
        (this.chengshi = info[dex].chengshi),
        (this.content = info[dex].content),
        (this.created_at = info[dex].created_at);
      var quill = this.$refs.vueEditor.editor;
      quill.root.innerHTML = "";
      quill.clipboard.dangerouslyPasteHTML(0, `<div>${this.content}</div>`);
    },
    //删除当前草稿
    del(dex) {
      this.$store.commit("caogao/delCao", dex);
      this.title='',
      this.chengshi='';
      const quill = this.$refs.vueEditor.editor;
      quill.root.innerHTML = "";
      quill.clipboard.dangerouslyPasteHTML(0, `<div></div>`);
    },
    //发布文章
    public() {
      const token = this.$store.state.user.userInfo.token;
      //获取富文本框内容，看富文本框插件文档
      const content = this.$refs.vueEditor.editor.root.innerHTML;
      // 提交前全局校验是否为空
      if (this.title == "" || this.city == "" || content == "") {
        this.$message({
          message: "请输入完整内容",
          type: "warning"
        });
        return;
      }
      this.$axios({
        url: "/posts",
        method: "post",
        headers: { Authorization: "Bearer " + token },
        data: {
          title: this.title,
          city: this.city,
          content: content
        }
      }).then(res => {
        console.log(res);
        if (res.data.message === "新增成功") {
          this.$message({
            message: "新增文章成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    },
    //下拉选中当前建议城市时触发
    handleSelect(item) {
      console.log(item);
      this.city = item.id;
    },
    //获取建议
    querySearch(value, cb) {
      this.$axios({
        url: "/airs/city/",
        method: "get",
        params: {
          name: value
        }
      }).then(res => {
        console.log(res);
        const { data } = res.data;
        // 默认把建议的第一项的城市id赋值给city,防止客户不点下拉建议项
        this.city = data[0].id;
        this.created_at = data[0].created_at;
        const citys = data.map(element => {
          //这里后台没有返回value属性要自己创建,这是饿了么规定回调函数的参数里规定要有的
          return { ...element, value: element.name.replace(/市$/, "") };
        });
        cb(citys);
      });
    }
  },
  data() {
    return {
      created_at: "",
      content: "",
      title: "",
      city: "",
      data: [],
      chengshi: "",
      name: "app",
      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://liangwei.tech:1337/upload",
          name: "files",
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            console.log(res);
            insert("http://liangwei.tech:1337" + res.data[0].url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://liangwei.tech:1337/upload",
          name: "files",
          uploadSuccess(res, insert) {
            insert("http://liangwei.tech:1337" + res.data[0].url);
          }
        }
      }
    };
  },
  components: {
    VueEditor
  }
};
</script>

<style>
.xieyouji {
  display: flex;
}
.left {
  flex: 3;
  margin-left: 150px;
}
.left h2 {
  font-size: 22px;
  font-weight: 400;
  margin-bottom: 10px;
  margin-top: 20px;
}
.left p {
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.left input {
  display: block;
  font-size: 16px;
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  margin-bottom: 18px;
}
.ql-editor {
  height: 500px;
}
.left .souCity {
  margin-top: 15px;
}
.left .souCity .sou {
  margin-top: 7px;
  color: #999;
}
.el-button {
  padding: 6px 13px;
}
.left .save {
  color: orange;
}
.right {
  flex: 1;
}
.caogao {
  margin-top: 20px;
  padding: 13px;
  border: 1px solid #ccc;
  margin-right: 70px;
}
.caogao h3 {
  color: #999;
  font-weight: 400;
}
.caocao :hover {
  color: orange;
}
.create_at {
  display: block;
  padding-bottom: 7px;
  color: #999;
}
</style>