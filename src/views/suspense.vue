<script setup>
import Async1  from './components/Async1.vue'
import Async2  from './components/Async2.vue'
</script>
<template>
  <div>
    <Suspense>
      <div>
        <Async1 />
        <Async2 />
      </div>
      <!-- 在所有异步组件都返回前一直保持 loading -->
      <template #fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>