var React = require('react/addons'),
    CX    = React.addons.classSet;


var Component = React.createClass({

  getInitialState: function () {
    return { state: false }
  },

  componentWillMount: function () {
    Event.on('modal', this.eventListener);
  },

  eventListener: function (newState) {
    var that = this;

    if (newState)
      Event.emit('smoke', true);

    this.setState({ state: newState });

    setTimeout(function () {
      if (that.state.state)
        that.onHandleClose();
    }, 5000);
  },

  onClose: function () {
    Event.emit('smoke', false);
    this.setState({ state: false });
  },

  render: function () {

    var modalClasses = CX({
      'modal': true,
      'flex': true,
      'flex-align-center': true,
      'flex-just-center': true,
      'bg-dark-grey': true,
      'z4': true,
      'col-5': true,
      'show': this.state.state
    });

    return (
      <div className={modalClasses}>
        <div className="flex flex-col center flex-1">
            <div className="flex-1 bg-dark-ghost-grey p2">
              <h3 className="white mt0 mb0">Subtitle(s) not found!</h3>
            </div>
            <img className="flex-1 mt1" src="public/images/sad.svg" alt="no sub bro"/>
            <button className="rounded flex-1 mxa mt1 mb1 btn-flat light col-6" onClick={this.onClose}>Close me!</button>
        </div>
      </div>
    )
  }

})


module.exports = Component;
