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
            books: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            const books = await get("/weapp/booklist")
            this.books = books.list
        }
    }
}
</script>
<style>
</style>

