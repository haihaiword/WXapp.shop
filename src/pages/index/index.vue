<script setup lang="ts">
import CategoryPanel from './components/CategoryPanel.vue'
import CustomNavbar from './components/CustomNavBar.vue'
import { getHomeBannerApi, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance, XtxGuess } from '@/types/components'
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}

// 获取前台分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
//获取热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}
const scrolltolower = () => {
  guessRef.value?.getMore()
}
//获取猜你喜欢实例
const guessRef = ref<XtxGuessInstance>()
//自定义下拉刷新被触发
const istriggered = ref(false)
const onrefresherrefresh = async () => {
  //开启动画
  istriggered.value = true
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  //语法优化
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  //结束动画
  istriggered.value = false
}
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})
</script>

<template>
  <CustomNavbar />
  <!-- 滚动容器 -->
  <scroll-view
    @scrolltolower="scrolltolower"
    refresher-enabled
    @refresherrefresh="onrefresherrefresh"
    class="scroll-view"
    scroll-y
    :refresher-triggered="istriggered"
  >
    <XtxSwiper :list="bannerList" />
    <CategoryPanel :list="categoryList" />
    <HotPanel :list="hotList" />
    <XtxGuess ref="guessRef" />
    <view class="index">首页</view>
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
