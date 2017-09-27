<template>
    <ul class="lists">
        <li class="list-item border-1px img_1" v-if="item.avatar.length === 1" v-for="(item,index) in newsdata" :key="index">
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
        <li class="list-item border-1px img_3" v-else-if="item.avatar.length > 1">
            <div class="title">{{item.title}}</div>
            <div class="avatar">
                <img class="img" width="85px" height="63.5px" :src="img" :key="index" v-for="(img,index) in item.avatar">
            </div>
        </li>
        <li class="list-item border-1px img_no" v-else>
            <div class="title">{{item.title}}</div>
            <div class="source">
                <span class="media">{{item.media}}</span><span class="time">{{item.time}}</span>
            </div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
export default {
    props:{
        seller: {
            newsdata: Object
        }        
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.lists
  .list-item
    margin:7.5px
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
                margin-bottom:10px
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
              padding-bottom:20px
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
</style>