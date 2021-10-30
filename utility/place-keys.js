export default class PlaceKeys {
  static mapToName (key) {
    switch (key) {
      case 'country': return 'Country'
      case 'flag': return 'National Flag'
      case 'city': return 'City'
      case 'calling_code': return 'Calling Prefix'
      case 'civil_sunrise': return 'Civil Sunrise'
      case 'civil_sunset': return 'Civil Sunset'
    }

    return undefined
  }

  static mapToData (key, source) {
    switch (key) {
      case 'country': return `${source.flag} ${source.country} ${source.flag}`
      case 'city': return source.city
      case 'calling_code': return `+${source.calling_code}`
      case 'civil_sunrise': return new Date(source.civil_sunrise * 1000).toLocaleTimeString()
      case 'civil_sunset': return new Date(source.civil_sunset * 1000).toLocaleTimeString()
    }

    return undefined
  }

  static mapToCaption (key) {
    switch (key) {
      case 'calling_code': return 'and then the local phone number'
    }

    return undefined
  }
}
