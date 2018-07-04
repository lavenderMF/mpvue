<template>
    <div>
        <Card 
            v-for="book in books" 
            :key="book.id" 
            :book="book">{{ book.title }}</Card></div>
</template>
<script>
import {get} from "@/utils"
import Card from "@/components/Card"
export default {
    components: {
        Card
    },
    data() {
        return {
            books: [],
            page: 0
        }
    },
    created() {
        this.getList(true)
    },
    onPullDownRefresh() {
        this.getList(true)
    },
    methods: {
        async getList(init) {
            if (init) {
                this.page = 0
            }
            wx.showNavigationBarLoading()
            const books = await get("/weapp/booklist", {page: this.page})
            this.books = books.list
            wx.stopPullDownRefresh()
            wx.hideNavigationBarLoading()
        }
    }
}
</script>
<style>
</style>

