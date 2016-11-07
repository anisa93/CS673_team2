import React, { Component } from 'react';
import MessageText from '../components/message_text.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '/imports/api/message/messages.js';
import { Control } from '/imports/api/control/control.js';

export default class Message extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var value = this.state.value.trim()

    if (this.state.value.trim() == ''){
      console.log('input value cannot be null');
      return null;
    }

    if (event.key === 'Enter' || event.key === undefined) {
      this.props.clientSendMessage('this.props.params.userId', value);
      this.setState({value: ''});
      setTimeout(this.scrollBottom, 10)
    }
  }

  scrollBottom() {
    var objDiv = document.getElementById("msg_context_id");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  render() {
    //console.log('this.props.params');
    //console.log(this.props.params.userId);
    return (
      <div className="msg_page_container">

        <h1><img width="50" height="50" src={'img_not_find.jpg'}alt="" className="circle"/> Name</h1>
        <ul className="collection" id="msg_context_id">

          {this.props.messages.map((m) => (
            < MessageText {...m}
            key = {m._id}
            />
        ))}

      </ul>

      <div className="row msg_input_div">
        <div className="input-field col s10">
          <textarea
            value={this.state.value}
            onChange={this.handleChange}
            onKeyPress={this.handleSubmit}
            className="materialize-textarea"></textarea>
        </div>
        <div className="input-field col s2">
          <a onClick={this.handleSubmit} className="btn-floating btn-large waves-effect waves-light"><i className="material-icons">send</i></a>
        </div>
      </div>
      </div>
    )
  }
}

export default createContainer(() => {
  //console.log(Messages);
  //console.log(Messages.find().fetch());

  return {
    messages: Messages.find().fetch().map((m) => {
      m.isOwner = (m.fromUserId == Meteor.userId()) ? true : false;
      return m;
    }),
    clientSendMessage: Control.clientSendMessage //function(){console.log('yo hii')},
  };
}, Message);
