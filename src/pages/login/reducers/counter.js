import { INCREMENT,DECREMENT } from '../constants/counter';
const INITIAL_STATE = {
    value: 0
};

export default (state = INITIAL_STATE, action) => {
    console.log(state);
    switch (action.type) {
        case INCREMENT:
            return state.value + 1;
        case DECREMENT:
            return state.value - 1;
        default:
            return state.value;
    }
}
