var RhymeBox = React.createClass({
  getInitialState: function() {
    return {data: [], val: ""};
  },
  handleRhymeSubmit: function(rhyme) {
    var url = this.props.url + rhyme.rhyme;
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      data: rhyme,
    }).done(function(data) {
    if(data.length > 1){
      this.setState({data: data, val: rhyme.rhyme});
    }else{
      alert("no Rhymrr found")
    }
  }.bind(this))
  .fail(function() {
    alert( "error" );
  }.bind(this));
  },

  render: function(){
    return(
      <div className="RhymeBox">
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Rhymrr
              </a>
            </div>
          </div>
        </nav>
        <RhymeForm onRhymeSubmit={this.handleRhymeSubmit} />
        <RhymeList data= {this.state.data} val= {this.state.val}/>
       </div>
    );
  }
});

var RhymeList = React.createClass({
  render: function(){
    return(
      <div className="container">
        <div className="row">
          <div className = "col-md-10 col-md-offset-1">
            <label>{this.props.val}</label>
            <Rhyme rhyme={this.props.data} />
          </div>
        </div>
      </div>
    );
  }
});

var RhymeForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var rhyme = this.refs.rhyme.value.trim();

    if(!rhyme) {
      return
    }

    this.props.onRhymeSubmit({rhyme: rhyme})
    this.refs.rhyme.value = "";
    return
  },

  render: function(){
    return(
      <div className = "row">
        <div className = "col-md-6 col-md-offset-3 col-xs-12" >
          <form className="rhymeForm" onSubmit = {this.handleSubmit} >
            <div className="form-group">
              <label >Word</label>
              <input type="text" className="form-control" placeholder="Your word..." ref="rhyme" />
            </div>
            <div className="form-group">
              <input type="submit" className="btn btn-primary" value="Search" />
            </div>
          </form>
        </div>
      </div>
    );
  }
});



var Rhyme = React.createClass({

  render: function(){
    var rhymeNodes = this.props.rhyme.map(function(rhyme, index) {
      return (
            <p className="spaner" key={index}>
              {rhyme.word}
            </p>
      );
    });
    return(
        <div>
          {rhymeNodes}
        </div>
    );
  }
});

ReactDOM.render(
  <RhymeBox url = "http://rhymebrain.com/talk?function=getRhymes&word=" />, document.getElementById('content')
)
