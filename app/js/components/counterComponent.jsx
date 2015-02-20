var React   = require('react'),
    getsub  = require('../libs/getsub');



var Component = React.createClass({

  getInitialState: function () {
    return { counter: 0 }
  },

  componentWillMount: function () {
    var that = this;

    getsub.getCount(function (err, newCount) {
      if (!err)
        that.setState({ counter: newCount });
    });
  },

  render: function () {

    return (
      <div className="small">
        <span className="getsub-red">{this.state.counter} </span>
        <span className="grey-light">subtitles found</span>
      </div>
    );

  }
});

module.exports = Component;
