var React   = require('react'),
    getsub  = require('../libs/getsub');



var Component = React.createClass({

  getInitialState: function () {
    return { counter: 0 }
  },

  componentWillMount: function () {
    getsub.getCount((err, newCount) => {
      if (!err)
        this.setState({ counter: newCount });
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
