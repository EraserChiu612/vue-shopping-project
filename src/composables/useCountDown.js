// 封裝倒計時邏輯函數
import { computed, onUnmounted, ref } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  //1.響應式數據
  let timer = null
  const time = ref(0)
  //格式化時間 xx分xx秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))

  //2.開啟倒計時函數
  const start = (currentTime) => {
    //開始倒計時邏輯
    // 核心邏輯撰寫:每隔1s,currentTime--
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  //3.清除定時器
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return { formatTime, start }
}
