import PropTypes from 'prop-types';
import React from 'react';

export default class TransportationFootprint extends React.Component {
  static propTypes = {
    user: PropTypes.string.isRequired, // these are passed from the Rails view
    user_id: PropTypes.number.isRequired
  };

  /**
   * @param props - Comes from rails view.
   */
  constructor(props) {
    super(props);

    this.state = { 
        user: this.props.user,
        user_id: this.props.user_id,
        miles_driven_per_year: 0,
        mpg: 0,
        metric_ton_carbon_dioxide_output: 0
    };
  }

  handleChange = (event) => {
      let userMile = event.target.name === "miles_driven_per_year" ? 
        event.target.value / this.state.mpg : 
        this.state.miles_driven_per_year / event.target.value
      let userMetricTonFootprint = userMile * 8887 / 1000000
      this.setState({
          [event.target.name]: event.target.value,
          metric_ton_carbon_dioxide_output: userMetricTonFootprint == Infinity || NaN ? 0 : userMetricTonFootprint
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

      if (miles_driven_per_year === 0 || mpg === 0 || metric_ton_carbon_dioxide_output === 0)
      return;

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

  render() {
    return (
      <div>
        <h3>
          Hello, {this.state.user}!
        </h3>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="miles_driven_per_year">
            About how many miles do you drive a year?
          </label>
          <input
            id="miles_driven_per_year"
            type="number"
            name="miles_driven_per_year"
            value={this.state.miles_driven_per_year}
            onChange={(event) => this.handleChange(event)}
          />
          <br />
          <label htmlFor="mpg">
            How many miles per gallon does your car get?
          </label>
          <input
            id="mpg"
            type="number"
            name="mpg"
            value={this.state.mpg}
            onChange={(event) => this.handleChange(event)}
          />
          <br />
          <label htmlFor="metric_ton_carbon_dioxide_output">
            Your yearly carbon footprint from driving in metric tons: 
          </label>
          <input
            id="metric_ton_carbon_dioxide_output"
            disabled={true}
            name="metric_ton_carbon_dioxide_output"
            value={this.state.metric_ton_carbon_dioxide_output}
          />
          <br />
          <button className="saveButton" type="submit" value="Submit">Save</button>
        </form>
        <hr />
        A metric ton is 2,205 lbs.
        There are over 220 million issued drivers licenses in the United States.
      </div>
    );
  }
}