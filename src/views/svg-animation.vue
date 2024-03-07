<script setup lang=ts>
import { cloneDeep } from 'lodash';
import { ref, onMounted } from 'vue';
import { getLineAB, getPointToLineDistance, createSegmentBounds, isPointInBounds } from './util'
interface Point {
    x:number;
    y:number
}
const points = ref([{x:30, y:30}, {x:100,y:30}])
const previewPoints = ref<Point[]>([])
const originPath = ref('')
const previewPath = ref('')

// 交互层展示
const isShowControl = ref(false)
const isLineMousedown = ref(false)
const isControlMousedown = ref(false)
const controlIndex = ref(-1)
// 新增控制点
const controlPoint = ref< Point| null>(null)
const InDistance = 5; // 距离小于等于5认为在线内
const isInsert = ref(false)
const segmentIndex = ref(-1)
const updatePreviewPath = (list)=> {
    const {x, y} = list[0]
    let path = `M ${x},${y}`
    for(let i=1;i<list.length;i++) {
        const {x:lx, y: ly} = list[i]
        path += ` L ${lx},${ly}`
    }
    return path
}

const handleLine = (e) => {
    e.stopPropagation()
    isShowControl.value = true
    const { top, left, width  } = e.target.getBoundingClientRect()
    const { clientX, clientY, offsetX, offsetY} = e
    //  offsetX, offsetY 相对于父级
    controlPoint.value = {
        x: offsetX,
        y: offsetY
    }
    previewPoints.value = cloneDeep(points.value)
    const i = getSegmentIndex(points.value, {x: offsetX, y: offsetY})
    segmentIndex.value = i
    isLineMousedown.value = true
}

const handleWrapperClick = () => {
    isShowControl.value = false
}

const getSegmentIndex = (list, point) => {
    // 小于两个点，在其中插入一个点
    if (list.length <=2) {
        return 1
    } else {
        // 1 计算点击的点所在的线段
      for (let i = 0; i < list.length - 1; i++) {
        const current = list[i]
        const next = list[i+1]
        if (current.x === next.x || current.y === next.y) {
            const bounds = createSegmentBounds(current, next)
            if (bounds) {
                if (isPointInBounds(point, bounds, true)) {
                    return i + 1
                }
            } 
        } else {
            let leftPt = current
            let rightPt = next
            if (current.x > next.x) {
                leftPt = next
                rightPt = current
            }
            // 水平情况左极限和右极限
            if (point.x > leftPt.x - InDistance && point.x < rightPt.x + InDistance) {
                const { a, b } = getLineAB(current, next);
                const dis = getPointToLineDistance(point, a, b);
                if (dis < 5) {
                    return i + 1
                }
            }
        }
      }
      return -1
    }
}

const handleControlMousedown = (e, index) => {
    e.stopPropagation()
    isShowControl.value = true
    isControlMousedown.value = true
    controlIndex.value = index
}
const handleMousemove = (e) => {
    const { clientX, clientY, offsetX, offsetY} = e
    if (isShowControl.value ) {
        if (isLineMousedown.value) {
            // 判断控制点在那条线段上
            const i = segmentIndex.value;
            if (i === -1) return 
            if (!isInsert.value) {
                previewPoints.value.splice(i, 0, {
                    x: offsetX,
                    y: offsetY
                })
                isInsert.value = true
            } else {
                const target = previewPoints.value[i]
                target.x = offsetX
                target.y = offsetY
            }
            previewPath.value = updatePreviewPath(previewPoints.value)
        } else if (isControlMousedown.value) {
            const target = previewPoints.value[controlIndex.value]
            target.x = offsetX
            target.y = offsetY
            previewPath.value = updatePreviewPath(previewPoints.value)
        }
    }
}

const handleMouseup = () => {
    controlPoint.value = null
    previewPath.value = ''
    points.value = cloneDeep(previewPoints.value)
    isInsert.value = false
    isLineMousedown.value = false
    isControlMousedown.value = false
    if (isShowControl.value) {
        originPath.value = updatePreviewPath(points.value)
    }
}

onMounted(()=> {
    originPath.value = updatePreviewPath(points.value)
})
</script>
<template>
  <div style="position: relative;" @mousedown="handleWrapperClick" @mousemove="handleMousemove" @mouseup="handleMouseup">
    <!-- 展示层 -->
    <svg width="500" height="500">
        <g  @mousedown="handleLine" >
            <path :d="originPath" fill="none" stroke="black"  stroke-width="2" shape-rendering="geometricPrecision"/>
            <!-- 增加点击范围，不展示 -->
            <path :d="originPath" fill="none"  stroke="transparent" stroke-width="10" />
        </g>
    </svg>
    <!-- 交互层 -->
    <svg width="500" height="500" style="position: absolute;top:0px;left: 0px;pointer-events: none;">
        <g v-show="isShowControl" style="pointer-events: all;">
            <rect v-for="(point,index) in points" :key="point.x + '' + point.y" :x="point.x" :y="point.y" width="6" height="6"
             style="transform: translate(-3px,-3px);cursor: crosshair;" fill="black" @mousedown="handleControlMousedown($event,index)"></rect>
        </g>
        <g  v-show="previewPath" style="pointer-events: none;">
           <path  :d="previewPath" fill="none" stroke="#666" stroke-width="2"  shape-rendering="geometricPrecision"></path>
        </g>
    </svg>
  </div>
</template>