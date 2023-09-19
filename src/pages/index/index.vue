<script setup lang="ts">
import CategoryPanel from './components/CategoryPanel.vue'
import CustomNavbar from './components/CustomNavBar.vue'
import { getHomeBannerApi, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import HotPanel from './components/HotPanel.vue'

import PageSkelenton from './components/PageSkelenton.vue'
import { useDuessList } from '@/components'
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
const { guessRef, onScrolltolower } = useDuessList()
//自定义下拉刷新被触发
const istriggered = ref(false)
const onrefresherrefresh = async () => {
  //开启动画
  istriggered.value = true
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  //语法优化
  //重置猜你喜欢组件数据
  guessRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  guessRef.value?.getMore()
  //结束动画
  istriggered.value = false
}
//是否加载中的标记
const isLoading = ref(false)
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})
</script>

<template>
  <view class="viewport">
    <CustomNavbar />
    <!-- 滚动容器 -->
    <scroll-view
      @scrolltolower="onScrolltolower"
      refresher-enabled
      @refresherrefresh="onrefresherrefresh"
      class="scroll-view"
      scroll-y
      :refresher-triggered="istriggered"
    >
      <PageSkelenton v-if="isLoading" />
      <template v-else>
        <XtxSwiper :list="bannerList" />
        <CategoryPanel :list="categoryList" />
        <HotPanel :list="hotList" />
        <XtxGuess ref="guessRef" />
      </template>
    </scroll-view>
  </view>
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
.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>

function useDuessList(): { guessRef: any; onScrolltolower: any } { throw new Error('Function not
implemented.') }
