var React = require('react/addons'),
    CX    = React.addons.classSet;


var Component = React.createClass({

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
    Event.emit('modal', false);
  },

  render: function () {

    var smokeClasses = CX({
      'smoke': true,
      'show': this.state.state
    });

    return (
      <div className={smokeClasses} onClick={this.onClose}></div>
    )
  }

})


module.exports = Component;