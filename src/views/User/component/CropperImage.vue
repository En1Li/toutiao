<template>
  <div>
    <img :src="photo" ref="img" width="100%" alt="" />
    <van-button type="info" @click="confirm">完成</van-button>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { changePersonImg } from '@/api/user'
export default {
  props: ['photo'],
  mounted() {
    const img = this.$refs.img
    console.log(img.src)
    this.myCropper = new Cropper(img, {
      viewMode: 3,
      dragMode: 'none',
      initialAspectRatio: 1,
      aspectRatio: 1,
      preview: '.before',
      background: false,
      autoCropArea: 0.6,
      zoomOnWheel: true
    })
  },
  methods: {
    confirm() {
      const fm = new FormData()
      // console.log(fm)
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        fm.append('photo', blob)
        console.log(blob)
        const { data } = await changePersonImg(fm)
        this.$emit('closeImg', data.data.photo)
      })
    }
  }
}
</script>

<style></style>
