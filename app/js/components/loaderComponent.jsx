var React = require('react/addons'),
    CX    = React.addons.classSet;


var Component = React.createClass({

  getInitialState: function () {
    return { state: false }
  },

  componentWillMount: function () {
    Event.on('loader', this.eventListener);
  },

  eventListener: function (newState) {
    this.setState({ state: newState });
  },

  render: function () {

    var loaderClasses = CX({
      'flex-1': true,
      'loader': true,
      'show': this.state.state
    });

    return (
      <div className={loaderClasses}>
        <span className="item-1"></span>
        <span className="item-2"></span>
        <span className="item-3"></span>
        <span className="item-4"></span>
        <span className="item-5"></span>
        <span className="item-6"></span>
        <span className="item-7"></span>
      </div>
    )
  }

})


module.exports = Component;
