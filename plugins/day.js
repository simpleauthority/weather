import dayjs from 'dayjs'

export default ({ _ }, inject) => {
  const timeOfDayFormat12 = 'h:mm A'
  const hourOfDayFormat12 = 'h A'
  const timeOfDayFormat24 = 'HH:mm'
  const hourOfDayFormat24 = 'HH'
  const monthDayFormat = 'MM/DD'
  const dayMonthFormat = 'DD/MM'

  inject('asTimeOfDay12', date => dayjs(date).format(timeOfDayFormat12))
  inject('asHourOfDay12', date => dayjs(date).format(hourOfDayFormat12))
  inject('asTimeOfDay24', date => dayjs(date).format(timeOfDayFormat24))
  inject('asHourOfDay24', date => dayjs(date).format(hourOfDayFormat24))
  inject('asMonthDay', date => dayjs(date).format(monthDayFormat))
  inject('asDayMonth', date => dayjs(date).format(dayMonthFormat))
}
