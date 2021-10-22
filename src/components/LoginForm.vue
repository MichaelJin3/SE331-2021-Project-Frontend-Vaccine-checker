<template>
  <!-- 登录 -->
  <el-form
    :model="loginUser"
    :rules="rules"
    ref="loginForm"
    class="loginForm  sign-in-form"
    label-width="80px"
  >
    <el-form-item label="Email" prop="email">
      <el-input v-model="loginUser.email" placeholder="Input email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="loginUser.password"
        placeholder="Please input password"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">Sign up</el-button>
    </el-form-item>
    <div class="tiparea">
      <p>Forgot password?<a>Find back</a></p>
    </div>
  </el-form>
</template>

<script>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup () {
    const loginUser = ref({
      email: '',
      password: ''
    })

    const rules = ref({
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
      ]
    })

    // 获取当前组件实例
    const { ctx } = getCurrentInstance()
    const router = useRouter()

    const login = () => {
      ctx.$refs.loginForm.validate(async valid => {
        if (!valid) return

        const res = await ctx.$axios.post('/api/v1/auth/login', loginUser.value)

        ctx.$message.success('Sign up successful~')

        // 保存token
        const { token } = res.data
        localStorage.setItem('vue3-element-plus-demo-token', token)

        // 路由跳转
        router.push('/home')
      })
    }

    return {
      loginUser,
      rules,
      login
    }
  }
}
</script>

<style scoped>
/* form */
.loginForm {
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
