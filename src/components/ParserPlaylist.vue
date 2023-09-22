<script setup>

import TopWitge from "./TopWitge.vue";
import {downloadParser, parserUrlAndDownload} from "../utils/api.js";



let value=ref('')
let active =ref(false)
let bookName = ref('')
let artist = ref('')
let download = ()=>{
  parserUrlAndDownload(value.value,active.value,bookName.value,artist.value).then(value=>{
    if (value.data.code === 200) {
      window.$message.success("操作成功")
    }else{
      window.$message.error("操作失败："+value.data.msg)
    }
  })
}


</script>

<template>
  <TopWitge/>
  <br/>
  <br/>
  <br/>
  <br/>
  <n-space vertical>
    <n-input
        v-model:value="value"
        placeholder="请输入歌单url："
    />
  </n-space>
  <n-divider>
    注释:支持酷我--歌单与专辑的分享链接
  </n-divider>
  <div v-show="active">
    <n-input placeholder="书名：" v-model:value="bookName"></n-input>
    <n-input placeholder="作者:" v-model:value="artist" ></n-input>
  </div>
  <div class="page">
    是否自定义歌单信息(主要用于有声书下载方便整理)：
    <n-switch v-model:value="active" />
  </div>
  <br/>
  <br/>
<div class="page">
  <n-button @click="download">提交</n-button>
</div>
</template>

<style scoped>
.page{
  display: flex;
  place-items: center;
  flex-direction: row;
  justify-content: center ;
}
</style>