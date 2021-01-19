import PropTypes from 'prop-types';
import React from 'react';
import '../../../assets/stylesheets/transportation_footprint.scss';

export default class TransportationFootprint extends React.Component {
  static propTypes = {
    user_first_name: PropTypes.string.isRequired,
    user_last_name: PropTypes.string.isRequired,
    user_email: PropTypes.string.isRequired, // these are passed from the Rails view
    user_id: PropTypes.number.isRequired
  };

  /**
   * @param props - Comes from rails view.
   */
  constructor(props) {
    super(props);

    this.state = {
        user_first_name: this.props.user_first_name,
        user_last_name: this.props.user_last_name,
        user_email: this.props.user_email,
        user_id: this.props.user_id,
        miles_driven_per_year: 0,
        mpg: 0,
        metric_ton_carbon_dioxide_output: 0,
        diesel: false
    };

    this.isDieselVehicle = this.isDieselVehicle.bind(this);
    // this.calculateFootprint = this.calculateFootprint.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if (
        this.state.mpg !== prevState.mpg || 
        this.state.miles_driven_per_year !== prevState.miles_driven_per_year ||
        this.state.diesel !== prevState.diesel
        ) {
      this.calculateFootprint();
    }
  }

  calculateFootprint() {
    let {miles_driven_per_year, mpg, diesel} = this.state;
    let vechicleMiles = miles_driven_per_year / mpg
    const gramsOfCarbonPerGallon = 8887;
    const gramsOfCarbonPerDieselGallon = 10180;
    const gramsToMetricTon = 1000000;
    let userMetricTonFootprint;
    
    if (diesel) {
      userMetricTonFootprint = vechicleMiles * gramsOfCarbonPerDieselGallon / gramsToMetricTon
    } else {
      userMetricTonFootprint = vechicleMiles * gramsOfCarbonPerGallon / gramsToMetricTon
    };
    
    this.setState({
        metric_ton_carbon_dioxide_output: isNaN(userMetricTonFootprint) || userMetricTonFootprint == Infinity ? 0 : userMetricTonFootprint
    })
  };

  setMilesDriven(event) {
    this.setState({
      miles_driven_per_year: event.target.value
    })
  };

  setMPG(event){
    this.setState({
      mpg: event.target.value
    })
  };

  handleSubmit = () => {
    const url = "http://localhost:3000/transportation_footprint"
    const { miles_driven_per_year, mpg, metric_ton_carbon_dioxide_output, user_id } = this.state;
    const body = {
        user_id,
        miles_driven_per_year,
        mpg,
        metric_ton_carbon_dioxide_output
    }

    if (miles_driven_per_year === 0 || mpg === 0 || metric_ton_carbon_dioxide_output === 0) {
        alert('You must submit a number')
    };

    fetch(url, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
    })
    .then(response => {
        return response.json();
    })
    .then(window.location.href = "/")
    .catch(error => console.log(error.message));
  }

  isDieselVehicle() {
    this.setState({
      diesel: !this.state.diesel
    })
  }

  render() {
    return (
      <div>
        <h3>
          Hello, {this.state.user_first_name}
        </h3>
        <hr />
        <form onSubmit={this.handleSubmit} className="transportation-footprint-form">
          <label htmlFor="miles_driven_per_year" className="transportationFormText">
            About how many miles do you drive a year?
          </label>
          <input
            id="user-inputs"
            type="number"
            name="miles_driven_per_year"
            value={this.state.miles_driven_per_year}
            onChange={(event) => this.setMilesDriven(event)}
          />
          <br />
          <label htmlFor="mpg" className="transportationFormText">
            How many miles per gallon does your car get?
          </label>
          <input
            id="user-inputs"
            type="number"
            name="mpg"
            value={this.state.mpg}
            onChange={(event) => this.setMPG(event)}
          />
          <br />
          <label htmlFor="metric_ton_carbon_dioxide_output" className="transportationFormText">
            Your yearly carbon footprint from driving in metric tons: 
          </label>
          <input
            id="user-inputs"
            disabled={true}
            name="metric_ton_carbon_dioxide_output"
            value={this.state.metric_ton_carbon_dioxide_output}
          />
          <br />
          <label>
            Is your vehicle diesel?
          </label>
          <input type="checkbox" checked={this.state.diesel} onClick={this.isDieselVehicle} id="diesel-radio-button" />
          <br />
          <button className="saveButton" type="submit" value="Submit">Save</button>
        </form>
        <hr />
        One metric ton is 2,205 lbs.
        There are over 220 million issued drivers licenses in the United States.
        Roughly 3 percent of the cars sold in the U.S are diesel-powered.
        Imagine each driver releasing tons of carbon dioxide into the atmosphere.
        Of course we need to try and drive less, but if we cannot there are some combative solutions.
        One possible solution is to plant more trees.
        "When a tree breathes, it inhales carbon dioxide and exhales oxygen - the exact opposite of humans. 
        As a tree matures, it can consume 48 pounds of carbon dioxide per year"
        <br />
        <br />
        - Just something to think about
      </div>
    );
  }
}