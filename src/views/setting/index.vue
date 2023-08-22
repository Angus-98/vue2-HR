<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <el-button type="primary" size="small" @click="addRole">新增角色</el-button>
            <el-table
              :data="tableData"
              stripe
              border
              highlight-current-row
              style="width: 100%"
            >
              <el-table-column
                label="序号"
                width="80"
                type="index"
                align="center"
              />
              <el-table-column
                prop="name"
                label="角色"
                width="180"
                align="center"
              />
              <el-table-column
                prop="description"
                label="描述"
                align="center"
              />
              <el-table-column label="操作" align="center">
                <template v-slot="{row}">
                  <el-button type="success" size="small">分配权限</el-button>
                  <el-button type="primary" size="small" @click="editFn(row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="delFn(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-row type="flex" justify="center">
              <!-- :page-size="pagesize"是每页展示的数据数量。:total="total"是请求回来的列表总数量 -->
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="pagesize"
                @current-change="currentChangeFn"
              />
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 弹窗 -->
      <el-dialog
        :title="formData.id ? '编辑' : '新增'"
        :visible="dialogVisible"
        width="30%"
        @close="closeFn"
      >
        <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="formData.description" />
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-row type="flex" justify="center">
            <el-button @click="closeFn">取 消</el-button>
            <el-button type="primary" @click="confirmFn">确 定</el-button>
          </el-row>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRoleList, addRole, delRole, getRoleDetail, updateRole } from '@/api/setting'
export default {
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      pagesize: 2, // 请求的条数
      page: 1, // 当前页码
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 编辑
    async editFn(id) {
      this.dialogVisible = true
      this.formData = await getRoleDetail(id)
    },
    // 删除
    delFn(id) {
      // console.log('id ->', id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '删除', {
        type: 'warning'
      }).then(async() => {
        await delRole(id)
        // 解决删除最后一页最后一条数据的时候显示no data的问题
        if (this.tableData.length === 1 && this.page !== 1) {
          this.page--
        }
        this.getRoleList()
        this.$message({ type: 'success', message: '删除成功' })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    // 确认按钮
    async confirmFn() {
      this.$refs.form.validate()
      if (this.formData.id) {
        await updateRole(this.formData)
      } else {
        await addRole(this.formData)
      }
      this.getRoleList()
      this.closeFn()
    },
    // 新增角色
    addRole() {
      this.dialogVisible = true
    },
    // 分页
    currentChangeFn(current) {
      // console.log('current->', current)// current就是点击的页码
      this.page = current
      this.getRoleList()
    },
    // 获取数据
    async getRoleList() {
      const res = await getRoleList({
        page: this.page,
        pagesize: this.pagesize
      })
      // 保存请求回来的角色列表
      this.tableData = res.rows
      // 保存角色列表请求回来的总数量
      this.total = res.total
    },
    closeFn() {
      this.dialogVisible = false
      this.formData = {
        name: '',
        description: ''
      }
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table {
  margin: 20px 0;
}
</style>
