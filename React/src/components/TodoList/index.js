// import React from 'react'

// // 类组件
// class TodoList extends React.Component{

// }

import React, { Component } from 'react'

import './todolist.scss'; // 引入样式
import 'bootstrap/dist/css/bootstrap.css';

import TodoForm from './TodoForm'
import TodoContent from './TodoContent'

import MyContext from './context'

// 类组件
class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            datalist: [
                {
                    id: 1,
                    todo: '定个小目标睡一整天',
                    complete: true
                }, {
                    id: 2,
                    todo: '赚他一个亿',
                    complete: false
                }, {
                    id: 3,
                    todo: '迎娶白富美，达到人生巅峰',
                    complete: false
                }, {
                    id: 4,
                    todo: '出人CEO，达到疯癫状态',
                    complete: false
                }],

        }
        // 推荐在初始化时改变this指向
        // this.addItem = this.addItem.bind(this);
        // this.removeItem = this.removeItem.bind(this);
        // this.completeItem = this.completeItem.bind(this);
    }
    //  添加 数据 （谁的数据谁修改
    addItem=(todo)=> {
        const { datalist } = this.state;
        const newData = {
            id: parseInt(Math.random() * 10000),
            todo,
            complete: false,
            addtime: Date.now()  // 时间
        }
        this.setState({
            datalist: [newData, ...datalist]
        })
    }

    render() {
        const { datalist } = this.state;
        // 共享数据
        const contextData = {
            remove: this.removeItem,
            complete: this.completeItem
        };
        return (
            <div className="container">
                {/*利用Provider的value属性共享数据*/}
                <MyContext.Provider value={contextData}>
                    <TodoContent datalist={datalist} age={20}/>
                    <TodoForm addItem={this.addItem} />
                </MyContext.Provider>
            </div>

        )
    }

    //   删除
    removeItem=(id)=> {
        let { datalist } = this.state;
        datalist = datalist.filter(item => item.id != id);
        this.setState({
            datalist
        })
    }

    //  修改
    completeItem=(id) =>{
        let { datalist } = this.state;
        datalist = datalist.map(item => {
            if (item.id == id) {
                item.complete = true
            }
            return item;

        })
        // 修改数据
        this.setState({
            datalist
        })
    }
}

// 导出
export default TodoList

