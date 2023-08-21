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
      treeData: [
        {
          name: '一级 1',
          manager: '1'
        },
        {
          name: '二级 1',
          manager: '2',
          children: [
            {
              name: '二级 2',
              manager: '3'
            },
            {
              name: '二级 3',
              manager: '4'
            }
          ]
        }
      ]
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
