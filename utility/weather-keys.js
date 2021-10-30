export default class WeatherKeys {
  static mapToName (key) {
    switch (key) {
      case 'clouds':
        return 'Cloud Cover'
      case 'dew_point':
        return 'Dew Point'
      case 'feels_like':
        return 'Apparent Temperature'
      case 'humidity':
        return 'Humidity'
      case 'pressure':
        return 'Atmospheric Pressure'
      case 'rain':
        return 'Chance of Rain'
      case 'snow':
        return 'Chance of Snow'
      case 'temp':
        return 'Actual Temperature'
      case 'uvi':
        return 'UV Index'
      case 'visibility':
        return 'Visibility'
      case 'wind_deg':
        return 'Wind Bearing'
      case 'wind_gust':
        return 'Wind Gust Speed'
      case 'wind_speed':
        return 'Wind Speed'
    }

    return undefined
  }

  static mapToData (key, source) {
    if (!source[key] || source.key === null) {
      return 0
    }

    switch (key) {
      case 'clouds':
        return source.clouds.toFixed(0)
      case 'dew_point':
        return source.dew_point.toFixed(2)
      case 'feels_like':
        return source.feels_like.toFixed(2)
      case 'humidity':
        return source.humidity.toFixed(0)
      case 'pressure':
        return source.pressure.toFixed(0)
      case 'rain':
        return source.rain.toFixed(0)
      case 'snow':
        return source.snow.toFixed(0)
      case 'temp':
        return source.temp.toFixed(2)
      case 'uvi':
        return source.uvi.toFixed(0)
      case 'visibility':
        return source.visibility.toFixed(0)
      case 'wind_deg':
        return source.wind_deg.toFixed(0)
      case 'wind_gust':
        return source.wind_gust.toFixed(2)
      case 'wind_speed':
        return source.wind_speed.toFixed(2)
    }
  }

  static mapToCaption (key, units) {
    const metric = units === 'si'
    const temperature = metric ? 'Celsius' : 'Fahrenheit'
    const distance = metric ? 'kilometers' : 'miles'

    switch (key) {
      case 'clouds':
        return 'percent'
      case 'dew_point':
        return `degrees ${temperature}`
      case 'feels_like':
        return `degrees ${temperature}`
      case 'humidity':
        return 'percent'
      case 'pressure':
        return 'hectopascals'
      case 'rain':
        return 'percent'
      case 'snow':
        return 'percent'
      case 'temp':
        return `degrees ${temperature}`
      case 'uvi':
        return 'risk of sunburn'
      case 'visibility':
        return 'meters'
      case 'wind_deg':
        return 'degrees'
      case 'wind_gust':
        return `${distance} per hour`
      case 'wind_speed':
        return `${distance} per hour`
    }

    return undefined
  }
}
