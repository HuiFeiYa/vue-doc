<script setup>
import { computed } from 'vue'
const modules = import.meta.glob('./views/*.vue', { eager: true })
const routes = computed(()=> {
  return Object.keys(modules).map(filePath => {
    const fileName = filePath.replace(/^.+\/([\w-]+)\.\w+$/, '$1');
    return fileName
  })
})
</script>

<template>
  <div>
      <div style="user-select: none;">
        <!--使用 router-link 组件进行导航 -->
        <!--通过传递 `to` 来指定链接 -->
        <!--`<router-link>` 将呈现一个带有正确 `href` 属性的 `<a>` 标签-->
        <div v-for="routePath in routes" :key="routePath">

          <router-link  :to="'/'+routePath" exact-active-class="router-link-active">{{ routePath }}</router-link>
        </div>
      </div>
      <div >
        <router-view></router-view>
      </div>
  </div>

</template>

<style scoped>
.router-link-active {
  color: red;
  font-weight: bold;
}

</style>
