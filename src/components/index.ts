import type { XtxGuessInstance } from '@/types/components'
import { ref } from 'vue'

//猜你喜欢的组合式函数
export const useDuessList = () => {
  const guessRef = ref<XtxGuessInstance>()
  //滚动触底事件
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }
  //返回
  return {
    guessRef,
    onScrolltolower,
  }
}
