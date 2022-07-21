<template>
  <div>
    <van-cell-group>
      <van-cell title="搜索历史">
        <template #default>
          <van-icon name="delete-o" v-if="isShow" @click="isShow = !isShow" />
          <div class="del" v-else>
            <span @click="delAll">全部删除</span>
            <span @click="isShow = !isShow">完成</span>
          </div>
        </template>
      </van-cell>

      <!-- 搜索历史内容 -->
      <van-cell
        v-for="(item, index) in searchHistory"
        :key="index"
        :title="item"
        @click="checkVal(item)"
      >
        <template #default v-if="!isShow">
          <van-icon name="cross" @click.stop="delone(index)" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import storage from '@/utils/storage'
export default {
  data() {
    return {
      isShow: true,
      searchHistory: []
    }
  },
  created() {
    this.searchHistory = storage.get('searvhHistory')
  },
  methods: {
    checkVal(val) {
      this.$emit('checkVal', val)
    },
    delAll() {
      this.searchHistory = []
      storage.remove('searvhHistory')
    },
    delone(val) {
      this.searchHistory = this.searchHistory.filter(
        (item, index) => index !== val
      )
      storage.set('searvhHistory', this.searchHistory)
    }
  }
}
</script>

<style scoped lang="less">
.del {
  span {
    margin-right: 10px;
  }
}
</style>
