import React from 'react';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="l-application">
        <div className="l-content">
          <div className="l-content__inner">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
