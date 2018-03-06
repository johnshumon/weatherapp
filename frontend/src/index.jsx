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

        this.setState({ icon: weather.icon.slice(0, -1), forecast: forecast });
    }

    render() {
        const { icon, forecast } = this.state;

        return (
            <div>
                <div className="icon">
                    <h3>CURRENT WEATHER</h3>
                    { icon && <img alt="" src={`/img/${icon}.svg`} /> }
                </div>

                <div>
                    <table>
                        <tbody>
                        {map(forecast, (item, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.dt_txt}
                                    </td>
                                    <td>
                                        ----------------------------
                                    </td>
                                    <td>
                                        weatherdetails <img alt="" src={`/img/${get(item, 'weather[0].icon').slice(0, -1)}.svg`} />

                                    </td>
                                </tr>

                            );
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Weather />,
    document.getElementById('app')
);
