<script setup>
</script>
<template>
  <div>
    <!-- <svg width="200" height="200" viewBox="0 0 50 50">
        <circle cx="0" cy="0" r="50" ></circle>
    </svg> -->

    <p>part2</p>
    <svg width="200" height="200" viewBox="0 0 200 200">
        <polygon points="100,0 0,30 200,30" fill="#234236"></polygon>
        <polygon points="100,30 0,60 200,60" fill="#234236"></polygon>
        <polygon points="100,60 0,90 200,90" fill="#234236"></polygon>
        <rect x="100" y="90" width="40" height="80" style="transform: translateX(-20px);" fill="brown" />
    </svg>

    <p>part1</p>
    <svg width="200" height="200" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="50" fill="red"></circle>
        <circle cx="100" cy="18" r="10" stroke-width="2" stroke="orange" fill="none"></circle>
        <rect x="100" y="25" width="60" height="30" fill="yellow" style="transform: translateX(-30px);" />
    </svg>
  </div>
</template>