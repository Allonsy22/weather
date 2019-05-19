import axios from 'axios';

const APP_ID = 'e3d09b11c7256024c30a61a94a0c8533';
const state = {
    weatherData: null,
}

const mutations = {
    GET_WEATHER_DATA( state, payload ) {
        state.weatherData = payload;
    }
}

const actions = {
    getWeatherData( {commit}, city) {
        return axios.get('https://api.openweathermap.org/data/2.5/weather?q='
                         + city + '&appid=' + APP_ID)
        .then( response => {
            commit('GET_WEATHER_DATA', response.data);
        });
    }
}

const getters = {
    weatherData: state => state.weatherData,
    tempCelsius: state => {
        let kelvin = state.weatherData.main.temp;
        return (kelvin - 273.15).toFixed(1);
    },
    tempKelvin: state => state.weatherData.main.temp,
    pressure: state => state.weatherData.main.pressure,
    humidity: state => state.weatherData.main.humidity,
    windSpeed: state => state.weatherData.wind.speed,
    windDeg: state => Math.round(state.weatherData.wind.deg),
    name: state => state.weatherData.name,
    country: state => state.weatherData.sys.country,
    weather: state => state.weatherData.weather[0].main,
    description: state => state.weatherData.weather[0].description
}

const weather = {
    state,
    mutations,
    actions,
    getters
}

export default weather;