import React from 'react/addons';
let CX    = React.addons.classSet;

let Component = React.createClass({

  getInitialState: function () {
    return { state: false }
  },

  componentWillMount: function () {
    Event.on('smoke', this.eventListener);
  },

  eventListener: function (newState) {
    this.setState({ state: newState });
  },

  onClose: function () {
    this.eventListener(false);
    Event.emit('panel', false);
    Event.emit('404Modal', false);
    Event.emit('selectSubModal', false);
  },

  render: function () {

    let smokeClasses = CX({
      'smoke': true,
      'show': this.state.state
    });

    return (
      <div className={smokeClasses} onClick={this.onClose}></div>
    )
  }

})

export default Component;
