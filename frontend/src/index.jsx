import React from 'react';
import ReactDOM from 'react-dom';
import { map, get } from 'lodash';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    const forecast = await getForecastFromApi();

    this.setState({ icon: weather.icon.slice(0, -1), forecast });
  }

  render() {
    const { icon, forecast } = this.state;

    return (

      <div >

        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
          <div className="container">
            <span className="navbar-brand"> Weather Updates </span>
          </div>
        </div>

        <div className="container">
          <div className="page-header" id="banner">
            <div className="row">
              <div className="col-lg-8 col-md-7 col-sm-6">
                <h3>Current weather</h3>
                <p className="lead">{ icon && <img width={200} height={200} alt="" src={`/img/${icon}.svg`} /> } </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">

          <div className="row">
            <div className="col-md-12">
              <div className="page-header">
                <h3 id="tables">Forecast</h3>
              </div>

              <div className="bs-component">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Date&Time</th>
                      <th scope="col">Details</th>
                      <th scope="col">Weather</th>
                    </tr>
                  </thead>
                  <tbody>
                    {map(forecast, (item, index) => {
                      return (
                        <tr className="table-light" key={index}>
                          <th scope="row">{item.dt_txt}</th>
                          <td>
                            Description: {get(item, 'weather[0].description')} <br />
                            Temperature: {item.main.temp} <br />
                            Min temperature: {item.main.temp_min} <br />
                            Max temperature: {item.main.temp_max}<br />
                            Humidity: {item.main.humidity}
                            Wind speed: {item.wind.speed}
                          </td>
                          <td>
                            <img width={64} height={64} alt="" src={`/img/${get(item, `weather[0].icon`).slice(0, -1)}.svg`} />
                          </td>
                        </tr>
                      );
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
