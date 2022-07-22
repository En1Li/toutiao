<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        background="#3296FA"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
      />
    </form>
    <!-- <SearchHistory></SearchHistory>
    <SearchResult></SearchResult>
    <SearchSuggestion></SearchSuggestion> -->
    <component
      :is="componentName"
      :keywords="value"
      :searchRes="searchRes"
      @checkVal="checkValFn"
      @changePage="changePageFn"
      @checkSuggest="checkSuggestFn"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { getSearchRes } from '@/api/search'
import storage from '@/utils/storage'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      value: '',
      page: 1,
      searchRes: [],
      searchHistory: [],
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResult = true
      this.getSearchRes()
      const a = this.searchHistory.indexOf(this.value)
      if (this.value.trim() === '') {
        return
      }
      if (a === -1 && this.value.trim() !== '') {
        this.searchHistory.unshift(this.value)
        storage.set('searvhHistory', this.searchHistory)
      } else {
        this.searchHistory.splice(a, 1)
        this.searchHistory.unshift(this.value)
        storage.set('searvhHistory', this.searchHistory)
      }
    },
    onCancel() {
      this.$router.go(-1)
    },
    onFocus() {
      this.isShowSearchResult = false
    },
    async getSearchRes() {
      const { data } = await getSearchRes(this.page, this.value)
      this.searchRes = data.data.results
      console.log(data.data.results)
    },
    async changePageFn() {
      this.page++
      const { data } = await getSearchRes(this.page, this.value)
      this.searchRes.push(...data.data.results)
    },
    checkValFn(val) {
      this.value = val
      this.onSearch()
    },
    checkSuggestFn(val) {
      this.value = val
      this.onSearch()
    }
  },
  computed: {
    componentName() {
      if (this.value.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  }
}
</script>

<style></style>
