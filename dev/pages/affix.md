
<div class="affix">
<code-demo-block>
<demo-block title="固定在顶部">
    <i-affix>
        <i-button>顶部</i-button>
    </i-affix>
</demo-block>
    <div slot="highlight">

```xml
    <i-affix>
        <i-button>顶部</i-button>
    </i-affix>
```
</div>
</code-demo-block>
<code-demo-block>
<demo-block title="固定在距离顶部50px的位置">
    <i-affix :offset-top="50" @change="change">
        <i-button>顶部50px</i-button>
    </i-affix>
</demo-block>
<div slot="highlight">

```xml
    <i-affix :offset-top="50" @change="change">
        <i-button>顶部50px</i-button>
    </i-affix>

    <script>
        export default {
            methods:{
                change(status){
                    this.$message('悬浮状态:' + status)
                }
            }
        }
    </script>
```
</div>
</code-demo-block>

### Attributes
| 参数   | 说明                                 | 类型                                        | 可选值 | 默认值 |
| ------ | ------------------------------------ | ------------------------------------------- | ------ | ------ |
| offset-top | 距离顶部的距离                    | number                                      | —     | 0    |

### Events
| 事件名称   | 说明                                 | 回调函数                                      |
| ------ | ------------------------------------ | ------------------------------------------- |
| change | 当悬浮状态更改时触发                   | -                                      |

</div>
<script>
    export default {
        methods:{
            change(status, a, b){
                this.$message('悬浮状态:' + status)
            }
        }
    }
</script>
<style lang="sass" scoped>
    .affix {
        height: 2000px;
    }
</style>