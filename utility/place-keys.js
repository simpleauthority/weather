export default class PlaceKeys {
  static mapToName (key) {
    switch (key) {
      case 'callingcode': return 'Calling Code'
      case 'flag': return 'Country Flag'
      case 'sunrise': return 'Civil Sunrise'
      case 'sunset': return 'Civil Sunset'
    }
    return undefined
  }

  static mapToData (key, source) {
    switch (key) {
      case 'callingcode': return `+${source.callingcode}`
      case 'flag': return source.flag
      case 'sunrise': return new Date(Number(source.sunrise) * 1000).toLocaleTimeString()
      case 'sunset': return new Date(Number(source.sunset) * 1000).toLocaleTimeString()
    }
    return undefined
  }

  static mapToCaption (key) {
    switch (key) {
      case 'callingcode': return 'and then the phone number'
      case 'flag': return 'represent'
      case 'sunrise': return 'Morning, Sunshine!'
      case 'sunset': return 'Hello, Moon!'
    }
    return undefined
  }
}
