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
                v-for="(top,index) in tops" 
                :key="index">
                <swiper-item>
                    <img 
                        :src="top.image" 
                        alt="" 
                        class="slide-image" 
                        mode="aspectFit" >
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
            console.log(res)
            return res
            // return [res.splice(0, 3), res.splice(3, 6), res.splice(6)]
        }
    }
}
</script>
<style>
</style>
