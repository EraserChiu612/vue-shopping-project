<script setup>

import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()



const confirm = () => {
  //登出的邏輯實現
  //1.清除登入訊息,觸發action
  userStore.clearUserInfo()
  //2.跳轉到登入頁面
  router.push('/login')
}




</script>
<template  >
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模板渲染 區分登入與非登入狀態-->
        <!-- 設計思路: 登入時顯示第一個模板, 非登入時顯示第二個模板 (是否有token) -->
        <template v-if="userStore.userInfo.token">
          <li><a href="#"><i class="iconfont icon-user"></i>{{userStore.userInfo.account}}</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="確認登出嗎?" confirm-button-text="確認" cancel-button-text="取消">
              <template #reference>
                <a href="#">立即登出</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="#">我的訂單</a></li>
          <li><a href="#">會員中心</a></li>
        </template>
        <template v-else>
          <li><a href="#" @click="$router.push('/login')">請先登入</a></li>
          <li><a href="#">幫助中心</a></li>
          <li><a href="#">關於我們</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
.app-topnav {

  background-color: #333;



  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    list-style: none;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;

        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>