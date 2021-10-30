export default () => ({
  isLoading: false,
  bgPicture: '',
  bgPictures: [],
  requestUnits: 'imperial',
  forecastInterest: 'temp',
  lastLat: 0,
  lastLon: 0,
  location: {},
  weather: {
    current: {},
    hourly: []
  }
})
