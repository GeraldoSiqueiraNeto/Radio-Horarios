import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Programa from 'App/Models/Programa'

export default class ProgramasController {
  public async index({ request }: HttpContextContract) {
    const programName = request.input('nome')

    if (programName) {
      const programs = await Programa.query().where('nome', 'like', `%${programName}%`)
      return programs
    }

    return Programa.all()
  }

  public async store({ request }: HttpContextContract) {
    const dataProgram = request.only(['nome', 'apresentador'])
    const program = await Programa.create(dataProgram)

    return program
  }

  public async show({ params }: HttpContextContract) {
    const program = await Programa.findOrFail(params.id)

    return program
  }

  public async update({ request, params }: HttpContextContract) {
    const program = await Programa.findOrFail(params.id)
    const dataProgram = request.only(['nome', 'apresentador'])

    program.merge(dataProgram)

    await program.save()

    return program
  }

  public async destroy({ params }: HttpContextContract) {
    const program = await Programa.findOrFail(params.id)
    await program.delete()
  }
}
