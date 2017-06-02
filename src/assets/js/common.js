import { getVerCode } from '../../api/api'

export function runAsync () {
  return new Promise(function (resolve, reject) {
    getVerCode().then(response => {
      resolve(response.data.data.verCodeImage)
    }).catch(error => {
      reject(error)
    })
  })
}
