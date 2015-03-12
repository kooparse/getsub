import React from 'react';
import getsub from '../libs/getsub.js';


let Component = React.createClass({

  getInitialState: function () {

    let initLang      = 'eng';

    if (!!window.localStorage.getItem('lang'))
      initLang = JSON.parse(window.localStorage.getItem('lang')).lang;

    return { lang: initLang };

  },

  componentWillMount: function () {
    Event.on('langSelected', this.onHandleLang);
    Event.on('dropFile', this.onHandleDrop);
  },

  componentWillUnmount: function() {
    Event.removeListener('langSelected');
    Event.removeListener('dropFile');
  },

  onHandleDrop: function (fileName) {
    this.getSubtitle(fileName);
  },

  onHandleLang: function (newLang) {
    this.setState({lang: newLang});
  },

  onChangeEvent: function (e) {
    let fileName = this.refs.uploadFile.getDOMNode().files[0].name;

    this.getSubtitle(fileName);

    e.stopPropagation();
    e.preventDefault();
  },

  getSubtitle: function (fileName) {
    Event.emit('urlRequesting');

    let dataForm = {
      fileName  : fileName,
      lang      : this.state.lang,
      auto      : this.props.checkbox
    };

    getsub.getUrl(dataForm, function (err, result) {
      Event.emit('urlRequested');

      if (err)
        return Event.emit('failure');

      if (result.auto)
        window.location = result.subList[0].subDownloadLink;
      else
        Event.emit('selectSubModal', true, result.subList);
    });

  },

  hackyFileTrigger: function () {
    document.getElementById('upload-files').click();
  },

  render: function () {

    return (
      <div className="flex flex-1 flex-col col-12 mxa">
        <div className="flex-1">
          <i className="fa fa-cloud-upload icon-big dark-grey"></i>
        </div>
        <div className="flex-1 m1">
          <p className="dark-mid-grey mt0 mb0">Drag &amp; drop your TV show or movie here!</p>
          <span className="dark-mid-grey">OR</span>
        </div>
        <div className="flex-1">
          <button className="btn-flat dark half-circle col-3 tr-1" onClick={this.hackyFileTrigger}>
            Select File
            <input id="upload-files" className="hide" value="" type="file" onChange={this.onChangeEvent} ref="uploadFile"/>
          </button>
        </div>
      </div>
    );

  }

});


export default Component;
