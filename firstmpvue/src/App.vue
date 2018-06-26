
<script>
import config from './config'
import {get} from './utils'
export default {
    // async created(){
        // const res = await get('/weapp/demo');
        // console.log(res);
    // }
    created(){
        wx.request({
            url: config.host + '/weapp/demo',
            success: function(res){
                console.log(res);
            }
        })
    }
}
</script>
<style>

</style>

