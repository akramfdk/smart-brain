import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

import ParticlesBg from 'particles-bg'

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {

  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol: width - (clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input});

    fetch('https://glacial-tor-76083-44d43ee27c1a.herokuapp.com/imageurl', {
      method: "post",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        input: this.state.input,
      })
    })
        .then(response => response.json())
        // .then(result => console.log(result.outputs[0].data.regions))
        .then(result => {
          if (result) {
            fetch('https://glacial-tor-76083-44d43ee27c1a.herokuapp.com/image',
              {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id: this.state.user.id
                })
              })
              .then(res => res.json())
              .then(count => {
                // console.log(count);
                this.setState(Object.assign(this.state.user, {entries: count}));
              })
              .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(result))
        })
        .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState);
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }

    this.setState({route: route});
  }

  render(){
    const { isSignedIn, imageUrl, route, box, user } = this.state;
    return (
      <div className='App'>
        <ParticlesBg className="particles" type="cobweb" bg={true} color="#ffffff" />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === "home"
         ? <div> <Logo />
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit} 
        />
        <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : (
          route === "register"
          ? <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          : <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        )
        }
      </div>
    )
  }
}

export default App
