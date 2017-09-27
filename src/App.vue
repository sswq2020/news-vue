<template>
  <div id="app">
    <div class="nav-wrapper" ref="navWrapper">
      <div class="tab">
        <div class="tab-item">
          <router-link to="/news">新闻</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/hotspot">热点</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/technology">科技</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/propertyMarket">楼市</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/peopleWelfare">民生</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/finance">金融</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/law">法律</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
  name: 'app',
  mounted () {
     this.$nextTick(() => {
        this._initScroll();
     })
  },
  methods: {
    _initScroll () {
      let vm = this;
      this.navScroll = new BScroll(vm.$refs.navWrapper, {
        scrollX: true,
        click: true
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.nav-wrapper
  position:relative
  padding-bottom:5px
  width:100%
  overflow:hidden
  white-space:nowrap
  .tab
    height: 35px
    line-height: 35px
    background-color:#fff
    width:440px
    .tab-item
      display:inline-block
      padding:0 13px
      text-align: center
      & > a
        display: block
        font-size: 16px
        color: rgb(77, 85, 93)
        &.active
          color:#48a5f4
          border-bottom: 1px solid #48a5f4
          font-weight:bold
</style>
