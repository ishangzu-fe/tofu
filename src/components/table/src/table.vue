<template>
    <div class="el-table"
         :class="{
            'el-table-fit': fit,
            'el-table-striped': stripe,
            'el-table-border': border,
            'el-table-fluid-height': maxHeight,
            'el-table-enable-row-hover': !store.states.isComplex,
            'el-table-enable-row-transition': true || (store.states.data || []).length !== 0 && (store.states.data || []).length < 100
         }"
         @mouseleave="handleMouseLeave($event)">
        <div class="hidden-columns" ref="hiddenColumns"><slot></slot></div>
        <div
            class="el-table-header-wrapper"
            ref="headerWrapper"
            v-mousewheel="handleHeaderFooterMousewheel"
            v-if="showHeader">
                <table-header :store="store"
                            :layout="layout"
                            :border="border"
                            :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }">
                </table-header>
        </div>
        <div
            class="el-table-body-wrapper"
            ref="bodyWrapper"
            :class="[layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
            :style="[bodyHeight]">
                <table-body :context="context"
                            :store="store"
                            :layout="layout"
                            :row-class-name="rowClassName"
                            :row-style="rowStyle"
                            :highlight="highlightCurrentRow"
                            :style="{ width: layout.bodyWidth ? layout.bodyWidth - (layout.scrollY ? layout.gutterWidth : 0 ) + 'px' : '' }">
                </table-body>
            <div class="el-table-empty-block" v-if="!data || data.length === 0">
                <span class="el-table-empty-text"><slot name="empty">{{ emptyText || $t('el.table.emptyText') }}</slot></span>
            </div>
        </div>
        <div
            class="el-table__footer-wrapper"
            ref="footerWrapper"
            v-if="showSummary"
            v-mousewheel="handleHeaderFooterMousewheel"
            v-show="data && data.length > 0">
                <table-footer
                    :store="store"
                    :layout="layout"
                    :border="border"
                    :sum-text="sumText || $t('el.table.sumText')"
                    :summary-method="summaryMethod"
                    :default-sort="defaultSort"
                    :style="{ width: layout.bodyWidth ? layout.bodyWidth + 'px' : '' }">
                </table-footer>
        </div>
        <div
            class="el-table-fixed"
            v-mousewheel="handleFixedMousewheel"
            ref="fixedWrapper"
            v-if="fixedColumns.length > 0"
            :style="[{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }, fixedHeight, { bottom: 0 + 'px' }, { overflow: 'hidden' }]">
            <div class="el-table-fixed-header-wrapper" ref="fixedHeaderWrapper" v-if="showHeader">
                <table-header fixed="left"
                              :border="border"
                              :store="store"
                              :layout="layout"
                              :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }"></table-header>
            </div>
            <div class="el-table-fixed-body-wrapper"
                 ref="fixedBodyWrapper"
                 :style="[
                    { top: layout.headerHeight + 'px' },
                    fixedBodyHeight]">
                <table-body fixed="left"
                            :store="store"
                            :layout="layout"
                            :highlight="highlightCurrentRow"
                            :row-class-name="rowClassName"
                            :row-style="rowStyle"
                            :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }">
                </table-body>
            </div>
            <div
                class="el-table__fixed-footer-wrapper"
                ref="fixedFooterWrapper"
                v-if="showSummary"
                v-show="data && data.length > 0">
                    <table-footer
                    fixed="left"
                    :border="border"
                    :sum-text="sumText || $t('el.table.sumText')"
                    :summary-method="summaryMethod"
                    :store="store"
                    :layout="layout"
                    :style="{ width: layout.fixedWidth ? layout.fixedWidth + 'px' : '' }">
                    </table-footer>
            </div>
        </div>
        <div
            class="el-table-fixed-right"
            v-mousewheel="handleFixedMousewheel"
            ref="rightFixedWrapper"
            v-if="rightFixedColumns.length > 0"
            :style="[
                { width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' },
                { right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 1)) + 'px' : '' },
                fixedHeight, { bottom: 0 + 'px' }, { overflow: 'hidden' }]">
            <div class="el-table-fixed-header-wrapper" ref="rightFixedHeaderWrapper" v-if="showHeader">
                <table-header fixed="right"
                              :border="border"
                              :store="store"
                              :layout="layout"
                              :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }">
                </table-header>
            </div>
            <div class="el-table-fixed-body-wrapper" ref="rightFixedBodyWrapper"
                 :style="[
                    { top: layout.headerHeight + 'px' },
                    fixedBodyHeight]">
                <table-body fixed="right"
                            :store="store"
                            :layout="layout"
                            :row-class-name="rowClassName"
                            :row-style="rowStyle"
                            :highlight="highlightCurrentRow"
                            :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }">
                </table-body>
            </div>
            <div
                class="el-table__fixed-footer-wrapper"
                ref="rightFixedFooterWrapper"
                v-if="showSummary"
                v-show="data && data.length > 0">
                    <table-footer
                    fixed="right"
                    :border="border"
                    :sum-text="sumText || $t('el.table.sumText')"
                    :summary-method="summaryMethod"
                    :store="store"
                    :layout="layout"
                    :style="{ width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '' }">
                    </table-footer>
            </div>
        </div>
        <div class="el-table-fixed-right-patch"
             v-if="rightFixedColumns.length > 0"
             :style="{ width: layout.scrollY ? layout.gutterWidth + 'px' : '0', height: layout.headerHeight + 'px' }"></div>
        <div class="el-table-column-resize-proxy" ref="resizeProxy" v-show="resizeProxyVisible"></div>
    </div>
</template>


<script type="text/babel">
import ElCheckbox from "../../checkbox/src/checkbox";
import Migrating from "../../../mixins/migrating";
import throttle from "throttle-debounce/throttle";
import debounce from "throttle-debounce/debounce";
import {
    addResizeListener,
    removeResizeListener
} from "../../../utils/resize-event";
import Mousewheel from "../../../directives/mousewheel";
import Locale from "../../../mixins/locale";
import TableStore from "./table-store";
import TableLayout from "./table-layout";
import TableBody from "./table-body";
import TableHeader from "./table-header";
import TableFooter from "./table-footer";
// import { mousewheel } from "./util";

let tableIdSeed = 1;

export default {
    name: "el-table",

    mixins: [Migrating, Locale],

    directives: {
        Mousewheel
    },

    props: {
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },

        width: [String, Number],

        height: [String, Number],

        maxHeight: [String, Number],

        fit: {
            type: Boolean,
            default: true
        },

        stripe: Boolean,

        border: Boolean,

        rowKey: [String, Function],

        context: {},

        showHeader: {
            type: Boolean,
            default: true
        },

        showSummary: Boolean,

        sumText: String,

        summaryMethod: Function,

        rowClassName: [String, Function],

        rowStyle: [Object, Function],

        highlightCurrentRow: Boolean,

        emptyText: String,

        spanMethod: Function,

        headerCellClassName: [String, Function],

        headerCellStyle: [Object, Function],

        defaultSort: Object
    },

    components: {
        TableHeader,
        TableFooter,
        TableBody,
        ElCheckbox
    },

    methods: {
        getMigratingConfig() {
            return {
                props: {
                    "allow-no-selection":
                        "Table: allow-no-selection has been removed.",
                    "selection-mode": "Table: selection-mode has been removed.",
                    "fixed-column-count":
                        "Table: fixed-column-count has been removed. Use fixed prop in TableColumn instead.",
                    "custom-criteria":
                        "Table: custom-criteria has been removed. Use row-class-name instead.",
                    "custom-background-colors":
                        "custom-background-colors has been removed. Use row-class-name instead."
                },
                events: {
                    selectionchange:
                        "Table: selectionchange has been renamed to selection-change.",
                    cellmouseenter:
                        "Table: cellmouseenter has been renamed to cell-mouse-enter.",
                    cellmouseleave:
                        "Table: cellmouseleave has been renamed to cell-mouse-leave.",
                    cellclick:
                        "Table: cellclick has been renamed to cell-click."
                }
            };
        },

        toggleRowSelection(row, selected) {
            this.store.toggleRowSelection(row, selected);
            this.store.updateAllSelected();
        },

        clearSelection() {
            this.store.clearSelection();
        },

        handleMouseLeave() {
            this.store.commit("setHoverRow", null);
            if (this.hoverState) this.hoverState = null;
        },

        updateScrollY() {
            this.layout.updateScrollY();
        },

        handleFixedMousewheel(event, data) {
            const bodyWrapper = this.bodyWrapper;
            if (Math.abs(data.spinY) > 0) {
                const currentScrollTop = bodyWrapper.scrollTop;
                if (data.pixelY < 0 && currentScrollTop !== 0) {
                    event.preventDefault();
                }
                if (
                    data.pixelY > 0 &&
                    bodyWrapper.scrollHeight - bodyWrapper.clientHeight >
                        currentScrollTop
                ) {
                    event.preventDefault();
                }
                bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
            } else {
                bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
            }
        },

        handleHeaderFooterMousewheel(event, data) {
            const { pixelX, pixelY } = data;
            if (Math.abs(pixelX) >= Math.abs(pixelY)) {
                event.preventDefault();
                this.bodyWrapper.scrollLeft += data.pixelX / 5;
            }
        },

        bindEvents() {
            const { headerWrapper, footerWrapper } = this.$refs;
            const refs = this.$refs;
            let self = this;

            this.bodyWrapper.addEventListener("scroll", function() {
                if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
                if (footerWrapper) footerWrapper.scrollLeft = this.scrollLeft;
                if (refs.fixedBodyWrapper)
                    refs.fixedBodyWrapper.scrollTop = this.scrollTop;
                if (refs.rightFixedBodyWrapper)
                    refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
                const maxScrollLeftPosition =
                    this.scrollWidth - this.offsetWidth - 1;
                const scrollLeft = this.scrollLeft;
                if (scrollLeft >= maxScrollLeftPosition) {
                    self.scrollPosition = "right";
                } else if (scrollLeft === 0) {
                    self.scrollPosition = "left";
                } else {
                    self.scrollPosition = "middle";
                }
            });

            if (this.fit) {
                addResizeListener(this.$el, this.resizeListener);
            }
        },

        resizeListener() {
            if (!this.$ready) return;
            let shouldUpdateLayout = false;
            const el = this.$el;
            const { width: oldWidth, height: oldHeight } = this.resizeState;

            const width = el.offsetWidth;
            if (oldWidth !== width) {
                shouldUpdateLayout = true;
            }

            const height = el.offsetHeight;
            if (
                (this.height || this.shouldUpdateHeight) &&
                oldHeight !== height
            ) {
                shouldUpdateLayout = true;
            }

            if (shouldUpdateLayout) {
                this.resizeState.width = width;
                this.resizeState.height = height;
                this.doLayout();
            }
        },

        doLayout() {
            this.store.updateColumns();
            this.layout.update();
            this.updateScrollY();
            this.$nextTick(() => {
                if (this.height) {
                    this.layout.setHeight(this.height);
                } else if (this.maxHeight) {
                    this.layout.setMaxHeight(this.maxHeight);
                } else if (this.shouldUpdateHeight) {
                    this.layout.updateHeight();
                }
            });
        }
    },

    created() {
        this.tableId = "el-table_" + tableIdSeed + "_";
        this.debouncedLayout = debounce(50, () => this.doLayout());
    },

    computed: {
        shouldUpdateHeight() {
            return (
                typeof this.height === "number" ||
                this.fixedColumns.length > 0 ||
                this.rightFixedColumns.length > 0
            );
        },

        bodyWrapper() {
            return this.$refs.bodyWrapper;
        },

        selection() {
            return this.store.selection;
        },

        columns() {
            return this.store.states.columns;
        },

        tableData() {
            return this.store.states.data;
        },

        fixedColumns() {
            return this.store.states.fixedColumns;
        },

        rightFixedColumns() {
            return this.store.states.rightFixedColumns;
        },

        bodyHeight() {
            let style = {};

            if (this.height) {
                style = {
                    height: this.layout.bodyHeight
                        ? this.layout.bodyHeight + "px"
                        : ""
                };
            } else if (this.maxHeight) {
                style = {
                    "max-height":
                        (this.showHeader
                            ? this.maxHeight -
                              this.layout.headerHeight -
                              this.layout.footerHeight
                            : this.maxHeight - this.layout.footerHeight) + "px"
                };
            }

            return style;
        },

        fixedBodyHeight() {
            let style = {};

            if (this.height) {
                style = {
                    height: this.layout.fixedBodyHeight
                        ? this.layout.fixedBodyHeight + "px"
                        : ""
                };
            } else if (this.maxHeight) {
                let maxHeight = this.layout.scrollX
                    ? this.maxHeight - this.layout.gutterWidth
                    : this.maxHeight;

                if (this.showHeader) {
                    maxHeight -= this.layout.headerHeight;
                }

                maxHeight -= this.layout.footerHeight;

                style = {
                    "max-height": maxHeight + "px"
                };
            }

            return style;
        },

        fixedHeight() {
            let style = {};

            if (this.maxHeight) {
                style = {
                    bottom:
                        this.layout.scrollX && this.data.length
                            ? this.layout.gutterWidth + "px"
                            : ""
                };
            } else {
                style = {
                    height: this.layout.viewportHeight
                        ? this.layout.viewportHeight + "px"
                        : ""
                };
            }

            return style;
        }
    },

    watch: {
        height(value) {
            this.layout.setHeight(value);
        },

        data: {
            immediate: true,
            handler(val) {
                this.store.commit("setData", val);
            }
        }
    },

    destroyed() {
        if (this.windowResizeListener)
            removeResizeListener(this.$el, this.windowResizeListener);
    },

    mounted() {
        this.bindEvents();
        this.doLayout();

        this.resizeState = {
            width: this.$el.offsetWidth,
            height: this.$el.offsetHeight
        };

        this.$ready = true;
    },

    data() {
        const store = new TableStore(this, {
            rowKey: this.rowKey
        });
        const layout = new TableLayout({
            store,
            table: this,
            fit: this.fit,
            showHeader: this.showHeader
        });
        return {
            store,
            layout,
            resizeProxyVisible: false,
            resizeState: {
                width: null,
                height: null
            },
            scrollPosition: "left"
        };
    }
};
</script>
