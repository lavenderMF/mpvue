const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const {id} = ctx.request.query
    const detail = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
        .where('id', id)
        .first()
    const info = JSON.parse(detail.user_info)
    ctx.state.data = Object.assign({}, detail, {
        user_info: {
            nickName: info.nickName,
            avatarUrl: info.avatarUrl
        }
    })
    await mysql('books')
        .where('id', id)
        .increment('count', 1)
}
