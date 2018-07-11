<template>
    <div class="comment-list" >
        <div 
            v-if="comments.length" 
            class="page-title">
            评论
        </div>
        <div 
            v-for="(comment,index) in comments" 
            :key="index" 
            class="comment"
            @click="handleClick(comment)">
            <div class="user">
                <div class="inline">
                    <img 
                        :src="comment.image" 
                        class="avatar" 
                        mode="aspectFit">
                    {{ comment.title }}
                </div>
                <div class="right">
                    {{ comment.location || '未知地点' }}
                    <span>--</span>
                    {{ comment.phone || '未知型号' }}
                </div>
            </div>
            <div class="content">
                {{ comment.comment }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        comments: {
            type: Array,
            default: () => {
                return []
            }
        },
        type: {
            type: "",
            default: () => {
                return ""
            }
        }
    },
    mounted() {
        console.log(this.comments)
    },
    methods: {
        handleClick(comment) {
            if (this.type === "user") {
                wx.navigateTo({
                    url: "/pages/detail/main?id=" + comment.bookid
                })
            }
        }
    }
}
</script>
<style lang="scss">
.comment-list {
    background: #eee;
    font-size: 14px;
    .comment {
        background: #fff;
        margin-bottom: 10px;
        padding: 5px 20px;
        .content {
            margin: 10px 0;
        }
        .user {
            .inline {
                display: inline-block;
            }
            .avatar {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
    }
}
</style>
