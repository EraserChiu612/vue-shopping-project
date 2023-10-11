<script setup>
import { useCategoryStore } from '@/stores/category.js'


//使用pinia裡的數據

const CategoryStore = useCategoryStore()

</script>





<template >
  <header class="app-header">
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鮮</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <li class="home" v-for="item in CategoryStore.categoryList" :key="item.id">
          <RouterLink :to="`/${item.id}`">{{ item.name }}</RouterLink>
        </li>


      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!--- 購物車 -->
      <div class="cart">
        <a class="curr" href="#">
          <i class="iconfont icon-cart"></i><em>2</em>
        </a>
      </div>
    </div>
  </header>
</template>


<style lang="scss">
.app-header {
  background-color: #fff;


  .container {
    display: flex;
    align-items: center;


    .logo {
      width: 200px;

      a {
        display: block;
        height: 132px;
        width: 100%;
        text-indent: -9999px;
        background: url() no-repeat center 18px / contain;
      }
    }

    .app-header-nav {
      width: 820px;
      display: flex;
      justify-content: space-around;
      padding-left: 40px;
      align-items: center;

      li {
        display: inline-block;
        word-break: keep-all;
        padding: 0 15px;
        color: #666;
        font-size: 16px;
        line-height: 32px;
        height: 32px;


        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;

        }

      }

    }

    .search {
      width: 170px;
      height: 32px;
      position: relative;
      border-bottom: 1px solid #e7e7e7;
      line-height: 32px;

      .icon-search {
        font-size: 18px;
        margin-left: 5px;
      }

      input {
        width: 140px;
        padding-left: 5px;
        color: #666;
      }
    }

    .cart {
      width: 50px;

      .curr {
        height: 32px;
        line-height: 32px;
        text-align: center;
        position: relative;
        display: block;

        .icon-cart {
          font-size: 22px;
        }

        em {
          font-style: normal;
          position: absolute;
          right: 0;
          top: 0;
          padding: 1px 6px;
          line-height: 1;
          background: $helpColor;
          color: #fff;
          font-size: 12px;
          border-radius: 10px;

        }
      }
    }

  }
}
</style>