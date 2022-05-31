<template>
  <div class="h-screen flex flex-col items-center bg-stone-200 px-3 md:px-0">
    <div class="pt-12 lg:w-1/3 md:w-3/5 w-full">
      <div class="text-5xl font-baloo-tamma2 tracking-widest text-center pb-6">TODO LIST</div>
      <div class="relative">
        <input 
          v-model="newTodo"
          @keyup.enter.space="addTodo"
          class="w-full px-6 py-3 rounded-lg focus:outline-none" type="text" 
          placeholder="新增待辦事項">
        <i 
          @click="addTodo"
          class="fa-solid fa-plus absolute right-0 top-0  py-4 px-4 bg-stone-800 text-white rounded-tr-lg rounded-br-lg cursor-pointer"
        ></i>
      </div>
      <div 
        v-if="count('all')"
        class="bg-white rounded-lg mt-2">
        <div class="flex text-sm">
          <div 
            @click="type = 'all'" 
            class="basis-1/3 text-center cursor-pointer py-4 border-b-2"
            :class="typeClass('all')"
          >全部</div>
          <div 
            @click="type = 'pending'" 
            class="basis-1/3 text-center cursor-pointer py-4  border-b-2"
            :class="typeClass('pending')"
          >待完成</div>
          <div 
            @click="type = 'done'" 
            class="basis-1/3 text-center cursor-pointer py-4  border-b-2"
            :class="typeClass('done')"
          >已完成</div>
        </div>
        <TodoItem 
          v-for="todo in listTodoByType()"
          :key="todo.id"
          :todo="todo"
          @editTodo="editTodo"
          @removeTodo="removeTodo"
          @toogleCheckbox="toogleCheckbox"
        />
        <div class="flex justify-between text-sm pt-6 pb-8 px-6">
          <div>{{ count('pending') }} 個待完成項目</div>
          <div v-if="false" class="cursor-pointer">清除已完成項目</div>
          <div @click="removeAllDone()" class="cursor-pointer text-stone-400">清除已完成項目</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoItem from './TodoItem.vue'
import { ref, nextTick } from 'vue'
const newTodo = ref('')
const todos = ref(null)
const type = ref('all')
todos.value = [
  {
    id: '0',
    text: 'todos',
    isDone: false
  },
  {
    id: '1',
    text: 'GRE340',
    isDone: true
  },
]

const typeClass = (selectType) => {
  return type.value === selectType ? 'border-stone-800': 'border-stone-200 text-stone-400'
}

const listTodoByType = () => {
  if(type.value === 'pending') return todos.value.filter((t) => t.isDone === false)
  if(type.value === 'done') return todos.value.filter((t) => t.isDone === true)
  return todos.value
}

const count = (type) => {
  if(type === 'all') return todos.value.length
  if(type === 'pending') return todos.value.filter((t) => t.isDone === false).length
  if(type === 'done') return todos.value.filter((t) => t.isDone === true).length
}

const removeAllDone = () => { // not done yet
  return todos.value = todos.value.filter((t) => t.isDone === false)
}

// toggle checkbox
const toogleCheckbox = (selectId) => {
  const index = todos.value.findIndex((el) => el.id === selectId)
  todos.value[index].isDone = ! todos.value[index].isDone
}

// CRUD
const addTodo = () => { // 原生 js 中，keyup 事件傳進參數 e，要透過 e.target.value 取 input 值
  if(newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value,
      isDone: false
    })
    newTodo.value = ''
  }
}
function editTodo(editor) {
  const index = todos.value.findIndex(el => el.id === editor.id)
  todos.value[index].text = editor.text
}
function removeTodo(selectId) {
  const index = todos.value.findIndex(el => el.id === selectId)
  todos.value.splice(index, 1)
}
</script>
