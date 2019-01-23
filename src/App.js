import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';

const app =new Clarifai.App({
  apiKey: '637a8c60d54e49c0a152308a2b5c2f2e'
})
const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
          enable: true,
          color: "#3CA901",
          blur: 5
      }
    }
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onButtonSubmit = (event) => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
    .then(function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
        function(err) {// there was an error
      }
    );
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  render() {
    return (
      <div className="App">
                  <Particles  className='particles'
                params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
