<template>
  <div>
    <van-nav-bar title="黑马头条" left-arrow @click-left="onClickLeft" />
    <div class="title">
      <h1>{{ atricleInfo.title }}</h1>
    </div>
    <!-- 作者信息 -->
    <div class="aut">
      <div class="left">
        <van-image
          round
          width="1.2rem"
          height="1.2rem"
          :src="atricleInfo.aut_photo"
        />
        <div class="aut-info">
          <div>{{ atricleInfo.aut_name }}</div>
          <div class="time">{{ dayjs(atricleInfo.pubdate).fromNow() }}</div>
        </div>
      </div>
      <div class="right">
        <van-button
          v-if="!atricleInfo.is_followed"
          round
          type="info"
          @click="followFn(atricleInfo.aut_id)"
          >+关注</van-button
        >
        <van-button
          v-else
          round
          type="info"
          @click="removefollowFn(atricleInfo.aut_id)"
          >已关注</van-button
        >
      </div>
    </div>
    <!-- 文章信息 -->
    <div class="artInfo">
      <article
        class="markdown-body"
        style="text-align: left"
        v-html="atricleInfo.content"
      ></article>
      <van-divider>正文结束</van-divider>
    </div>
    <!-- 文章评论列表 -->
    <div class="comment">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="0"
        :immediate-check="false"
      >
        <div
          class="comment-one"
          v-for="(item, index) in articleComment"
          :key="index"
        >
          <div class="img">
            <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
          </div>
          <div class="commit-text">
            <div class="left">
              <div class="left-text">
                <span>{{ item.aut_name }}</span>
                <div class="mid">{{ item.content }}</div>
                <span
                  ><i>{{ dayjs(item.pubdate).fromNow() }}</i>
                  <van-button
                    @click="replyFn(item.com_id)"
                    size="mini"
                    round
                    type="default"
                    >回复{{ item.reply_count }}</van-button
                  ></span
                >
              </div>
            </div>
            <div class="right">
              <span v-if="!item.is_liking" @click="dianzanComment(item.com_id)"
                ><van-icon name="good-job-o" /> 赞 {{ item.like_count }}</span
              >
              <span v-else @click="dianzanComment(item.com_id)"
                ><van-icon color="red" name="good-job" /> 赞
                {{ item.like_count }}</span
              >
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <!-- 文章的回复评论 -->
    <div class="commit_reply">
      <van-popup
        v-model="comment_reply"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-nav-bar
          :title="comment_reply_main.length ? commentreply : '暂无回复'"
        />
        <!-- 回复评论头部 -->
        <div class="comment-one">
          <div class="img">
            <van-image
              round
              width="1rem"
              height="1rem"
              :src="comment_reply_top.aut_photo"
            />
          </div>
          <div class="commit-text">
            <div class="left">
              <div class="left-text">
                <span>{{ comment_reply_top.aut_name }}</span>
                <div class="mid">{{ comment_reply_top.content }}</div>
                <span
                  ><i>{{ dayjs(comment_reply_top.pubdate).fromNow() }}</i>
                  <van-button size="mini" round type="default"
                    >回复{{ comment_reply_top.reply_count }}</van-button
                  ></span
                >
              </div>
            </div>
            <div class="right">
              <span><van-icon name="good-job-o" /> 赞</span>
            </div>
          </div>
        </div>
        <van-divider>全部回复</van-divider>
        <!-- 回复评论循环部分 -->
        <div
          class="comment-one"
          v-for="(item, index) in comment_reply_main"
          :key="index"
        >
          <div class="img">
            <van-image round width="1rem" height="1rem" :src="item.aut_photo" />
          </div>
          <div class="commit-text">
            <div class="left">
              <div class="left-text">
                <span>{{ item.aut_name }}</span>
                <div class="mid">{{ item.content }}</div>
                <span
                  ><i>{{ dayjs(item.pubdate).fromNow() }}</i>
                  <van-button size="mini" round type="default"
                    >回复{{ item.reply_count }}</van-button
                  ></span
                >
              </div>
            </div>
            <div class="right">
              <span><van-icon name="good-job-o" /> 赞</span>
            </div>
          </div>
        </div>
        <van-divider>没有更多了</van-divider>
        <!-- 底部评论按钮 -->
        <div class="buttom_comment">
          <van-button round type="default" @click="showcommentReply"
            >评论</van-button
          >
          <van-popup
            v-model="show_reply"
            position="bottom"
            :style="{ height: '25%' }"
          >
            <van-field
              v-model="message_reply"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              placeholder="请输入留言"
              show-word-limit
            />
            <van-button
              size="mini"
              :disabled="!message_reply"
              type="primary"
              @click="commentReply(comment_reply_top.com_id)"
              >评论</van-button
            >
          </van-popup>
        </div>
      </van-popup>
    </div>

    <!-- 文章的固定底部 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="show = true"
      >
        写评论
      </van-button>
      <!-- 评论部分 -->
      <van-popup v-model="show" position="bottom">
        <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        >
          <template #extra>
            <span class="text-fabu">
              <van-button
                :disabled="!message"
                @click="fabu_comment"
                type="primary"
                >发布</van-button
              ></span
            >
          </template>
        </van-field>
      </van-popup>
      <!-- badge展示信息数 -->
      <van-icon name="comment-o" :badge="articleComment.length" color="#777" />

      <!-- 收藏按钮切换 -->
      <van-icon
        color="#777"
        v-if="!atricleInfo.is_collected"
        @click="shoucangFn"
        name="star-o"
      />
      <van-icon color="red" v-else @click="shoucangFn" name="star" />

      <!-- 点赞按钮切换 -->
      <van-icon
        v-if="atricleInfo.attitude <= 0"
        color="#777"
        name="good-job-o"
        @click="dianzanFn"
      />
      <van-icon v-else color="red" name="good-job" @click="dianzanFn" />

      <!-- 点击展示分享按钮 -->
      <van-icon
        name="share"
        color="#777777"
        @click="showShare = true"
      ></van-icon>
      <van-share-sheet
        class="show_show"
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
      />
    </div>
  </div>
</template>

<script>
import {
  getArticleInfo,
  dianzanArticle,
  removeDianzan,
  shoucangArticle,
  removeShoucang
} from '@/api/news'
import {
  getArticleComment,
  commentArticle,
  dianzanComment,
  removeDianzanComment
} from '@/api/comment'
import { following, removeFollow } from '@/api/user'
import dayjs from '@/utils/dayjs'
export default {
  components: {},
  data() {
    return {
      id: this.$router.history.current.params.id,
      atricleInfo: [],
      articleComment: [],
      show: false,
      show_reply: false,
      showShare: false,
      message: '',
      message_reply: '',
      dayjs,
      comment_reply: false,
      comment_reply_top: {},
      comment_reply_main: [],
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' }
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' }
        ]
      ],
      loading: false,
      finished: false
    }
  },
  created() {
    this.getArticleInfo()
    this.getArticleComment()
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },

    // 获取文章信息
    async getArticleInfo() {
      const { data } = await getArticleInfo(this.id)
      this.atricleInfo = data.data
    },

    // 获取文章评论
    async getArticleComment() {
      const { data } = await getArticleComment('a', this.id)
      this.articleComment = data.data.results
    },
    async onLoad() {
      // if()
      const commentId =
        this.articleComment[this.articleComment.length - 1].com_id
      const { data } = await getArticleComment('a', this.id, commentId)
      if (data.data.results.length <= 0) {
        this.finished = true
        return
      }
      this.articleComment.push(...data.data.results)
      this.loading = false
    },

    // 对文章进行评论
    commentArticle() {
      commentArticle(this.id, this.message)
    },

    // 触发添加评论
    fabu_comment() {
      this.commentArticle()
      setTimeout(() => {
        this.getArticleComment()
      }, 500)
      this.show = false
      this.$toast.success('发布评论成功')
      this.message = ''
    },

    // 文章点赞
    dianzanFn() {
      if (this.atricleInfo.attitude <= 0) {
        dianzanArticle(this.id)
        this.atricleInfo.attitude = 1
        this.$toast.success('点赞成功')
      } else {
        removeDianzan(this.id)
        this.atricleInfo.attitude = 0
        this.$toast.success('取消点赞成功')
      }
    },

    // 文章收藏
    shoucangFn() {
      if (!this.atricleInfo.is_collected) {
        shoucangArticle(this.id)
        this.atricleInfo.is_collected = true
        this.$toast.success('收藏成功')
      } else {
        removeShoucang(this.id)
        this.atricleInfo.is_collected = false
        this.$toast.success('取消收藏成功')
      }
    },

    // 评论回复
    async replyFn(id) {
      const index = this.articleComment.findIndex((item) => item.com_id === id)
      this.comment_reply_top = this.articleComment[index]
      this.comment_reply = true
      const res = await getArticleComment('c', id)
      this.comment_reply_main = res.data.data.results
    },

    showcommentReply() {
      this.show_reply = true
    },
    // 对评论进行评论
    async commentReply(id) {
      const { data } = await commentArticle(id, this.message_reply, this.id)
      this.comment_reply_main.unshift(data.data.new_obj)
      this.show_reply = false
      this.$toast.success('发布评论成功')
      this.message_reply = ''
    },

    // 关注用户
    async followFn(id) {
      await following(id)
      this.atricleInfo.is_followed = true
      this.$toast.success('关注成功')
    },

    // 取消关注用户
    async removefollowFn(id) {
      await removeFollow(id)
      this.atricleInfo.is_followed = false
      this.$toast.success('取消关注成功')
    },

    // 点赞评论或取消点赞评论
    async dianzanComment(id) {
      const index = this.articleComment.findIndex((item) => item.com_id === id)
      if (!this.articleComment[index].is_liking) {
        await dianzanComment(id)
        this.articleComment[index].is_liking = true
        this.articleComment[index].like_count++
        this.$toast.success('点赞成功')
      } else {
        await removeDianzanComment(id)
        this.articleComment[index].is_liking = false
        this.articleComment[index].like_count--
        this.$toast.success('取消点赞成功')
      }
    }
  },
  computed: {
    commentreply() {
      return `${this.comment_reply_main.length}条回复`
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
.title {
  font-size: 25px;
  padding: 32px;
  color: #3a3a3a;
  word-wrap:break-word
}
.aut {
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    .aut-info {
      color: #3a3a3a;
      font-size: 32px;
      padding-top: 10px;
      padding-left: 20px;
      .time{
        padding-top: 10px;
        color: #b7b7b7;
        font-size: 25px;
      }
    }
  }
  .right{
    .van-button--normal{
        width: 2.5rem;
        height: 0.8rem
        // height: 35px;
    }
  }
}
.artInfo{
    padding: 100px 32px 50px 32px;
}
.article-bottom {
 position: fixed;
 left: 0;
 right: 0;
 bottom: 0;
 display: flex;
 justify-content: space-around;
 align-items: center;
 box-sizing: border-box;
 height: 100px;
 border-top: 1px solid #d8d8d8;
 background-color: #fff;
 .comment-btn {
  width: 280px;
  height: 46px;
  border: 1px solid #eeeeee;
  font-size: 30px;
  line-height: 46px;
  color: #a7a7a7;
 }
 .van-icon {
  font-size: 40px;
  .van-info {
   font-size: 12px;
   background-color: #e22829;
  }
 }
 .van-popup--bottom{
    height: 240px;
 }
 :deep(.van-field__control){
    height: 160px !important;
    background-color: #eee;
 }
 .text-fabu{
    color: #6ba3d8;
    margin-left: 30px;
    padding: 50px 20px 0 0;
 }
 .van-button--primary{
  background-color:#fff ;
  border: 0;
  color: #6ba3d8;
 }
 .show_show{
  height:8.5rem;
 }

}
.comment{
    padding:  0 32px 100px 32px;
    font-size: 30px;
    .img{
        height: 240px;
    }
    .comment-one{
        display: flex;
        .commit-text{
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
            .left{
                flex: 1;
                display: flex;
                .left-text{
                    flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                }
                .mid{
                    flex: 0.5;
                }
                i{
                    font-style: normal;
                    // padding-top: 5px;
                }
            }
        }
    }
}
.commit_reply{
    font-size: 30px;
    .van-nav-bar[data-v-9651e3a2]{
      background-color: #fff;
      :deep(.van-nav-bar__title){
      color: #000 !important
      }

    }
    .img{
        height: 240px;
    }
    .comment-one{
         padding:  0 32px 30px 32px;
        display: flex;
        .commit-text{
            flex: 1;
            display: flex;
            justify-content: space-between;
            margin-left: 20px;
            .left{
                flex: 1;
                display: flex;
                .left-text{
                    flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                }
                .mid{
                    flex: 0.5;
                }
                i{
                    font-style: normal;
                    // padding-top: 5px;
                }
            }
        }
    }
    .buttom_comment{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 100px;
      background-color: #ff69b4;
      .van-button{
        width: 80%;
        height: 80px;
        margin: 10px  0 0 70px;
      }
    }
}
</style>
