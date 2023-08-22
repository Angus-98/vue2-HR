<template>
  <el-card>
    <el-row type="flex" justify="space-between">
      <el-col>
        <div v-if="showBefore" class="before">
          <i class="el-icon-info" />
          <span>
            <slot name="before" />
          </span>
        </div>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="after" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    showBefore: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.before {
  display: inline-block;
  padding: 10px 15px;
  background-color: #e6f7ff;
  border: 1px solid #c9ecff;
  border-radius: 5px;
  i {
    color: #409eff;
  }
  span {
    margin-left: 5px;
  }
}
</style>
