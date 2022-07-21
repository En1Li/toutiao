<template>
  <div>
    <!-- 顶部个人信息 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <!-- 修改个人信息部分 -->
      <van-cell title="头像" center>
        <template #default>
          <van-image
            round
            width="1rem"
            height="1rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell title="昵称">
        <template #default>
          123
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell title="性别">
        <template #default>
          123
          <van-icon name="arrow" />
        </template>
      </van-cell>
      <van-cell title="生日">
        <template #default>
          123
          <van-icon name="arrow" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-icon) {
    color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.van-icon) {
  margin-left: 15px;
}
</style>
