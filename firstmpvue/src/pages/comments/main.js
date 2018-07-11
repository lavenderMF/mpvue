import Vue from 'vue'
import Comment from './Comment'

const app = new Vue(Comment)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '我的列表',
        enablePullDownRefresh: true
    }
}
