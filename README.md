# weatherwidget
Simple weather website project for experimentation purposes. Automatically shows the current city, temperature, time, and date. Weather information is fetched from FMI with IP address location.


![Animated weather widget demo](https://github.com/miikaw/weatherwidget/blob/main/imgs/WidgetDemo.gif?raw=true) 




## Features

* Automatically shows the current city, temperature, time, and date on the widget-like website
* Gets general location (city) from users IP address and fetches open weather data from FMI according to this
* If usable IP address or location is not found, it uses preset: Helsinki




## Usage

### Log fetched data to console:
> logdata();



### Load weather data
> getWeather();



### Change or set weather symbol
> weather();

Weather symbols include: snow, snowy, cloudy, sunny, thunder, night, rainy, partlycloudy, pouring

Usage example:
> weather(snowy);



### Load current date
> loaddate();



### Load current time
> loadtime();



## Important notes

The main purpose of this project was to learn and experiment with XML weather data fetching and user location with web technologies (& JavaScript).

This project is experimental and does not currently take advantage of all the features it could. For example, the weather icons are not connected to the weather data and have to be manually set in the demo. Also, the code itself is not well optimized or simplified.

This project also lacks comprehensive documentation and most likely will not be updated or developed any further.


### All open weather data used in this project and FMIODATA logo belong to Finnish Meteorological Institute or Ilmatieteen laitos: https://www.ilmatieteenlaitos.fi/avoin-data

## This project is made for personal experimental and educational purposes.
