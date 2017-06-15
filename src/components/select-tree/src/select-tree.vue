<template>
    <div class="el-select" v-clickoutside="handleClose">
        <div class="el-select-tags"  @click.stop="toogleMenu" ref="tags" :style="{'max-width':inputWidth - 32 + 'px'}">
            <transition-group @after-leave="resetInputHeight">
                <i-tag v-for="item in selected"
                    :key="item"
                    closable
                    :hit="item.hitState"
                    type="primary"
                    @close="deleteTag($event,item)"
                    close-transition>
                    {{item.currentLabel}}
                </i-tag>
            </transition-group>
            <input type="text"
                   class="el-select-input"
                   @focus="visible = true"
                   @keyup="managePlaceholder"
                   @keydown="resetInputState"
                   @keydown.esc.prevent="visible = false"
                   @keydown-delete="deletePrevTag"
                   v-model="query"
                   :debounce="remote ? 300 : 0"
                   v-if="filterable"
                   :style="{width:inputLength + 'px','max-width': inputWidth - 42 + 'px'}"
                   ref="input">
        </div>
        <i-input ref="reference"
                 v-model="selectLabel"
                 type="text"
                 :placeholder="currentPlaceholder"
                 :name="name"
                 :disabled="disabled"
                 :readonly="!filterable || multiple"
                 @focus="toogleMenu"
                 :icon="iconClass">
        </i-input>
        <transition>
            <i-select-tree-menu ref="popper" v-show="visible">
                <slot></slot>
            </i-select-tree-menu>
        </transition>
    </div>
</template>
<script>
    import Emitter from '../../../utils/emitter';
    import Locale from '../../../mixins/locale';
    import Clickoutside from '../../../utils/clickoutside';
    import Input from '../../input';
    import Tag from '../../tag';
    import SelectTreeMenu from './select-tree-menu';
    import debounce from 'throttle-debounce/debounce';
    import { addClass,removeClass,hasClass } from 'wind-dom/src/class';
    import { addResizeListener,removeResizeListener } from '../../../utils/resize-event';
    import { $t } from '../../../utils/locale';

    export default{
        name:'el-select-tree',
        componentName:'select-tree',
        mixins:[Emitter],
        computed:{
            iconClass(){
                return this.showCloseIcon ? 'circle-close' : (this.remote && this.filterable ? '' : 'caret-top')
            },
            debounce(){
                return this.remote ? 300 : 0;
            },
            showCloseIcon(){
                let criteria = this.clearable && this.inputHovering && !this.multiple && this.options.indexOf(this.selected) > -1;
                if(!this.$el){
                    return false;
                }

                let icon = this.$el.querySelector('.el-input-icon');
                if(icon){
                    if(criteria){
                        icon.addEventListener('click',this.deleteSelected);
                        addClass(icon,'is-show-close');
                    }else{
                        icon.removeEventListener('click',this.deleteSelected);
                        removeClass(icon,'is-show-close');
                    }
                }
                return criteria;
            }
        },
        props:{
            name:String,
            disabled:Boolean,
            filterable:Boolean,
            remote:Boolean,
            multiple:Boolean,
            placeholder:{
                type:String,
                default(){
                    return $t('el.select.placeholder');
                }
            }
        },
        data(){
            return {
                options:[],
                selected:[],
                selectLabel:'',
                query:'',
                inputLength:20,
                inputWidth:0,
                currentPlaceholder:'',
                visible:false
            }
        },
        directives:{Clickoutside},
        components:{
            'i-input':Input,
            'i-tag':Tag,
            'i-select-tree-menu':SelectTreeMenu
        },
        watch:{
            placeholder(val){
                this.currentPlaceholder = val;
            },
            visible(val){
                let icon = this.$el.querySelector('.el-input-icon');
                if(!val){
                    this.$refs.reference.$el.querySelector('input').blur();
                    if(icon){
                        removeClass(icon,'is-reverse');
                    }
                    this.broadcast('select-tree-menu','destroyPopper');
                    if(this.$refs.input){
                        this.$refs.input.blur();
                    }
                    this.resetHoverIndex();
                    if(!this.multiple){
                        if(this.selected && this.selected.value){
                            this.selectedLabel = this.selected.currentLabel;
                        }
                    }
                }else{
                    if(icon && !hasClass(icon,'el-icon-circle-close')){
                        addClass(icon,'is-reverse')
                    }
                    this.broadcast('select-tree-menu','updatePopper');

                }
            }
        },
        methods:{
            handleClose(){
              this.visible = false;
            },
            resetInputHeight(){
                this.$nextTick(() => {
                    let inputChildNodes = this.$refs.reference.$el.childNodes;
                    let input = [].filter.call(inputChildNodes,item => item.tagName === 'INPUT')[0];
                    input.style.height = Math.max(this.$refs.tags.clientHeight + 6,this.size === 'small' ? 28 : 36) + 'px';
                    this.broadcast('select-tree-menu','updatePopper');
                });
            },
            toogleMenu(){
                if(this.filterable && this.query === '' && this.visible){
                    return;
                }
                if(!this.disabled){
                    this.visible = !this.visible;
                }
            },
            managePlaceholder(){
                if(this.currentPlaceholder !== ''){
                    this.currentPlaceholder = this.$refs.input.value ? '' : this.cachedPlaceHolder;
                }
            },
            resetHoverIndex(){
                setTimeout(() => {
                   if(!this.multiple){
                       this.hoverIndex = this.options.indexOf(this.selected);
                   }else{
                       console.log(this.selected.length);
                       if(this.selected.length > 0){
                           this.hoverIndex = Math.min.apply(null,this.selected.map(item => this.options.indexOf(item)));
                       }else{
                           this.hoverIndex = 1;
                       }
                   }
                });
            },
            resetInputState(e){
                if(e.keyCode !== 8){
                    this.toggleLastOptionHitState(false);
                }
                this.inputLength = this.$refs.input.value.length * 15 + 20;
            },
            selectOption(){
                if(this.options[this.hoverIndex]){
                    this.handleOptionSelect(this.options[this.hoverIndex]);
                }
            },
            deletePrevTag(e){
                if(e.target.value.length <= 0 && !this.toggleLastOptionHitState()){
                    this.selected.pop();
                }
            },
            deleteTag(event,tag){
                let index = this.selected.indexOf(tag);
                if(index > -1){
                    this.selected.splice(index,1);
                }
                event.stopPropagation();
            },
            deleteSelected(event){
                event.stopPropagation();
                this.selected = {};
                this.selectedLabel = '';
                this.$emit('input','');
                this.$emit('change','');
                this.visible = false;
            },
            resetInputWidth(){
                this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
            },
            setData(data,checked){
                this.currentPlaceholder =''
                this.selected.push({currentLabel:data.label});
            }
        },
        created(){
            this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
            this.$on('set-data',this.setData)
        },
        mounted(){
            addResizeListener(this.$el,this.resetInputWidth)
        }
    }
</script>