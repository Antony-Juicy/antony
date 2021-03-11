import React from 'react'
import {render} from 'react-dom'
import {HashRouter,BrowserRouter,Route} from 'react-router-dom'

import {Provider} from 'react-redux'

import App from './App'

import store from './store'



// 自定义一个路由 开发用HashRouter  上线BrowserRouter
const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter

render(
    // <BrowserRouter>
    //     <App></App>
    // </BrowserRouter>,

    <Provider store={store}>
               <Router>
    {/* 获取 */}
        <App></App>
{/* <Route component={App}></Route> */}
        </Router>
    </Provider>
 
,
   

    document.querySelector('#app')
)