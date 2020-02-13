import React, { Component } from 'react';

function submitComment(comment) {
    console.log('successfully sent: ' + comment);
}

class CommentInputComponent extends Component {
    render() {
        return (
            <div id="CommentInputTextField" className="verticalContainer">
                <textarea id="CommentInput" onInput={(event) => this.setState({ text: event.currentTarget.value })}></textarea>
                <button onClick={() => submitComment(comment)}>Send</button>
            </div>
        );
    }
}

export default CommentInputComponent;