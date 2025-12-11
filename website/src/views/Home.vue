<template>
  <div class="home">
    <h1 class="page-title">四象限待办事项</h1>
    
    <div class="quadrants">
      <!-- 着急重要 -->
      <div class="quadrant urgent-important">
        <div class="quadrant-header">
          <div class="quadrant-icon">🔥</div>
          <div class="quadrant-title">着急重要</div>
        </div>
        <div class="todo-list">
          <div 
            v-for="todo in todos.urgentImportant" 
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
            @click="toggleTodo(todo)"
          >
            <div class="todo-title">{{ todo.title }}</div>
            <button @click.stop="deleteTodo(todo.id)" class="delete-btn">×</button>
          </div>
        </div>
      </div>

      <!-- 着急不重要 -->
      <div class="quadrant urgent-not-important">
        <div class="quadrant-header">
          <div class="quadrant-icon">⏰</div>
          <div class="quadrant-title">着急不重要</div>
        </div>
        <div class="todo-list">
          <div 
            v-for="todo in todos.urgentNotImportant" 
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
            @click="toggleTodo(todo)"
          >
            <div class="todo-title">{{ todo.title }}</div>
            <button @click.stop="deleteTodo(todo.id)" class="delete-btn">×</button>
          </div>
        </div>
      </div>

      <!-- 不着急重要 -->
      <div class="quadrant not-urgent-important">
        <div class="quadrant-header">
          <div class="quadrant-icon">📌</div>
          <div class="quadrant-title">不着急重要</div>
        </div>
        <div class="todo-list">
          <div 
            v-for="todo in todos.notUrgentImportant" 
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
            @click="toggleTodo(todo)"
          >
            <div class="todo-title">{{ todo.title }}</div>
            <button @click.stop="deleteTodo(todo.id)" class="delete-btn">×</button>
          </div>
        </div>
      </div>

      <!-- 不着急不重要 -->
      <div class="quadrant not-urgent-not-important">
        <div class="quadrant-header">
          <div class="quadrant-icon">😴</div>
          <div class="quadrant-title">不着急不重要</div>
        </div>
        <div class="todo-list">
          <div 
            v-for="todo in todos.notUrgentNotImportant" 
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
            @click="toggleTodo(todo)"
          >
            <div class="todo-title">{{ todo.title }}</div>
            <button @click.stop="deleteTodo(todo.id)" class="delete-btn">×</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const todos = ref({
  urgentImportant: [],
  urgentNotImportant: [],
  notUrgentImportant: [],
  notUrgentNotImportant: []
});

const loadTodos = () => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.value = {
    urgentImportant: storedTodos.filter(todo => todo.category === 'urgentImportant'),
    urgentNotImportant: storedTodos.filter(todo => todo.category === 'urgentNotImportant'),
    notUrgentImportant: storedTodos.filter(todo => todo.category === 'notUrgentImportant'),
    notUrgentNotImportant: storedTodos.filter(todo => todo.category === 'notUrgentNotImportant')
  };
};

const toggleTodo = (todo) => {
  todo.completed = !todo.completed;
  saveTodos();
};

const deleteTodo = (id) => {
  const allTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTodos = allTodos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
  loadTodos();
};

const saveTodos = () => {
  const allTodos = [
    ...todos.value.urgentImportant,
    ...todos.value.urgentNotImportant,
    ...todos.value.notUrgentImportant,
    ...todos.value.notUrgentNotImportant
  ];
  localStorage.setItem('todos', JSON.stringify(allTodos));
};

onMounted(() => {
  loadTodos();
});
</script>

<style scoped>
.home {
  padding: 20px;
  padding-bottom: 80px;
  min-height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.page-title {
  text-align: center;
  color: #333;
  margin: 20px 0;
  font-size: 24px;
}

.quadrants {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  flex: 1;
}

.quadrant {
  background: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.urgent-important {
  border-left: 5px solid #ff4757;
}

.urgent-not-important {
  border-left: 5px solid #ffa502;
}

.not-urgent-important {
  border-left: 5px solid #2ed573;
}

.not-urgent-not-important {
  border-left: 5px solid #70a1ff;
}

.quadrant-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.quadrant-icon {
  font-size: 24px;
  margin-right: 10px;
}

.quadrant-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.todo-list {
  flex: 1;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background: #fafafa;
  border-radius: 5px;
  cursor: pointer;
}

.todo-item.completed {
  text-decoration: line-through;
  color: #999;
}

.todo-title {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.delete-btn {
  background: #ff4757;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>