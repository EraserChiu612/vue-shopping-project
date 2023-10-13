<script setup>
import { getDetail } from '@/apis/detail.js'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const goods = ref({})
const route = useRoute()

const getGoods = async () => {
  const res = await getDetail(route.params.id)
  goods.value = res.result
}

onMounted(() => {
  getGoods()
})


</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div class="bread-container" v-if="goods.details">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>

          <!-- 報錯原因：goods一開始為{ },categories is undefined 
        1.可選鏈語法?.
        2.v-if手動控制渲染時機,保證只有數據存在才渲染 (v)-->
          <el-breadcrumb-item :to="{ path: '`/category/${goods.categories[1].id}`' }">{{ goods.categories[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '`/category/sub/${goods.categories[0].id}`' }">{{ goods.categories[0].name
          }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>抓绒保暖，毛毛虫子儿童运动鞋</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品訊息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片預覽區 -->

              <!-- 統計數量 -->
              <ul class="goods-sales">
                <li>
                  <p>銷量人氣</p>
                  <p>{{ goods.salesCount }}+</p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品評價</p>
                  <p>{{ goods.commentCount }}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人氣</p>
                  <p>{{ goods.collectCount }}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌訊息</p>
                  <p>{{ goods.brand.name }}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品訊息區 -->
              <p class="g-name"> 抓绒保暖，毛毛虫儿童鞋 </p>
              <p class="g-desc">好穿 </p>
              <p class="g-price">
                <span>200</span>
                <span> 100</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->

              <!-- 数据组件 -->

              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn">
                  加入购物车
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in 3" :key="item.value">
                      <span class="dt">白色</span>
                      <span class="dd">纯棉</span>
                    </li>
                  </ul>
                  <!-- 图片 -->

                </div>
              </div>
            </div>
            <!-- 24hr熱榜+專區推薦 -->
            <div class="goods-aside">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>