<script setup>

import TopWitge from "./TopWitge.vue";


let value=ref('')
</script>

<template>
  <TopWitge/>
  <n-space vertical>
    <n-input
        v-model:value="value"
        type="textarea"
        placeholder="请输入解析的歌单信息"
    />
  </n-space>
  <n-divider>注释:转换请参考：https://yyrcd.com/n2s/</n-divider>
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