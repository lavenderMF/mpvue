const https = require('https')
const {mysql} = require('../qcloud')

// 新增图书
module.exports = async ctx => {
    const {isbn, openId} = ctx.request.body
    if (isbn && openId) {
        const findRes = await mysql('books')
            .select()
            .where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }

        let url = 'https://api.douban.com/v2/book/isbn/' + isbn
        const bookinfo = await getJson(url)
        const rate = bookinfo.rating.average
        const {title, image, alt, publisher, summary, price} = bookinfo
        const tags = bookinfo.tags
            .map(v => {
                return `${v.title} ${v.count}`
            })
            .join(',')
        const author = bookinfo.author.join(',')
        try {
            await mysql('books').insert({
                isbn,
                openId,
                rate,
                title,
                image,
                alt,
                publisher,
                summary,
                price,
                tags,
                author
            })
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败:' + e.sqlMessage
                }
            }
        }
    }
}

function getJson (url) {
    return new Promise((reslove, reject) => {
        https.get(url, res => {
            let urlData = ''
            res.on('data', data => {
                urlData += data
            })

            res.on('end', data => {
                const bookinfo = JSON.parse(urlData)
                if (bookinfo.title) {
                    reslove(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
