<template>
  <el-row type="flex" justify="space-between" style="width:100%;">
    <el-col>
      <!-- :style="{fontWeight: isCompony ? 'bold' : ''}"渲染公司名称的时候，标题加粗 -->
      <span :style="{fontWeight: isCompony ? 'bold' : ''}">
        {{ treeNode.name }}
      </span>
    </el-col>
    <el-col>
      <el-row type="flex" justify="end">
        <span class="manager">{{ treeNode.manager }}</span>
        <el-dropdown>
          <span>操作<i class="el-icon-arrow-down el-icon--right" /></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="!isCompony">编辑部门</el-dropdown-item>
            <el-dropdown-item v-if="!isCompony">删除部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    // 是否渲染公司，true表示渲染公司名称，否则不是
    isCompony: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.manager {
    font-size: 15px;
    padding-right: 20px;
}
</style>
