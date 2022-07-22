<template>
  <div @click="checkArticle">
    <van-cell
      v-if="artInfo.cover.type === 0"
      :title="artInfo.title"
      :label="articleDesc"
    ></van-cell>
    <van-cell
      v-if="artInfo.cover.type === 1"
      :title="artInfo.title"
      :label="articleDesc"
    >
      <van-image width="3rem" height="2rem" :src="artInfo.cover.images[0]" />
    </van-cell>
    <van-cell v-if="artInfo.cover.type === 3" :title="artInfo.title">
      <template #label>
        <div>
          <van-image
            v-for="(item, index) in artInfo.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="item"
          />
          <span>{{ articleDesc }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  props: {
    artInfo: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc() {
      const data = this.artInfo
      const time = dayjs(data.pubdate).fromNow()
      return `${data.aut_name} ${data.comm_count}评论 ${time}`
    }
  },
  methods: {
    checkArticle() {
      this.$emit('checkArticle')
    }
  }
}
</script>

<style></style>
