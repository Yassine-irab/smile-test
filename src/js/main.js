var React = require('react');

var MyComponent = React.createReactClass({
    render: function() {
      return
        <div>
          <h1>{this.props.text}</h1>
        </div>;
    }
  });

  ReactDOM.render(
    <div>
      <MyComponent text="Hello World"/>
      <MyComponent text="Hello"/>
    </div>  
  , document.getElementById('root'));
