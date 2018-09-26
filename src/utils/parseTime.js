export default time => {
  const times = time.split(':')

  const hours = parseInt(times[0], 10)
  const mins = parseInt(times[1], 10)

  if (hours === 0) {
    if (mins === 1) return `${mins} minute`
    return `${mins} minutes`
  }

  if (hours === 1) {
    if (mins === 0) {
      return `${hours} hour`
    } else {
      return `${hours} hour ${mins} minutes`
    }
  } else {
    if (mins === 0) {
      return `${hours} hours`
    } else {
      return `${hours} hours ${mins} minutes`
    }
  }
}
