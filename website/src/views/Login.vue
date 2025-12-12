<template>
  <div class="login-container">
    <div class="login-box">
      <h2>登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="phone">手机号</label>
          <input
            type="tel"
            id="phone"
            v-model="formData.phone"
            placeholder="请输入手机号"
            required
            pattern="^1[3-9]\d{9}$"
          />
        </div>
        <div class="form-group">
          <label for="captcha">图文验证码</label>
          <div class="captcha-container">
            <input
              type="text"
              id="captcha"
              v-model="formData.captcha"
              placeholder="请输入验证码"
              required
            />
            <div class="captcha-image" @click="refreshCaptcha">
              <!-- 图文验证码图片将在这里生成 -->
              <canvas ref="captchaCanvas" width="120" height="40"></canvas>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="smsCode">短信验证码</label>
          <div class="sms-container">
            <input
              type="text"
              id="smsCode"
              v-model="formData.smsCode"
              placeholder="请输入短信验证码"
              required
            />
            <button
              type="button"
              class="get-sms-btn"
              @click="getSmsCode"
              :disabled="!canGetSmsCode || smsCountdown > 0"
            >
              {{ smsCountdown > 0 ? `${smsCountdown}秒后重新获取` : '获取验证码' }}
            </button>
          </div>
        </div>
        <button type="submit" class="login-btn">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        phone: '',
        captcha: '',
        smsCode: ''
      },
      captchaText: '',
      smsCountdown: 0,
      timer: null
    };
  },
  computed: {
    canGetSmsCode() {
      return this.formData.phone && this.formData.captcha;
    }
  },
  mounted() {
    this.generateCaptcha();
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    generateCaptcha() {
      // 生成随机验证码
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let captcha = '';
      for (let i = 0; i < 4; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.captchaText = captcha;
      this.drawCaptcha();
    },
    drawCaptcha() {
      const canvas = this.$refs.captchaCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      
      // 清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 绘制背景
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // 绘制干扰线
      for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = this.getRandomColor();
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
      }
      
      // 绘制干扰点
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = this.getRandomColor();
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // 绘制验证码文本
      ctx.font = '20px Arial';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < this.captchaText.length; i++) {
        ctx.fillStyle = this.getRandomColor();
        ctx.save();
        ctx.translate(20 + i * 25, canvas.height / 2);
        ctx.rotate((Math.random() - 0.5) * 0.5);
        ctx.fillText(this.captchaText[i], 0, 0);
        ctx.restore();
      }
    },
    getRandomColor() {
      const r = Math.floor(Math.random() * 150);
      const g = Math.floor(Math.random() * 150);
      const b = Math.floor(Math.random() * 150);
      return `rgb(${r}, ${g}, ${b})`;
    },
    refreshCaptcha() {
      this.generateCaptcha();
    },
    getSmsCode() {
      // 验证图文验证码
      if (this.formData.captcha.toLowerCase() !== this.captchaText.toLowerCase()) {
        alert('图文验证码错误');
        this.refreshCaptcha();
        return;
      }
      
      // 模拟发送短信验证码
      alert(`短信验证码已发送至${this.formData.phone}`);
      
      // 开始倒计时
      this.smsCountdown = 60;
      this.timer = setInterval(() => {
        this.smsCountdown--;
        if (this.smsCountdown <= 0) {
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },
    handleLogin() {
      // 简单的登录验证
      if (!this.formData.phone || !this.formData.smsCode) {
        alert('请填写完整信息');
        return;
      }
      
      // 模拟登录成功
      localStorage.setItem('isLoggedIn', 'true');
      alert('登录成功');
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.login-box h2 {
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
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
}

.captcha-container {
  display: flex;
  gap: 1rem;
}

.captcha-container input {
  flex: 1;
}

.captcha-image {
  width: 120px;
  height: 40px;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sms-container {
  display: flex;
  gap: 1rem;
}

.sms-container input {
  flex: 1;
}

.get-sms-btn {
  padding: 0.8rem 1.2rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.get-sms-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.login-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #36a06f;
}
</style>