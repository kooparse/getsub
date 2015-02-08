var React = require('react'),
    Event = require('events').EventEmitter,
    BaseComponent = require('../components/baseComponent.jsx');





module.exports = {

  init: function () {
    window.Event = new Event();

    React.render(
      <BaseComponent />,
      document.getElementsByClassName('app')[0]
    );

  }

};
