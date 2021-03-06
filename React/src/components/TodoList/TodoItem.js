import React from 'react'
import classNames from 'classnames'

import MyContext from './context'
import TodoButton from './TodoButton'

function TodoItem({ item, idx }) {
    return (
        <tr className={classNames({'table-success':item.complete})}>
            <th>{idx + 1}</th>
            <td>{item.todo}</td>
            <td>{item.complete ? '是' : '否'}</td>
            <td>
                {/* 接收数据 */}
                <MyContext.Consumer>
                    {
                        (value) => {
                            console.log(value);
                            return (
                                //    {/* 不会生成标签 */}
                                <React.Fragment>
                                     {/* <button className="btn btn-outline-primary btn-sm" onClick={value.complete.bind(null,item.id)}>完成</button>
                                   <button className="btn btn-outline-danger btn-sm" onClick={value.remove.bind(null,item.id)}>删除</button>  */}
                                    <TodoButton className="btn-outline-primary" onClick={value.complete.bind(null,item.id)}>完成</TodoButton>
                                   <TodoButton className="btn-outline-danger" onClick={value.remove.bind(null,item.id)}>删除</TodoButton>
                                </React.Fragment>
                            )
                        }
                    }

                </MyContext.Consumer>
            </td>
        </tr>
    )
}

export default TodoItem