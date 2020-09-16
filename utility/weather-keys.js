export default class WeatherKeys {
  static mapToName (key) {
    switch (key) {
      case 'apparentTemperature':
        return 'Feels Like'
      case 'cloudCover':
        return 'Cloud Coverage'
      case 'dewPoint':
        return 'Dew Point'
      case 'humidity':
        return 'Humidity'
      case 'nearestStormBearing':
        return 'Nearest Storm Bearing'
      case 'nearestStormDistance':
        return 'Nearest Storm Distance'
      case 'ozone':
        return 'Ozone'
      case 'precipProbability':
        return 'Chance of Precipitation'
      case 'precipIntensity':
        return 'Intensity of Precipitation'
      case 'pressure':
        return 'Atmospheric Pressure'
      case 'temperature':
        return 'Current Temperature'
      case 'uvIndex':
        return 'UV Index'
      case 'visibility':
        return 'Visibility'
      case 'windBearing':
        return 'Wind Bearing'
      case 'windGust':
        return 'Wind Gust'
      case 'windSpeed':
        return 'Wind Speed'
    }
    return undefined
  }

  static mapToData (key, source) {
    switch (key) {
      case 'apparentTemperature':
        return source.apparentTemperature.toString()
      case 'cloudCover':
        return (source.cloudCover * 100).toFixed(0)
      case 'dewPoint':
        return source.dewPoint.toString()
      case 'humidity':
        return (source.humidity * 100).toFixed(0)
      case 'nearestStormBearing':
        return source.nearestStormBearing.toString()
      case 'nearestStormDistance':
        return source.nearestStormDistance.toString()
      case 'ozone':
        return source.ozone.toString()
      case 'precipProbability':
        return source.precipProbability.toString()
      case 'precipIntensity':
        return source.precipIntensity.toString()
      case 'pressure':
        return source.pressure.toString()
      case 'temperature':
        return source.temperature.toString()
      case 'uvIndex':
        return source.uvIndex.toString()
      case 'visibility':
        return source.visibility.toString()
      case 'windBearing':
        return source.windBearing.toString()
      case 'windGust':
        return source.windGust.toString()
      case 'windSpeed':
        return source.windSpeed.toString()
    }
    return undefined
  }

  static mapToCaption (key, units, source) {
    const metric = units === 'si'
    const temperature = metric ? 'Celsius' : 'Fahrenheit'
    const distance = metric ? 'kilometers' : 'miles'

    switch (key) {
      case 'apparentTemperature':
        return `degrees ${temperature}`
      case 'cloudCover':
        return 'percent'
      case 'dewPoint':
        return `degrees ${temperature}`
      case 'humidity':
        return 'percent'
      case 'nearestStormBearing':
        return 'degrees'
      case 'nearestStormDistance':
        return `${distance} away`
      case 'ozone':
        return 'dobsons'
      case 'precipProbability':
        return 'percent chance'
      case 'precipIntensity':
        return 'mm/hour'
      case 'pressure':
        return 'hPa'
      case 'temperature':
        return `degrees ${temperature}`
      case 'uvIndex':
        return `${(source.uvIndex * 25)} mW/m²`
      case 'visibility':
        return distance
      case 'windBearing':
        return 'degrees'
      case 'windGust':
        return `${distance} per hour`
      case 'windSpeed':
        return `${distance} per hour`
    }
    return undefined
  }
}
