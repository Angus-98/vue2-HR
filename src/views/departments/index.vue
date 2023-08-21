<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="card-box">
        <!-- 公司名称 -->
        <TreeTool :is-compony="true" :tree-node="compony" @addEvent="addFn" />

        <!-- 部门名称 -->
        <el-tree :data="treeData" :props="{label:'name'}">
          <template v-slot="{data}">
            <TreeTool :tree-node="data" @addEvent="addFn" @delEvent="delFn" @editEvent="editFn" />
          </template>
        </el-tree>
      </el-card>
      <el-dialog
        title="提示"
        :visible="dialogVisible"
        width="60%"
        center
        @close="closeFn"
      >
        <el-form ref="form" label-width="150px" class="demo-ruleForm" :rules="rules" :model="formData">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model.trim="formData.name" placeholder="1-50字符" />
          </el-form-item>
          <el-form-item label="部门编码" prop="code">
            <el-input v-model.trim="formData.code" placeholder="1-50字符" />
          </el-form-item>
          <el-form-item label="部门负责人" prop="manager">
            <el-select v-model="formData.manager" placeholder="请选择部门负责人">
              <!-- :label="item.username" -> 就是渲染在页面上的数据。:value="item.username" -> 值和v-model的变量双向绑定在一起 -->
              <el-option
                v-for="item in employees"
                :key="item.id"
                :label="item.username"
                :value="item.username"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="部门介绍" prop="introduce">
            <el-input v-model="formData.introduce" type="textarea" placeholder="1-50字符" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeFn">取 消</el-button>
          <el-button type="primary" @click="confirmFn">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import TreeTool from './components/tree-tool.vue'
import { getDepartments, addDepartment, delDepartment, getDepartmentDetail, updateDepartment } from '@/api/departments'
import { listToTree } from '@/utils/index'
import { getEmployeeSimple } from '@/api/employees'
export default {
  components: {
    TreeTool
  },
  data() {
    // 自定义校验规则(校验部门名称不重复的自定义函数)
    /* rule: 校验规则。
    * value: 当前输入的值。
    * callback: 是一个函数，当我们直接调用该函数时表示校验通过，比如callback()。
    *           当我们调用该函数并传入数据的时候，表示校验不通过，比如callback('名称重复了')
    */
    const checkName = (rule, value, callback) => {
      // console.log('rule->', rule, 'value->', value, 'callback->', callback)
      let sameDept

      if (this.formData.id) {
        sameDept = this.depts.filter((item) => {
          // 需要判断2个部门的id相同，就可以说明他们是同一个部门。反过来说，就是当判断到2个部门的id不相同的时候，说明他们就不是同一个部门。
          return item.id !== this.formData.id && item.pid === this.formData.pid
        })
      } else {
        sameDept = this.depts.filter((item) => {
          return item.pid === this.formData.pid
        })
      }

      // 找同级部门
      // console.log('sameDept ->', sameDept) //获取点击的部门数据
      const isRepeat = sameDept.some((item) => {
        return item.name === value
      })
      // console.log('isRepeat ->', isRepeat)
      if (isRepeat) {
        callback('部门名称重复')
      } else {
        callback()
      }
    }
    // 自定义校验部门编码是否重复
    const checkCode = (rule, value, callback) => {
      let isRepeat
      if (this.formData.id) {
        isRepeat = this.depts.some((item) => {
          return item.id !== this.formData.id && item.code === value
        })
      } else {
        isRepeat = this.depts.some((item) => {
          return item.code === value
        })
      }
      if (isRepeat) {
        callback('部门编码重复')
      } else {
        callback()
      }
    }
    return {
      compony: {
        name: '组织架构',
        manager: '负责人',
        id: ''// 新增一级部门需要使用到的
      },
      treeData: [],
      dialogVisible: false,
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: '', // 部门介绍
        pid: '' // 父部门id
      },
      employees: [], // 员工简单列表
      depts: [], // 部门列表数据 -- 请求回来的原数据
      rules: {
        name: [
          { required: true, message: '部门名称不能为空!', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空!', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1-50个字符', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空!', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空!', trigger: 'blur' },
          { min: 1, max: 50, message: '部门介绍长度为1-50个字符', trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    // 获取部门列表
    this.getDepartments()
    this.employees = await getEmployeeSimple()
  },
  methods: {
    // 编辑
    async editFn(curDemp) {
      this.dialogVisible = true
      // 保存当前编辑部门的id
      this.formData = await getDepartmentDetail(curDemp.id)
    },
    // 删除
    delFn(curDemp) {
      this.$confirm('是否确认删除该部门', '删除', {
        type: 'warning'
      }).then(async() => {
        await delDepartment(curDemp.id)
        this.getDepartments()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 确认按钮
    async confirmFn() {
      await this.$refs.form.validate()
      if (this.formData.id) {
        await updateDepartment(this.formData)
      } else {
        await addDepartment(this.formData)
      }
      this.getDepartments()
      this.closeFn()
    },
    addFn(curDemp) {
      // console.log('curDemp ->', curDemp)
      // 保存点击部门的id
      this.formData.pid = curDemp.id
      this.dialogVisible = true
    },
    // 获取接口数据
    async getDepartments() {
      const res = await getDepartments()
      this.treeData = listToTree(res.depts, '')// 这里传的空字符串表示是一级部门，因为接口返回的数据中，一级部门的pid是空字符串
      this.depts = res.depts
    },
    closeFn() {
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门负责人
        introduce: '', // 部门介绍
        pid: '' // 父部门的id
      }
      // 清空 校验规则 和 表单中绑定的数据
      this.$refs.form.resetFields()
      // 关闭弹窗
      this.dialogVisible = false
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
