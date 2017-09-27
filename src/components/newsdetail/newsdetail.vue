<template>
    <transition name="move">
      <div v-show="showFlag" class="newsdetail" ref="newsdetail">
         <div class="back" @click.stop="hide"></div>
         <div class="articleWapper" ref="articleWapper">
            <div class="article">
                <div class="content-title">
                    {{newsinfo.title}}
                </div>
                <div class="content-source">
                    <span class="time">{{newsinfo.time}}</span>&nbsp;&nbsp;<span class="media">{{newsinfo.media}}</span>
                </div>
                <div class="content-text" v-html="articletext">
                </div>
                <div class="content-editor">
                    责任编辑:{{newsinfo.editor}}
                </div>
            </div>
         </div>

      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
export default {
    props: {
        newsinfo: {
            type: Object
        }
    },
    data () {
        return {
            showFlag: false
        }
    },
    methods: {
        show () {
            this.showFlag = true;
            this.$nextTick(() => {
                if (!this.articleScroll) { this.articleScroll = new BScroll(this.$refs.articleWapper, {}); } else {
                    this.articleScroll.refresh();
                }
            })
        },
        hide () {
            this.showFlag = false;
        }
    },
    computed: {
        articletext () {
            return this.newsinfo.text
        }
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .newsdetail
      position:absolute
      left:0
      top:0
      width:100%
      height:100%
      z-index:30
      background: #fff
      transform: translate3d(0, 0, 0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.2s linear
      &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
      .back
        position:relative
        width:100%
        height:50px
        background-color:rgba(34,34,34,0.8)
      .articleWapper
        position:absolute
        top:50px
        left:0
        bottom:0
        width:100%
        overflow:hidden
        .article
           padding:15px 15px 10px 15px 
           .content-title
             font-size:1.3rem
             font-weight:bold
             text-align:justify
           .content-source
             padding:15px 0
             font-size:12px
             color:#808080
             .media
               color:#3D4FA6
           .content-text
             font-size:1.0rem
             text-align:justify
             line-height:2rem;        
           .content-editor
             font-size:12px
             color:#808080
             margin-top:20px

</style>