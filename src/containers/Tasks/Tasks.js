import React, { Component } from 'react'
import './Tasks.css';
import Task from '../../components/Task/Task';
import Aux from '../../hoc/Aux';
import Adder from '../../components/Adder/Adder';
import Notifier from '../../components/Notifier/Notifier';
import EditTask from '../../components/EditTask/EditTask';

export default class componentName extends Component {
    state = {
        //for listing from localhost
        todo: JSON.parse(localStorage.getItem('reactiveTodosTasks')) || [{
            task: 'Click over me!',
            done: false
        }],
        //notifier for delete
        notifier: false,
        notifierDelID: null,
        notifyReturn: null,
        //for adder
        adderValue: '',
        invalidInput: false,
        //for edit adder
        currEditId: null,
        editAdderValue: '',
        editInvalidInput: false
    }
    adderOnChangeHandler = (event) => {
        this.setState({ adderValue: event.target.value, invalidInput: false })
    }
    //for adding new task!
    taskAddHandler = (value) => {
        let tasks = [...this.state.todo];
        const val = value.trim();
        if (val !== '') {
            if (this.state.currEditId !== null) {
                tasks[this.state.currEditId] = {
                    task: val,
                    done: false
                };
                this.setState({
                    todo: tasks,
                    currEditId:null
                });
            } else {
                tasks.push({
                    task: val,
                    done: false
                });
                this.setState({
                    todo: tasks
                });
            }
            this.setState({ adderValue: '' });
        } else if(this.state.currEditId!== null) {
            this.setState({ editAdderValue: '', editInvalidInput: true });
        }else{
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
        this.setState({
            backdrop: true,
            currEditId: id,
            editAdderValue: this.state.todo[id].task
        });
    }
    notifierYesClickHandler = () => {
        this.taskDeleteHandler(this.state.notifierDelID);
        this.setState({ notifier: false, notifierDelID: null });
    }
    notifierNoClickHandler = () => {
        this.setState({ notifier: false, notifierDelID: null });
    }
    taskDeleteHandler = (id) => {
        let tasks = this.state.todo.filter((element, index) => {
            return index !== id;
        });
        this.setState({
            todo: tasks
        })
        localStorage.setItem('reactiveTodosTasks', JSON.stringify(tasks));
    }
    backdropClickHandler = () => {
        this.setState({
            currEditId: null
        });
    }
    render() {
        return (
            <Aux>
                <Notifier
                    data='Are you sure you want to delete this task?'
                    show={this.state.notifier}
                    yesClick={this.notifierYesClickHandler}
                    noClick={this.notifierNoClickHandler}
                />
                {
                    this.state.currEditId !== null
                        ? <EditTask
                            backdropClick={this.backdropClickHandler}
                            adderValue={this.state.editAdderValue}
                            editChange={(event) => {this.setState({editAdderValue:event.target.value, editInvalidInput:false})}}
                            valid={!this.state.editInvalidInput}
                            addClick={this.taskAddHandler}
                        />
                        : null
                }
                <div className='header'>
                    <h2 style={{ textAlign: "center", fontWeight: 'normal', height: '68px', lineHeight: '68px', margin: '0' }}>REACTIVE TODO'S</h2>
                    <Adder
                        value={this.state.adderValue}
                        changeHandler={this.adderOnChangeHandler}
                        valid={!this.state.invalidInput}
                        addClick={this.taskAddHandler}
                    />
                </div>
                <div className='tasks'>
                    {this.state.todo.length > 0 ? this.state.todo.map((todo, index) => {
                        return <Task
                            key={index}
                            des={todo.task}
                            done={todo.done}
                            editClick={() => { this.taskEditClickHandler(index) }}
                            id={index}
                            taskDel={() => { this.setState({ notifier: true, notifierDelID: index }) }}
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
