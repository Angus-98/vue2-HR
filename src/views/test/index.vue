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
// 通过@mixin 声明代码块，@inclide调用
@mixin box {
  width: 200px;
  height: 200px;
  border: 1px solid #000;
  border-radius: 20px;
}

.test {
  @include box; //使用代码块
  .test-h2 {
    font-size: 30px;
    color: #666;
    // &符号 表示的就是 h2标签
    &:hover {
      $backgroundColor: #003666; //局部变量,其它代码块是使用不了的
      color: $highLight-color;
      background-color: $backgroundColor;
    }
  }
}
</style>
