<template>
  <div class="welcome">
    <h1> 你好 welcome to heat waves</h1>
    <div class="login" @click="loginCloudMusic">登录</div>
  </div>
  <beian-gov></beian-gov>
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
import BeianGov from '../../components/BeianGov/index.vue'
// 引入api
import { loginMusic, Mcaptcha, loginCellPhone } from '../../api/api'
import { ref, reactive, toRaw } from 'vue'
import { useRouter } from 'vue-router'
// 引入pinia
import { useStore } from '../../stores'
import { ElMessage } from 'element-plus'
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
  // console.log(res)
  if (res.code === 200) {
    ElMessage.success('发送成功!')
  } else {
    ElMessage.error('发送失败！请稍后再试(一天只能发送五次验证码)')
  }
}

// 点击登录按钮
const loginContinue = async () => {
  const Mcaptchares: any = await Mcaptcha(LoginForm.phoneNumber, LoginForm.verify)
  console.log(Mcaptchares);
  if (Mcaptchares.code === 200) {
    console.log('验证成功')
    const res: any = await loginCellPhone(LoginForm.phoneNumber, LoginForm.verify)
    // console.log('获得了登录信息',res);
    store.userInfoActions(res)
    router.push('/music/mymusic')
  } else {
    console.log('验证失败！')
  }
}
</script>

<style lang="less" scoped>
.welcome {
  --color1: #01579B;
  --color2: #00838F;
  --color3: #FFD600;
  --color4: #FF4081;
  --color5: #F44336;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 15;
  display: grid;
  place-items: center;
  background-color: var(--theme-bg-color);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  h1 {
    margin-top: 30px;
    color: #fff;
    text-transform: uppercase;
    word-spacing: 100vw;
    width: min-content;
    text-align: center;
    font-size: 4em;
    line-height: 120%;
    background: linear-gradient(225deg,
        var(--color1) 0%, var(--color1) 9%,
        transparent 9%, transparent 10%,
        var(--color2) 10%, var(--color2) 19%,
        transparent 19%, transparent 20%,
        var(--color3) 20%, var(--color3) 29%,
        transparent 29%, transparent 30%,
        var(--color4) 30%, var(--color4) 39%,
        transparent 39%, transparent 40%,
        var(--color5) 40%, var(--color5) 49%,
        transparent 49%, transparent 50%,
        var(--color1) 50%, var(--color1) 59%,
        transparent 59%, transparent 60%,
        var(--color2) 60%, var(--color2) 69%,
        transparent 69%, transparent 70%,
        var(--color3) 70%, var(--color3) 79%,
        transparent 79%, transparent 80%,
        var(--color4) 80%, var(--color4) 89%,
        transparent 89%, transparent 90%,
        var(--color5) 90%, var(--color5) 99%,
        transparent 99%);
    background-size: 200% 200%;
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    animation: move 6s linear infinite;
  }

  @keyframes move {
    0% {
      background-position: 0px 100%;
    }

    100% {
      background-position: 100% 0px;
    }
  }

  a {
    color: var(--theme-color);
    padding: 30px 0;
    text-decoration: none;
  }


}

.login {
  margin: 10px auto;
  width: 100px;
  border-radius: 3px;
  line-height: 40px;
  border: 1px solid var(--button-inactive);
  cursor: pointer;
  text-align: center;
  z-index: 1;
}

.login-form {
  padding: 20px 10px 10px 10px;
  color: var(--theme-color);
  position: relative;

  .Verification-button {
    position: absolute;
    right: 0px;
    cursor: pointer;
  }
}
</style>
