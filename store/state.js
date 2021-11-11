export default () => ({
  isLoading: false,
  loadingMessage: undefined,
  error: [],
  bgPictures: [],
  requestUnits: 'metric',
  forecastInterest: 'temperature',
  forecastType: 'hourly',
  location: {},
  weather: {
    current: {},
    hourly: []
  }
})
