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

  public async store({ request, response }: HttpContextContract) {
    try {
      const validateSchedule = schema.create({
        programa_id: schema.number([rules.exists({ table: 'programas', column: 'id' })]),
        horario: schema.string({}, [
          rules.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
          rules.unique({ table: 'horarios', column: 'horario' }),
        ]),
      })

      const validatedData = await request.validate({ schema: validateSchedule })

      const Schedule = await Horario.create(validatedData)

      return Schedule
    } catch (error) {
      if (
        error.code === 'E_VALIDATION_FAILURE' &&
        error.messages.errors.some((e) => e.rule === 'unique')
      ) {
        return response.status(400).send({ message: 'Horário já ocupado' })
      }
      throw error
    }
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
