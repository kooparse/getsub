var React = require('react');




var Component = React.createClass({

  render: function () {
    return (
      <div className="mobile mxa col-5 flex-col center">
        <h1 className="mt0 mb0 xxl getsub-red">Getsub!</h1>
        <p className="h2 mt0 mb0 light dark-mid-grey">A better way to find your subtitles</p>
        <p className="m2 dark-mid-grey">But not on mobile!</p>
      </div>
    );
  }

});

module.exports = Component;
