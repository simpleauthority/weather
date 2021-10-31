export default () => ({
  isLoading: false,
  loadingMessage: undefined,
  error: [],
  bgPictures: [],
  requestUnits: 'metric',
  forecastInterest: 'temperature',
  location: {},
  weather: {
    current: {},
    hourly: []
  }
})
