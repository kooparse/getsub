var React = require('react/addons');

var ButtonGroup = React.createClass({

  renderItem: function (button, index) {
    return (
      React.addons.cloneWithProps(button, {
        className: this.props.value === index ? ' selected ' : '',
        onClick: function () {
          this.props.onChange(index);
        }.bind(this),
        key: index
      })
    );

  },

  render: function () {
    return (
      <div>
        {React.Children.map(this.props.children, this.renderItem)}
      </div>
    );
  }

});



var Component = React.createClass({

  getInitialState: function() {

    var initIndex = 0;

    if (!!window.localStorage.getItem('lang'))
      initIndex = JSON.parse(window.localStorage.getItem('lang')).index;

    return { selected: initIndex }
  },

  handleChange: function(index) {
    var lang = this.refs.buttonList.props.children[index].key;
    this.setState({selected: index});
    Event.emit('langChanged',  lang);
    localStorage.setItem('lang', JSON.stringify({lang: lang, index: index}));
  },

  render: function () {
    return (
      <div className="wrapper">
        <ButtonGroup onChange={this.handleChange} value={this.state.selected} ref="buttonList">
            <button className="lang-btn" key="eng">
              english
            </button>

            <button className="lang-btn" key="fre">
              Français
            </button>

            <button className="lang-btn" key="ita">
              Italiano
            </button>

            <button className="lang-btn" key="spa">
              Español
            </button>

            <button className="lang-btn" key="ger">
              Deutsch
            </button>
        </ButtonGroup>
      </div>
    );

  }

});


module.exports = Component;
