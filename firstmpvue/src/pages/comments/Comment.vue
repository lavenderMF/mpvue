<template>
    <div class="container">
        <commentlist 
            v-if="userinfo.openId"
            :comments="comments" 
            type="user"></commentlist>
        <div v-if="userinfo.openId">
            <div class="page-title">我的图书</div>
            <Card 
                v-for="book in books" 
                :key="book.id" 
                :book="book"></Card>
            <div v-if="!books.length">暂时没有书</div>
        </div>
    </div>
</template>
<script>
import {get} from "@/utils"
import commentlist from "@/components/commentlist"
import Card from "@/components/Card"
export default {
    components: {
        commentlist,
        Card
    },
    data() {
        return {
            comments: [],
            userinfo: {},
            books: []
        }
    },
    created() {},
    methods: {
        init() {
            wx.showNavigationBarLoading()
            this.getComments()
            this.getBooks()
            wx.hideNavigationBarLoading()
        },
        async getBooks() {
            const books = await get("/weapp/booklist", {
                openId: this.userinfo.openId
            })
            this.books = books.list
        },
        async getComments() {
            const comments = await get("/weapp/commentlist", {
                openId: this.userinfo.openId
            })
            this.comments = comments.list
            console.log(this.comments)
        }
    },
    onPullDownRefresh() {
        this.init()
        wx.stopPullDownRefresh()
    },
    onShow() {
        if (!this.userinfo.openId) {
            let userinfo = wx.getStorageSync("userinfo")
            if (userinfo) {
                this.userinfo = userinfo
                this.init()
            }
        }
    }
}
</script>
<style>
</style>

