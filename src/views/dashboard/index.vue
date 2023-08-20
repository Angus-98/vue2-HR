<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ $store.getters.name }}</div> 不利用vuex提供的辅助函数的写法  -->
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
  // created() {
  //   this.$store.dispatch('user/getUserInfo')
  // 因为用户信息不仅是首页需要用到，还要其它页面也会用到，因此在这里获取数据的话，其它页面刷新的时候是获取不到数据的，因此可以把这里的代码放到导航守卫中
  // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
