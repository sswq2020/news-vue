<template>
  <div>
    <div class="news" ref="newsWrapper">
        <div class="news-content" v-if="newsdata.length && slides.length">
            <!--轮播图-->
            <div class="slide-wrapper">
                <div class="slide-content">
                    <slide :showDot="true" :interval="1500">
                        <div @click="selectArticle(item,$event)" class="slide-item" :key="index" v-for="(item,index) in slides">
                            <a><img :src="item.avatar[0]" width="100%"></a>    
                        </div>   
                    </slide>
                </div>
            </div>
            <!-- 列表 -->
            <ul class="lists">
                <li @click="selectArticle(item,$event)" 
                    class="list-item border-1px img_1" 
                    v-if="item.avatar.length === 1" 
                    v-for="(item,index) in newsdata" 
                    :key="index">
                    <div class="avatar">
                        <img :src="item.avatar[0]" width="85px" height="63.5px">
                    </div>
                    <div class="content">
                        <div class="title">{{item.title}}
                        </div>
                        <div class="source">
                            <span class="media">{{item.media}}</span><span class="time">{{item.time}}</span>
                        </div>
                    </div>
                </li>
                <li @click="selectArticle(item,$event)"  
                    class="list-item border-1px img_3" v-else-if="item.avatar.length > 1">
                   <div class="title">{{item.title}}</div>
                   <div class="avatar">
                       <img class="img" width="85px" height="63.5px" :src="img" :key="index" v-for="(img,index) in item.avatar">
                   </div>
                </li>
                <li @click="selectArticle(item,$event)" class="list-item border-1px img_no" v-else>
                    <div class="title">{{item.title}}</div>
                    <div class="source">
                        <span class="media">{{item.media}}</span><span class="time">{{item.time}}</span>
                    </div>
                </li>
            </ul>
            <!-- 
                1、底部提示信息 
                2、这里有一种情况,就是没有更多数据时,这里的文本应该显示"暂无更多数据"
            -->
            <div class="bottom-tip">
                <span class="loading-hook">{{bottomTip}}</span>
            </div>            
            
        </div>
        <h1 class="noInform">暂无信息!</h1>
    </div>
    <alert ref="alert"></alert>
    <newsdetail :newsinfo="selectedArticle" ref="newsdetail"></newsdetail>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import BScroll from 'better-scroll';
import slide from '../slide/slide.vue';
import alert from '../alert/alert.vue';
import newsdetail from '../newsdetail/newsdetail.vue';
const TemplateTest = `<p style="text-indent:2em;width:100%;" >
    <img src="./static/img/swapper1.jpg" style="display:block;margin:0 auto;width:100%;height:100%">
</p>
<p style="text-indent:2em;">网易科技讯9月8日消息，据Mac Rumors援引《据华尔街日报》的报道称，苹果即将推出的OLED iPhone 8将在生产过程中遇到多种生产问题，这很可能导致“供应短缺和发货延迟”。生产问题导致苹果的生产时间表出现“大约1个月”的挫折，但苹果供应商富士康正在加快进度，并努力招募更多新员工。
</p>
<p style="text-indent:2em;">
    《华尔街日报》今天透露的消息早有传闻。凯基证券分析师郭明錤(Ming-Chi Kuo)几个月前就曾表示，他预计iPhone 8可能要到2018年初才会上市。我们还听到许多谣传，称其显示层压工艺（display lamination process）和其他高科技组件(比如嵌入设备前面的3D传感器）存在问题等。
</p>
<p style="text-indent:2em;">
    《华尔街日报》指出，OLED装配是推迟生产和发货的主要原因。苹果及其供应商在制造OLED屏幕方面也遇到了麻烦。这些显示模块是由三星电子公司位于越南的子公司生产的。据一位知情人士透露，在三星自己的智能手机OLED显示模块上，屏幕与触摸面板是个整体。而iPhone的显示模块则是触摸面板在屏幕之外。
</p>
<p style="text-indent:2em;">
    知情人士称，与三星的生产过程相比，iPhone制造过程需要更多的步骤和更多的粘合剂和防护层，这就为出现更大生产错误埋下了隐患险。苹果还想在新设备的屏幕上添加Touch ID，但这“被证明是困难的”，导致苹果放弃指纹传感器，并在最后期限临近时失去了宝贵的时间。
</p>
<div style="text-indent:2em;">
    <div>
        <a href="http://gb.corp.163.com/gb/legal.html"></a>
    </div>
</div>
<p style="text-indent:2em;">
    尽管我们每年都会听到有关新款iPhone供应短缺的传言，但值得注意的是，今年的传言更加具体，也更加可怕。如果郭明錤的预测是正确的，那么希望更新新设备的用户可能要等待数周乃至数月，苹果需要更加努力提高产量。长期供货短缺可能也会影响到苹果的假日销售周期，而这通常是苹果公司最强劲的销售周期。但由于新款iPhone 7和7s Plus即将推出，因此很难确定iPhone 8的短缺是否会对苹果第四季度业绩造成什么影响。
</p>
<p style="text-indent:2em;">
    希望尽快拿到iPhone 8的用户希望在发售的时候能够预订这款设备。目前尚不清楚，在9月12日推出iPhone 8后不久，苹果是否会立即开售iPhone 8，以及供应短缺问题是否将导致苹果推迟9月发货。（小小）
</p>`
const ERR_OK = 0;
export default {
    data () {
        return {
            slides: [],
            newsdata: [],
            selectedArticle: {},
            bottomTip: '查看更多'
        }
    },
    created () {
        this.axios.get('/api/slides').then((response) => {
            let res = response.data;
            if (res.errno === ERR_OK) {
                this.slides = res.data;
                this.loadData();
            }
        })
    },
    methods: {
       loadData () {
           this.axios.get('/api/news').then((response) => {
               let res = response.data;
               this.$refs.alert.isShow = true;
               if (res.errno === ERR_OK) {
                    this.newsdata = this.newsdata.concat(res.data);
                    this.bottomTip = '查看更多'
                    this.$nextTick(() => {
                        if (!this.contentScroll) {
                            this.contentScroll = new BScroll(this.$refs.newsWrapper, {
                                click: true,
                                probeType: 1
                            });
                            this.contentScroll.on('scrollEnd', (pos) => {
                                console.log(pos.y);
                                console.log(this.contentScroll.y);
                                console.log(this.contentScroll.maxScrollY);
                                if (this.contentScroll.y <= (this.contentScroll.maxScrollY + 10)) {
                                    this.bottomTip = '加载中...'
                                    setTimeout(() => {
                                        this.loadData();
                                    }, 500)
                                }
                            })
                        } else {
                            this.contentScroll.refresh();
                        }
                    })
               }
           })
       },
       selectArticle (item, event) {
           if (!event._constructed) {
               return;
           }
           this.selectedArticle = item;
           if (!this.selectedArticle.text) {
                Vue.set(this.selectedArticle, 'text', TemplateTest);
                Vue.set(this.selectedArticle, 'editor', '杨蕾蕾');
            }
           this.$refs.newsdetail.show();
       }
    },
    components: {
        slide,
        newsdetail,
        alert
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import"../../common/stylus/mixin.styl"
    .news
      position:absolute
      top:40px
      bottom:0
      width:100%
      overflow:hidden
      .slide-wrapper
        position:relative
        width:100%
        height:0
        padding-top:65%
        overflow:hidden
        .slide-content
          position:absolute
          top:0
          left:0
          width:100%
          height:100%
      .lists
        .list-item
          margin:15px
          border-1px(rgba(7,17,27,0.1))
          &.img_1
            display:flex
            .avatar
              flex:0 0 85px
              width:85px
              margin-right:10px
            .content
              flex:1
              height:85px
              box-sizing:border-box
              .title
                height:32.5px
                margin-bottom:15px
                font-size:16px
                padding-right:5px
              .source
                height:15px
                font-size:12px
                color:#808080
                .media
                  margin-right:8px
          &.img_3
            height:95px
            .title
              padding-bottom:5px
              width:100%
              overflow:hidden
              white-space: nowrap;
              text-overflow: ellipsis;
            .avatar
              display:flex
              .img
                flex:1
                margin-right:5px
                &:last-child
                  margin-right:0px
          &.img_no
            height:85px
            .title
              padding-bottom:40px
              width:100%
              overflow:hidden
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size:16px
            .source
              font-size:12px
              color:#808080
              .media
                margin-right:8px


      .bottom-tip
        width:100%
        height:35px
        line-height:35px
        text-align:center
        background-color:#f2f2f2
      .noInform
        height:100%
        width:100%
        box-sizing:border-box;
        padding:100px
        text-align:center
        background-color:#f2f2f2   
        font-weight:700      
</style>      
