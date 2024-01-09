<script setup>
async function fetch () {
    const res = await new Promise((res)=> {
        setTimeout(() => {
            res({msg:'success'})
        }, 1000);
    })
    return res
}
const res = await fetch()
console.log('async1 result:',res)
</script>
<template>
  <div>{{ res }}</div>
</template>