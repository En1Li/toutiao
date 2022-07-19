<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onload"
      success-text="刷新成功~"
    >
      <van-list
        @load="onload"
        offset="0"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <articleItem
          v-for="item in articleLists"
          :key="item.art_id"
          :artInfo="item"
        ></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/news'
import articleItem from './articleItem.vue'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    articleItem
  },
  data() {
    return {
      articleLists: [],
      pre_timestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    async getArticleList() {
      try {
        const { data } = await getArticleList(this.id, +new Date())
        this.pre_timestamp = data.data.pre_timestamp
        this.articleLists = data.data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重试')
        }
      }
    },
    async onload() {
      try {
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        if (this.refreshing) {
          this.articleLists.unshift(...data.data.results)
        } else {
          this.articleLists.push(...data.data.results)
        }
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    }
  }
}
</script>

<style></style>
