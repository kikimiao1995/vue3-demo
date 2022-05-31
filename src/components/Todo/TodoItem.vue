<template>
  <div class="flex justify-between items-center mx-4 py-4 text-base border-b border-stone-200">
    <label 
      v-if="!isEdit"
      class="cursor-pointer flex items-center"
    >
      <input 
        class="cursor-pointer form-checkbox mr-4 ml-1"
        type="checkbox"
        :checked="todo.isDone"
        @click="emit('toogleCheckbox', todo.id)"
      />
      <span 
        :class="{ 'line-through' : todo.isDone, 'text-stone-400': todo.isDone }"
        >{{ todo.text }}</span>
    </label>
    <!-- edit -->
    <div v-else>
      <input 
        ref="todoText"
        v-model="text"
        class="mr-4 ml-1 py-1 px-3 focus:outline-none text-cyan-700" 
        type="text"
        placeholder="修改待辦事項">
    </div>
    <div class="todo-action">
      <i 
        v-if="!isEdit"
        class="fa-solid fa-pen  cursor-pointer flex-none mr-3"
        :class="[todo.isDone ? 'text-stone-400': '']"
        @click="openEditor(todo)"
      ></i>
      <i 
        v-else
        class="fa-solid fa-circle-check  cursor-pointer flex-none mr-3"
        @click="submitEditor(todo)"
      ></i>
      <i
        class="fa-solid fa-trash-can cursor-pointer flex-none mr-1"
        @click="emit('removeTodo', todo.id)"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
defineProps({
  todo: Object,
})
const emit = defineEmits(['removeTodo', 'toogleCheckbox', 'editTodo'])
const isEdit = ref(false)
const text = ref('')
const todoText = ref(null)
const openEditor = (todo) => {
  isEdit.value = true // open input
  text.value = todo.text
  nextTick(() => {
    todoText.value.focus()
  })
}
const submitEditor = (todo) => {
  const editor = {
    id: todo.id,
    text: text.value
  }
  emit('editTodo', editor)
  isEdit.value = false
}
</script>