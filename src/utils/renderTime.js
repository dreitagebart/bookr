import padStart from 'lodash.padstart'

export default track => {
  const sec_num = parseInt(track, 10) // don't forget the second param
  let hours = Math.floor(sec_num / 3600)
  let minutes = Math.floor((sec_num - hours * 3600) / 60)
  let seconds = sec_num - hours * 3600 - minutes * 60

  if (track > 3600) minutes = padStart(minutes, 2, '0')
  if (track > 59) seconds = padStart(seconds, 2, '0')

  if (track > 3600) return `${hours}:${minutes}:${seconds}`
  if (track > 59) return `${minutes}:${seconds}`
  if (track > 10) return padStart(seconds, 2, '0')
  return seconds
  // if (hrs) min = padStart(min, 2, '0')

  // if (hrs) return `${hrs}:${min}:${sec}`
  // if (min) return `${min}:${sec}`

  // return hours + ':' + minutes + ':' + seconds
  // let min = Math.floor(track / 60)
  // let hrs = Math.floor(track / 3600)
  // let sec = track % 60
  // console.log(sec)
  // if (sec === 60) sec = 0
  // if (min) sec = padStart(sec, 2, '0')
  // if (hrs) min = padStart(min, 2, '0')

  // if (hrs) return `${hrs}:${min}:${sec}`
  // if (min) return `${min}:${sec}`
  // return sec.toString()
}
