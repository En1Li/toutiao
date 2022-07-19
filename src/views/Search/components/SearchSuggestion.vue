<template>
  <div>
    <van-cell v-for="(item, index) in highlightData" :key="index">
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchList } from '@/api/search'
export default {
  data() {
    return {
      SearchSuggestionList: []
    }
  },
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  watch: {
    keywords: {
      handler() {
        this.getSearchList()
      },
      immediate: true
    }
  },
  methods: {
    async getSearchList() {
      try {
        const res = await getSearchList(this.keywords)
        if (res.data.data.options.length === 0) {
          this.$toast.fail('没有搜索结果')
        }
        this.SearchSuggestionList = res.data.data.options.filter(Boolean)
      } catch (error) {
        console.log(error)
      }
    }
  },
  computed: {
    highlightData() {
      const reg = new RegExp(this.keywords, 'gi')
      return this.SearchSuggestionList.map((item) =>
        item.replace(reg, (match) => `<span style='color:red'>${match}</span>`)
      )
    }
  }
}
</script>

<style scoped lang="less">
.search-icon {
  padding-top: 10px;
}
</style>
