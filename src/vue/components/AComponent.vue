<template>
    <div class="component-a">
        <div>component-a===</div>

        <div>
            <a href="javascript:void(0);" @click="increment">increment</a>
        </div>
        <div>
            {{count}}
        </div>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';

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
        },
        computed: mapState({
            count: state => state.count
        }),
        methods: {
            ...mapMutations({
                increment: 'increment'
            })
        }
    }
</script>

<style lang="scss">
    .component-a {
        color: red;
    }
</style>
