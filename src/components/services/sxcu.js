/*
 *  Katana - a powerful, open-source screenshot utility
 *
 *  Copyright (C) 2018, Gage Alexander <gage@washedout.co>
 *
 *  Katana is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  any later version.
 *
 *  Katana  is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Katana. If not, see <http://www.gnu.org/licenses/>.
 */

const request = require('request')
const fs = require('fs')

module.exports = class {
  static upload (file, callback) {
    console.log('Uploading image to Sxcu...')

    const options = {
      url: 'https://sxcu.net/upload',
      headers: {
        'User-Agent': `Katana`
      }
    }

    const post = request.post(options, (error, req, body) => {
      if (error) {
        return callback(null, error)
      }

      try {
        const data = JSON.parse(body)
        const link = {link: data.url}

        callback(link)
      } catch (error) {
        return callback(null, error)
      }
    })

    let form = post.form()

//  form.append('token', 'token-for-custom-sxcu-urls')
    form.append('image', fs.createReadStream(file))
  }
}