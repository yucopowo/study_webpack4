import React, {Component} from 'react';
// import { isNumber } from "lodash";
// import _ from 'lodash';

function isNumber(s) {
    return !isNaN(s);
}

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            celsius:'',
            fahrenheit:''
        }
    }

    setEmpty() {
        this.setState({
            celsius: '',
            fahrenheit: ''
        });
    }

    onCelsiusChange(e) {
        // console.log(e);
        // console.log(e.target.value);
        const value = e.target.value;
        if(!value || !isNumber(value)) {
            this.setState({
                fahrenheit: ''
            });
            return;
        }
        const celsius = parseFloat(e.target.value);
        const fahrenheit = 2*celsius;

        this.setState({
            celsius: celsius,
            fahrenheit: fahrenheit
        });
    }

    onFahrenheitChange(e) {
        // console.log(e);
        // if(!e.target.value) {
        //     this.setEmpty();
        //     return;
        // }
        const value = e.target.value;
        if(!value || !isNumber(value)) {
            this.setState({
                celsius: ''
            });
            return;
        }

        const fahrenheit = parseFloat(e.target.value);
        const celsius = fahrenheit/2;

        this.setState({
            celsius: celsius,
            fahrenheit: fahrenheit
        });
    }

    render() {
        return <div>
            <p>title</p>
            <p>
                <label htmlFor="celsius">celsius</label>
                <input name="celsius" type="text"
                       value={this.state.celsius}
                       onChange={this.onCelsiusChange.bind(this)}/>
            </p>
            <p>
                <label htmlFor="fahrenheit">fahrenheit</label>
                <input name="fahrenheit" type="text"
                       value={this.state.fahrenheit}
                       onChange={this.onFahrenheitChange.bind(this)}/>
            </p>
        </div>;
    }
}
