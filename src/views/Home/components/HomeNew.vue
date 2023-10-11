<template>
  <HomePanel title="新鮮好物" sub-title="新鮮出爐 品質靠普">
    <!-- 面板内容 -->
    <ul class="goods-list">
      <li v-for="item in newList" :key="item.id">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="">
          <p class="name">{{ item.name }}</p>
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import HomePanel from './HomePanel.vue'
import { findNewAPI } from '@/apis/home'

const newList = ref([])

const getNewList = async () => {
  const res = await findNewAPI()
  newList.value = res.result
}

onMounted(() => {
  getNewList()
})



</script>
<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    transition: all 0.5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0, 0, 0, 0.2);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding: 0 30px 0 30px;
      text-align: center;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>