<template>
<swiper :options="swiperOption"  ref="mySwiper" class="rec-one">  
  <!-- 这部分放你要渲染的那些内容v-for="item in music" -->
    <swiper-slide v-for="item in this.myImage">
      <!--<router-link :to="{name:'headerTitle',params:{item:item}}"> -->
      <router-link :to="{name:'pageContent', params:{id: item.id}}">
        <img :src="item.filePath" class="swiper-img">
        <span class="swiperWord">{{item.title}}</span>
      </router-link>
      <!--</router-link>-->
    </swiper-slide>  
    <!-- 这是轮播的小圆点 -->  
    <div class="swiper-pagination" slot="pagination"></div>  
</swiper>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'

require('swiper/dist/css/swiper.css')
export default {
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        notNextTick: true,
        autoplay: 3000,
        pagination: '.swiper-pagination',
        slidesPerView: 'auto',
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 30,
        onSlideChangeEnd: swiper => {
        // 这个位置放swiper的回调方法
          this.page = swiper.realIndex + 1
          this.index = swiper.realIndex
        }
      },
      swiperSlides: [1, 2, 3, 4, 5],
      myImage: []
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    // 这边就可以使用swiper这个对象去使用swiper官网中的那些方法
    // this.swiper.slideTo(0, 0, false)
  },
  created () {
    this.$http.get('/api/headerTitle').then((res) => {
      this.myImage = res.data
      if (this.myImage.length > 5) {
        this.myImage.splice(0, this.myImage.length - 5)
      }
      console.log(this.myImage)
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.rec-one
  width: 1000px
  height: 480px;
  margin: 0 auto
  .swiper-img
    display: inline-block
    width: 100%
    height: 480px;
  .swiperWord
    position: absolute
    left: 20px
    top: 420px
    color: red
    font-size: 24px
    font-weight: bold
</style>
