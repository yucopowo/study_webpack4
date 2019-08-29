<template>

    <el-container class="layout-container">
        <el-header class="layout-header">Header</el-header>
        <el-main class="layout-main">

            <Transition></Transition>
            <Layout></Layout>
            <Icon></Icon>
        </el-main>
    </el-container>

</template>

<script>
    import Transition from './components/Transition.vue';
    import Layout from './components/Layout.vue';
    import Icon from './components/Icon.vue';

    export default {
        components:{
            Transition,
            Layout,
            Icon
        },
        data () {
            return {
                msg: 'Hello world!=789=='
            }
        }
    }
</script>

<style lang="scss">

    .layout-container {

        .layout-header{
            background-color: #b3c0d1;

        }

        .layout-main{
            /*background-color: #e9eef3;*/
        }
    }

</style>
