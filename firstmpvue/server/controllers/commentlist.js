const {
    mysql
} = require('../qcloud')

module.exports = async ctx => {
    const {
        bookid,
        openId
    } = ctx.request.query

    const mysqlSelect = mysql('comments')
        .select('comments.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comments.openId', 'cSessionInfo.open_id')
    let comments
    if (bookid) {
        comments = await mysqlSelect.where('bookid', bookid)
    } else if (openId) {
        comments = await mysqlSelect.where('openId', openId)
    }
    ctx.state.data = {
        list: comments.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                title: info.nickName,
                image: info.avatarUrl
            })
        })
    }
}
