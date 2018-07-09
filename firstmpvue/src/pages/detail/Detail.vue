<template>
    <div>
        <BookInfo :info="info"></BookInfo>
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
            info: {}
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
        }
    }
}
</script>
<style>
</style>
