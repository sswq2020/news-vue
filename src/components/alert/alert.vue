<template>
    <transition name='alert-fade'>
     <div class="alert-hook" v-show="isShow" :class="typeClass">{{message.title}}</div>
    </transition>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'alert',
    props: {
        message: {
            type: Object,
            default: function () {
                return {'title': '刷新成功', 'type': 'success'}
            }
        }
    },
    data () {
        return {
            isShow: false
        }
    },
    computed: {
        typeClass () {
            if (this.message.type === 'success') {
                return 'success'
            } else if (this.message.type === 'info') {
                return 'info'
            } else {
                return 'fail'
            }
        }
    },
    watch: {
        isShow () {
            if (this.isShow === true) {
                setTimeout(() => {
                    this.isShow = false
                }, 1000)
            }
        }
    }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.alert-hook
  position:fixed
  top:0
  left:0
  z-index:2
  width:100%
  height:35px
  line-height:35px
  text-align:center
  font-size:12px
  &.success
    background-color: rgba(213,233,247,0.9)
    color:#7ab2dd
  &.info
    background-color: rgba(232,216,77,0.9)
    color:#fff
  &.fail
    background-color: #f2dede
    color:#fff       
  &.alert-fade-enter-active
    transition: all .4s ease
  &.alert-fade-leave-active
    transition: all .4s cubic-bezier(1.0, 0.3, 0.8, 1.0)
  &.alert-fade-enter, &.alert-fade-leave-to
    transform:translateY(-35px)
    opacity:0     
</style>