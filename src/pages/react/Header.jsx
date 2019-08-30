import React, {Component} from 'react';

// https://github.com/SangKa/react-in-patterns-cn/blob/master/book/chapter-4/README.md
export default class Header extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {

        const Title = this.props.title;

        return <header>
            <p>header</p>
            {Title}
        </header>;
    }

}
