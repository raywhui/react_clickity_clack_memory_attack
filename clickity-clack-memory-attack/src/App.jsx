import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pictures from './components/Pictures';
import birds from './components/birds.json';

class App extends Component {
  //Set initial state
  state = { 
    points: 0,
    birds //pulls original json into array
  };


  pointsIncrement = id => {
    //Fisher-Yates Shuffle Algorithm for randomizing bird pix
    const shuffle = () => {
      for (let i=0; i < birds.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [birds[i], birds[j]] = [birds[j], birds[i]];
      }
      return birds;
    };
    //Filters birds array, puts array into x, finds id of x and filters the passed into id
    let wasBirdClickedOn = this.state.birds.filter(x => x.id === id);

    console.log(wasBirdClickedOn[0].clickedon);

    // Checks if picture has been clicked already
    if (wasBirdClickedOn[0].clickedon === false){
      wasBirdClickedOn[0].clickedon = true;
      this.setState({ points: this.state.points + 1 });
    }else{
      for (let i=0; i < birds.length; i++) {
        this.state.birds[i].clickedon = false;
        console.log('Bird', i, 'is now', this.state.birds[i].clickedon)
      }  

      this.setState({ points: 0 });
    }
    shuffle();
    console.log('Actual ID:', id);
  }; //PointsIncrement

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Clickity Clack Memory Attack Featuring {"{ this.state.birds }"}</h1>
        </header>
        <p className="App-intro">
          1. CLICK ON A BIRD, GET A POINT -- 2. CLICK MORE BIRDS, BUT NOT SAME ONE AS BEFORE -- 3. CLICK ALL DIFFERENT BIRDS, YOU WIN
        </p>

        <div>NICE BIRD COUNTER: {this.state.points}</div>
        <div className="hold-my-birds">
          {this.state.birds.map((bird) =>
             <Pictures 
              key={bird.id}
              onClick={ () => this.pointsIncrement(bird.id) }
              image={bird.image} 
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
