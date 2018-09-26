import times from 'lodash.times'
import padStart from 'lodash.padstart'

let hour = 0
let result = []

const minutes = [0, 15, 30, 45]

times(8, () => {
  minutes.map(min => {
    const value = `${hour}:${padStart(min, 2, '0')}`
    result.push({
      key: value,
      value,
      text: value
    })

    return result
  })
  hour++
})

result.shift()

result.push({
  key: '8:00',
  value: '8:00',
  text: '8:00'
})

export default result
