import React, { Component } from 'react'
import { connect } from 'react-redux';
import { onIncrement } from '../actions/counter'

class Counter extends Component {
    constructor(props) {
        super(props);
        this.incrementAsync = this.incrementAsync.bind(this);
        this.incrementIfOdd = this.incrementIfOdd.bind(this);
    }

    incrementIfOdd() {
        if (this.props.value % 2 !== 0) {
            this.props.onIncrement()
        }
    }

    incrementAsync() {
        setTimeout(this.props.onIncrement, 1000)
    }

    render() {
        const { value, onIncrement, onDecrement } = this.props;
        console.log(this.props);
        return (
            <p>
                Clicked: {value} times
                {' '}
                <button onClick={onIncrement}>
                    +
                </button>
                {' '}
                <button onClick={onDecrement}>
                    -
                </button>
                {' '}
                <button onClick={this.incrementIfOdd}>
                    Increment if odd
                </button>
                {' '}
                <button onClick={this.incrementAsync}>
                    Increment async
                </button>
            </p>
        )
    }
}

// const mapStateToProps = (state) => ({
//     debugger
//     value: counter.value
// });

const mapStateToProps = (state) => {
    return {
        value: state.counter.value
    }
};



const mapDispatchToProps = (dispatch) => ({
    onIncrement: () => dispatch(onIncrement())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);

// export default Counter;
