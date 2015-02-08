var React         = require('react'),
    getsub        = require('../libs/getsub.js');



var Component = React.createClass({

  getInitialState: function () {

    var initLang = 'eng';

    if (!!window.localStorage.getItem('lang'))
      initLang = JSON.parse(window.localStorage.getItem('lang')).lang;

    return { lang: initLang }
  },

  componentWillMount: function () {
    Event.on('langChanged', this.onHandleLang);
    Event.on('dropFile', this.onHandleDrop);
  },

  componentWillUnmount: function() {
    Event.removeListener('langChanged');
    Event.removeListener('dropFile');
  },

  onHandleDrop: function (fileName) {
    console.log('fileName', fileName);
    this.getSubtitle(fileName);
  },

  onHandleLang: function (newLang) {
    this.setState({lang: newLang});
  },

  onChangeEvent: function (e) {

    var fileName = this.refs.uploadFile.getDOMNode().files[0].name;

    this.getSubtitle(fileName);

    e.stopPropagation();
    e.preventDefault();

  },

  getSubtitle: function (fileName) {
    Event.emit('urlRequesting');

    var dataForm = {
      fileName  : fileName,
      lang      : this.state.lang
    };

    getsub.getUrl(dataForm, function (err, url) {
      Event.emit('urlRequested');
      
      if (err)
        Event.emit('failure');
      else
        window.location = url;
    });

  },

  hackyFileTrigger: function () {
    document.getElementById('upload-files').click();
  },

  render: function () {

    return (
      <div className="wrapper">
        <i className="fa fa-cloud-upload"></i>
        <p>Drag &amp; drop your TV show or movie here!</p>
        <span>OR</span>
        <button className="upload-button" onClick={this.hackyFileTrigger}>
          Upload File
          <input id="upload-files" className="upload-button" type="file" value="" onChange={this.onChangeEvent} ref="uploadFile"/>
        </button>
      </div>
    )

  }

});


module.exports = Component;
