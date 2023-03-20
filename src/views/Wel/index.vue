<template>
  <div class="welcome">
    <h1> hello! welcome to heat waves</h1>
    <div class="login" @click="loginCloudMusic">登录</div>
    <router-link to="/app">游客访问</router-link>

    <dialoge :flag="flag" :slot-name="slotName" :Login-form="LoginForm" @on-click="getFlag"
      @keydown.enter="loginContinue(ruleFormRef)">
      <template #Title>
        <span class="checkout" :class="slotName === 'Login' ? 'activeColor' : ''" @click="checkoutLogin('Login')">
          Login
        </span>
        <span>|</span>
        <span class="checkout" :class="slotName === 'Password' ? 'activeColor' : ''"
          @click="checkoutLogin('Password')">Password</span>
        <span>|</span>
        <span class="checkout" :class="slotName === 'QRcode' ? 'activeColor' : ''" @click="checkoutLogin('QRcode')">QR
          code</span>
      </template>
      <template #Login>
        <div class="login-form">
          <el-form ref="ruleFormRef" :model="LoginForm" status-icon :rules="rules" label-width="120px"
            label-position="top" class="demo-ruleForm">

            <el-form-item label="Phone Number" prop="PhoneNumber">
              <el-input v-model="LoginForm.PhoneNumber" />
            </el-form-item>

            <el-form-item label="SMS Verification" prop="verify">
              <el-input v-model="LoginForm.verify" />
              <el-button type="primary" class="Verification-button" @click="getVerification">Get Verification
              </el-button>
            </el-form-item>

          </el-form>
        </div>
      </template>
      <template #Password>
        <div class="login-form">
          <el-form ref="ruleFormRef" :model="LoginForm" :rules="rules" status-icon label-width="120px"
            label-position="top" class="demo-ruleForm">
            <el-form-item label="Phone Number" prop="PhoneNumber">
              <el-input v-model="LoginForm.PhoneNumber" />
            </el-form-item>
            <el-form-item label="Phone Password" prop="password">
              <el-input v-model="LoginForm.password" type="password" />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #QRcode>
        <div class="login-form">
          <div class="img-box">
            <img id="codeimg" src="" alt="">
          </div>
        </div>
      </template>
      <template #Footer>
        <div class="content-button-wrapper">
          <button class="content-button status-button open close" @click="flag = false">Cancel</button>
          <button class="content-button status-button" @click="loginContinue(ruleFormRef)">Continue</button>
        </div>
      </template>
    </dialoge>
    <beian-gov></beian-gov>
  </div>
</template>

<script setup lang="ts">
// 引入工具插件
import { ref, reactive, onMounted, onBeforeMount, onUpdated, onBeforeUpdate, onBeforeUnmount, onUnmounted } from 'vue'
import { useStore } from '../../stores'
import { ElMessage } from 'element-plus'
import type { FormRules, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'

// 组件
import BeianGov from '../../components/BeianGov/index.vue'
// 引入自定义工具
import { loginMusic, Mcaptcha, loginCellPhone, loginPhonePassword, getQrcodeKey, createQrcode, checkQrcode } from '../../api/api'
import { checkPhones } from '@/utils/checkPhone'


const store = useStore()
const router = useRouter()

// 控制dialog状态
let flag = ref<boolean>(false)
// 切换登录模式
let slotName = ref<string>('Login')

// 点击打开登录弹框
const loginCloudMusic = () => {
  flag.value = true
}
// 子组件的自定义事件向父传送了一个false用来关闭dialog
const getFlag = (flagChild: boolean) => {
  // console.log(flagChild,'我接收到了子组件的传参')
  flag.value = flagChild
}

// 点击切换登录模式
const checkoutLogin = async (name: string) => {
  slotName.value = name
  if (name === "QRcode") {
    const imgdom: any = document.getElementById("codeimg")
    const { data }: any = await getQrcodeKey()
    console.log(data.unikey);

    const res: any = await createQrcode({ "key": data.unikey })
    console.log(res.data.qrimg);
    imgdom.src = res.data.qrimg

    // setInterval(() => {
    //   checkQrcode({ "key": data.unikey }).then((res:any) => {
    //     console.log(res);

    //   })
    // }, 2000)
  }
}

// input中的数据
const LoginForm = reactive({
  PhoneNumber: "",
  verify: "",
  password: ""
})
const ruleFormRef = ref<FormInstance>()
// 表单验证规则
const rules = reactive<FormRules>({
  verify: [
    { required: true, message: 'Please input verify number', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Please input Password', trigger: 'blur' },
  ],
  PhoneNumber: [
    { required: true, message: 'Please input PhoneNumber', trigger: 'blur' },
    { validator: checkPhones, trigger: 'blur' }
  ]
})
// 获得验证码
const getVerification = async () => {
  // console.log(LoginForm.phoneNumber);
  const res: any = await loginMusic(LoginForm.PhoneNumber)
  // console.log(res)
  if (res.code === 200) {
    ElMessage.success('发送成功!')
  } else {
    ElMessage.error('发送失败！请稍后再试(一天只能发送五次验证码)')
  }
}

type ResTokenType = {
  code: string | number,
  token: string
}
// 点击登录按钮
const loginContinue = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let date = new Date().getTime()
      if (slotName.value === 'Login') {
        const Mcaptchares: any = await Mcaptcha(LoginForm.PhoneNumber, LoginForm.verify)
        // console.log(Mcaptchares);
        if (Mcaptchares.code === 200) {
          // ElMessage.success('验证成功!')
          const res: any = await loginCellPhone(LoginForm.PhoneNumber, LoginForm.verify, date)
          // console.log('获得了登录信息', res);
          if (res.code === 200) {
            ElMessage.success('登录成功!')
            store.userInfoActions(res)
            router.push('/app')
          } else {
            ElMessage.error('登录失败，请稍后再尝试')
          }

        } else {
          ElMessage.error('验证失败,请输入正确的验证码')
        }
      } else if (slotName.value === 'Password') {
        const res: any = await loginPhonePassword(LoginForm.PhoneNumber, LoginForm.password, date)
        // console.log('获得了登录信息', res.token);
        if (res.code === 200) {
          ElMessage.success('登录成功!')
          store.userInfoActions(res)
          router.push('/app')
        } else {
          ElMessage.error('登录失败，请稍后再尝试')
        }

      }
    }
  })
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
  z-index: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  h1 {
    font-family: 'Luckiest Guy';
    margin-top: 120px;
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
  color: var(--theme-color);
}

.login-form {
  padding: 20px 10px 10px 10px;
  color: var(--theme-color);
  position: relative;

  .img-box {
    display: flex;
    justify-content: center;

    img {

      width: 200px;
      height: 200px;

    }
  }

  .Verification-button {
    position: absolute;
    right: 0px;
    cursor: pointer;
  }
}

span {
  margin-right: 20px;
  color: var(--content-title-color);
}

.activeColor {
  color: var(--theme-color);
}

.checkout:hover {
  color: #3a6df0;
}


// 按钮样式

.content-button-wrapper .content-button.status-button.open.close {
  width: auto;
}



.status-button {
  font-size: 15px;
  margin-top: 0;
  padding: 6px 24px;

  @media screen and (max-width: 390px) {
    padding: 6px 14px;
  }

  &.open {
    background: none;
    color: var(--button-inactive);
    border: 1px solid var(--button-inactive);
  }

  &:not(.open):hover {
    color: #fff;
    border-color: #fff;
  }
}

.content-button-wrapper {
  margin-top: auto;
  margin-left: auto;

  .open {
    margin-right: 8px;
  }

  .content-button:not(.open):hover {
    background: #1e59f1;
  }


}

.content-button {
  background-color: #3a6df0;
  border: none;
  padding: 8px 26px;
  color: #fff;
  border-radius: 20px;
  margin-top: 16px;
  cursor: pointer;
  transition: 0.3s;
  white-space: nowrap;
}
</style>
