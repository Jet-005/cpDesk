const request = require("request")

module.exports = (url, options) => {
  options.url = url
  return new Promise(function (resolve, reject) {
    request(options, function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        if (typeof body === "string") {
          body = JSON.parse(body)
        }
        resolve(body)
      }
    })
  })
}
