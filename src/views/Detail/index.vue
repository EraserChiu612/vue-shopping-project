<script setup>
import DetailHot from './components/DetailHot.vue'
import { getDetail } from '@/apis/detail.js'
import { useCartStore } from '@/stores/cartStore'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

const cartStore = useCartStore()

// sku規格被操作過
let skuObj = {}
const Skuchange = (sku) => {
  console.log(sku)
  skuObj = sku
}

const goods = ref({})
const route = useRoute()

const getGoods = async () => {
  const res = await getDetail(route.params.id)
  goods.value = res.result
}

onMounted(() => {
  getGoods()
})

// count
const count = ref(1)
const countChange = (count) => {
  count.value = count
}

// 加入購物車
const addCart = () => {
  if (skuObj.skuId) {
    //規格已選擇
    cartStore.addCart({
      Id: goods.value.id,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: goods.value.price,
      count: count.value,
      skuId: skuObj.skuId,
      attrsText: skuObj.attrs,
      selected: true
    })
  } else {
    //規格未選擇
    ElMessage.warning('請選擇規格')
  }
}
</script>

<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods.details">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首頁</el-breadcrumb-item>
          <!-- 報錯原因：goods一開始為{ },categories is undefined 
        1.可選鏈語法?.
        2.v-if手動控制渲染時機,保證只有數據存在才渲染 (v)-->
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories[1].id}` }"
            >{{ goods.categories[1].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories[0].id}` }"
            >{{ goods.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品訊息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片預覽區 -->
              <XtxImageView :image-list="goods.mainPictures" />
              <!-- 統計數量 -->
              <ul class="goods-sales">
                <li>
                  <p>銷量人氣</p>
                  <p>{{ goods.salesCount }}+</p>
                  <p><i class="bx bxs-hot"></i>銷量人氣</p>
                </li>
                <li>
                  <p>商品評價</p>
                  <p>{{ goods.commentCount }}+</p>
                  <p><i class="bx bx-comment-dots"></i>查看評價</p>
                </li>
                <li>
                  <p>收藏人氣</p>
                  <p>{{ goods.collectCount }}+</p>
                  <p><i class="bx bxs-bookmark-heart"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌訊息</p>
                  <p>{{ goods.brand.name }}</p>
                  <p><i class="bx bxs-id-card"></i>品牌訊息</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品訊息區 -->
              <p class="g-name">{{ goods.name }}</p>
              <p class="g-desc">{{ goods.desc }}</p>
              <p class="g-price">
                <span>{{ goods.price }}</span>
                <span>{{ goods.oldPrice }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促銷</dt>
                  <dd>10月周年慶大放送，App領券購買直降100元</dd>
                </dl>
                <dl>
                  <dt>服務</dt>
                  <dd>
                    <span>無條件退款</span>
                    <span>支持多元支付</span>
                    <span>免運費</span>
                    <a href="#">了解詳情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku(最小可用單位)組件 -->
              <XtxSku :goods="goods" @change="Skuchange" />

              <!-- 數量组件 -->
              <el-input-number v-model="count" @change="countChange" />
              <!-- 購物車按鈕組件 -->
              <div>
                <el-button size="large" class="btn" @click="addCart"> 加入購物車 </el-button>
              </div>
            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品詳情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{ item.name }}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="img in goods.details.pictures" :key="img" v-img-lazy="img" alt="" />
                </div>
              </div>
            </div>
            <!-- 24hr熱榜+專區推薦 -->
            <div class="goods-aside">
              <!-- 24小時熱榜 -->
              <DetailHot :hot-type="1" />
              <!-- 周日榜單 -->
              <DetailHot :hot-type="2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
        content: '¥';
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
              content: '•';
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

      ~ li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: '';
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
            font-size: 18px;
            margin-right: 2px;
            vertical-align: middle;
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

      > span {
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

  > img {
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
