import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Todo from "App/Models/Todo";

export default class TodosController {

  public async index({ }: HttpContextContract) {
    const todos = await Todo.query();
    return todos;
  }

  public async myTodos({ auth }: HttpContextContract) {
    try {
      const user = await auth.authenticate();
      await user.load('todos');
      return user;
    } catch (error) {
      console.error(error);
      return 'Error fetching user todos';
    }
  }

  public async show({ params }: HttpContextContract) {
    try {
      const todo = await Todo.find(params.id);
      if (todo) {
        return todo;
      } else {
        return { message: "Todo not found" };
      }
    } catch (error) {
      console.error(error);
      return { message: "An error occurred" };
    }
  }

  public async update({ request, params }: HttpContextContract) {
    const todo = await Todo.find(params.id);
    if (todo) {
      todo.title = request.input('title');
      todo.desc = request.input('desc');
      todo.done = request.input('done');

      if (await todo.save()) {
        return todo;
      } else {
        return { message: "Unable to update todo" };
      }
    } else {
      return { message: "Todo not found" };
    }
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = await auth.authenticate();
    const todo = new Todo();
    todo.userId = user.id;
    todo.title = request.input('title');
    todo.desc = request.input('desc');

    if (await todo.save()) {
      return todo;
    } else {
      return { message: "Unable to create todo" };
    }
  }

  public async destroy({ response, auth, params }: HttpContextContract) {
    // const user = await auth.authenticate();
    const todo = await Todo.find(params.id);
    if (todo) {
      await todo.delete();
      return response.json({ message: "Deleted successfully" });
    } else {
      return response.status(404).json({ message: "Todo not found" });
    }
  }
}
