import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Programas extends BaseSchema {
  protected tableName = 'programas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome').notNullable()
      table.string('apresentador').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
