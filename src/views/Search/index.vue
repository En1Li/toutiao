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
    <component :is="componentName" :keywords="value"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data() {
    return {
      value: '',
      isShowSearchResult: false
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResult = true
      console.log(123)
    },
    onCancel() {
      this.$router.go(-1)
    },
    onFocus() {
      this.isShowSearchResult = false
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
