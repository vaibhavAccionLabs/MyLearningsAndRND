// Component get flux store

import TodoStore from '../store/fluxStore';
// inside class
this.state = {
	todos: TodoStore.getAll()
};

componentWillMount() {
    TodoStore.on('change', () => {
        this.setState({
            todos:TodoStore.getAll(),
        });
    });
}


/// for avoiding memory leaks.. events which listen / remove them als

getTodo(){
    this.setState({
        todos: TodoStore.getAll(),
    });
}

componentWillMount() {
    TodoStore.on('change', this.getTodo);
}


componentWillUnmount() {
    //emitter.removeListener(eventName, listener)
    TodoStore.removeListener('change', this.getTodo);
}



