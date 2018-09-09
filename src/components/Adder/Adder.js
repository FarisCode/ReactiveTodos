import React, { Component } from 'react'
import './Adder.css'
export default class Adder extends Component {
    componentDidMount() {
        this.nameInput.focus();
    }
    render() {
        let invalidStyle = null;
        if (!this.props.valid) {
            invalidStyle = { boxShadow: '1px 1px 5px rgba(255, 0, 0,0.8), -1px -1px 5px rgba(255, 0, 0,0.8)' };
        }
        return (
            <div className='adder' style={invalidStyle}>
                <input
                    ref={(input) => { this.nameInput = input; }}
                    className='Addinput'
                    type="text"
                    placeholder='Add New Task!'
                    value={this.props.value}
                    onChange={this.props.changeHandler}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            this.props.addClick(this.props.value);
                        }
                    }} />
                <i
                    onClick={() => {
                        this.nameInput.focus();
                        this.props.addClick(this.props.value)
                    }}
                    className="fas fa-plus-circle"></i>
            </div>
        )
    }
}
