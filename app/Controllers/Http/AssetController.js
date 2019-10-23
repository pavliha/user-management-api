'use strict'

const { basename } = require('path')
const fs = require('fs')
const Helpers = use('Helpers')
const Asset = use('App/Models/Asset')
const unlink = Helpers.promisify(fs.unlink)
const { processFile } = require('../../../utils')

/**
 @typedef {import('@adonisjs/framework/src/Request')} Request
 @typedef {import('@adonisjs/framework/src/Response')} Response
 @typedef {import('@adonisjs/framework/src/View')} View
 */

/**
 * Resourceful controller for interacting with assets
 */
class AssetController {
  /**
   * Show a list of all assets.
   * GET assets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const { page, limit } = request.all()
    return Asset.query().paginate({ page, limit })
  }

  /**
   * Create/save a new asset.
   * POST assets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const fileName = await processFile(request)

    const asset = await Asset.create({
      title: request.input('title'),
      url: `/uploads/${fileName}`
    })

    return response.created(asset)
  }

  /**
   * Display a single asset.
   * GET assets/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Asset.findOrFail(params.id)
  }

  /**
   * Delete a asset with id.
   * DELETE assets/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ asset, response }) {
    await unlink(Helpers.publicPath(`uploads/${basename(asset.url)}`))
    await asset.delete()
    return response.deleted('Asset was deleted successfully!')
  }
}

module.exports = AssetController
