<template>
  <div>
    <!-- 顶部个人信息 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <!-- 修改个人信息部分 -->
      <div class="info_person">
        <input type="file" hidden ref="file" accept=".jpg,.png" />
        <van-cell title="头像" center @click="$refs.file.click()">
          <template #default>
            <van-image
              round
              width="1rem"
              height="1rem"
              :src="PersonInfo.photo"
            />
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <!-- 修改图片弹出框 -->
        <van-popup v-model="showImg" closeable position="bottom">
          <CropperImage :photo="photo" @closeImg="closeImgFn"></CropperImage>
        </van-popup>
        <van-cell title="昵称" @click="showName">
          <template #default>
            {{ PersonInfo.name }}
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
          <van-nav-bar
            title="更新昵称"
            left-text="取消"
            right-text="保存"
            @click-left="onClickLeftName"
            @click-right="onClickRight"
          />
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入名字"
            show-word-limit
          />
        </van-popup>
        <van-cell title="性别" @click="showSexFn">
          <template #default>
            {{ { 0: '男', 1: '女' }[PersonInfo.gender] }}
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-popup
          v-model="showSex"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-picker
            title="更新性别"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </van-popup>
        <van-cell title="生日" @click="showBirthdayFn">
          <template #default>
            {{ PersonInfo.birthday }}
            <van-icon name="arrow" />
          </template>
        </van-cell>
        <van-popup
          v-model="showBirthday"
          position="bottom"
          :style="{ height: '40%' }"
        >
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="cancel_birthday"
            @confirm="confirm_birthday"
          />
        </van-popup>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import { getPersonInfo, editPersonInfo } from '@/api/user'
import CropperImage from './component/CropperImage.vue'
export default {
  components: {
    CropperImage
  },
  data() {
    return {
      PersonInfo: {},
      show: false,
      showSex: false,
      showBirthday: false,
      message: '',
      columns: ['男', '女'],
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2021, 0, 17),
      showImg: false,
      photo: ''
    }
  },
  created() {
    this.getPersonInfo()
  },
  mounted() {
    this.$refs.file.addEventListener('change', (e) => {
      const file = e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = (e) => {
        this.photo = e.target.result
        this.showImg = true
      }
    })
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async getPersonInfo() {
      const { data } = await getPersonInfo()
      this.PersonInfo = data.data
    },
    showName() {
      this.show = true
      this.message = this.PersonInfo.name
    },
    // 修改昵称弹框左按钮
    onClickLeftName() {
      this.show = false
    },
    // 修改昵称弹框右按钮
    async onClickRight() {
      if (this.PersonInfo.name === this.message) {
        return this.$toast.fail('修改的名字不能与之前的相同')
      }
      await editPersonInfo(this.message)
      this.PersonInfo.name = this.message
      this.show = false
    },

    showSexFn() {
      this.showSex = true
    },
    // 修改性别弹框左按钮
    onCancel() {
      this.showSex = false
    },
    // 修改昵性别框右按钮
    async onConfirm(value, index) {
      await editPersonInfo(this.PersonInfo.name, index)
      this.PersonInfo.gender = index
      this.showSex = false
    },
    showBirthdayFn() {
      this.showBirthday = true
    },

    // 修改性别弹框左按钮
    cancel_birthday() {
      this.showBirthday = false
    },

    // 修改昵性别框右按钮
    async confirm_birthday(value) {
      const birthday = this.$moment(value).format('YYYY-MM-DD')
      await editPersonInfo(
        this.PersonInfo.name,
        this.PersonInfo.gender,
        birthday
      )
      this.PersonInfo.birthday = birthday
      this.showBirthday = false
    },
    closeImgFn(img) {
      this.PersonInfo.photo = img
      this.showImg = false
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
.info_person {
  .van-nav-bar[data-v-bc0b5f70] {
    background-color: #fff;
  }
  :deep(.van-nav-bar__title) {
    color: #000;
  }
}
</style>
