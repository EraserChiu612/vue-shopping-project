
<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomeHot from './components/HomeHot.vue'
import HomePanel from './components/HomePanel.vue'

</script>
<template >
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeProduct />
  <HomeHot />
  <!-- <HomePanel title="新鮮好物" sub-title="新鮮好物">
    <p>我是新鮮好務的內容</p>
  </HomePanel>
  <HomePanel title="元氣推薦">
  </HomePanel> -->
</template>
<style lang="">
  
  </style>
