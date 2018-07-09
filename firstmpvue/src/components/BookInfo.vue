<template>
    <div class="bookinfo">
        <div class="thumb">
            <img 
                :src="info.image"
                class="back"
                mode="aspectFill" 
                alt="">
            <img 
                :src="info.image" 
                class="img" 
                mode="aspectFit">
            <div class="info">
                <div class="title">
                    {{ info.title }}
                </div>
                <div class="author">
                    {{ info.author }}
                </div>
            </div>
        </div>
        <div class="detail">
            <img 
                :src="userinfo.avatarUrl" 
                class="avatar" 
                mode="aspectFit">
            {{ userinfo.nickName }}
            <div class="right text-primary">
                {{ info.rate }}分
                <Rate :value="info.rate"></Rate>
            </div>
        </div>
        <div class="detail">
            {{ info.publisher }}
            <div class="right">
                {{ info.price }}
            </div>
        </div>
        <div class="tags">
            <div 
                v-for="tag in info.tags" 
                :key="tag" 
                class="badge">{{ tag }}</div>
        </div>
        <div class="summary">
            <p 
                v-for="(sum, i) in info.summary" 
                :key="i">{{ sum }}</p>
        </div>
    </div>
</template>
<script>
import Rate from "@/components/Rate"
export default {
    components: {
        Rate
    },
    props: {
        info: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        userinfo() {
            return this.info.user_info || {}
        }
    }
}
</script>
<style lang="scss">
.bookinfo {
    .badge {
        display: inline-block;
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid #ea5a49;
        color: #ea5a49;
    }
    .summary {
        margin-top: 10px;
        p {
            text-indent: 2em;
            font-size: 14px;
            padding: 0 15px;
        }
    }
    font-size: 14px;
    .right {
        float: right;
    }
    .detail {
        padding: 5px 10px;
        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .thumb {
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        .back {
            filter: blur(15px);
            width: 100%;
        }
        .img {
            position: absolute;
            width: 100%;
            height: 300rpx;
            left: 0;
            top: 30rpx;
        }
        .info {
            color: white;
            position: absolute;
            width: 100%;
            left: 0;
            top: 330rpx;
            text-align: center;
            .title {
                font-size: 20px;
            }
            .author {
                font-size: 14px;
            }
        }
    }
}
</style>
