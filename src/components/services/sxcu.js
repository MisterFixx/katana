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

//insert your sxcu upload domain here.
const SXCU_UPLOAD_DOMAIN = "sxcu.net"

//change this to an upload token if you're using a private domain.
const SXCU_TOKEN = null

//change this to a collection ID if you want to upload your images to a collection on sxcu.net.
const SXCU_COLLECTION_ID = null

//change this to a collection token if you are uploading to a private collection.
const SXCU_COLLECTION_TOKEN = null

module.exports = class {
  static upload (file, callback) {
    console.log('Uploading image to Sxcu...')

    const options = {
      url: 'https://'+SXCU_UPLOAD_DOMAIN+'/upload',
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
    form.append('image', fs.createReadStream(file))
    if(SXCU_TOKEN !== null){
      form.append('token', SXCU_TOKEN)
    }
    if(SXCU_COLLECTION_ID !== null){
       form.append('collection', SXCU_COLLECTION_ID)
    }
    if(SXCU_COLLECTION_TOKEN !== null){
      form.append('collection_token', SXCU_COLLECTION_TOKEN)
    }
  }
}
