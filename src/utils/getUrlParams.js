const getUrlParams = () => {
  let params = []
  let hash

  const hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')

  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=')

    params.push(hash[0])
    params[hash[0]] = hash[1]
  }

  return params
}

export default getUrlParams
