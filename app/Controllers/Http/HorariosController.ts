import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
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
    const newScheduleSchema = schema.create({
      programa_id: schema.number([rules.exists({ table: 'programas', column: 'id' })]),
      horario: schema.string({}, [
        rules.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
        rules.unique({
          table: 'horarios',
          column: 'horario',
          where: { programa_id: request.input('programa_id') },
        }),
      ]),
    })

    const validatedData = await request.validate({ schema: newScheduleSchema })

    const horario = await Horario.create(validatedData)

    return horario
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
