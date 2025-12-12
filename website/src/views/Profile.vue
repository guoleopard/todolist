<template>
  <div class="page-container">
    <h1 style="font-size: 24px; margin-bottom: 20px; text-align: center;">个人中心</h1>
    
    <div style="background-color: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background-color: #42b983; margin: 0 auto 12px; display: flex; justify-content: center; align-items: center; color: white; font-size: 32px;">
          👤
        </div>
        <div style="font-size: 18px; font-weight: 600;">张三</div>
        <div style="font-size: 14px; color: #666; margin-top: 4px;">zhangsan@example.com</div>
      </div>
    </div>

    <div style="background-color: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin-bottom: 20px;">
      <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #eee;">
        统计信息
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
        <div style="text-align: center; padding: 12px; background-color: #f9f9f9; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: 600; color: #42b983;">{{ totalTodos }}</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">总待办</div>
        </div>
        <div style="text-align: center; padding: 12px; background-color: #f9f9f9; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: 600; color: #ff9800;">{{ urgentImportant }}</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">着急重要</div>
        </div>
        <div style="text-align: center; padding: 12px; background-color: #f9f9f9; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: 600; color: #e91e63;">{{ urgentNotImportant }}</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">着急不重要</div>
        </div>
        <div style="text-align: center; padding: 12px; background-color: #f9f9f9; border-radius: 8px;">
          <div style="font-size: 24px; font-weight: 600; color: #2196f3;">{{ notUrgentImportant }}</div>
          <div style="font-size: 14px; color: #666; margin-top: 4px;">不着急重要</div>
        </div>
      </div>
    </div>

    <div style="background-color: white; border-radius: 12px; padding: 16px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); margin-bottom: 80px;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #eee;">
        <div style="font-size: 16px;">清空所有待办</div>
        <button style="color: #ff4444; font-size: 16px; background: none; border: none; cursor: pointer;" @click="clearAllTodos">
          清空
        </button>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; margin-top: 12px;">
        <div style="font-size: 16px;">退出登录</div>
        <button style="color: #dc3545; font-size: 16px; background: none; border: none; cursor: pointer;" @click="handleLogout">
          退出
        </button>
      </div>
    </div>

    <nav class="nav-bar">
      <router-link to="/" class="nav-item" active-class="active">
        <div class="nav-icon">🏠</div>
        <div>首页</div>
      </router-link>
      <router-link to="/profile" class="nav-item" active-class="active">
        <div class="nav-icon">👤</div>
        <div>个人中心</div>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const todos = ref([])

// 处理退出登录
const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}

const loadTodos = () => {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos.value = JSON.parse(saved)
  }
}

const clearAllTodos = () => {
  if (confirm('确定要清空所有待办吗？')) {
    todos.value = []
    localStorage.removeItem('todos')
  }
}

const totalTodos = () => todos.value.length
const urgentImportant = () => todos.value.filter(t => t.quadrant === 1).length
const urgentNotImportant = () => todos.value.filter(t => t.quadrant === 2).length
const notUrgentImportant = () => todos.value.filter(t => t.quadrant === 3).length

onMounted(() => {
  loadTodos()
})

// 监听localStorage变化，实时更新统计
const storageListener = (e) => {
  if (e.key === 'todos') {
    loadTodos()
  }
}

onMounted(() => {
  window.addEventListener('storage', storageListener)
})

onMounted(() => {
  loadTodos()
})
</script>

<style>
</style>
