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
    <router-view :key="key"></router-view>
  </div>
</template>

<script>
// region 引入npm库
import BScroll from 'better-scroll';
// endregion
export default {
  name: 'app',
  mounted () {
     this.$nextTick(() => {
        this._computedWidth();
        this.$nextTick(() => {
          this._initScroll();
        })
     })
  },
  methods: {
    /**
     * 标题导航横轴滚动初始化
     * */
    _initScroll () {
      let vm = this;
      this.navScroll = new BScroll(vm.$refs.navWrapper, {
        scrollX: true,
        scrollY: false,
        probeType: 2,
        click: true
      })
    },
    /**
     * 动态计算list宽度
     * */
    _computedWidth () {
      let arryWith = 0;
      let tabList = this.$refs.navWrapper.getElementsByClassName('tab-item');
      let styleObject = this.$refs.navWrapper.getElementsByClassName('tab')[0];
      for (let i = 0; i < tabList.length; i++) {
        console.log(arryWith)
        arryWith = arryWith + tabList[i].offsetWidth + 3
      }
      styleObject.style.width = arryWith + 'px'
    }
  },
  computed: {
    /**
     * 保证组件生命周期可以重新渲染
     * */
    key () {
        return this.$route.path !== undefined ? this.$route.path + new Date() : this.$route + new Date();
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
