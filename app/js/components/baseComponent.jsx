var React               = require('react/addons'),
    CX                  = React.addons.classSet,

    DraggableComponent  = require('./draggableComponent.jsx'),
    SmokeComponent      = require('./smokeComponent.jsx'),
    ModalComponent      = require('./modalComponent.jsx'),
    MobileComponent     = require('./mobileComponent.jsx'),
    LoaderComponent     = require('./loaderComponent.jsx'),
    PanelComponent      = require('./panelComponent.jsx'),
    CounterComponent    = require('./counterComponent.jsx');



var Component = React.createClass({

  getInitialState: function () {
    return { hide: false }
  },

  componentWillMount: function () {
    Event.on('urlRequesting', this.onLoading);
    Event.on('urlRequested',  this.onLoaded);
    Event.on('failure',       this.onHandleFailure);
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
    Event.emit('modal', true);
  },

  onHandleDrop: function (e) {
    var files;
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

  handleClick: function (e) {
    Event.emit('panel', true);

    e.stopPropagation();
    e.preventDefault();
  },

  render: function () {

    var placeholderClasses = CX({
      'flex-1': true,
      'tr-1'  : true,
      'hide'  : this.state.hide
    });

    return (
      <div className="base resp-w">
        <div className="flex flex-col resp-h full desktop">
          <header className="flex flex-col flex-3 center">
            <div className="flex-1">
              <h1 className="mt0 mb0 getsub-red">Getsub!</h1>
              <p className="h2 mt0 mb2 light dark-mid-grey">A better way to find your subtitles</p>
            </div>
          </header>

          <section className="flex flex-align-center flex-just-center flex-2 mxa col-4">
            <button className="rounded btn-flat dark col-10" onClick={this.handleClick}>Select your language</button>
          </section>

          <div className="flex flex-7 flex-align-center flex-just-center center mt1 mb3 col-8 mxa dashed sh-inner dark-mid-grey" onDrop={this.onHandleDrop} onDragLeave={this.onHandleDragLeave} onDragOver={this.onHandleDragOver}>
            <div className={placeholderClasses}>
              <DraggableComponent />
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

        <ModalComponent />
        <SmokeComponent />
        <PanelComponent />
        <MobileComponent />
      </div>
    );
  }

});

module.exports = Component;
