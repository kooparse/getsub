import React from 'react/addons';
import DraggableComponent from './draggableComponent.jsx';
import SmokeComponent from './smokeComponent.jsx';
import FailModalComponent from './modals/failModalComponent.jsx';
import SelectSubModalComponent from './modals/selectSubModalComponent.jsx';
import MobileComponent from './mobileComponent.jsx';
import LoaderComponent from './loaderComponent.jsx';
import PanelComponent from './panelComponent.jsx';
import CounterComponent from './counterComponent.jsx';

let CX = React.addons.classSet;


let Component = React.createClass({

  getInitialState: function () {

    let initLang = 'eng';

    if (!!window.localStorage.getItem('lang'))
      initLang = JSON.parse(window.localStorage.getItem('lang')).lang;

    return { hide: false, lang: initLang, checkbox: true }

  },

  componentWillMount: function () {
    Event.on('langSelected',  this.onHandleLang);
    Event.on('urlRequesting', this.onLoading);
    Event.on('urlRequested',  this.onLoaded);
    Event.on('failure',       this.onHandleFailure);
  },

  onHandleLang: function (newLang) {
    this.setState({ lang: newLang });
  },

  onLoading: function () {
    this.setState({ hide: true });
    Event.emit('loader', true);
  },

  onLoaded: function () {
    this.setState({ hide: false });
    Event.emit('loader', false);
  },

  onHandleFailure: function () {
    Event.emit('404Modal', true);
  },

  onHandleDrop: function (e) {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    }
    else if (e.target) {
      files = e.target.files;
    }

    this.setState({ hide: false });
    Event.emit('dropFile', files[0].name);

    e.stopPropagation();
    e.preventDefault();
  },

  onHandleDragOver: function (e) {
    e.dataTransfer.dropEffect = "copy";
    this.setState({ hide: true });

    e.stopPropagation();
    e.preventDefault();
  },

  onHandleDragLeave: function (e) {
    this.setState({ hide: false });

    e.stopPropagation();
    e.preventDefault();
  },

  handleCheckBoxChange: function (e) {
    localStorage.setItem('checkbox', e.target.checked);
    this.setState({ checkbox: e.target.checked });
    e.stopPropagation();
  },

  handleClick: function (e) {
    Event.emit('panel', true);

    e.stopPropagation();
    e.preventDefault();
  },

  render: function () {

    let placeholderClasses = CX({
      'flex'                : true,
      'flex-just-center'    : true,
      'flex-align-center'   : true,
      'flex-10'             : true,
      'tr-1'                : true,
      'hide--smooth'        : this.state.hide
    });

    let checkboxClasses = CX({
      'flex-1'          : true,
      'flex-self-end'   : true,
      'tr-1'            : true,
      'hide--smooth'    : this.state.hide
    });

    return (
      <div className="base resp-w">
        <div className="flex flex-col resp-h full desktop">
          <header className="flex flex-col flex-3 center">
            <div className="flex-1">
              <h1 className="mt1 mb0 getsub-red">Getsub!</h1>
              <p className="h2 mt0 mb2 light dark-mid-grey">A better way to find your subtitles</p>
            </div>
          </header>

          <section className="flex flex-align-center flex-just-center flex-2 mxa col-4">
            <button className="rounded btn-flat dark col-10 tr-1" onClick={this.handleClick}>
              <span className="left ml2 lg-custom">Select your language</span>
              <span className="right mr2 lg-custom--light">[{this.state.lang}]</span>
            </button>
          </section>

          <div className="flex flex-7 flex-col center mt1 mb3 col-8 mxa dashed sh-inner dark-mid-grey" onDrop={this.onHandleDrop} onDragLeave={this.onHandleDragLeave} onDragOver={this.onHandleDragOver}>
            <div className={checkboxClasses}>
              <div className="mr1">
                <span>auto </span>
                <input type="checkbox" name="auto" className="cursor" checked={this.state.checkbox} onChange={this.handleCheckBoxChange}/>
              </div>
            </div>
            <div className={placeholderClasses}>
              <DraggableComponent checkbox={this.state.checkbox}/>
            </div>
            <LoaderComponent />
          </div>

          <footer className="flex flex-col flex-1 center">
            <div className="flex-1">
              <a className="getsub-blue m1 h2 text-reset" href="https://twitter.com/aenehc" target="_blank">
               <i className="ss-twitter" alt="twitter icon"></i>
              </a>
              <a className="black m1 h2 text-reset" href="https://github.com/aenehc/getsub" target="_blank">
                <i className="ss-octocat" alt="github icon"></i>
              </a>
              <a className="getsub-red m1 h2 text-reset" href="mailto:alexandre.enehc@gmail.com?subject=Hello">
                <i className="ss-mail" alt="email icon"></i>
              </a>
            </div>
            <div className="flex-1">
              <CounterComponent />
            </div>
          </footer>
        </div>

        <SmokeComponent />
        <PanelComponent />
        <MobileComponent />
        <FailModalComponent />
        <SelectSubModalComponent />
      </div>
    );
  }

});

export default Component;
