import React, {Component} from 'react';

import Header from './Header';
import Footer from './Footer';
import Title from './Title';


function NameField({valueUpdated}) {
    return <input onChange={ event => valueUpdated(event.target.value)  }  />
}

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: ''
        };
    }

    onNameChange(name) {
        this.setState({name});
    }

    render() {
        return <div>

            <Header title={<Title/>} />
            <p>=====</p>

            <p>{this.state.name}</p>

            <NameField valueUpdated={this.onNameChange.bind(this)}/>

            <Footer></Footer>
        </div>;
    }

}
