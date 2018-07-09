<template>
    <div>
        <BookInfo :info="info"></BookInfo>
        <div class="comment">
            <textarea 
                v-model="comment" 
                :maxlength="100"
                class="textarea"
                placeholder="请输入图书短评"></textarea>
            <div class="location">
                地理位置：
                <switch 
                    :checked="location" 
                    color="#EA5A49"
                    @change="getGeo"></switch>
                <span class="text-primary">{{ location }}</span>
            </div>
            <div class="phone">
                手机型号：
                <switch 
                    :checked="phone" 
                    color="#EA5A49"
                    @change="getPhone"></switch>
                <span class="text-primary">{{ phone }}</span>
            </div>
        </div>
    </div>
    
</template>
<script>
import {get} from "@/utils"
import BookInfo from "@/components/BookInfo"
export default {
    components: {
        BookInfo
    },
    data() {
        return {
            bookid: "",
            info: {},
            comment: "",
            phone: "",
            Geo: ""
        }
    },
    mounted() {
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
    },
    methods: {
        async getDetail() {
            const info = await get("/weapp/bookdetail", {id: this.bookid})
            this.info = info
            wx.setNavigationBarTitle({
                title: info.title
            })
        },
        getGeo() {},
        getPhone(e) {
            if (e.target.value) {
                const phoneInfo = wx.getSystemInfoSync()
                this.phone = phoneInfo.model
            } else {
                this.phone = ""
            }
        }
    }
}
</script>
<style lang="scss">
.comment {
    margin-top: 20px;
    .textarea {
        width: 730rpx;
        height: 200rpx;
        background: #eee;
        padding: 10rpx;
    }
    .location {
        margin-top: 10px;
    }
    .phone {
        margin-top: 10px;
        span {
            font-size: 14px;
        }
    }
}
</style>
