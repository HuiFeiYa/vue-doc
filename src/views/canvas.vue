<script setup>
import { ref, onMounted } from 'vue'
const img = ref(null)
const canvas = ref(null)
const width = ref(100)
const height = ref(100)
const draw = ()=> {
    
}

const aspectFit = (imageWidth, imageHeight, canvasWidth, canvasHeight) => {
  const imageRate = imageWidth / imageHeight
  const canvasRate = canvasWidth / canvasHeight
  let [dx, dy, dw, dh] = []
  if (imageRate >= canvasRate) {
    dw = canvasWidth
    dh = canvasWidth / imageRate
  } else {
    dh = canvasHeight
    dw = canvasHeight * imageRate
  }
  dx = (canvasWidth - dw) / 2
  dy = (canvasHeight - dh) / 2
  return [dx, dy, dw, dh]
}

const loadImage = (e) => {
    const ctx = canvas.value.getContext('2d')
    const {offsetWidth, offsetHeight } = img.value
    const [dx,dy,dw,dh] = aspectFit(offsetWidth, offsetHeight, offsetWidth,offsetHeight)
    width.value = offsetWidth
    height.value = offsetHeight
    //  devicePixelRatio 返回当前显示设备的物理像素分辨率与CSS 像素分辨率之比。此值也可以解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小
    const dpr = window.devicePixelRatio || 1;
    console.log('dpr:',dpr)
    // 默认画布的宽高是 300 * 150，在 style 中修改只是修改了展示，没有修改实际的 canvas 的大小
    canvas.value.width = 600 * dpr
    canvas.value.height = 300 * dpr
    ctx.clearRect(0,0,offsetWidth, offsetHeight)
    // 设置设备像素比
    ctx.scale(dpr,dpr)
    const rate = 1
    ctx.drawImage(img.value, 0,0, offsetWidth / rate, offsetHeight / rate)
}



</script>
<template>
  <div>
    <div>
        源:
        <img  ref="img" src="../assets/河马.png" alt="" @load="loadImage">
    </div>
    <div>
        绘制:
        <!-- <canvas ref="canvas" style="width:474px;height: 204px; "></canvas> -->
         <canvas ref="canvas" style="width: 600px;height: 300px;"></canvas>
         <!-- <canvas ref="canvas" style="width: 300px;height: 150px;"></canvas> -->
    </div>
    <button @click="draw">绘制</button>
  </div>
</template>