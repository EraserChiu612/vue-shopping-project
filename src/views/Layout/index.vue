<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'


</script> 




<template>
  <LayoutNav />
  <LayoutHeader />
  <!-- 次級路由出口 -->
  <RouterView />
  <LayoutFooter />
</template>
