import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      identification: ""
    };
  }

  postImg = () => {
    var formData = new FormData();
    formData.append("myImage", this.state.image);
    fetch("/upload", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(response => this.setState({ identification: response }));
  };

  render() {
    return (
      <div>
        <header>
          <h1>CS52 Google Cloud Vision Image Identifier</h1>
        </header>
        <div className="uploadForm">
          <h3>Upload Image</h3>
          <input
            type="file"
            onChange={e => this.setState({ image: e.target.files[0] })}
          />
          <button onClick={this.postImg}>Click to identify</button>
        </div>

        <div />
        <h3 style={{ marginTop: 50 }}>{this.state.identification}</h3>
      </div>
    );
  }
}

export default App;
