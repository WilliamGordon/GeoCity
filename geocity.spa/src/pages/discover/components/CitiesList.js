import React, { Component } from 'react';
import CityCard from './City';

export default class CitiesList extends Component {
  render() {
    return (
      <div>
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
        <CityCard />
      </div>
    );
  }
}