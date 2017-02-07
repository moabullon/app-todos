import React, {
  Component
} from 'react';
import './App.css';
import base from './config.js'


class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      classFill: "",
      itemCount: ""
    }
  }

  componentDidMount() {
    this.sync = base.syncState('todos', {
      state: 'todos',
      context: this,
      asArray: true
    })
  }


  addTodo(e) {
    if (this.input.value === "") {
      alert("You must add an item")
    } else if (e.keyCode === 13) {
      let item = {
        text: this.input.value.trim(),
        complete: false
      }
      let newTodoArray = this.state.todos.concat(item)
      this.setState({
        todos: newTodoArray
      })
      this.input.value = ""
    }
  }

  deleteItem(clickedItem) {
    var newList = this.state.todos.filter(item => item !== clickedItem)
    this.setState({
      todos: newList
    })
  }

  completeItem(completeItem) {
    var newTodo = this.state.todos.map(item => {
      if (item !== completeItem) {
        return item
      } else {
        item.complete = !item.complete
        return item
      }
    })
    this.setState({
      todos: newTodo
    })
  }


  itemCount() {
    if (this.state.todos.length !== 1) {
      return "s"
    }
  }

  render() {
    return (
      <section className="todoapp">
          <header className="header">
            <h1>TODOS</h1>
            <input className="new-todo" placeholder="Insert to do item"
            autoFocus
            ref={input => this.input = input}
            onKeyUp={this.addTodo.bind(this)}/>
          </header>

          <section className="main">

    				<input className="toggle-all" type="checkbox"/>

            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">
    					{this.state.todos.map((item, index) => {
                  return <li className={item.complete ? "completed" : ""}key={index}>
                  <div className="view">
                  <input onClick={this.completeItem.bind(this, item)} className="toggle" type="checkbox" checked={item.complete}/>
    							<label
                  ref={label => this.label = label}>
                  {item.text}
                  </label>
    							<button ref={button => this.button = button}
                  onClick={this.deleteItem.bind(this, item)}className="destroy"></button>
    						  </div>
    						<input className="edit" value={item.text}/>
    					</li>
             })
            }
    				</ul>
  			 </section>

         <footer className="footer">
           <span className="todo-count"><strong>{this.state.todos.length}</strong> item{this.itemCount()} left</span>
           <ul className="filters">
             <li>
               <a className="selected" href="#/">All</a>
             </li>
             <li>
               <a href="#/active">Active</a>
             </li>
             <li>
               <a href="#/completed">Completed</a>
             </li>
           </ul>
           <button hidden={this.state.todos.length == 0} className="clear-completed">Clear completed</button>
         </footer>


    </section>
    )
  }
}


export default App;
