var React               = require('react/addons'),
    CX                  = React.addons.classSet,
    Dropzone            = require('react-dropzone'),
    DraggableComponent  = require('./draggableComponent.jsx'),
    ButtonComponent     = require('./buttonComponent.jsx'),
    CounterComponent    = require('./counterComponent.jsx');



var Component = React.createClass({

  getInitialState: function () {
    return { hide: false, modal: false , loader: false }
  },

  componentWillMount: function () {
    Event.on('urlRequesting', this.onLoading);
    Event.on('urlRequested',  this.onLoaded);
    Event.on('failure',       this.onHandleFailure);
  },

  onLoading: function () {
    this.setState({ hide: true, loader: true });
  },

  onLoaded: function () {
    this.setState({ hide: false, loader: false });
  },

  onHandleClose: function () {
    this.setState({ modal: false });
  },

  onHandleFailure: function () {
    var that = this;
    this.setState({ modal: true });

    setTimeout(function () {
      that.setState({ modal: false });
    }, 5000);
  },

  onHandleDrop: function (file) {
    Event.emit('dropFile', file.name);
  },

  onHandleDragOver: function (e) {
    this.setState({ hide:true });
    e.stopPropagation();
    e.preventDefault();
  },

  onHandleDragLeave: function (e) {
    this.setState({ hide:false });
    e.stopPropagation();
    e.preventDefault();
  },

  render: function () {

    var placeholderClasses = CX({
      'container-placeholder': true,
      'hide': this.state.hide
    });

    var buttonsClasses = CX({
      'container-buttons': true,
      'hide': this.state.hide
    });

    var modalClasses = CX({
      'modal': true,
      'modal-show': this.state.modal
    });

    var loaderClasses = CX({
      'loader': true,
      'showOrHide': this.state.loader
    });

    return (
      <div className="container">

        <header>
          <h3>Getsub!</h3>
          <p>A better way to find your subtitles</p>
          <p className="mobile">But not on mobile</p>
        </header>

        <section className="draggable-zone" onDragOver={this.onHandleDragOver} onDragLeave={this.onHandleDragLeave} onDrop={this.onHandleDragLeave}>
          <Dropzone handler={this.onHandleDrop}>
            <div className="content">
              <div className="draggable-place">
                <div className={buttonsClasses}>
                  <ButtonComponent />
                </div>
                <div className={placeholderClasses}>
                  <DraggableComponent />
                </div>
                <div className={loaderClasses}>
                  <span className="item-1"></span>
                  <span className="item-2"></span>
                  <span className="item-3"></span>
                  <span className="item-4"></span>
                  <span className="item-5"></span>
                  <span className="item-6"></span>
                  <span className="item-7"></span>
                </div>
              </div>
            </div>
          </Dropzone>
        </section>

        <div className={modalClasses}>
          <div className="content">
              <h3>Subtitle(s) not found!</h3>
              <div>
                <img src="public/images/sad.svg" alt="no sub bro"/>
                <button className="modal-close" onClick={this.onHandleClose}>Close me!</button>
              </div>
          </div>
        </div>
        <div className="modal-window-background"></div>

        <footer>
          <div className="social-group">
            <a className="icon twitter" href="https://twitter.com/aenehc" target="_top">
             <i className="ss-twitter" alt="twitter icon"></i>
            </a>

            <a className="icon github" href="https://github.com/aenehc/getsub" target="_top">
              <i className="ss-octocat" alt="github icon"></i>
            </a>

            <a className="icon email" href="mailto:alexandre.enehc@gmail.com?subject=Hello">
              <i className="ss-mail" alt="email icon"></i>
            </a>

            <div className="clearfix"></div>
            <CounterComponent />

          </div>
        </footer>

      </div>
    )
  }

});

module.exports = Component;
