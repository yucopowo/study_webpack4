<template>
    <div class="component-b">
        component-b
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: 'my-component',
                options: [{
                    value: 'Option1',
                    label: 'Option1'
                }, {
                    value: 'Option2',
                    label: 'Option2'
                }, {
                    value: 'Option3',
                    label: 'Option3'
                }, {
                    value: 'Option4',
                    label: 'Option4'
                }, {
                    value: 'Option5',
                    label: 'Option5'
                }],
                value: ''
            }
        }
    }
</script>

<style lang="scss">
    .component-b {
        color: red;
    }
</style>
