webpackJsonpVueDmComponents([8],{1041:function(t,n,e){"use strict";function r(t){return function(){var n=t.apply(this,arguments);return new Promise(function(t,e){function r(i,u){try{var a=n[i](u),s=a.value}catch(t){return void e(t)}if(!a.done)return Promise.resolve(s).then(function(t){r("next",t)},function(t){r("throw",t)});t(s)}return r("next")})}}Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"test_debug_list",components:{},data:function(){return{listIn:[{id:1,name:"张三",age:17,sex:"男"},{id:2,name:"李四",age:27,sex:"男"},{id:3,name:"王五",age:13,sex:"男"}]}},methods:{deleteData:function(){function t(t){return n.apply(this,arguments)}var n=r(regeneratorRuntime.mark(function t(n){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.listIn=this.listIn.filter(function(t){return t.id!=n.id});case 1:case"end":return t.stop()}},t,this)}));return t}(),modifyData:function(){function t(t){return n.apply(this,arguments)}var n=r(regeneratorRuntime.mark(function t(n){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n.name+="1";case 1:case"end":return t.stop()}},t,this)}));return t}(),addData:function(){function t(t){return n.apply(this,arguments)}var n=r(regeneratorRuntime.mark(function t(n){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:this.listIn=this.listIn.filter(function(t){return t.id!=n.id});case 1:case"end":return t.stop()}},t,this)}));return t}()},beforeCreate:function(){},created:function(){},mounted:function(){function t(){return n.apply(this,arguments)}var n=r(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t,this)}));return t}()}},1184:function(t,n,e){var r=e(1185);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);e(2)("1db0a34a",r,!0,{})},1185:function(t,n,e){n=t.exports=e(1)(!1),n.push([t.i,"",""])},1186:function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"FS18 LH40"},[t._v("测试debug_list的实用性")]),t._v(" "),e("dm_debug_list",[e("dm_debug_item",{model:{value:t.listIn,callback:function(n){t.listIn=n},expression:"listIn"}})],1),t._v(" "),e("div",{staticClass:"MB10 MT10"},[e("el-button",{attrs:{plain:"",size:"mini"},on:{click:function(n){t.listIn.length=0}}},[t._v("数组清空(不能响应)")])],1),t._v(" "),e("ul",t._l(t.listIn,function(n){return e("li",{key:n.id,staticClass:"MB6"},[t._v("\n      "+t._s(n.id)+" : "+t._s(n.name)+"\n      "),e("el-button",{attrs:{plain:"",size:"mini"},on:{click:function(e){return t.deleteData(n)}}},[t._v("删除")]),t._v(" "),e("el-button",{attrs:{plain:"",size:"mini"},on:{click:function(e){return t.modifyData(n)}}},[t._v("修改")])],1)}),0)],1)},i=[],u={render:r,staticRenderFns:i};n.a=u},984:function(t,n,e){"use strict";function r(t){e(1184)}Object.defineProperty(n,"__esModule",{value:!0});var i=e(1041),u=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);var s=e(1186),o=e(0),c=r,l=o(u.a,s.a,!1,c,null,null);n.default=l.exports}});
//# sourceMappingURL=8.vue-dm-components.js.map