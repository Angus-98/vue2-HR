<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools>
        <template v-slot:before>
          共82条记录
        </template>
        <template v-slot:after>
          <el-button type="danger" size="small">简单表头导出</el-button>
          <el-button type="info" size="small">复杂表头导出</el-button>
          <el-button type="success" size="small">excel导入</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </PageTools>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
