<template>
  <div class="tabbar">
    <div class="tab-item" @click="$router.push('/')">
      <div class="tab-icon">🏠</div>
      <div class="tab-text">首页</div>
    </div>
    <div class="tab-add" @click="showAddModal = true">
      <div class="add-btn">+</div>
    </div>
    <div class="tab-item" @click="$router.push('/profile')">
      <div class="tab-icon">👤</div>
      <div class="tab-text">个人中心</div>
    </div>
  </div>

  <!-- 添加待办事项弹窗 -->
  <div class="modal" v-if="showAddModal">
    <div class="modal-content">
      <h3>添加待办事项</h3>
      <input 
        v-model="newTodo.title" 
        type="text" 
        placeholder="输入待办事项内容"
        class="todo-input"
      />
      <div class="category-selector">
        <div 
          v-for="category in categories" 
          :key="category.key"
          class="category-item"
          :class="{ active: newTodo.category === category.key }"
          @click="newTodo.category = category.key"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <div class="category-name">{{ category.name }}</div>
        </div>
      </div>
      <div class="modal-buttons">
        <button @click="showAddModal = false">取消</button>
        <button @click="addTodo" class="confirm-btn">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showAddModal = ref(false);

const categories = ref([
  { key: 'urgentImportant', name: '着急重要', icon: '🔥' },
  { key: 'urgentNotImportant', name: '着急不重要', icon: '⏰' },
  { key: 'notUrgentImportant', name: '不着急重要', icon: '📌' },
  { key: 'notUrgentNotImportant', name: '不着急不重要', icon: '😴' }
]);

const newTodo = ref({
  title: '',
  category: 'urgentImportant'
});

const addTodo = () => {
  if (!newTodo.value.title.trim()) return;
  
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.push({
    id: Date.now(),
    title: newTodo.value.title,
    category: newTodo.value.category,
    completed: false
  });
  localStorage.setItem('todos', JSON.stringify(todos));
  
  showAddModal.value = false;
  newTodo.value = { title: '', category: 'urgentImportant' };
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 100;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
}

.tab-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.tab-text {
  font-size: 12px;
}

.tab-add {
  position: relative;
  width: 60px;
  height: 60px;
}

.add-btn {
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: #42b983;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: bold;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
}

.modal-content h3 {
  margin-top: 0;
  text-align: center;
  color: #333;
}

.todo-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  margin: 15px 0;
  box-sizing: border-box;
  font-size: 16px;
}

.category-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category-item {
  flex: 1;
  min-width: 45%;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.category-item.active {
  border-color: #42b983;
  background: #f0f8f4;
}

.category-icon {
  font-size: 24px;
  margin-bottom: 5px;
}

.category-name {
  font-size: 12px;
  color: #666;
}

.modal-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.modal-buttons button {
  padding: 10px 20px;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
}

.modal-buttons .confirm-btn {
  background: #42b983;
  color: #fff;
  border-color: #42b983;
}
</style>