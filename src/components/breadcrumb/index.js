import ElBreadcrumb from './src/breadcrumb';
import ElBreadcrumbItem from './src/breadcrumb-item';

/* istanbul ignore next */
ElBreadcrumb.install = function(Vue) {
  Vue.component('i-breadcrumb', ElBreadcrumb);
  Vue.component('i-breadcrumb-item', ElBreadcrumbItem);
};

export default ElBreadcrumb;
