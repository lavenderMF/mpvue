<template>
    <div class="rate">
        <span>☆☆☆☆☆</span>
        <div 
            :style="style" 
            class="hollow">★★★★★</div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default: "0"
        }
    },
    conputed: {
        style() {
            return `width:${this.value / 2}em`
        }
    }
}
</script>
<style lang="scss">
.rate {
    position: relative;
    .hollow {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 0;
        overflow: hidden;
    }
}
</style>
