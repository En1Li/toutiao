<template>
  <div>
    <!-- 头部组件 -->
    <van-nav-bar class="navbar" title="登录" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 表单组件 -->
    <van-form ref="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRoules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-count-down
            v-if="isShowCountDown"
            :time="60 * 1000"
            format="ss s"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="code-btn"
            size="mini"
            round
            @click="sendCode"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user'
import { mobileRules, codeRoules } from './rules'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRoules,
      isShowCountDown: false
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async login() {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      try {
        const res = await login(this.mobile, this.code)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        const status = error.response.status
        let message = '登录错误，请刷新~'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
        // switch (status) {
        //   case 400:
        //     this.$toast.fail(error.response.data.message)
        //     break
        //   case 507:
        //     this.$toast.fail('登录错误，请刷新~')
        //     break
        //   default:
        //     this.$toast.fail('登录错误，请刷新~')
        //     break
        // }
      }
    },
    async sendCode() {
      try {
        await this.$refs.form.validate('mobile')
        await sendCode(this.mobile)
        this.isShowCountDown = true
      } catch (error) {
        if (!error.response) {
          this.$toast.fail('手机号非法!')
        } else {
          const status = error.response.status
          if (status === 404 || status === 429) {
            this.$toast.fail(error.response.data.message)
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .van-icon {
    color: #fff;
  }
}
:deep(.van-field__label) {
  width: 30px;
}
.toutiao {
  font-size: 0.49333rem;
}
.code-btn {
  background-color: #eee;
  padding: 0 10px;
  color: #666;
}
</style>
