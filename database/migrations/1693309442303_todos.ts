import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Todos extends BaseSchema {
	protected tableName = "todos";

	public async up() {
        this.schema.createTable(this.tableName, (table) => {
          table.increments("id");
          table
            .integer('user_id')
            .unsigned()
            .references('users.id')
            .onDelete('CASCADE'); 
            table.string("title", 255).notNullable();
            table.string("desc", 255).notNullable();
            table.boolean("done").defaultTo(false);
            table.timestamps(true);
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}
