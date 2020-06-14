var ReactDOM = require('react-dom');
class Hello extends React.Component {

  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.state = {
      error: null,
      isLoaded: false,
      "items": [],
      current_card: 0
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleNext () {
    if(this.state.current_card < this.card_container.children.length -1) {
      var new_current_card = this.state.current_card + 1;
      this.setState({ current_card: new_current_card }, () => {
        this.card_container.style.transitionDuration = "0.5s";
        this.card_container.style.transform = `translate(-${350 * this.state.current_card}px)`;
      });
    } else {
      return;
    }
  }  

  handlePrevious () {
    if(this.state.current_card > 0) {
      var new_current_card = this.state.current_card - 1;
      this.setState({ current_card: new_current_card }, () => {
        this.card_container.style.transitionDuration = "0.5s";
        this.card_container.style.transform = `translate(-${350 * this.state.current_card}px)`;
      });
    } else {
      return;
    }
  }  

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {    
    return (

      <div>
        <div className="navigation">
          <button onClick={this.handlePrevious}>Previous</button>
          <button onClick={this.handleNext}>Next</button>
        </div>
        <div className="view-port">
          <div className="card-container" style={styles.view_port}>
            <div ref={ref_id => this.card_container = ref_id} className="programme" style={styles.card_container}>  
              {items.map(item => (
                <div className="sliderHolder" key={item.id} style={styles.card}>
                  <div className="holder">
                    <div className="imgHolder">
                      <img src='../src/images/raeding.jpg' />
                    </div>
                    <div className="contnetHolder">
                      <div className="titleHolder">
                        <h1>{item.name}</h1>
                      </div>
                      <div className="descHolder">
                        <p>{item.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>            
          </div>
        </div>
      </div>
      
    )
    }

  }
}

const styles = {
  view_port: {

  },
  card_container: {

  },
  card: {

  }
}  

ReactDOM.render(
  <Hello/>,
  document.getElementById('slider')
);
