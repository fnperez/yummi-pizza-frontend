import React from "react";
import { alertActions } from '../_actions';
import { connect } from "react-redux";

class Alert extends React.Component {
    closing = undefined;

    automaticClose = () => {
        if (this.closing) {
            clearTimeout(this.closing);
        }

        this.closing = setTimeout(this.props.close, 100000);
    }

    render = () => {
        // this.automaticClose();

        return (
            <div></div>
        );
    }
}

function mapState(state) {
    return state.alert;
}

const actionCreators = {
    close: alertActions.close
};

const connectedAlert = connect(mapState, actionCreators)(Alert);

export { connectedAlert as Alert };