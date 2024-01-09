<script setup>
</script>
<template>
  <div>
    <h1>产生“层叠上下文”</h1>
    <h2>普通元素设置position属性为非static值并设置z-index属性为具体数值</h2>
    <div style="display: flex;">
        <div style="position: relative;text-align: left;background-color: beige;">
            <!-- 未设置 zIndex ，未产生层叠 -->
            <div>
                <p class="mt20" style="position: absolute;z-index: 1;background-color: red;">zIndex1</p>
                <p style="background-color: aqua;">普通元素</p>
            </div>
            <!-- 未设置 zIndex ，未产生层叠 -->
            <div>
                <p class="mt20" style="position: absolute;z-index: 1;background-color: green;top:70px">zIndex2</p>
            </div>
        </div>
        <!-- 设置 zIndex ，产生层叠 -->
        <div style="position: relative;text-align: left;background-color: rgb(41, 5, 94);margin-left: 20px;">
            <div style="position: relative;z-index: 2;">
                <p class="mt20" style="position: absolute;z-index: 1;background-color: rgb(219, 164, 164);">zIndex1</p>
                <p style="background-color: aqua;">普通元素</p>
            </div>
            <!-- 先比较当前层级，当前元素层级低于兄弟层级，所有子元素都低于兄弟子元素 -->
            <div style="position: relative;z-index: 1;top:-130px">
                <p class="mt20" style="position: absolute;z-index: 100;background-color: rgb(0, 128, 128);top:70px">zIndex2</p>
            </div>
        </div>
    </div>
  </div>
</template>
<style>
p {
    width: 100px;
    height: 100px;
}
.mt20 {
    margin-top: 40px;
}
</style>