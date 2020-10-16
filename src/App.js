import React from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Feature from './components/Feature/Feature';
import Footer from './components/Footer/Footer';
/* import Calendar from './components/Calendar/Calendar';
import Details from './components/Details/Details'; */
import './style.css';

import FetchData from './service/FetchData';

class App  extends React.Component{

  fetchData = new FetchData();

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
  };

  updateRocket(){
 
    this.fetchData.getRocket()
      .then(data => {
        this.setState({ rockets: data.map(item => item.name) })
        return data
      })
      .then(data => data.find(item => item.name === this.state.rocket))
      .then(rocketFeatures => this.setState( { rocketFeatures } ));
  };

  changeRocket = (rocket) =>{
    this.setState({ 
      rocket
    }, this.updateRocket)
  }

  componentDidMount(){
    this.updateRocket();
  }


  render(){
    console.log(this.state);
    return (
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Main rocket = {this.state.rocket}/>
        <Feature />
        <Footer />
      </>
    );
  }
}

export default App;
