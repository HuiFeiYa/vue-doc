<script setup>
import {ref} from 'vue'
// 当前鼠标点击位置
const event = ref({})
// 当前鼠标点击 e.target 元素位置信息
const rect = ref({})
const handleMouseClick = e => {
    event.value = e
    rect.value = e.target.getBoundingClientRect()
    console.log('rect:',rect)
}
</script>
<template>
  <div style="width:2000px;height: 100vh;position: absolute; top: 0;left:0; text-align: center;" @click="handleMouseClick">
    <div class="wrapper" >
        <!-- 页面未发生滚动时候与 pageX 和 pageY 相同 -->
        <!-- 它提供事件发生时的应用客户端区域的水平坐标 (与页面坐标不同)。例如，不论页面是否有水平滚动，当你点击客户端区域的左上角时，鼠标事件的 clientX 值都将为 0。 -->
        <div>
            clientX: {{ event.clientX }}
        </div>
        <div>
            clientY: {{ event.clientY }}
        </div>
        <div>offsetX: {{ event.offsetX }}</div>
        <div>offsetY: {{ event.offsetY }}</div>
        <div>screenX: {{ event.screenX }}</div>
        <div>screenY: {{ event.screenY }}</div>
        <!-- 这个属性将基于文档的边缘，考虑任何页面的水平方向上的滚动。举个例子，如果页面向右滚动 200px 并出现了滚动条，这部分在窗口之外，然后鼠标点击距离窗口左边 100px 的位置，pageX 所返回的值将是 300。 -->
        <div>pageX: {{ event.pageX }}</div>
        <div>pageY: {{ event.pageY }}</div>
        <div>rect: {{ rect }}</div>
    </div>
    <div style=" margin-top: 150px;margin-left: 100px;background-color: #eee;width: 500px;height: 500px;overflow-x: auto;">
        <div style="height: 100px;width:2000px;background: linear-gradient(to right, red, #00ff00);"></div>
    </div>
    <img src="../assets//mouse.png" alt="">
  </div>
</template>