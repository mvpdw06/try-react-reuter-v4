# React-Router v4 之路

Egghead Online Course: [Add routing to React apps using React Router v4](https://egghead.io/courses/add-routing-to-react-apps-using-react-router-v4)

![image](https://rawgit.com/mvpdw06/try-react-router-v4/master/img/reactrouterv4.png)

## Current on Class

> Render Multiple Components for the Same Route in React Router v4

## Install

```
$ yarn add react-router-dom
```

## API

```
import { 
    BrowserRouter as Router, 
    Route,
    Link,
    NavLink,
    Switch
} from 'react-router-dom'

```

- BrowserRouter：定義 App Router 範圍限制
- Route：定義每種路由
    > 可指定 component / JSX / children(較特殊)

    - path 使用正規表示式引擎，尋找 URL pattern
    - exact: 表示 IndexRoute
    - strict: 絕對 ULR pattern(避免 / 在最後面)

    > 沒有定義 path 就會永遠被 render

    三種方法可以 render:

        - component: render Component
        - render: render JSX
        - children: render children, but you can use match parameter in props to avoid be render.

- Link：導覽到 URL / {{pathname: '{string}', search: '{string}'}}
    > replace: 會取代目前的瀏覽器記錄！

- NavLink：可以控制 className 或是 style 版本的 Link
    > 只能 match pathname, 不能 search

- Switch：讓 URL 只會 map 到第一個
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