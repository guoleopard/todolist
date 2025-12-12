<template>
  <div class="profile">
    <h1 class="page-title">个人中心</h1>
    
    <div class="stats">
      <div class="stat-item">
        <div class="stat-number">{{ totalTodos }}</div>
        <div class="stat-label">总待办事项</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ completedTodos }}</div>
        <div class="stat-label">已完成</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ pendingTodos }}</div>
        <div class="stat-label">未完成</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ completionRate }}%</div>
        <div class="stat-label">完成率</div>
      </div>
    </div>

    <div class="actions">
      <button @click="clearCompleted" class="action-btn clear-btn">
        清除已完成
      </button>
      <button @click="clearAll" class="action-btn danger-btn">
        清空所有
      </button>
      <button @click="logout" class="action-btn logout-btn">
        退出登录
      </button>
    </div>

    <div class="category-stats">
      <h2>分类统计</h2>
      <div class="category-item">
        <div class="category-header">
          <div class="category-icon">🔥</div>
          <div class="category-name">着急重要</div>
        </div>
        <div class="category-count">{{ categoryStats.urgentImportant }}</div>
      </div>
      <div class="category-item">
        <div class="category-header">
          <div class="category-icon">⏰</div>
          <div class="category-name">着急不重要</div>
        </div>
        <div class="category-count">{{ categoryStats.urgentNotImportant }}</div>
      </div>
      <div class="category-item">
        <div class="category-header">
          <div class="category-icon">📌</div>
          <div class="category-name">不着急重要</div>
        </div>
        <div class="category-count">{{ categoryStats.notUrgentImportant }}</div>
      </div>
      <div class="category-item">
        <div class="category-header">
          <div class="category-icon">😴</div>
          <div class="category-name">不着急不重要</div>
        </div>
        <div class="category-count">{{ categoryStats.notUrgentNotImportant }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const todos = ref([]);

const loadTodos = () => {
  todos.value = JSON.parse(localStorage.getItem('todos')) || [];
};

const totalTodos = computed(() => todos.value.length);

const completedTodos = computed(() => {
  return todos.value.filter(todo => todo.completed).length;
});

const pendingTodos = computed(() => {
  return todos.value.filter(todo => !todo.completed).length;
});

const completionRate = computed(() => {
  if (totalTodos.value === 0) return 0;
  return Math.round((completedTodos.value / totalTodos.value) * 100);
});

const categoryStats = computed(() => {
  return {
    urgentImportant: todos.value.filter(todo => todo.category === 'urgentImportant').length,
    urgentNotImportant: todos.value.filter(todo => todo.category === 'urgentNotImportant').length,
    notUrgentImportant: todos.value.filter(todo => todo.category === 'notUrgentImportant').length,
    notUrgentNotImportant: todos.value.filter(todo => todo.category === 'notUrgentNotImportant').length
  };
});

const clearCompleted = () => {
  const updatedTodos = todos.value.filter(todo => !todo.completed);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  loadTodos();
};

const clearAll = () => {
  if (confirm('确定要清空所有待办事项吗？此操作不可恢复！')) {
    localStorage.removeItem('todos');
    loadTodos();
  }
};

const logout = () => {
  localStorage.removeItem('isLoggedIn');
  router.push('/login');
};

onMounted(() => {
  loadTodos();
});
</script>

<style scoped>
.profile {
  padding: 20px;
  padding-bottom: 80px;
  min-height: 100vh;
  background: #f5f5f5;
}

.page-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 20px;
}

.stat-item {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 36px;
  font-weight: bold;
  color: #42b983;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 14px;
  color: #666;
}

.actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.action-btn {
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  color: #fff;
}

.clear-btn {
  background: #42b983;
}

.danger-btn {
  background: #ff4757;
}

.logout-btn {
  background: #95a5a6;
}

.category-stats {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-stats h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.category-item:last-child {
  border-bottom: none;
}

.category-header {
  display: flex;
  align-items: center;
}

.category-icon {
  font-size: 24px;
  margin-right: 10px;
}

.category-name {
  font-size: 16px;
  color: #333;
}

.category-count {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
}
</style>