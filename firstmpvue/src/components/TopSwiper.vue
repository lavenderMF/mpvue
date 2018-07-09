<template>
    <div class="swiper">
        <swiper
            :indicator-dots="true"
            :indicator-color="'#EA5A49'"
            :autotoplay="true"
            :interval="600"
            :duration="1000"
            :circular="true">
            <div 
                v-for="(top,index) in imgUrls" 
                :key="index">
                <swiper-item>
                    <img 
                        v-for="(img,imgIndex) in top"
                        :src="img.image" 
                        :key="imgIndex" 
                        alt="" 
                        class="slide-image"
                        mode="aspectFit" 
                        @click="bookDetail(img)" >
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>
<script>
export default {
    props: {
        tops: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    computed: {
        imgUrls() {
            let res = this.tops
            return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
        }
    },
    methods: {
        bookDetail(item) {
            wx.navigateTo({
                url: "/pages/detail/main?id=" + item.id
            })
        }
    }
}
</script>
<style lang="scss">
.swiper {
    margin-top: 5px;
    .slide-image {
        width: 33%;
        height: 250rpx;
    }
}
</style>
