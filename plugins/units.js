export default ({ app }, inject) => {
  inject('chooseUnits', (requested, imperial, metric, standard) => {
    if (!standard) {
      standard = metric
    }

    switch (requested) {
      case 'imperial':
        return imperial
      case 'metric':
        return metric
      case 'standard':
      default:
        return standard
    }
  })

  inject('velocityUnits', requested => app.$chooseUnits(requested, 'mph', 'm/s'))

  inject('distanceUnits', requested => app.$chooseUnits(requested, 'mi', 'km'))

  inject('temperatureSymbol', requested => app.$chooseUnits(requested, 'F', 'C', 'K'))

  inject('unitSummary', (requested) => {
    const deg = app.$degreeSymbol()

    const imperial = `${deg}F, mph`
    const metric = `${deg}C, m/s`
    const standard = `${deg}K, m/s`

    return `${app.$capitalize(requested)} (${app.$chooseUnits(requested, imperial, metric, standard)})`
  })
}
