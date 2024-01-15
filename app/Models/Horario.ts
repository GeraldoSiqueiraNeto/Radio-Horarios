import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Programa from './Programa'

export default class Horario extends BaseModel {
  @column({ serializeAs: null })
  public id: number

  @column({ serializeAs: null })
  public programaId: number

  @column()
  public horario: string

  @belongsTo(() => Programa)
  public programa: BelongsTo<typeof Programa>
}
