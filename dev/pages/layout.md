<style lang="sass" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  &.mt20 {
    margin-bottom: -20px;

    .el-col {
      margin-bottom: 20px;
    }
  }
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
<code-demo-block>
<demo-block title="基本布局" desc="使用单一分栏创建基础的栅格布局。">
    <i-row>
        <i-col :span="24">
            <div class="grid-content bg-purple-dark"></div>
        </i-col>
    </i-row>
    <i-row>
        <i-col :span="12"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="12"><div class="grid-content bg-purple-light"></div></i-col>
    </i-row>
    <i-row>
        <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="8"><div class="grid-content bg-purple-light"></div></i-col>
        <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row>
        <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
        <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
    </i-row>
    <i-row>
        <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
    </i-row>
</demo-block>
<div slot="highlight">
  <div class="description">
    <p>通过 row 和 col 组件，并通过 col 组件的 <code>span</code> 属性我们就可以自由地组合布局。</p>
  </div>

  ```xml
    <i-row>
        <i-col :span="24">
            <div class="grid-content bg-purple-dark"></div>
        </i-col>
    </i-row>
    <i-row>
        <i-col :span="12"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="12"><div class="grid-content bg-purple-light"></div></i-col>
    </i-row>
    <i-row>
        <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="8"><div class="grid-content bg-purple-light"></div></i-col>
        <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row>
        <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
        <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
    </i-row>
    <i-row>
        <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
        <i-col :span="4"><div class="grid-content bg-purple-light"></div></i-col>
    </i-row>
  ```

  ```css
    <style>
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
        &.mt20 {
          margin-bottom: -20px;
          .el-col {
            margin-bottom: 20px;
          }
        }
      }
      .bg-purple-dark {
        background: #99a9bf;
      }
      .bg-purple {
        background: #d3dce6;
      }
      .bg-purple-light {
        background: #e5e9f2;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }
      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }
    </style>
  ```
</div>
</code-demo-block>
<code-demo-block>
  <demo-block title="分栏间隔" desc="分栏之间存在间隔">
    <i-row :gutter="20">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
  </demo-block>
  <div slot="highlight">
  <div class="description">
    <p>Row 组件 提供 <code>gutter</code> 属性来指定每一栏之间的间隔，默认间隔为 0。</p>
  </div>

  ```xml
    <i-row :gutter="20">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
  ```
  </div>
</code-demo-block>
<code-demo-block>
  <demo-block title="混合布局" desc="通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。">
  <i-row :gutter="20">
    <i-col :span="16"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
  </i-row>
  <i-row :gutter="20">
    <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
  </i-row>
  <i-row :gutter="20">
    <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="16"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
  </i-row>
</demo-block>
<div slot="highlight">
  
```xml
  <i-row :gutter="20">
    <i-col :span="16"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
  </i-row>
  <i-row :gutter="20">
    <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="8"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
  </i-row>
  <i-row :gutter="20">
    <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="16"><div class="grid-content bg-purple"></div></i-col>
    <i-col :span="4"><div class="grid-content bg-purple"></div></i-col>
  </i-row>
```
</div>
</code-demo-block>
<code-demo-block>
  <demo-block title="分栏偏移" desc="支持偏移指定的栏数">
    <i-row :gutter="20" class="mt20">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row :gutter="20">
      <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row :gutter="20">
      <i-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
  </demo-block>
  
  <div slot="highlight">
    <div class="description">
      <p>通过制定 col 组件的 <code>offset</code> 属性可以指定分栏偏移的栏数</p>
    </div>

  ```xml
    <i-row :gutter="20">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row :gutter="20">
      <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row :gutter="20">
      <i-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
  ```
  </div>
</code-demo-block>
<code-demo-block>
  <demo-block title="对齐方式" desc="对分栏进行灵活的对齐。">
    <i-row type="flex" class="row-bg">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row type="flex" class="row-bg" justify="center">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row type="flex" class="row-bg" justify="end">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row type="flex" class="row-bg" justify="space-between">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row type="flex" class="row-bg" justify="space-around">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
  </demo-block>
  <div slot="highlight">

  ```xml
    <i-row type="flex" class="row-bg">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row type="flex" class="row-bg" justify="center">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row type="flex" class="row-bg" justify="end">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row type="flex" class="row-bg" justify="space-between">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
    <i-row type="flex" class="row-bg" justify="space-around">
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple-light"></div></i-col>
      <i-col :span="6"><div class="grid-content bg-purple"></div></i-col>
    </i-row>
  ```
  </div>
</code-demo-block>


  ### Row Attributes
| 属性    | 说明                                  | 类型   | 可选值                                      | 默认值 |
| ------- | ------------------------------------- | ------ | ------------------------------------------- | ------ |
| gutter  | 栅格间隔                              | number | —                                          | 0      |
| type    | 布局模式，可选 flex，现代浏览器下有效 | string | —                                          | —     |
| justify | flex 布局下的水平排列方式             | string | start/end/center/space-around/space-between | start  |
| align   | flex 布局下的垂直排列方式             | string | top/middle/bottom                           | top    |
| tag     | 自定义元素标签                        | string | *                                           | div    |

### Col Attributes
| 参数   | 说明                                 | 类型                                        | 可选值 | 默认值 |
| ------ | ------------------------------------ | ------------------------------------------- | ------ | ------ |
| span   | 栅格占据的列数                       | number                                      | —     | 24     |
| offset | 栅格左侧的间隔格数                   | number                                      | —     | 0      |
| push   | 栅格向右移动格数                     | number                                      | —     | 0      |
| pull   | 栅格向左移动格数                     | number                                      | —     | 0      |
| xs     | <768px 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —     | —     |
| sm     | ≥768px 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —     | —     |
| md     | ≥992px 响应式栅格数或者栅格属性对象  | number/object (例如： {span: 4, offset: 4}) | —     | —     |
| lg     | ≥1200px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | —     | —     |
| xl     | ≥1920px 响应式栅格数或者栅格属性对象 | number/object (例如： {span: 4, offset: 4}) | —     | —     |
| tag    | 自定义元素标签                       | string                                      | *      | div    |

