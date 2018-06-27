<template>
    <div class="progressbar">
        <progress percent="20" activeColor="#EA5A49" />
        <p>{{year}}已经过去了{{days}}天，20%</p>
    </div>
</template>
<script>
export default {
    created () {
        
    },
    computed: {
        year(){
            return new Date().getFullYear(); 
        },
        days(){
            let start = new Date()
            start.setMonth(0)
            start.setDate(1)
            let offset = new Date().getTime() - start.getTime()
            return parseInt((offset/1000/60/60/24)+1)
        }
    },
    methods: {
        isLeapYear(){
            const year = new Date().getFullYear()
        },
        getDayOfYear(){

        },
    }
}
</script>
<style lang="scss">
.progressbar{
    width: 100%;
    progress{
        margin-bottom: 10px;
    }
}
</style>
