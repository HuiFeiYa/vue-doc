<script setup>
async function fetch () {
    const res = await new Promise((res)=> {
        setTimeout(() => {
            res({msg:'success'})
        }, 2000);
    })
    return res
}
// 父元素中包含 Suspense 可以在顶层使用 await
const res = await fetch()
console.log('async2 result:',res)
</script>
<template>
  <div>{{ res }}</div>
</template>