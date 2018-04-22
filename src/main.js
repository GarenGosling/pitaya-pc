// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.use(VueResource);

/**
 * my vue-resource object
 * @type {{}}
 */
Vue.prototype.$AJAX = {};

/**
 * my vue-resource put request
 * @param vm
 * @param uri
 * @param success
 * @constructor
 */
Vue.prototype.$AJAX.GET = function (vm, uri, success){
  var url = basePath + uri;
    vm.$http.get(url, []).then((response) => {
      if(response.body.code == 200){
        success(response);
      }else{
        vm.$message.error(response.body.message)
      }
    }, (response) => {
      vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    });
}

/**
 * my vue-resource post request
 * @param vm
 * @param param
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.POST = function (vm, param, uri, isShowSuccessMsg, loadTrueFn, loadFalseFn, successFn){
  loadTrueFn();
  var url = basePath + uri;
  vm.$http.post(url, param).then((response) => {
    if(response.body.code == 200){
      if(isShowSuccessMsg){
        vm.$message.success(response.body.message);
      }
      successFn(response);
    }else{
      vm.$message.error(response.body.message)
    }
    loadFalseFn();
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    loadFalseFn();
  });
}

/**
 * my vue-resource put request
 * @param vm
 * @param param
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.PUT = function (vm, param, uri, loadTrueFn, loadFalseFn, successFn){
  loadTrueFn();
  var url = basePath + uri;
  vm.$http.put(url, param).then((response) => {
    if(response.body.code == 200){
      vm.$message.success(response.body.message);
      successFn(response);
    }else{
      vm.$message.error(response.body.message)
    }
    loadFalseFn();
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    loadFalseFn();
  });
}

/**
 * my vue-resource delete request
 * @param vm
 * @param uri
 * @param successFn
 * @constructor
 */
Vue.prototype.$AJAX.DELETE = function (vm, uri, loadTrueFn, loadFalseFn, successFn){
  loadTrueFn();
  var url = basePath + uri;
  vm.$http.delete(url, []).then((response) => {
    if(response.body.code == 200){
      vm.$message.success(response.body.message);
      successFn(response);
    }else{
      vm.$message.error(response.body.message)
    }
    loadFalseFn();
  }, (response) => {
    vm.$message.error('\"status\"'+response.body.status+',\"error\":'+response.body.error+',\"message\":'+response.body.message);
    loadFalseFn();
  });
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
