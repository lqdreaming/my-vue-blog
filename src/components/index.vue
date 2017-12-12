<template>
  <div id="app">
    <headerTitle></headerTitle>
    <slideShow></slideShow>
    <div class="section">
      <sectionLeft style="float: left"></sectionLeft>
      <sectionRight style="float: left"></sectionRight>
    </div>
    <div style="clear: both"></div>
    <FooterPart></FooterPart>
    <router-view ></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import headerTitle from './headerTitle'
import slideShow from './slideshow'
import sectionLeft from './section_left'
import sectionRight from './section_right'
import FooterPart from './FooterPart'

export default {
  components: {
    headerTitle,
    slideShow,
    sectionLeft,
    sectionRight,
    FooterPart
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "stylus" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../assets/styles/icon.css'
@import '../assets/styles/reset.css'

#app
  background: rgb(211, 232, 223) url(http://p0.so.qhimgs1.com/bdr/_240_/t01bf6eff80ae3e885a.jpg) 0% top scroll no-repeat
  background-size: 100% 100%
  .section
    width: 1000px
    margin: 0 auto
</style>
