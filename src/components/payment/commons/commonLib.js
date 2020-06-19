import moment from 'moment'


export const convertCurrency = (nominal, currency) => {
    if (!nominal) return ''
    let rupiah = ''
    const data = nominal.split('.')[0]
    const angkarev = data
      .split('')
      .reverse()
      .join('')
    for (let i = 0; i < angkarev.length; i++) {
      if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`
    }
  
    if (currency) {
      return (
        currency
        + rupiah
          .split('', rupiah.length - 1)
          .reverse()
          .join('')
      )
    }
    return rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('')
  }


  export const createDurationToCurrentTime = (date, hoursToAdd = 0) => {
    const toDate = moment(date, 'YYYY-MM-DD HH:mm:ss').add(hoursToAdd, 'hours')
    const currentTime = moment()
    const diff = moment(toDate).diff(currentTime, 'milliseconds')
    const duration = moment.duration(diff, 'milliseconds')
    return `${duration
      .hours()
      .toString()
      .padStart(2, '0')}:${duration
      .minutes()
      .toString()
      .padStart(2, '0')}:${duration
      .seconds()
      .toString()
      .padStart(2, '0')}`
  }