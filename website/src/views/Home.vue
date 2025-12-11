<template>
  <div class="page-container">
    <h1 style="font-size: 24px; margin-bottom: 20px; text-align: center;">我的待办</h1>
    
    <div class="quadrant-container">
      <div class="quadrant-card">
        <div class="quadrant-title">着急重要</div>
        <div v-for="todo in todos.filter(t => t.quadrant === 1)" :key="todo.id" class="todo-item">
          <div class="todo-content">
            <div class="todo-title">{{ todo.title }}</div>
            <div class="todo-desc">{{ todo.desc }}</div>
          </div>
          <div class="todo-delete" @click="deleteTodo(todo.id)">✕</div>
        </div>
        <div v-if="!todos.filter(t => t.quadrant === 1).length" style="text-align: center; color: #999; font-size: 14px; padding: 20px 0;">
          暂无待办
        </div>
      </div>

      <div class="quadrant-card">
        <div class="quadrant-title">着急不重要</div>
        <div v-for="todo in todos.filter(t => t.quadrant === 2)" :key="todo.id" class="todo-item">
          <div class="todo-content">
            <div class="todo-title">{{ todo.title }}</div>
            <div class="todo-desc">{{ todo.desc }}</div>
          </div>
          <div class="todo-delete" @click="deleteTodo(todo.id)">✕</div>
        </div>
        <div v-if="!todos.filter(t => t.quadrant === 2).length" style="text-align: center; color: #999; font-size: 14px; padding: 20px 0;">
          暂无待办
        </div>
      </div>

      <div class="quadrant-card">
        <div class="quadrant-title">不着急重要</div>
        <div v-for="todo in todos.filter(t => t.quadrant === 3)" :key="todo.id" class="todo-item">
          <div class="todo-content">
            <div class="todo-title">{{ todo.title }}</div>
            <div class="todo-desc">{{ todo.desc }}</div>
          </div>
          <div class="todo-delete" @click="deleteTodo(todo.id)">✕</div>
        </div>
        <div v-if="!todos.filter(t => t.quadrant === 3).length" style="text-align: center; color: #999; font-size: 14px; padding: 20px 0;">
          暂无待办
        </div>
      </div>

      <div class="quadrant-card">
        <div class="quadrant-title">不着急不重要</div>
        <div v-for="todo in todos.filter(t => t.quadrant === 4)" :key="todo.id" class="todo-item">
          <div class="todo-content">
            <div class="todo-title">{{ todo.title }}</div>
            <div class="todo-desc">{{ todo.desc }}</div>
          </div>
          <div class="todo-delete" @click="deleteTodo(todo.id)">✕</div>
        </div>
        <div v-if="!todos.filter(t => t.quadrant === 4).length" style="text-align: center; color: #999; font-size: 14px; padding: 20px 0;">
          暂无待办
        </div>
      </div>
    </div>

    <button class="add-btn" @click="showModal = true">+</button>

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

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <div class="modal-title">添加待办</div>
        <div class="form-group">
          <label class="form-label">标题</label>
          <input v-model="newTodo.title" type="text" class="form-input" placeholder="输入待办标题">
        </div>
        <div class="form-group">
          <label class="form-label">描述</label>
          <input v-model="newTodo.desc" type="text" class="form-input" placeholder="输入待办描述">
        </div>
        <div class="form-group">
          <label class="form-label">优先级</label>
          <select v-model="newTodo.quadrant" class="form-select">
            <option value="1">着急重要</option>
            <option value="2">着急不重要</option>
            <option value="3">不着急重要</option>
            <option value="4">不着急不重要</option>
          </select>
        </div>
        <div class="form-buttons">
          <button class="btn btn-secondary" @click="showModal = false">取消</button>
          <button class="btn btn-primary" @click="addTodo">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const showModal = ref(false)
const newTodo = ref({
  title: '',
  desc: '',
  quadrant: '1'
})
const todos = ref([])

const loadTodos = () => {
  const saved = localStorage.getItem('todos')
  if (saved) {
    todos.value = JSON.parse(saved)
  }
}

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

const addTodo = () => {
  if (!newTodo.value.title.trim()) return
  todos.value.push({
    id: Date.now(),
    title: newTodo.value.title,
    desc: newTodo.value.desc,
    quadrant: parseInt(newTodo.value.quadrant)
  })
  saveTodos()
  newTodo.value = {
    title: '',
    desc: '',
    quadrant: '1'
  }
  showModal.value = false
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  saveTodos()
}

onMounted(() => {
  loadTodos()
})
</script>

<style>
</style>
