import '@riotjs/hot-reload'
import {component} from 'riot'
import './index.scss';
import Random from './random.riot'

component(Random)(document.getElementById('root'), {
    title: 'Hi there!'
})