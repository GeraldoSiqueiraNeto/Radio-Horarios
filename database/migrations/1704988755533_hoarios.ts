import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Hoarios extends BaseSchema {
  protected tableName = 'horarios'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('programa_id').unsigned().references('id').inTable('programas')
      table.string('horario').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
