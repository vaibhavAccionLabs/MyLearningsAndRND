//
import dispatcher from '../fluxDispatcher';

export function createTodo(text) {
	dispatcher.dispatch({
		type: 'CREATE_TODO',
		text
	});
}

export function deleteTodo(id) {
	dispatcher.dispatch({
		type: 'DELETE_TODO',
		id
	});
}

export function reloadTodos() {
	// axios("url").then(()=>{

	// })

	dispatcher.dispatch({
		type: 'FETCH_TODOS'
	});

	setTimeout(() => {
		dispatcher.dispatch({
			type: 'RECEIVE_TODOS',
			todos: []
		});
	}, 1000);
}
