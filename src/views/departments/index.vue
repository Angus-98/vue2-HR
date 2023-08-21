<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="card-box">
        <!-- 公司名称 -->
        <el-row type="flex" justify="space-between">
          <el-col>组织架构</el-col>
          <el-col>
            <el-row type="flex" justify="end">
              <span class="manager">负责人</span>
              <el-dropdown>
                <span>操作<i class="el-icon-arrow-down el-icon--right" /></span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-row>
          </el-col>
        </el-row>

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
