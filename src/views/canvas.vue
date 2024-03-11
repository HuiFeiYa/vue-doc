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

const addImage = (path) => {
  const img = new Image()
  return new Promise((resolve, reject)=> {
    img.onload = ()=> {
      resolve(img)
    }
    img.src = path
  })
}

/**
 * 绘制旋转的图片
 * centerX 未旋转 x 位置
 * centerY 未旋转 y 位置
 * angleInRadians 旋转角度
 * targetWidth 绘制图片宽
 * targetHeight 高
 */
const drawImageWidthAngle = (ctx,img, centerX, centerY, angleInRadians, targetWidth, targetHeight) => {
 // 保存原始未变换的状态
  ctx.save();
  // 移动坐标系到图片的中心点，这样旋转会以图片中心为基准
  var halfWidth = targetWidth / 2;
  var halfHeight = targetHeight / 2;
  ctx.translate(centerX + halfWidth, centerY + halfHeight);

  // 旋转60度
  ctx.rotate(angleInRadians);

  // 计算旋转后图片四个角的新坐标，但由于我们已经移动到中心，只需要计算偏移量
  var offsetX = -halfWidth;
  var offsetY = -halfHeight;

  // 使用旋转后的新坐标绘制图片
  ctx.drawImage(img, offsetX, offsetY, targetWidth, targetHeight);

  // 恢复到旋转之前的坐标系状态
  ctx.restore();
}
const loadImage = async (e) => {
    const ctx = canvas.value.getContext('2d')
    const {offsetWidth, offsetHeight } = img.value
    const [dx,dy,dw,dh] = aspectFit(offsetWidth, offsetHeight, offsetWidth,offsetHeight)
    width.value = offsetWidth
    height.value = offsetHeight
    //  devicePixelRatio 返回当前显示设备的物理像素分辨率与CSS 像素分辨率之比。此值也可以解释为像素大小的比率：一个 CSS 像素的大小与一个物理像素的大小
    const dpr = window.devicePixelRatio || 1;
    console.log('dpr:',dpr)
    // 默认画布的宽高是 300 * 150，在 style 中修改只是修改了展示，没有修改实际的 canvas 的大小
    canvas.value.width = offsetWidth * dpr
    canvas.value.height = offsetHeight * dpr
    ctx.clearRect(0,0,offsetWidth, offsetHeight)
    // 设置设备像素比
    ctx.scale(dpr,dpr)
    ctx.drawImage(img.value, 0, 0, offsetWidth, offsetHeight)

    // 保存当前画布状态
    // ctx.save()
    const shuiguoImg = await addImage('../public/shuiguo.png')
    const { width:sgWidth, height:sgHeight } = shuiguoImg
    const targetWidth = 100
    const rate = sgWidth / sgHeight
    const targetHeight = targetWidth / rate
    drawImageWidthAngle(ctx, shuiguoImg, 120, 0, Math.PI / 3, targetWidth, targetHeight)
    drawImageWidthAngle(ctx, shuiguoImg, -20, 0, -Math.PI / 3, targetWidth, targetHeight)
}





</script>
<template>
  <div>
    <div>
        源:
        <!-- <img  ref="img" src="../assets/河马.png" alt="" @load="loadImage"> -->
        <img style="width:200px"  ref="img" src="../../public/dog.png" alt="" @load="loadImage">
    </div>
    <div>
        绘制:
        <!-- <canvas ref="canvas" style="width:474px;height: 204px; "></canvas> -->
         <canvas ref="canvas" :style="{width: width + 'px',height: height + 'px'}"></canvas>
         <!-- <canvas ref="canvas" style="width: 300px;height: 150px;"></canvas> -->
    </div>
    <button @click="draw">绘制</button>
  </div>
</template>