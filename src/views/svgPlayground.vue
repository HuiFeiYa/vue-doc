<script setup></script>
<template>
  <div>
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <polyline points="10,10 10,90 90,90" stroke="black" fill="none" />
    </svg>
    <svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
      <!-- 定义箭头头部的样式 -->
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="black" />
        </marker>
      </defs>

      <!-- 绘制直线并使用箭头头部 -->
      <line
        x1="10"
        y1="50"
        x2="190"
        y2="50"
        stroke="black"
        stroke-width="2"
        marker-end="url(#arrowhead)"
      />
    </svg>
  </div>
</template>
