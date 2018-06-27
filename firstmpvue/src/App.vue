
<script>
import config from './config'
import {get, showSuccess} from './utils'
import qcloud from 'wafer2-client-sdk'
export default {
    // async created(){
        // const res = await get('/weapp/demo');
        // console.log(res);
    // }
    created(){
        let user = wx.getStorageSync('userinfo')
        if(!user){
            qcloud.setLoginUrl(config.loginUrl);
            qcloud.login({
                success: function (userinfo) {
                    console.log('登录成功', userinfo);
                    showSuccess('登录成功');
                    wx.setStorageSync('userinfo', userinfo)
                },
                fail: function (err) {
                    console.log('登录失败', err);
                }
            });
        }

        // wx.request({
        //     url: config.host + '/weapp/demo',
        //     success: function(res){
        //         console.log(res);
        //     }
        // })
    }
}
</script>
<style lang='scss'>
.btn{
    color: #fff;
    background: #EA5A49;
    margin-bottom: 10px;
    padding-left: 15px;
    border-radius: 2px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width: 100%;
    &:active{
        background: #FA5A49
    }
}
</style>

