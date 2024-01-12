import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('programas', 'ProgramasController').apiOnly()

Route.resource('horarios', 'HorariosController').apiOnly()
