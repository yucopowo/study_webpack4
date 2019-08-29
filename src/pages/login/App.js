import React, {Component} from 'react';
import Counter from './components/Counter';

export default class App extends Component {
    render() {
        return <div>
            <p>app</p>
            <Counter></Counter>
        </div>;
    }
}
