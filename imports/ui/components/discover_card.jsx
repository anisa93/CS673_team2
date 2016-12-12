import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

export default class DiscoverCard extends Component {
  render() {
    return (
      <div className="col l4 m6 s12">
        <div className="card profile-photo">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="responsive-img" src= {this.props.imgSrc ? this.props.imgSrc : "img_not_find.jpg"} />
          </div>

          <div className="card-content profile-name">
            <label>Name</label>
            <div>
              <span className="card-title grey-text text-darken-4">{this.props.name}</span><br></br>
              <Link to={'/Message/'+ this.props.userId} className="collection-item avatar waves-effect">Message</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DiscoverCard.propTypes = {
  imgSrc: PropTypes.string,
};
