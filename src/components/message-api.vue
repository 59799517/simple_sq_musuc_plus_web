<template>
  <div></div>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";
import { useMessage ,useDialog} from "naive-ui";

export default defineComponent({
  setup() {
    window.$message = useMessage();
    window.$dialog = useDialog();
  },
});
</script>