import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Horario from 'App/Models/Horario'

export default class HorariosController {
  public async index({ request }: HttpContextContract) {
    const programId = request.input('programa_id')

    if (programId) {
      const schedules = await Horario.query().where('programa_id', programId)

      return schedules
    }

    return Horario.all()
  }

  public async store({ request }: HttpContextContract) {
    const schedulesData = request.only(['programa_id', 'horario'])
    const schedules = await Horario.create(schedulesData)

    return schedules
  }

  public async show({ params }: HttpContextContract) {
    const schedules = await Horario.findOrFail(params.id)

    return schedules
  }

  public async update({ request, params }: HttpContextContract) {
    const schedules = await Horario.findOrFail(params.id)
    const schedulesData = request.only(['programa_id', 'horario'])

    schedules.merge(schedulesData)

    await schedules.save()

    return schedules
  }

  public async destroy({ params }: HttpContextContract) {
    const schedules = await Horario.findOrFail(params.id)

    await schedules.delete()
  }
}
