import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
     return (
        <div className="App">
          <ContactForm />
        </div>
      );
  }
}

class ContactForm extends Component {
  render() {
    return (
    <form ref="contactForm">
      <h1>Contact Us</h1>
      <label htmlFor="name">Enter your name:</label>
      <input ref="name" type="text" required/>
      <br />
      <label htmlFor="email">Enter your email address:</label>
      <input ref="email" type="email" required />
      <br />
      <label htmlFor="message">Enter your message:</label>
      <textarea ref="message" rows="6" cols="40">
      </textarea>
      <hr />
      <button>Send Message</button>
    </form>
    );
  }
}

export default App;
