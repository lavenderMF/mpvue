<template>
    <div class="container">
        <div 
            class="userinfo" 
            @click="login()">
            <img 
                :src="userinfo.avatarUrl" 
                alt="" >
            <p>{{ userinfo.nickName }}</p>
        </div>
        <YearProgress></YearProgress>
        <button 
            v-if="userinfo.openId" 
            class="btn" 
            @click="scanBook">添加图书</button>
    </div>
</template>
<script>
import YearProgress from "../../components/YearProgress"
import config from "../../config.js"
import {showSuccess, post, showModal} from "@/utils"
import qcloud from "wafer2-client-sdk"
export default {
    components: {
        YearProgress
    },
    data() {
        return {
            userinfo: {
                avatarUrl: "../../../static/img/me-active.png",
                nickName: "点击登录"
            }
        }
    },
    created() {
        // this.userinfo = wx.getStorageSync('userinfo')
    },
    methods: {
        async addBook(isbn) {
            const res = await post("/weapp/addbook", {
                isbn,
                openId: this.userinfo.openId
            })
            showModal("添加成功", `${res.title}添加成功`)
        },
        scanBook() {
            wx.scanCode({
                success: res => {
                    if (res.result) {
                        this.addBook(res.result)
                    }
                }
            })
        },
        login() {
            let user = wx.getStorageSync("userinfo")
            if (!user) {
                qcloud.setLoginUrl(config.loginUrl)
                qcloud.login({
                    success: userinfo => {
                        console.log("登录成功", userinfo)
                        showSuccess("登录成功")
                        wx.setStorageSync("userinfo", userinfo)
                        this.userinfo = userinfo
                    },
                    fail: function(err) {
                        console.log("登录失败", err)
                    }
                })
            }
        }
    },
    onShow() {
        let userinfo = wx.getStorageSync("userinfo")
        if (userinfo) {
            this.userinfo = userinfo
        }
    }
}
</script>
<style lang='scss' scoped>
.container {
    padding: 0 30rpx;
    .userinfo {
        margin-top: 100rpx;
        text-align: center;
        img {
            width: 150rpx;
            height: 150rpx;
            margin: 20rpx;
            border-radius: 50%;
        }
    }
}
</style>

