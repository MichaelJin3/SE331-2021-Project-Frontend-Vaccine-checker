<template>
  <!-- 登录 -->
  <el-form
    :model="registerUser"
    :rules="rules"
    ref="registerForm"
    class="registerForm sign-up-form"
    label-width="80px"
  >
    <el-form-item label="Name" prop="name">
      <el-input
        v-model="registerUser.name"
        placeholder="Input User name"
      ></el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input
        v-model="registerUser.email"
        placeholder="Input Email"
      ></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="registerUser.password"
        placeholder="Input password"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="Confirm Password" prop="password2">
      <el-input
        v-model="registerUser.password2"
        placeholder="Input conirm password"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item label="Select identity">
      <el-select v-model="registerUser.role" placeholder="Select identity">
        <el-option label="Admin" value="admin"></el-option>
        <el-option label="User" value="user"></el-option>
        <el-option label="Visitor" value="visitor"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="register">Sign in</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const registerUser = ref({
      name: '',
      email: '',
      password: '',
      password2: '',
      role: ''
    })

    const rules = ref({
      name: [
        {
          required: true,
          message: 'User name cannot be empty',
          trigger: 'blur'
        }
      ],
      email: [
        {
          required: true,
          type: 'email',
          message: 'Email is illegal',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: 'Password cannot be empty',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 16,
          message: 'Password length between 6-16 digits',
          trigger: 'blur'
        }
      ],
      password2: [
        {
          required: true,
          validator: (rule, value, callback) => {
            if (!value) return callback(new Error('Password cannot be empty'))

            if (ctx.registerUser.password !== value) {
              return callback(new Error('The two passwords are inconsistent'))
            }

            callback()
          },
          trigger: 'blur'
        }
      ]
    })

    // 获取当前组件实例
    const { ctx } = getCurrentInstance()

    const router = useRouter()

    const register = () => {
      ctx.$refs.registerForm.validate(async valid => {
        if (!valid) return

        await ctx.$axios.post('/api/v1/auth/register', registerUser.value)

        ctx.$message.success('Sign in successully~')

        // 路由跳转
        router.push('/home')
      })
    }

    return {
      registerUser,
      rules,
      register
    }
  }
}
</script>

<style scoped>
/* form */
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit-btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
