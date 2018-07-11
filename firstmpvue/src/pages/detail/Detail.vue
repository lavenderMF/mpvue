<template>
    <div>
        <BookInfo :info="info"></BookInfo>
        <commentlist :comments="comments"></commentlist>
        <div 
            v-if="showAdd" 
            class="comment">
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
            <button 
                class="btn" 
                @click="addComment">
                评论
            </button>
        </div>
        <div 
            v-else 
            class="text-footer">
            未登录或者已经评论过了
        </div>
    </div>
    
</template>
<script>
import {get, post} from "@/utils"
import BookInfo from "@/components/BookInfo"
import commentlist from "@/components/commentlist"
export default {
    components: {
        BookInfo,
        commentlist
    },
    data() {
        return {
            comments: [],
            userinfo: {},
            bookid: "",
            info: {},
            comment: "",
            phone: "",
            location: ""
        }
    },
    computed: {
        showAdd() {
            if (!this.userinfo.openId) {
                return false
            }
            if (this.comments.filter(v => v.openId == this.userinfo.openId).length) {
                return false
            }
            return true
        }
    },
    mounted() {
        this.bookid = this.$root.$mp.query.id
        this.getDetail()
        this.getComment()
        const userinfo = wx.getStorageSync("userinfo")
        if (userinfo) {
            this.userinfo = userinfo
        }
    },
    methods: {
        async getDetail() {
            const info = await get("/weapp/bookdetail", {id: this.bookid})
            this.info = info
            wx.setNavigationBarTitle({
                title: info.title
            })
        },
        async getComment() {
            const comment = await get("/weapp/commentlist", {bookid: this.bookid})
            this.comments = comment.list
        },
        getGeo(e) {
            // DUSOroZT7MfMroZn9ZNVBgrVuiG2L4GU  latitude  longitude
            const ak = "DUSOroZT7MfMroZn9ZNVBgrVuiG2L4GU"
            let url = "http://api.map.baidu.com/geocoder/v2/"
            // http://api.map.baidu.com/geocoder/v2
            if (e.target.value) {
                wx.getLocation({
                    success: geo => {
                        wx.request({
                            url,
                            data: {
                                ak,
                                location: `${geo.latitude},${geo.longitude}`,
                                output: "json"
                            },
                            success: res => {
                                console.log(res)
                                if (res.data.status == 0) {
                                    this.location = res.data.result.addressComponent.city
                                } else {
                                    this.location = "未知地点"
                                }
                            }
                        })
                        console.log(geo)
                    }
                })
            } else {
                this.location = ""
            }
        },
        getPhone(e) {
            if (e.target.value) {
                const phoneInfo = wx.getSystemInfoSync()
                this.phone = phoneInfo.model
            } else {
                this.phone = ""
            }
        },
        async addComment() {
            if (!this.comment) {
                return
            }
            console.log(this.userinfo)
            const data = {
                openId: this.userinfo.openId,
                bookid: this.bookid,
                comment: this.comment,
                phone: this.phone,
                location: this.location
            }
            try {
                await post("/weapp/addcomment", data)
                this.comment = ""
                this.getComment()
            } catch (e) {
                showModel("失败", e.message)
            }
        }
    },
    onShareAppMessage: function(res) {
        if (res.from === "menu") {
            // 来自页面内转发按钮
            console.log(res)
        }
        return {
            title: this.info.title,
            path: "/pages/detail/main?id=" + this.bookid
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
