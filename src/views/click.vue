<script setup>
// 点击内部元素打印

/**
 *          handleMousedown: MouseEvent {isTrusted: true, _vts: 1709775019321, screenX: 105, screenY: 458, clientX: 86, …}
click.vue:6 wrap handleWrapMousedown: MouseEvent {isTrusted: true, _vts: 1709775019321, screenX: 105, screenY: 458, clientX: 86, …}
click.vue:18  handleMouseup: MouseEvent {isTrusted: true, _vts: 1709775019390, screenX: 105, screenY: 458, clientX: 86, …}
click.vue:9 wrap handleWrapMouseup: MouseEvent {isTrusted: true, _vts: 1709775019390, screenX: 105, screenY: 458, clientX: 86, …}
click.vue:12  handleClick: PointerEvent {isTrusted: true, _vts: 1709775019390, pointerId: 1, width: 1, height: 1, …}
click.vue:3 wrap handleWrapClick: PointerEvent {isTrusted: true, _vts: 1709775019390, pointerId: 1, width: 1, height: 1, …}
 */
function handleWrapClick(e) {
    console.log('wrap handleWrapClick:',e)
}
function handleWrapMousedown(e) {
    console.log('wrap handleWrapMousedown:',e)
}
function handleWrapMouseup(e) {
    console.log('wrap handleWrapMouseup:',e)
}
function handleClick(e) {
    console.log(' handleClick:',e)
}
function handleMousedown(e) {
    console.log(' handleMousedown:',e)
}
function handleMouseup(e) {
    console.log(' handleMouseup:',e)
}
</script>
<template>
  <div>
    <div style="width: 200px;height: 200px;border: 1px solid red;" @click="handleWrapClick" @mousedown="handleWrapMousedown" @mouseup="handleWrapMouseup">
        <div style="width:100px;height: 100px;border: 1px solid blue;" @click="handleClick" @mousedown="handleMousedown" @mouseup="handleMouseup"></div>
    </div>
  </div>
</template>