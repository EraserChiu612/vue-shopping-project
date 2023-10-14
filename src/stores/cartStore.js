//封裝購物車模塊

import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import { insertCartAPI, findNewCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    // 獲取最新購物車列表
    const updateNewList = async () => {
      const res = await findNewCartListAPI()
      cartList.value = res.result
    }
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)
    //1. 定義管理購物車數據的state
    const cartList = ref([])
    // 2. 定義actions
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登入狀態下,添加購物車操作
        await insertCartAPI({ skuId, count })
        updateNewList()
      } else {
        // 添加購物車操作
        // 1. 判斷購物車中是否已經存在該商品 思路:通過匹配傳遞過來的商品SKU ID,來判斷購物車中是否已經存在該商品

        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          // 2. 如果存在,則數量+1
          item.count++
        } else {
          // 3. 如果不存在,則添加到購物車中
          cartList.value.push(goods)
        }
      }
    }
    // 刪除購物車中的商品
    const delCart = async (skuId) => {
      if (isLogin.value) {
        await delCartAPI([skuId])
        updateNewList()
      } else {
        //法1. 通過skuId查找到要刪除的商品索引 -splice
        const idx = cartList.value.findIndex((item) => item.skuId === skuId)
        cartList.value.splice(idx, 1)
        //法2.使用array的過濾方式刪除 -filter
        //cartList.value = cartList.value.filter(item => item.skuId !== skuId)
      }
    }

    // 清除購物車列表
    const clearCart = () => {
      cartList.value = []
    }

    // 單選功能
    const singleCheck = (skuId, selected) => {
      //通過skuId查找到要刪除的商品 ,然後把它的selected修改為傳遞過來的selected
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    //全選功能
    const allCheck = (selected) => {
      //把購物車中所有商品的selected都修改為傳遞過來的selected
      cartList.value.forEach((item) => (item.selected = selected))
    }

    //計算屬性
    //1. 計算購物車中商品的總數量
    const allCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
    //2. 計算購物車中商品的總價格
    const allPrice = computed(() =>
      cartList.value.reduce((total, item) => total + item.count * item.price, 0)
    )
    //3. 已選中的商品總數量
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((total, item) => total + item.count, 0)
    )

    //4. 已選中的商品總價格
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.count * item.price, 0)
    )

    //是否全選
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    return {
      cartList,
      addCart,
      delCart,
      clearCart,
      singleCheck,
      allCheck,
      updateNewList,
      allCount,
      allPrice,
      selectedCount,
      selectedPrice,
      isAll
    }
  },
  {
    persist: true
  }
)
