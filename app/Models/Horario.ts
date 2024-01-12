import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Programa from './Programa'

export default class Horario extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public programa_id: number

  @column()
  public horario: string

  @belongsTo(() => Programa)
  public programa: BelongsTo<typeof Programa>
}
