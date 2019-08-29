<template>

    <el-container class="layout-container">
        <el-header class="layout-header">Header</el-header>
        <el-main class="layout-main">

            <div class="example">
                <p>{{ msg }}</p>
            </div>

            <MyComponent></MyComponent>


        </el-main>
    </el-container>

</template>

<script>
    import MyComponent from './components/MyComponent.vue';
    export default {
        data () {
            return {
                msg: 'Hello world!=789=='
            }
        },
        components:{MyComponent}
    }
</script>

<style lang="scss">

    .layout-container {

        .layout-header{
            background-color: #b3c0d1;

        }

        .layout-main{
            background-color: #e9eef3;
        }
    }

</style>
