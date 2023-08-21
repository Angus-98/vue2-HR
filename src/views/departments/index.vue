<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="card-box">
        <!-- 公司名称 -->
        <TreeTool :is-compony="true" :tree-node="compony" />

        <!-- 部门名称 -->
        <el-tree :data="treeData" :props="{label:'name'}">
          <template v-slot="{data}">
            <TreeTool :tree-node="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
import { getDepartments } from '@/api/departments'
import { listToTree } from '@/utils/index'
export default {
  components: {
    TreeTool
  },
  data() {
    return {
      compony: {
        name: '组织架构',
        manager: '负责人'
      },
      treeData: []
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      this.treeData = listToTree(res.depts, '')// 这里传的空字符串表示是一级部门，因为接口返回的数据中，一级部门的pid是空字符串
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  font-size: 16px;
  .manager {
    font-size: 15px;
    padding-right: 20px;
  }
}
</style>
