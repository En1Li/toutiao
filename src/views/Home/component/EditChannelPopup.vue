<template>
  <!-- 弹框 -->
  <van-popup
    v-model="show"
    position="bottom"
    :style="{ height: '100%' }"
    closeable
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            @click="isEdit = !isEdit"
            size="small"
            round
            class="edit-btn"
            >编辑</van-button
          >
        </van-cell>
        <!-- 我的频道 -->
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="(item, index) in myChannels"
            :key="item.id"
            :text="item.name"
            :class="{ 'active-channel': item.name === '推荐' }"
            @click="removeChannel(item, index)"
          >
            <template #icon>
              <van-icon v-show="isEdit && item.name !== '推荐'" name="cross" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="recommend-channel">
        <van-cell title="推荐频道"> </van-cell>
        <van-grid :border="false" gutter="10px">
          <van-grid-item
            v-for="item in recommendChannels"
            :key="item.id"
            :text="item.name"
            icon="plus"
            @click="addChannel(item)"
          >
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: false,
      allChannels: [],
      isEdit: false
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    removeChannel(channel, index) {
      if (this.isEdit && channel.name !== '推荐') {
        this.$emit('del-mychannel', channel.id)
      }
      if (!this.isEdit) {
        this.show = false
        this.$emit('change-active', index)
      }
    },
    addChannel(mychannel) {
      this.$emit('add-mychannel', { ...mychannel })
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        // const result = this.myChannels.find((i) => i.id === item.id)
        return !this.myChannels.find((i) => i.id === item.id)
        // if (result) {
        //   return false
        // } else {
        //   return true
        // }
      })
    }
  }
}
</script>

<style scoped lang="less">
.active-channel {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 0.02667rem solid red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;
      background-color: #eee;
      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          font-size: 14px;
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          line-height: 0.32rem;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
