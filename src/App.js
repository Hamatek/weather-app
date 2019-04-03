import React, { useState, useEffect, useRef } from 'react';
import { Global, css } from '@emotion/core';
import axios from 'axios';

import cityList from './city.list.json';
import {
  Input,
  CityCard,
  CityOverlay,
  CityHeader,
  CityList,
  DeleteCard,
  WeatherIcon
} from './Styles';
//  Todo List:
//  localstorage or IndexedDB, periodical refresh / refresh btn, add some default city, input bouncing check city when user stop typing, delete all city at once
//  selectable language, temperature unit, better weather icon than the one offered by openweathermap
//  add touch event on mobile to remove city, long press or slide
//  Handle scenarios when user input a duplicated city, when city name is very long, weather description is long
//  seperate API, setup and components into different files
const WEATHER = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/',
  timeout: 1000
});
const PHOTOS = axios.create({
  baseURL: 'http://api.unsplash.com/',
  timeout: 1000
});
//I am exposing my API key on purpose in case you want to fork the code and run it locally otherwise I would be using a env variable here.
const APPID = 'bc156553ed46a08468eb9be42b9dc67d';
const UNSPLASH_ID =
  '9108c76b61d8146b7f4aca72db9c8028089dc393abc20660fd42e905a67e5d65';

const MainPage = () => {
  const [userCities, setUserCities] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [weathers, setWeathers] = useState({});
  const [cityImages, setCityImages] = useState({});

  const fetchCityWeather = city => {
    WEATHER.get('weather', {
      params: { APPID, units: 'metric', lang: 'kr', q: city }
    })
      .then(response => {
        setWeathers({ ...weathers, [city]: response.data });
        fetchCityPhoto(city);
      })
      .catch(error => {
        console.error('Fetch city weather failed', error);
      });
  };

  const fetchCityPhoto = city => {
    PHOTOS.get('/search/photos', {
      params: {
        client_id: UNSPLASH_ID,
        per_page: 1,
        orientation: 'landscape',
        query: city
      }
    })
      .then(response => {
        setCityImages({ ...cityImages, [city]: response.data.results[0] });
        setUserCities([...userCities, city]);
        setCityInput('');
      })
      .catch(error => {
        console.error('Fetch city photo failed', error);
      });
  };

  const onCitySubmit = e => {
    e.preventDefault();
    // https://jsperf.com/array-filter-performance seems filter is slightly faster on latest chrome but will use classic for loop  here because better overall.
    // ideally you dont really want to have a giant json file on the client...

    let cityIsInList = false;
    for (var i = 0; i < cityList.length; i++) {
      if (cityList[i].name.toLowerCase() === cityInput.toLowerCase()) {
        cityIsInList = true;
        fetchCityWeather(cityInput);
      }
    }
    if (!cityIsInList) alert('This city does not match any city from our list');
  };

  const removeUserCity = city => {
    setUserCities(userCities.filter(userCity => userCity !== city));
  };

  return (
    <div>
      <Global
        styles={css`
          * {
            color: white;
            font-family: 'Fredoka One', cursive;
          }
          body {
            background: linear-gradient(to right, #232526, #414345);
          }
        `}
      />
      <form onSubmit={onCitySubmit}>
        <Input
          onChange={e => setCityInput(e.target.value)}
          placeholder="Add city name"
          type="search"
          autoFocus
          value={cityInput}
        />
      </form>
      <CityList id="city-list">
        {userCities.map(city => (
          <CityWeatherDisplay
            city={city}
            weathers={weathers}
            cityImages={cityImages}
            onRemove={() => removeUserCity(city)}
          />
        ))}
      </CityList>
    </div>
  );
};

const CityWeatherDisplay = ({ city, weathers, cityImages, onRemove }) => {
  if (!weathers[city]) return <div> {city} has No Weather :(...</div>;
  return (
    <CityCard cityImage={cityImages[city].urls.small}>
      <CityOverlay>
        <div>
          <CityHeader>
            {city}
            <WeatherIcon
              alt="current weather icon"
              src={`http://openweathermap.org/img/w/${
                weathers[city].weather[0].icon
              }.png`}
            />
          </CityHeader>
          <div>{weathers[city].weather[0].description}</div>
          <div>{weathers[city].main.temp}&#186;</div>
        </div>
        <DeleteCard onClick={onRemove} className="delete-card">
          Delete city
        </DeleteCard>
      </CityOverlay>
    </CityCard>
  );
};

export default MainPage;
