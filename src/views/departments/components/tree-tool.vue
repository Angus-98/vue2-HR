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
            <!-- 默认情况下，组件是不能直接绑定原生js事件。vue专门提供了 .native。这样就可以直接在组件上绑定原生的js事件 -->
            <el-dropdown-item @click.native="addFn">添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="!isCompony" @click.native="editFn">编辑部门</el-dropdown-item>
            <el-dropdown-item v-if="!isCompony" @click.native="delFn">删除部门</el-dropdown-item>
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
  },
  methods: {
    addFn() {
      // 子传父
      this.$emit('addEvent', this.treeNode)
    },
    delFn() {
      this.$emit('delEvent', this.treeNode)
    },
    editFn() {
      this.$emit('editEvent', this.treeNode)
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
