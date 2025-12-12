<template>
  <div class="login-container">
    <div class="login-form">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="phone">手机号</label>
          <input
            type="tel"
            id="phone"
            v-model="phone"
            placeholder="请输入手机号"
            required
            @input="watchPhone"
          />
        </div>
        <div class="form-group">
          <label for="captcha">图文验证码</label>
          <div class="captcha-group">
            <input
              type="text"
              id="captcha"
              v-model="captcha"
              placeholder="请输入图文验证码"
              required
              @input="watchCaptcha"
            />
            <canvas
              ref="captchaCanvas"
              class="captcha-img"
              @click="refreshCaptcha"
              width="120"
              height="44"
            ></canvas>
          </div>
        </div>
        <div class="form-group">
          <label for="smsCode">短信验证码</label>
          <div class="sms-code-group">
            <input
              type="text"
              id="smsCode"
              v-model="smsCode"
              placeholder="请输入短信验证码"
              required
            />
            <button
              type="button"
              class="send-code-btn"
              :disabled="!canSendSms || isSending"
              @click="sendSmsCode"
            >
              {{ isSending ? '发送中...' : (countdown > 0 ? `${countdown}秒后重发` : '获取验证码') }}
            </button>
          </div>
        </div>
        <button type="submit" class="login-btn" :disabled="isLoggingIn">
          {{ isLoggingIn ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 表单数据
const phone = ref('')
const captcha = ref('')
const smsCode = ref('')

// 状态
const isLoggingIn = ref(false)
const isSending = ref(false)
const countdown = ref(0)
const canSendSms = ref(false)
const captchaText = ref('')
const captchaCanvas = ref(null)

// 生成随机图文验证码
const generateCaptcha = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// 刷新验证码
const refreshCaptcha = () => {
  captchaText.value = generateCaptcha()
  drawCaptcha()
}

// 检查图文验证码是否正确
const checkCaptcha = () => {
  return captcha.value.toUpperCase() === captchaText.value.toUpperCase()
}

// 发送短信验证码
const sendSmsCode = () => {
  if (!checkCaptcha()) {
    alert('图文验证码错误')
    return
  }

  isSending.value = true
  // 模拟发送短信验证码
  setTimeout(() => {
    isSending.value = false
    countdown.value = 60
    // 开始倒计时
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timer)
      }
    }, 1000)
    alert('短信验证码已发送')
  }, 1000)
}

// 处理登录
const handleLogin = () => {
  if (!checkCaptcha()) {
    alert('图文验证码错误')
    return
  }

  isLoggingIn.value = true
  // 模拟登录请求
  setTimeout(() => {
    isLoggingIn.value = false
    // 登录成功，存储登录状态
    localStorage.setItem('isLoggedIn', 'true')
    // 跳转到首页
    router.push('/')
  }, 1000)
}

// 绘制验证码
const drawCaptcha = () => {
  const canvas = captchaCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // 绘制背景
  ctx.fillStyle = '#f0f0f0'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  
  // 绘制干扰线
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = getRandomColor()
    ctx.beginPath()
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }
  
  // 绘制噪点
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = getRandomColor()
    ctx.beginPath()
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2)
    ctx.fill()
  }
  
  // 绘制验证码文本
  ctx.fillStyle = getRandomColor()
  ctx.font = '20px Arial'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  
  // 每个字符随机位置和角度
  const chars = captchaText.value.split('')
  chars.forEach((char, index) => {
    ctx.save()
    const x = 20+ index * 20
    const y = canvas.height / 2
    ctx.translate(x, y)
    ctx.rotate((Math.random() - 0.5) * 0.5)
    ctx.fillText(char, 0, 0)
    ctx.restore()
  })
}

// 生成随机颜色
const getRandomColor = () => {
  const colors = ['#333', '#666', '#999']
  return colors[Math.floor(Math.random() * colors.length)]
}

// 监听图文验证码输入，判断是否可以发送短信
const checkCanSendSms = () => {
  const phoneRegex = /^1[3-9]\d{9}$/
  canSendSms.value = phoneRegex.test(phone.value) && captcha.value.length === 4
}

// 监听输入变化
const watchPhone = (newVal) => {
  checkCanSendSms()
}

const watchCaptcha = (newVal) => {
  checkCanSendSms()
}

onMounted(() => {
  // 初始化验证码
  refreshCaptcha()
})
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.captcha-group {
  display: flex;
  gap: 1rem;
}

.captcha-group input {
  flex: 1;
}

.captcha-img {
  width: 120px;
  height: 44px;
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  user-select: none;
}

.sms-code-group {
  display: flex;
  gap: 1rem;
}

.sms-code-group input {
  flex: 1;
}

.send-code-btn {
  width: 120px;
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.send-code-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.login-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
}
</style>