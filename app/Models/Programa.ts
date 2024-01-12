import { BaseModel, column, beforeDelete, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Horario from './Horario'

export default class Programa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public apresentador: string

  @hasMany(() => Horario)
  public horarios: HasMany<typeof Horario>

  @beforeDelete()
  public static async deleteRelatedhorarios(programa: Programa) {
    await programa.related('horarios').query().delete()
  }
}
