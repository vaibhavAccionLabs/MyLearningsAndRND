// FLux Store

import { EventEmitter } from 'events';
import dispatcher from './fluxDispatcher';

class TodoStore extends EventEmitter {
	constructor() {
		super();
		this.todos = [
			{
				id: 12345,
				text: 'TESTING ONE',
				complete: false
			},
			{
				id: 678910,
				text: 'TESTING two',
				complete: false
			}
		];
	}

	createTodo(text) {
		const id = Date.now();
		this.todos.push({
			id,
			text,
			complete: false
		});
		this.emit('change');
	}
	getAll() {
		return this.todos;
	}

	handleActions(action) {
		console.log('TodoStore receives an action', action);
		// Switch case will play here
		switch (action.type) {
			case 'CREATE_TODO':
				this.createTodo(action.text);
				break;
			case 'RECEIVE_TODOS':
				this.todos = action.todos;
				this.emit('change');
				break;
		}
	}
}
const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));

//access from console
window.todoStore = todoStore;

export default todoStore;
