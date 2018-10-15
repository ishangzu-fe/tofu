<template>
    <transition name="md-fade-bottom">
        <div class="el-table-filter" v-if="multiple" v-show="showPopper">
            <div class="el-table-filter-content">
                <i-checkbox-group class="el-table-filter-checkbox-group" v-model="filteredValue" v-if="filterComponent === 'checkbox'">
                    <i-checkbox
                            v-for="(filter, key) in filters"
                            :label="filter.value"
                            :key="key">{{ filter.text }}</i-checkbox>
                </i-checkbox-group>
                <i-input v-if="filterComponent === 'input'" v-model="filteredVal"></i-input>
                <i-date-picker v-if="filterComponent === 'date'" type="date" placeholder="选择日期" v-model="filteredVal"></i-date-picker>
            </div>
            <div class="el-table-filter-bottom">
                <button @click="handleConfirm"
                        >{{ $t('el.table.confirmFilter') }}</button>
                <button @click="handleReset">{{ $t('el.table.resetFilter') }}</button>
            </div>
        </div>
        <div class="el-table-filter" v-else v-show="showPopper">
            <ul class="el-table-filter-list">
                <li class="el-table-filter-list-item"
                    :class="{ 'is-active': !filterValue }"
                    @click="handleSelect(null)">{{ $t('el.table.clearFilter') }}</li>
                <li class="el-table-filter-list-item"
                    v-for="(filter, key) in filters"
                    :label="filter.value"
                    :class="{ 'is-active': isActive(filter) }"
                    @click="handleSelect(filter.value)"
                    :key="key">{{ filter.text }}</li>
            </ul>
        </div>
    </transition>
</template>

<script type="text/babel">
    import Popper from '../../../utils/vue-popper';
    import Locale from '../../../mixins/locale';
    import Clickoutside from '../../../utils/clickoutside';
    import Dropdown from './dropdown';
    import {Checkbox,CheckboxGroup} from '../../checkbox';
    import Input from '../../input';
    import DatePicker from '../../date-picker/src/picker/date-picker'


    export default {
        name: 'el-table-filter-panel',

        mixins: [Popper, Locale],

        directives: {
            Clickoutside
        },

        components: {
            'i-checkbox':Checkbox,
            'i-checkbox-group':CheckboxGroup,
            'i-input':Input,
            'i-date-picker':DatePicker
        },

        props: {
            placement: {
                type: String,
                default: 'bottom-end'
            }
        },

        customRender(h) {
            return (<div class="el-table-filter">
                <div class="el-table-filter-content">
                </div>
                <div class="el-table-filter-bottom">
                    <button on-click={ this.handleConfirm }>{ this.$t('el.table.confirmFilter') }</button>
                    <button on-click={ this.handleReset }>{ this.$t('el.table.resetFilter') }</button>
                </div>
            </div>);
        },

        methods: {
            isActive(filter) {
                return filter.value === this.filterValue;
            },

            handleOutsideClick() {
                if(!arguments[0]){
                    this.showPopper = false;
                }
            },

            handleConfirm() {
                if(this.filterComponent !== 'checkbox'){
                    this.filteredValue.push(this.filteredVal);
                }
                this.confirmFilter(this.filteredValue);

                this.handleOutsideClick();
            },

            handleReset() {
                this.filteredValue = [];
                this.filteredVal = '';
                this.confirmFilter(this.filteredValue);
                this.handleOutsideClick();
            },

            handleSelect(filterValue) {
                this.filterValue = filterValue;

                if (filterValue) {
                    this.confirmFilter(this.filteredValue);
                } else {
                    this.confirmFilter([]);
                }

                this.handleOutsideClick();
            },

            confirmFilter(filteredValue) {
                this.table.store.commit('filterChange', {
                    column: this.column,
                    values: filteredValue
                });
            }
        },

        data() {
            return {
                table: null,
                cell: null,
                column: null
            };
        },

        computed: {
            filters() {
                return this.column && this.column.filters;
            },

            filterComponent(){
                return this.column && this.column.filterComponent;
            },

            filterValue: {
                get() {
                    return (this.column.filteredValue || [])[0];
                },
                set(value) {
                    if (this.filteredValue) {
                        if (value) {
                            this.filteredValue.splice(0, 1, value);
                        } else {
                            this.filteredValue.splice(0, 1);
                        }
                    }
                }
            },

            filteredValue: {
                get() {
                    if (this.column) {
                        return this.column.filteredValue || [];
                    }
                    return [];
                },
                set(value) {
                    if (this.column) {
                        this.column.filteredValue = value;
                    }
                }
            },

            filteredVal:{
                get(){
                    if(this.column){
                        return this.column.filteredVal || '';
                    }
                    return '';
                },
                set(value){
                    if(this.column){
                        this.column.filteredVal = value
                    }
                }
            },
            multiple() {
                if (this.column) {
                    return this.column.filterMultiple;
                }
                return true;
            }
        },

        mounted() {
            this.popperElm = this.$el;
            this.referenceElm = this.cell;
            this.table.$refs.bodyWrapper.addEventListener('scroll', () => {
                this.updatePopper();
            });

            this.$watch('showPopper', (value) => {
                if (this.column) this.column.filterOpened = value;
                if (value) {
                    Dropdown.open(this);
                } else {
                    Dropdown.close(this);
                }
            });
        }
    };
</script>
