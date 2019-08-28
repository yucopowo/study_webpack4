import React, {Component} from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import './index.scss';

class Student {
    fullName: string;

    constructor(public name: string) {
        this.fullName = name;
    }

}

const student = new Student('123');

console.log(student);


interface Props {
    name: string;
}

class Hello extends Component<Props, object>{

    render() {
        const {name} = this.props;
        return <div>==={name}===</div>;
    }

}

ReactDom.render(
    <Hello name='wechat'/>,
    document.getElementById('root')
);


setTimeout(()=>{
    $('#root').append('<div>=======</div>');
}, 3000);
