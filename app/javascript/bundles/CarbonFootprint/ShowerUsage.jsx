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
          dailyGallons: 0,
          yearlyGallons: 0,
          gallonsPerMinute: 2.5
      };
  
    };

    calculateUsage(){
        let { minutes, dailyGallons, yearlyGallons, gallonsPerMinute } = this.state;

        this.setState({ minutes: minutes, dailyGallons: minutes * gallonsPerMinute, yearlyGallons: dailyGallons * 365 })
        console.log(this.state, 'latest state')
    };

    setShowerUsage(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        let {
            minutes,
            yearlyGallons
        } = this.state;

        return(
            <>
            <p>Water Page</p>
            <form className="transportation-footprint-form">
          <label htmlFor="" className="transportationFormText">
            About how long are your showers?
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
            Your yearly water usage: 
          </label>
          <input
            id="user-inputs"
            disabled={true}
            name="yearlyGallons"
            value={yearlyGallons}
          />
          <br />
          <button className="saveButton" type="submit" value="Submit">Save</button>
        </form>
            </>
        )
    }
}