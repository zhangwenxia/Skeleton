### 骨架屏使用

#### Demo 地址 http://www.perfecting.top/

- 引入注册组件

```
import skeletonPugin from './components/Skeleton'
Vue.use(skeletonPugin)
```

- 引入 css

```
 import './components/Skeleton/style/style.css'
 或
 import './components/Skeleton/style/style.scss'
 或
 import './components/Skeleton/style/style.less'
```

## Props

| 参数         |                                                                                                            说明                                                                                                            |              类型 |                            可选值                            |  默认值   |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------: | :----------------------------------------------------------: | :-------: |
| loading      |                                                                                       是否显示占位图，传 `false` 时会展示子组件内容                                                                                        |           boolean |                              --                              |  `false`  |
| type         |                                                                                                         占位图类型                                                                                                         |            string | `default / avatar / table / card / iconGrid / grid / banner` | `default` |
| animate      |                                                                                                        是否开启动画                                                                                                        |           boolean |                              --                              |  `true`   |
| avatar-size  |                                                                                           图像大小（当 type 为 `avatar` 时可用）                                                                                           | `string / number` |                              --                              |   `30`    |
| avatar-type  |                                                                                     占位图像形状 (当 type 为 `avatar、grid,iconGrid` )                                                                                     |            string |                       `square / round`                       |  `round`  |
| placement    |                                                                                         图像放置位置 当 type 为 `avatar` 时可用）                                                                                          |            string |                        `left / right`                        |  `left`   |
| rows         |                                                                                                         占位图行数                                                                                                         |            number |                              --                              |    `1`    |
| rows-options | 占位图行参数、可传递数组或者包含 `width、height`设置的数组对象。当 type 为`default / avatar`时可对每一行进行单独设置（`例如 [{width:'15px',height:'30px'},...]`），其余只需要设宽高（`例如 {width:'15px',height:'30px'}`） |  `array / object` |                              --                              |   `--`    |
| cols         |                                                                                                         占位图列数                                                                                                         |            number |                              --                              |    `4`    |
