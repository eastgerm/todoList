import React,{Component} from 'react';
import './TodoLayer.scss';
import fire from "../Firebase";
import _ from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TodoLayer extends Component {
  state = {
    todos: null,
    currentTodoId: null,
    currentTodo: null,
  };

  componentDidMount() {
    fire.database().ref('todos').on('value',snapshot => {
      const todos = snapshot.val() || [];
      const todoIds = _.keys(todos);

      let todoKeyAndValue = _.map(todoIds,item => {
        return {
          key: item,
          value: todos[item]
        }});

      this.setState({
        todos: todoKeyAndValue
      })
    })
  }

  addNewTodo = () => {
    let newKey = fire.database().ref().child('todos').push().key;
    let newTodo = {
      title: 'untitled',
      content: 'please add content',
      finished: false
    };
    let updates={};
    updates[`todos/${newKey}`] = newTodo;
    fire.database().ref().update(updates);
  };

  render() {
    let moment = require('moment');
    return (
      <div className='todo-layer'>
        <div className='todo-chart'>
          <button className='add-btn' onClick={this.addNewTodo}>할 일 추가</button>
          {_.map(this.state.todos,todo =>
            <div className={`todo-item ${todo.key===this.state.currentTodoId ? 'active' : null} ${todo.value.finished ? 'finished' : null}`} key={todo.key} onClick={()=>{
              this.setState({
                currentTodoId: todo.key,
                currentTodo: todo.value
              })}}>
              <div className='title'>
                {todo.value.title}
              </div>
              <div className='content'>
                {todo.value.content}
              </div>
              <div className='date'>
                {!!_.get(todo.value,'endDate') && `~${moment(todo.value.endDate).format("YYYY. MM. DD")}`}
              </div>
              {
                todo.value.hasOwnProperty('endDate') && moment(todo.value.endDate) < moment() && !todo.value.finished &&
                <div className='label'>
                  **마감 실패**
                  {console.log(moment()-moment(todo.value.endDate))}
                </div>
              }
              <div className='delete-btn' onClick={e=>{
                e.stopPropagation();
                let updates = {};
                updates[`todos/${todo.key}`] = null;
                fire.database().ref().update(updates);
              }}>삭제</div>
            </div>)}
        </div>
        {
          !!this.state.currentTodoId
            ?
            <div className='edit-todo'>
              <div className='edit-title'>
                <textarea className='title-area' value={this.state.currentTodo.title} onChange={e=>{
                  let updateTodo = {
                    ...this.state.currentTodo,
                    title: e.target.value
                  };
                  this.setState({
                    currentTodo: updateTodo
                  });
                }}/>
              </div>
              <div className='edit-content'>
                <textarea className='content-area' value={this.state.currentTodo.content} onChange={e=>{
                  let updateTodo = {
                    ...this.state.currentTodo,
                    content: e.target.value
                  };
                  this.setState({
                    currentTodo: updateTodo
                  });
                }}/>
              </div>
              <div className='final-line'>
                <div className='edit-date'>
                  {
                    !!_.get(this.state.currentTodo,'endDate') ?
                      <div>
                        <DatePicker className='date-area' selected={new Date(_.get(this.state.currentTodo,'endDate'))} dateFormat="yyyy. MM. dd" dropdownMode="select" onChange={e=>{
                          const updateTodo = {
                            ...this.state.currentTodo,
                            endDate: e
                          };
                          this.setState({
                            currentTodo: updateTodo
                          });
                        }}/>
                        <button onClick={()=>{
                          const updateTodo = {
                            ...this.state.currentTodo,
                            endDate: null
                          };
                          this.setState({
                            currentTodo: updateTodo
                          });
                        }}>x</button>
                      </div>:
                      <DatePicker className='date-area' placeholderText="마감 날짜 지정" dteFormat="MMMM d, yyyy" dropdownMode="select" onChange={e=>{
                        const updateTodo = {
                          ...this.state.currentTodo,
                          endDate: e
                        };
                        this.setState({
                          currentTodo: updateTodo
                        });
                      }}/>
                  }
                </div>
                <div className='edit-finished'>
                  <input className='finished-area' type='checkbox' checked={this.state.currentTodo.finished} onChange={()=>{
                    const updateTodo = {
                      ...this.state.currentTodo,
                      finished: !this.state.currentTodo.finished
                    };
                    this.setState({
                      currentTodo: updateTodo
                    })
                  }}/>
                  <span>완료</span>
                </div>
                <div className='save-btn' onClick={()=>{
                  let updates={};
                  updates[`todos/${this.state.currentTodoId}`] = this.state.currentTodo;
                  fire.database().ref().update(updates);
                }}>저장</div>
              </div>
              </div>
            :
            <div className='edit-todo'> </div>
        }
      </div>
    );
  }
}

export default TodoLayer;