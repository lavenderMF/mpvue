import config from './config'

export function request(url,data){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: config.host + url,
            success: function(res){
                if(res.data.code == 0){
                    resolve(res.data.data)
                }else{
                    reject(res.data);
                }
            }
        })
    })
}