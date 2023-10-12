<script setup>
import { onMounted } from 'vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

//獲取導航列表的action
import { useCategoryStore } from '@/stores/category.js'

const CategoryStore = useCategoryStore()

onMounted(() => {
  CategoryStore.getCategory()
})

</script> 




<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 次級路由出口 -->
  <!-- 添加key,破壞vue的複用機制,強制銷毀重建 -->
  <!-- <RouterView :key="$route.fullPath" /> -->
  <RouterView />
  <LayoutFooter />
</template>
