var React = require('react/addons'),
    CX    = React.addons.classSet;

var LangGroup = React.createClass({

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
      <div className="flex flex-col flex-wrap flex-5 wrapper--panel">
        {React.Children.map(this.props.children, this.renderItem)}
      </div>
    );
  }

});



var Component = React.createClass({

  getInitialState: function() {

    var initIndex = 5;

    if (!!window.localStorage.getItem('lang'))
      initIndex = JSON.parse(window.localStorage.getItem('lang')).index;

    return { selected: initIndex , show: false }
  },

  componentWillMount: function () {
    Event.on('panel', this.eventListener);
  },

  eventListener: function (newState) {
    if (newState)
      Event.emit('smoke', true);

    this.setState({show: newState});
  },

  handleChange: function(index) {
    var lang = this.refs.buttonList.props.children[index].key;
    this.setState({selected: index});
    this.setState({show: false});
    Event.emit('smoke', false);
    Event.emit('langSelected',  lang);
    localStorage.setItem('lang', JSON.stringify({lang: lang, index: index}));
  },

  render: function () {

    var panelClasses = CX({
      'panel'         : true,
      'fixed'         : true,
      'bg-dark-grey'  : true,
      'z4'            : true,
      'show'          : this.state.show
    });

    var panelStyle = {
      'minWidth': '200px'
    };

    return (
      <nav className={panelClasses}>
        <div className="flex">
          <div className="flex-1 bg-dark-ghost-grey p2" style={panelStyle}>
            <h2 className="white">Languages</h2>
            <p className="mt0 mb0 dark-mid-grey small">Your selected language becomes your preferred language. It will remain the same when you come back!</p>
          </div>
          <LangGroup onChange={this.handleChange} value={this.state.selected} ref="buttonList">
            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="afr">
              Afrikaans
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="ind">
              Bahasa Indonesia
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="cat">
              Català
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="dan">
              Dansk
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="ger">
              Deutsch
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="eng">
              English
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="spa">
              Español
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="grc">
              Eλληνικά
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="fre">
              Français
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="ita">
              Italiano
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="hun">
              Magyar
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="dut">
              Nederlands
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="nor">
              Norsk
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="pol">
              Polski
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="por">
              Português
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="fin">
              Suomi
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="swe">
              Svenska
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="tur">
              Türkçe
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="ice">
              Íslenska
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="cze">
              Čeština
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="rus">
              Русский
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="tha">
              ภาษาไทย
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="heb">
              ‏עברית
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="ara">
              العربية
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="chi">
              中文 (繁體)
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="jpn">
              日本語
            </a>

            <a className="a--panel white p1 bdr1 bdl1 bd-dark-ghost-grey white" key="kor">
              한국어
            </a>
          </LangGroup>

        </div>
      </nav>
    );

  }

});


module.exports = Component;
