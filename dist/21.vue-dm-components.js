webpackJsonpVueDmComponents([21],{1003:function(t,s,e){"use strict";function i(t){return function(){var s=t.apply(this,arguments);return new Promise(function(t,e){function i(r,l){try{var a=s[r](l),n=a.value}catch(t){return void e(t)}if(!a.done)return Promise.resolve(n).then(function(t){i("next",t)},function(t){i("throw",t)});t(n)}return i("next")})}}Object.defineProperty(s,"__esModule",{value:!0}),s.default={components:{},data:function(){return{productList:[{title:"产品1",price:15},{title:"产品2",price:25},{title:"产品3",price:25},{title:"产品4",price:25},{title:"产品5",price:15},{title:"产品6",price:25},{title:"产品7",price:25},{title:"产品8",price:25},{title:"产品11",price:15},{title:"产品12",price:25},{title:"产品13",price:25},{title:"产品14",price:25}]}},methods:{},created:function(){},mounted:function(){function t(){return s.apply(this,arguments)}var s=i(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t,this)}));return t}()}},1120:function(t,s,e){var i=e(1121);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(2)("d5a5683c",i,!0,{})},1121:function(t,s,e){s=t.exports=e(1)(!1),s.push([t.i,".group[data-v-6e4982ff]{border:1px solid #ddd;border-radius:5px;padding:10px}",""])},1122:function(t,s,e){"use strict";var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",[e("dm_pannel",{staticClass:"MB20",attrs:{title:"默认的列表(快速设置固定宽度和上下间距)"}},[e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,widthG:"300px",spaceY:"0"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])})],1),t._v(" "),e("dm_pannel",{staticClass:"MB20",attrs:{title:"默认的列表(4列)"}},[e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])})],1),t._v(" "),e("dm_pannel",{staticClass:"MB20",attrs:{title:"强制修改style_g"}},[e("dm_list_flex_res",{staticClass:"MB20",attrs:{style_g:{width:"49.5%"},list:t.productList},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])})],1),t._v(" "),e("dm_pannel",{staticClass:"MB20",attrs:{title:"1到10列"}},[e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"1"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])}),t._v(" "),e("dm_title_bar",{staticClass:"MB20",attrs:{title:"2列"}}),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"2"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])}),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"3"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])}),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"5"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])}),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"6"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])}),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"7"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])}),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"8"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])}),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"9"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])}),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList,col:"10"},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("div",{staticClass:"group"},[t._v(t._s(i.title))])]}}])})],1),t._v(" "),e("dm_list_flex_res",{staticClass:"MB20",attrs:{list:t.productList},scopedSlots:t._u([{key:"default",fn:function(s){var i=s.item;return[e("el-button",{attrs:{type:"primary"}},[t._v(t._s(i.title))])]}}])})],1)},r=[],l={render:i,staticRenderFns:r};s.a=l},946:function(t,s,e){"use strict";function i(t){e(1120)}Object.defineProperty(s,"__esModule",{value:!0});var r=e(1003),l=e.n(r);for(var a in r)"default"!==a&&function(t){e.d(s,t,function(){return r[t]})}(a);var n=e(1122),c=e(0),u=i,o=c(l.a,n.a,!1,u,"data-v-6e4982ff",null);s.default=o.exports}});
//# sourceMappingURL=21.vue-dm-components.js.map