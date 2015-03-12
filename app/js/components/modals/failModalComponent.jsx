import React from 'react/addons';
let CX    = React.addons.classSet;

let Component = React.createClass({

  getInitialState: function () {
    return { state: false };
  },

  componentWillMount: function () {
    Event.on('404Modal', this.eventListener);
  },

  eventListener: function (newState) {
    if (newState)
      Event.emit('smoke', true);

    this.setState({ state: newState });

    setTimeout(() => {
      if (this.state.state)
        this.onClose();
    }, 5000);
  },

  onClose: function () {
    Event.emit('smoke', false);
    this.setState({ state: false });
  },

  render: function () {

    let modalClasses = CX({
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
    );
  }

});


export default Component;
