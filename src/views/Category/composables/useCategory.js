//封裝分類數據業務的code
import { ref, onMounted } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()

  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => {
    getCategory()
  })

  // 目標:路由參數發生變化,重新獲取數據
  onBeforeRouteUpdate((to) => {
    //問題: 使用最新路由參數獲取數據
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}
