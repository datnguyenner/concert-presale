import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Nav from './components/Navigation/Nav.js';
import { fetchEvents } from './Webservices';

import './App.css';
//api key AAnmpsnxBu1lnxN07CW7taV7TmPmMeVM
class App extends Component {
  constructor() {
    super();
    this.initialState = {
      events: [],
      route: 'SignIn'
    }
    this.state = { ...this.initialState }
  }

  changeRoute = (route) => {
    this.setState({ route });
  }

  fetchEvents = async () => {
    let events = await fetchEvents();
    this.setState({ events });
  }

  renderTableBody = () => {
    let body = this.state.events.map(({ name, id, dates, sales, priceRanges, _embedded, url }) => {
      return (
        <tr key={id}>
          <th><a href={url} target="_blank">{name}</a></th>
          <th>{sales.presales ? sales.presales[0].startDateTime : 'No presale'}</th>
          <th>{sales.public.startDateTime}</th>
          <th>{dates.start.localDate}</th>
          <th>{priceRanges && priceRanges[0].min} - {priceRanges && priceRanges[0].max}</th>
          <th>{_embedded.venues[0].name ? _embedded.venues[0].name : 'N/A'}</th>
        </tr>
      )
    })

    return body;
  }

  renderHome = () => {

    if (this.state.route === 'Home') {
      return (
        <div>
          <Nav signOut={this.changeRoute} />
          <SearchBar onInputSubmit={this.fetchEvents} />
          {this.state.events.length ?
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Presale</th>
                  <th>Regular</th>
                  <th>Event Date</th>
                  <th>Price Range</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                {this.renderTableBody()}
              </tbody>
            </table>
            :
            null
          }
        </div>
      )
    }

  }

  render() {
    return (
      <div className="App">
        <h1>Find presale</h1>
        {this.state.route === 'SignIn' && <SignIn signIn={this.changeRoute} register={this.changeRoute}/>}
        {this.state.route === 'Register' && <Register register={this.changeRoute}/>}
        {this.renderHome()}
      </div>
    );
  }
}

export default App;