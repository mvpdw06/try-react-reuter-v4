# React-Router v4 之路

Egghead Online Course: [Add routing to React apps using React Router v4](https://egghead.io/courses/add-routing-to-react-apps-using-react-router-v4)

![image](https://rawgit.com/mvpdw06/try-react-router-v4/master/img/reactrouterv4.png)

## Current on Class

> All missions completed!

## Install

```
$ yarn add react-router-dom
```

## API 介紹

```
import { 
    BrowserRouter as Router, 
    Route,
    Link,
    NavLink,
    Switch
} from 'react-router-dom'

```

- Router 種類
    - BrowserRouter：定義 App Router 範圍限制，讓 Router 可以 support HTML5 API.

        ```
        <BrowserRouter forceRefresh={needForceRefresh}>
            // Some Route here.
        </BrowserRouter>
        ```

        forceRefresh 需 return 布林，若為 true 則會重新 render 整個 App，為 false 就走原本的 Router 規則（不重新 render）。

    - HashRouter：定義 App Router 為 Hash

        ```
        <HashRouter hashType="slash">
            // Some Route here.
        </HashRouter>
        ```

        hashType:
            - slash：用 '/' 來區隔所有路由 
            - noslash：與 slash 相反
            - hashbang：會加上 '!' 在 # 之後，原本目的為 ajax crawlable（讓 Google 可以抓取 server side 來的資料），但目前已經被 Google 棄用。

    - MemoryRouter：定義 App 路由記憶在 Memory 中，當 Route 改變時，不改變 URL，適用於測試或是非瀏覽器環境（React-Native）

        ```
        <MemoryRouter 
            initialEntries={['/', '/about']}
            initialIndex={1}>
            // Some Route here.
        </MemoryRouter>
        ```

        - initialEntries：陣列定義進入點 Router
        - initialIndex：定義目前需要的進入點

    - StaticRouter：永遠不改變 URL 的 Router，通常用於 server-side rendering.

        location 指定 server-side 給的路由，並不能被改變。

    - NativeRouter：提供 React-Native 的 App Router

- Route：定義每種路由
    > 可指定 component / JSX / children(較特殊)

    - path 使用正規表示式引擎，尋找 URL pattern
    - exact: 表示 IndexRoute
    - strict: 絕對 ULR pattern(避免 / 在最後面)

    注意：exact 不能被用在巢狀路由當中，否則會永遠 match 不到

    > 沒有定義 path 就會永遠被 render

    三種方法可以 render:

        - component: render Component
        - render: render JSX
        - children: render children, but you can use match parameter in props to avoid be render.
    
    注意：若 render 使用 component 又給 inline-function (JSX) 會有 re-mount 問題，因為會被送進 React.createElement 方法當中。

    > children 官方提供一種情境有可能會用到，就在用到 Animate 物件的時候，動畫永遠要 render，但裡面的 Component 不一定會一直需要 render，這種情境就有可能會用到！

- Link：導覽到 URL / {{pathname: '{string}', search: '{string}'}}
    > replace: 會取代目前的瀏覽器記錄！

- NavLink：可以控制 className 或是 style 版本的 Link
    > 只能 match pathname, 不能 search

- Switch：讓 URL 只會 map 到第一個
    
    - 不要把 Link 包在裡面，會有問題

    > 通常會拿來做特殊頁面（404, authenticate..., error page）


## Parameter

利用 ':' 定義為 parameter，通常為必填，後方加上 ? 則為可選，定義了 parameter 而 match 到的 component 會有 props.match.params 可使用！

範例：
```
<Route path='/param/:first/:second?' render={({ match }) => (
    <h1>
        Get Parameter: {match.params.first || 'first'} <br />
        Second: {match.params.second}
    </h1>
    )} />
```

而 parameter 可接上 '()' 用正規表示式來做 parameter 的驗證，若沒通過則不會被 match 到！

## Search

在 match 中找不到，但 location 中的 search 會有！並可用 new URLSearchParams(location.search).get('id') 的方式來取 search 的值！

> 注意！search 無法被 NavLink 所 match active.

## Route 可以被拆解為任意的 Component

- 範例：請看 RouteSplit.js
- 優點：自由定義 App 路由，可被 Element / className / Component 包裝。

## 巢狀式路由(堆疊路由)

- 範例：請看 NestedRoute.js
- 優點：拆分路由定義，常用於 Menu 或是 Side Bar。

## Redirect 轉址

- 範例：請看 RedirectRoute.js
- 如果把 Redirect 作為一個 Route 用，則需搭配 Switch 使用才能 match 到正確的路由
- 不使用 Switch，則可以把 Redirect 作為一個 Component 或是 JSX 來使用，達到轉址的效果
- Authentication 搭配 Redirect 保護需驗證頁面

## Prompt 離開頁面提示

- 範例：請看 Prompt.js
- 定義在路由 match 到的 Component 中
    - message：提示離開頁面確認的 confirm 頁面
    - when：設定要「出現提示」的 condition

## history 物件

```
$ npm install history
```

### usage

```
// history.js
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
module.exports = history;


// App.js
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from 'react-router-dom';
import history from './history';

// Router setting
<Router history={history} >
</Router>

// Match component
const HomeComponent = ({ match, location, history }) => (
    <div>
        <h1>Home Page.</h1>
        <button onClick={() => history.push('/')}>Go back to home</button>
        <button onClick={() => history.replace('/about')}>Go to About page and replace current page history</button>
        <button onClick={history.goBack}>Go back to previous page</button>
    </div>
)

const HomeComponentWithRouter = withRouter(HomeComponent);
```

### 如果你使用 redux，需要 connect 與 withRouter 一起用的時候

```
// This gets around shouldComponentUpdate
withRouter(connect(...)(MyComponent))

// This does not
connect(...)(withRouter(MyComponent))
```