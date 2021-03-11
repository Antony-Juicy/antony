## $route和$router 的区别

$route 是路由信息对象，包括path，params，hash，query，fullPath，matched，name 等路由信息参数。
而 $router 是路由实例对象，包括了路由的跳转方法，钩子函数等

## vue-router 导航完整的解析流程

1.  导航被触发；
2.  在失活的组件里调用 beforeRouteLeave 守卫；
3.  调用全局 beforeEach 守卫；
4.  在复用组件里调用 beforeRouteUpdate 守卫；
5.  调用路由配置里的 beforeEnter 守卫；
6.  解析异步路由组件；
7.  在被激活的组件里调用 beforeRouteEnter 守卫；
8.  调用全局 beforeResolve 守卫；
9.  导航被确认；
10. 调用全局的 afterEach 钩子；
11. DOM 更新；
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

```js
// 路由配置守卫即配置在路由对象中
// 组件实力的导航守卫：beforeRouteLeave、beforeRouteEnter、beforeRouteUpdate
// 全局守卫：beforeEach、beforeResolve、afterEach
// 路由配置守卫：beforeEnter
```

## vue 路由传参(query 更加类似于我们 ajax 中 get 传参，params 则类似于 post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示)

```js
  // 方案一
  //父组件中
  this.$router.push({
      path: `/describe/${id}`
  })
  // router.js中
  {
      path: '/describe/:id',
      name: 'Describe',
      component: Describe
  }
  // 子组件中
  this.$route.params.id

  //方案二
  // 父组件中
  this.$router.push({
      name: 'Describe',
      params: {
          id: id
      }
  })
  // router.js中
  {
      path: '/describe',
      name: 'Describe',
      component: Describe
  }
  // 子组件中
  this.$route.params.id

  // 方案三
  // 父组件中
  this.$router.push({
      name: 'Describe',
      query: {
          id: id
      }
  })
  // router.js中
  {
      path: '/describe',
      name: 'Describe',
      component: Describe
  }

  //子组件中
  this.$route.query.id
```

注意: 传参是 this.$router, 接收参数是this.$route
注意: params 传参， push 里面只能是 name: 'xxxx', 不能是 path: '/xxx', 因为 params 只能用 name 来引入路由， 如果这里写成了 path， 接收参数页面会是 undefined。 query 的值携带在 url 刷新也不会丢失

## vue - router 的两种模式（ hash， history）

1.  hash 模式（ vue - router 默认 hash 模式）
    hash 模式背后的原理是 onhashchange 事件。（ localtion 是 js 里管理地址栏的内置对象， 是 window 对象的一部分， 可通过 window.localtion 访问， 在 w3cshool 里的详细介绍)

```js
window.onhashchange = function () {
  let hash = location.hash.slice(1);
  document.body.style.color = hash;
};
```

由于 hash 发生变化的 url 都会被浏览器记录下来， 使得浏览器的前进后退都可以使用了， 尽管浏览器没有亲求服务器， 但是页面状态和 url 关联起来。 后来人们称其为前端路由， 成为单页应用标配。 比如 http: //www.abc.com/#/index，hash 值为#/index。hash 模式的特点在于 hash 出现在 url 中，但是不会被包括在 HTTP 请求中，对后端没有影响，不会重新加载页面。

2.  history 模式
    history 模式利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。 MDN 相关介绍（ 需要特定浏览器支持）。 这两个方法应用于浏览器的历史记录栈， 提供了对历史记录进行修改的功能。 只是当他们进行修改时， 虽然修改了 url， 但浏览器不会立即向后端发送请求。
    当使用 history 模式时， url 就像正常的 url, 例如 http: //abc.com/user/id 相比 hash 模式更加好看。特别注意，history 模式需要后台配置支持。如果后台没有正确配置，访问时会返回 404。
    通过 history api， 我们丢弃了丑陋的 #， 但是有一个缺点， 当刷新时， 如果服务器中没有相应的相应或者资源， 会分分钟刷出一个 404 来（ 刷新需要请求服务器）。 所以 history 模式不怕前进， 不怕后退， 就怕刷新。

3.  hash 模式和 history 模式相比较

pushState() 设置的新 url 可与当前 url 一致， 这样也会把记录添加到栈中； hash 必须设置与当前 url 不同的 url 的， 才会触发动作将记录添加到栈中。
pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中； hash 只可添加短字符串。
pushState() 可额外设置 title 属性供后续使用。 不过， hash 模式也有比 history 模式优势的地方。
hash 模式下， 仅 hash 符号之前的 url 会被包含在请求中， 后端如果没有做到对路由的全覆盖， 也不会返回 404 错误。
history 模式下， 前端的 url 必须和实际向后端发起请求的 url 一致， 如 http: //abc.com/user/id,后端如果没有对 user/id 的路由处理，将返回 404 错误。

## vue 跳转新路由 滚动到固定位置

```js
export default new Router({
  // mode: 'history',  //可以去掉url中的#。但是打包后需要后台配置，否则会404
  routes: routerMap,
      // savedPosition 会在你使用浏览器前进或后退按钮时候生效
      // 这也是为什么我在 tab 栏结构中放入了一个 点击回退 的按钮
  scrollBehavior(to, from, savedPosition) {
    //设置回到顶部
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
});
```

## 动态路由匹配

(1)复用组件时，想对路由参数的变化作出响应的话，可以简单地 watch (监测变化) \$route 对象：

```js
const User = {
  template: "...",
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    },
  },
};
```

## 编程式的导航

```js
(1).router.push(location, onComplete ? , onAbort ? )
// 字符串
router.push('home')
// 对象
router.push({
    path: 'home'
})
// 命名的路由
router.push({
    name: 'user',
    params: {
        userId: '123'
    }
})
// 带查询参数，变成 /register?plan=private
router.push({
    path: 'register',
    query: {
        plan: 'private'
    }
})

// 如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。取而代之的是下面例子的做法，你需要提供路由的 name 或手写完整的带有参数的 path：
const userId = '123'
router.push({
    name: 'user',
    params: {
        userId
    }
}) // -> /user/123
router.push({
    path: `/user/${userId}`
}) // -> /user/123
// 这里的 params 不生效
router.push({
    path: '/user',
    params: {
        userId
    }
}) // -> /user

(2).router.replace(location, onComplete ? , onAbort ? )

(3).router.go(n)
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)
// 后退一步记录，等同于 history.back()
router.go(-1)
// 前进 3 步记录
router.go(3)
// 如果 history 记录不够用，那就默默地失败呗
router.go(-100)
router.go(100)
```

## 导航守卫

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 等待中。
每个守卫方法接收三个参数：
to: Route: 即将要进入的目标 路由对象
from: Route: 当前导航正要离开的路由
next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
确保要调用 next 方法，否则钩子就不会被 resolved。

```js
// 全局前置守卫
const router = new VueRouter({
    ...
})
router.beforeEach((to, from, next) => {
    // ...
})

// 全局后置钩子
router.afterEach((to, from) => {
    // ...
})

// 路由独享的守卫
const router = new VueRouter({
    routes: [{
        path: '/foo',
        component: Foo,
        beforeEnter: (to, from, next) => {
            // ...
        }
    }]
})

// 组件内的守卫
const Foo = {
    template: `...` ,
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate(to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
    }
}
//beforeRouteEnter 守卫 不能 访问 this， 因为守卫在导航确认前被调用, 因此即将登场的新组件还没被创建。 不过， 你可以通过传一个回调给 next来访问组件实例。 在导航被确认的时候执行回调， 并且把组件实例作为回调方法的参数。

beforeRouteEnter(to, from, next) {
    next(vm => {
        // 通过 `vm` 访问组件实例
    })
}

//注意 beforeRouteEnter 是支持给 next 传递回调的唯一守卫。 对于 beforeRouteUpdate 和 beforeRouteLeave 来说， this 已经可用了， 所以不支持传递回调， 因为没有必要了。

beforeRouteUpdate(to, from, next) {
    // just use `this`
    this.name = to.params.name
    next()
}

// 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。 该导航可以通过 next(false) 来取消。
beforeRouteLeave(to, from, next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
        next()
    } else {
        next(false)
    }
}
```

## 路由数据获取

```js
// (1)导航完成后获取数据
<template >
    <div class = "post" >
        <div v-if = "loading" class = "loading" >
            Loading...
        </div>

        <div v-if = "error" class = "error" > {{error}} </div>

        <div v-if = "post" class = "content" >
            <h2> {{post.title}} </h2>
            <p> {{post.body}} </p>
        </div>
    </div>
</template >
    export default {
        data() {
            return {
                loading: false,
                post: null,
                error: null
            }
        },
        created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.error = this.post = null
                this.loading = true
                // replace getPost with your data fetching util / API wrapper
                getPost(this.$route.params.id, (err, post) => {
                    this.loading = false
                    if (err) {
                        this.error = err.toString()
                    } else {
                        this.post = post
                    }
                })
            }
        }
    }

// (2)在导航完成前获取数据
export default {
    data() {
        return {
            post: null,
            error: null
        }
    },
    beforeRouteEnter(to, from, next) {
        getPost(to.params.id, (err, post) => {
            next(vm => vm.setData(err, post))
        })
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate(to, from, next) {
        this.post = null
        getPost(to.params.id, (err, post) => {
            this.setData(err, post)
            next()
        })
    },
    methods: {
        setData(err, post) {
            if (err) {
                this.error = err.toString()
            } else {
                this.post = post
            }
        }
    }
}
```

## 路由滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
注意: 这个功能只在支持 history.pushState 的浏览器中可用。
当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：

```js
const router = new VueRouter({
    routes: [...],
    scrollBehavior(to, from, savedPosition) {
        // return 期望滚动到哪个的位置
    }
})
```

scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

这个方法返回滚动位置的对象信息，长这样：
{ x: number, y: number }
{ selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)
如果返回一个 falsy (译者注：falsy 不是 false，参考这里)的值，或者是一个空对象，那么不会发生滚动。

```js
scrollBehavior(to, from, savedPosition) {
    return {
        x: 0,
        y: 0
    }
}

// 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：
scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
    } else {
        return {
            x: 0,
            y: 0
        }
    }
}

// 模拟“滚动到锚点”的行为：
scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
        return {
            selector: to.hash
        }
    }
}

// 异步滚动
scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                x: 0,
                y: 0
            })
        }, 500)
    })
}
```

## vue-router 完整的导航解析流程是什么？

1.  导航被触发；2. 在失活的组件里调用 beforeRouteLeave 守卫；3. 调用全局 beforeEach 守卫；4. 在复用组件里调用 beforeRouteUpdate 守卫；5. 调用路由配置里的 beforeEnter 守卫；6. 解析异步路由组件；7. 在被激活的组件里调用 beforeRouteEnter 守卫；8. 调用全局 beforeResolve 守卫；9. 导航被确认；10.. 调用全局的 afterEach 钩子；11. DOM 更新；12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
