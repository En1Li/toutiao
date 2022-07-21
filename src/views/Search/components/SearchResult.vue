<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      offset="0"
    >
      <van-cell
        v-for="item in searchRes"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  props: {
    searchRes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      this.$emit('changePage')
      this.loading = false
    }
  }
}
</script>

<style></style>
