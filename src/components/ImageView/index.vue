<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'



// props適配圖片列表
// 圖片列表(有index值)
defineProps({
  imageList: {
    type: Array,
    default: () => [],
  },
})


// 1.小圖切換大圖顯示
const activeIndex = ref(0)

const enterHandler = (i) => {
  activeIndex.value = i
}

// 2.取得滑鼠相對位置

const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)

const left = ref(0)
const top = ref(0)

const positionX = ref(0)
const positionY = ref(0)
// *控制方框隨滑鼠移動(監聽X,Y座標變化,一旦變化重新設置left,top值)

watch([elementX, elementY], () => {
  //如果滑鼠沒有移入,不執行後方判斷
  if (isOutside.value) return

  //有效範圍內控制移動距離
  // 橫向
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  // 縱向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }
  // 邊界處理
  if (elementX.value > 300) {
    left.value = 200
  }
  if (elementX.value < 100) {
    left.value = 0
  }
  if (elementY.value > 300) {
    top.value = 200
  }
  if (elementY.value < 100) {
    top.value = 0
  }
  // 控制大圖的顯示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2


})

</script>


<template>
  <div class="goods-image">
    <!-- 左邊大圖-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 淺灰色小方塊 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小圖列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandler(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大鏡大圖 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>