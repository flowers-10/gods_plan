<template>
  <div class="welcome">
      你好!
      <br>
      welcome
      <br>
      <br>
    <div class="login" @click="loginCloudMusic">登录</div>

  </div>
  <dialoge title="Login" :flag="flag" :LoginForm="LoginForm" @on-click="getFlag" @on-login="loginContinue">
    <template #default>
      <div class="login-form">
        <el-form ref="LoginFormRef" :model="LoginForm" status-icon :rules="rules" label-width="120px"
          label-position="top" class="demo-ruleForm">
          <el-form-item label="Phone Number" prop="PhoneNumber">
            <el-input v-model="LoginForm.phoneNumber" />
          </el-form-item>
          <el-form-item label="SMS Verification" prop="verify">
            <el-input v-model="LoginForm.verify" />
            <el-button type="primary" class="Verification-button" @click="getVerification">Get Verification
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </dialoge>
</template>

<script setup lang="ts">
import dialoge from '../../components/Dialog/index.vue'
// 引入api
import { loginMusic, Mcaptcha, loginCellPhone } from '../../api/api'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
// 引入pinia
import { useStore } from '../../stores'
const store = useStore()
const router = useRouter()
// axios.get('/api').then(res => console.log(res))
// getTest('/api').then(res => console.log(res))

// 控制dialog状态
const flag = ref<boolean>(false)
// 点击打开登录弹框
const loginCloudMusic = () => {
  flag.value = true
}
// 子组件的自定义事件向父传送了一个false用来关闭dialog
const getFlag = (flagChild: boolean) => {
  // console.log(flagChild,'我接收到了子组件的传参')
  flag.value = flagChild
}
// input中的数据
const LoginForm = reactive({
  phoneNumber: "",
  verify: ""
})
// 表单验证规则
const rules: any[] = []
// 获得验证码
const getVerification = async () => {
  console.log(LoginForm.phoneNumber);

  const res: any = await loginMusic(LoginForm.phoneNumber)
  console.log(res)
  if (res.code === 200) {
    console.log('发送成功！');
  } else {
    console.log('发送失败！');
  }
}

// 点击登录按钮
const loginContinue = async () => {
  const Mcaptchares: any = await Mcaptcha(LoginForm.phoneNumber, LoginForm.verify)
  console.log(Mcaptchares);
  if (Mcaptchares.code === 200) {
    console.log('验证成功')
    const res: any = await loginCellPhone(LoginForm.phoneNumber, LoginForm.verify)
    // console.log(res);
    store.userInfoActions(res)
    router.push('/app')
  } else {
    console.log('验证失败！')
  }
}
</script>

<style lang="less" scoped>
.welcome {
  width: 400px;
  height: 500px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  // align-items: center;
  background-color: var(--theme-bg-color);
  border-radius: 4px;

  a {
    color: var(--theme-color);
    padding: 30px 0;
    text-decoration: none;
  }

  .login {
    margin: 10px auto;
    width: 100px;
    border-radius: 3px;
    line-height: 40px;
    border: 1px solid var(--button-inactive);
  }
}

.login-form {
  padding: 20px 10px 10px 10px;
  color: var(--theme-color);
  position: relative;

  .Verification-button {
    position: absolute;
    right: 0px;
  }
}
</style>
