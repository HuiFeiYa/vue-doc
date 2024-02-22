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
    ctx.clearRect(0,0,offsetWidth, offsetHeight)
    // ctx.drawImage(img.value, 0,0, offsetWidth, offsetHeight)
    ctx.drawImage(img.value, 0,0, dw,dh)
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
         <canvas :style="{width: width + 'px', height: height + 'px'}" ref="canvas" ></canvas>
    </div>
    <button @click="draw">绘制</button>
  </div>
</template>