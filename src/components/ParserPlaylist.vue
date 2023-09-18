<script setup>

import TopWitge from "./TopWitge.vue";



let value=ref('')
let active =ref(false)
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
    <n-input placeholder="书名："></n-input>
    <n-input placeholder="作者:"> </n-input>
  </div>
  <div class="page">
    是否自定义歌单信息(主要用于有声书下载方便整理)：
    <n-switch v-model:value="active" />
  </div>
  <br/>
  <br/>
<div class="page">
  <n-button>提交</n-button>
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