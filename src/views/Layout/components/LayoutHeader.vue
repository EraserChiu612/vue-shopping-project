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
        <li>
          <RouterLink to="/">居家</RouterLink>
        </li>
        <li>
          <RouterLink to="/">美食</RouterLink>
        </li>
        <li>
          <RouterLink to="/">服飾</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!--- 購物車 -->
    </div>
  </header>
</template>
<script>

</script>
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
        background: url() no-repeat center 18px / container;
      }
    }

    .app-header-nav {
      display: flex;
      list-style: none;
      align-items: center;

      li {
        display: inline-block;
        padding: 0 15px;
        font-size: 14px;
        color: #666;

      }

    }

  }


}
</style>