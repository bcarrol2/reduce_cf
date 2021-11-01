import PropTypes from 'prop-types';
import React from 'react';

export default class ShowerUsage extends React.Component {
    static propTypes = {
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired, // these are passed from the Rails view
      user_id: PropTypes.number.isRequired
    };
  
    /**
     * @param props - Comes from rails view.
     */
    constructor(props) {
      super(props);
  
      this.state = {
          first_name: this.props.first_name,
          last_name: this.props.last_name,
          email: this.props.email,
          user_id: this.props.user_id,
          minutes: 0,
          daily_gallons: 0,
          yearly_gallons: 0,
          gallonsPerMinute: 2.5
      };
  
    };

    setShowerUsage(event){
        let { minutes, daily_gallons, yearly_gallons, gallonsPerMinute } = this.state;
        let userGallons = event.target.value * gallonsPerMinute;

        this.setState({
            minutes: event.target.value,
            daily_gallons: userGallons,
            yearly_gallons: userGallons * 365
        })
    };

    handleSubmit = () => {
        const url = "http://localhost:3000/shower_usage"
        const { minutes, daily_gallons, yearly_gallons, user_id } = this.state;
        const body = { minutes, daily_gallons, yearly_gallons, user_id };
    
        if (minutes === 0 || daily_gallons === 0 || yearly_gallons === 0) {
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
    };

    render() {
        let {
            minutes,
            daily_gallons,
            yearly_gallons
        } = this.state;

        return(
            <>
            <p>Water Page</p>
            <form onSubmit={this.handleSubmit} className="transportation-footprint-form">
          <label htmlFor="" className="transportationFormText">
            In minutes, about how long are your showers?
          </label>
          <input
            id="user-inputs"
            type="number"
            name="minutes"
            value={minutes}
            onChange={(event) => this.setShowerUsage(event)}
          />
          <br />
          <label htmlFor="" className="transportationFormText">
            Your daily water usage in gallons: 
          </label>
          <input
            id="user-inputs"
            disabled={true}
            name="yearly_gallons"
            value={daily_gallons}
          />
          <br />
          <label htmlFor="" className="transportationFormText">
            Your yearly water usage in gallons: 
          </label>
          <input
            id="user-inputs"
            disabled={true}
            name="yearly_gallons"
            value={yearly_gallons}
          />
          <br />
          <button className="saveButton" type="submit" value="Submit">Save</button>
        </form>
            </>
        )
    }
}