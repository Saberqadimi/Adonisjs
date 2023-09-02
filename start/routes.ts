/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'

// Route.get('/', async () => {
//   return { hello: 'world' }
// })

//api routes
// Route.resource('posts', 'PostsController').apiOnly()

//todos
// Route.group(() => {


//   Route.post("register", "AuthController.register");
//   Route.post("login", "AuthController.login");

//   Route.group(() => {
//     Route.get("todos", "TodosController.index");
//     Route.get("my-todos", "TodosController.myTodos");
//     Route.get("todos/:id", "TodosController.show");
//     Route.put("todos/update/:id", "TodosController.update");
//     Route.post("todos", "TodosController.store");
//     Route.delete("todos/:id", "TodosController.destroy");
//   }).middleware("auth:api");

// }).prefix("api");
//end api routes

//web routes for remplates view

Route.get('/home', async ({ view ,auth}) => {
  const products = [
    {
      title: "iphone",
      color: "blue"
    },
    {
      title: "samsung"
    }
  ];

  const user = await auth.authenticate() || null;

  return view.render('home', {
    products,
    user
  });
})


Route.on('register').render('register')
Route.post('register', 'web/AuthController.register').as('register')
Route.get('/dashboard', async ({ auth }) => {
  const user = await auth.authenticate()
  return `Hello user! Your email address is ${user.email}`
})
Route.on('login').render('login')
Route.post('/login', 'web/AuthController.login').as('login')
Route.get('/logout', async ({ auth }) => {
  await auth.logout()
  return "youre logout the system";
})

Route.on('upload-example').render('upload').middleware('auth')

Route.post('upload', async ({ request, response }) => {
  try {
    const fileSchema = schema.create({
      cover_image: schema.file({
        size: '2mb',
        extnames: ['jpg', 'gif', 'png'],
      }),
    })

    const payload = await request.validate({ schema: fileSchema })

    await payload.cover_image.move(Application.tmpPath('uploads'), {
      name: `${new Date().getTime()}.${payload.cover_image.extname}`,
      overwrite: true,
    })
    return response.status(200).json({ message: 'File uploaded successfully' })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}).as('upload-file')
