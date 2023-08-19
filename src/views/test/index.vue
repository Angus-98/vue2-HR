<template>
  <div class="test">
    <h2 class="test-h2">scss基本语法以及使用</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
// 通过$符号声明全局变量
$highLight-color:#87ceeb;
.test {
  .test-h2 {
    font-size: 30px;
    color: #666;
    // &符号 表示的就是 h2标签
    &:hover {
      color: $highLight-color;
    }
  }
}
</style>
