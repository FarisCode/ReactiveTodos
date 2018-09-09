import React, { Component } from 'react'
import './Tasks.css';
import Task from '../../components/Task/Task';
import Aux from '../../hoc/Aux';
import Adder from '../../components/Adder/Adder';
// import Backdrop from '../../components/Notifier/Backdrop/Backdrop';

export default class componentName extends Component {
    state = {
        //for listing from localhost
        todo: JSON.parse(localStorage.getItem('reactiveTodosTasks')) || [],
        
        //backDropForEdit
        backdrop: false,

        //for adder
        adderValue: '', 
        invalidInput: false,

        //for adder
        editAdderValue: '', 
        editInvalidInput: false
    }

    adderOnChangeHandler=(event)=>{
        this.setState({ adderValue: event.target.value, invalidInput: false })
    }

    taskAddHandler = (id) => {
        let tasks = [...this.state.todo];
        const val = this.state.adderValue.trim();
        if (val !== '') {
            if (id !== undefined) {
                tasks[id] = {
                    task: val,
                    done: false,
                    edit: false
                };
                this.setState({
                    todo: tasks,
                    backdrop: false
                });
            } else {
                tasks.push({
                    task: val,
                    done: false,
                    edit: false
                });
                this.setState({
                    todo: tasks
                });
            }
            this.setState({ adderValue: '' });
        } else {
            this.setState({ adderValue: '', invalidInput: true });
        }
        localStorage.setItem('reactiveTodosTasks', JSON.stringify(tasks));
    }
    taskClickedHandler = (event, id) => {
        event.stopPropagation();
        let tasks = [...this.state.todo];
        tasks[id] = { ...this.state.todo[id] }
        tasks[id].done = !this.state.todo[id].done;
        this.setState({
            todo: tasks
        })
        localStorage.setItem('reactiveTodosTasks', JSON.stringify(tasks));

    }
    taskEditClickHandler = (id) => {
        let tasks = [...this.state.todo];
        tasks[id] = { ...this.state.todo[id] }
        tasks[id].edit = true;
        this.setState({
            todo: tasks,
            backdrop: true
        })
        localStorage.setItem('reactiveTodosTasks', JSON.stringify(tasks));
    }
    taskDeleteHandler = (event, id) => {
        // console.log(id)
        event.stopPropagation();
        let tasks = this.state.todo.filter((element, index) => {
            return index !== id;
        });
        this.setState({
            todo: tasks
        })
        localStorage.setItem('reactiveTodosTasks', JSON.stringify(tasks));
    }

    render() {
        return (
            <Aux>
                {/* {this.state.backdrop? <Backdrop abs/>:null} */}
                <div className='header'>
                    <h2 style={{ textAlign: "center", fontWeight: 'normal', height: '68px', lineHeight: '68px', margin: '0' }}>REACTIVE TODO'S</h2>
                    <Adder value={this.state.adderValue} changeHandler={this.adderOnChangeHandler} valid={!this.state.invalidInput}  addClick={this.taskAddHandler} />
                </div>
                <div className='tasks'>
                    {this.state.todo.length > 0 ? this.state.todo.map((todo, index) => {
                        return <Task
                            key={index}
                            des={todo.task}
                            done={todo.done}
                            editClick={() => { this.taskEditClickHandler(index) }}
                            editTask={this.taskAddHandler}
                            id={index}
                            edit={todo.edit}
                            taskDel={(event) => { this.taskDeleteHandler(event, index) }}
                            taskClick={(event) => { this.taskClickedHandler(event, index) }} />
                    }) : <div
                        style={{
                            fontSize: '1.4em',
                            color: '#999',
                            textAlign: 'center',
                            marginTop: '25px'
                        }}>Add Some Tasks</div>}
                </div>
            </Aux>
        )
    }
}
