import React, { Component } from 'react';
import ProfileCard from '../components/profile_card.jsx';
import { createContainer } from 'meteor/react-meteor-data';


class Profile extends Component {
  renderProfileCard() {
    return this.props.users.map((user) => {
      console.log(user);
      if (user._id == Meteor.user()._id) //super hacky, needs refactor
        {
          return (
              <ProfileCard
                key = {user._id}
                imgSrc = {user.imgSrc} />
            );
        }
    });
  }

  render() {
    return (
      <div>
        <h1>Profile Page</h1>
        {this.renderProfileCard()}
      </div>
    )
  }
}

//mapping json array to dom format, put Collection to this.props
export default createContainer(() => {
  Meteor.subscribe('discoverUsers');

  return {
    users: Meteor.users.find({}).fetch().map((user) => {
      return ({_id: user._id,
      imgSrc: "https://graph.facebook.com/v2.7/" + user.services.facebook.id + "/picture?fields=picture&height=960&width=960&redirect=true",
    });
    })
  };
}, Profile);
