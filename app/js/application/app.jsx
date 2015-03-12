import React from 'react';
import {EventEmitter as Event} from 'events';
import BaseComponent from '../components/baseComponent.jsx';



export default {

  init: function () {
    window.Event = new Event();

    React.render(
      <BaseComponent />,
      document.getElementsByClassName('app')[0]
    );

  }

};
