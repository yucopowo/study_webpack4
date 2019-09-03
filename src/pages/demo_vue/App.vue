<template>

    <div class="layout-container">
        <header class="layout-header">Header</header>
        <main class="layout-main">

            <div>
                <img src="@images/made-with-bulma.png" alt="">
            </div>
            <div class="example">
                <p>{{ msg }}</p>
            </div>

            <p>
                <router-link to="/foo">Go to Foo</router-link>
                <router-link to="/bar">Go to Bar</router-link>
            </p>
            <router-view></router-view>

        </main>
    </div>

</template>

<script>
    export default {
        data () {
            return {
                msg: 'Hello world!=789==123456'
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
            background-color: #e9eef3;
        }
    }

</style>
