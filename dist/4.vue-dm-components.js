webpackJsonpVueDmComponents([4],{1045:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,i){try{var l=t[a](i),o=l.value}catch(e){return void n(e)}if(!l.done)return Promise.resolve(o).then(function(e){r("next",e)},function(e){r("throw",e)});e(o)}return r("next")})}}Object.defineProperty(t,"__esModule",{value:!0});var a=void 0;t.default={components:{},data:function(){return{cfItem:{},dataTree:[{id:1,label:"一级 1",children:[{id:4,label:"二级 1-1",children:[{id:9,label:"三级 1-1-1"},{id:10,label:"三级 1-1-2"}]}]},{id:2,label:"一级 2",children:[{id:5,label:"二级 2-1"},{id:6,label:"二级 2-2"}]},{id:3,label:"一级 3",children:[{id:7,label:"二级 3-1"},{id:8,label:"二级 3-2",children:[{id:11,label:"三级 3-2-1"},{id:12,label:"三级 3-2-2"},{id:13,label:"三级 3-2-3"}]}]}]}},methods:{},beforeCreate:function(){a=this},created:function(){},mounted:function(){function e(){return t.apply(this,arguments)}var t=r(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return e}()}},1196:function(e,t,n){var r=n(1197);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("b4773ac8",r,!0,{})},1197:function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,"",""])},1198:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("dm_debug_list",[n("dm_debug_item",{model:{value:e.dataTree,callback:function(t){e.dataTree=t},expression:"dataTree"}})],1),e._v(" "),n("dm_tree_data",{staticClass:"W500",model:{value:e.dataTree,callback:function(t){e.dataTree=t},expression:"dataTree"}})],1)},a=[],i={render:r,staticRenderFns:a};t.a=i},988:function(e,t,n){"use strict";function r(e){n(1196)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1045),i=n.n(a);for(var l in a)"default"!==l&&function(e){n.d(t,e,function(){return a[e]})}(l);var o=n(1198),u=n(0),c=r,d=u(i.a,o.a,!1,c,null,null);t.default=d.exports}});
//# sourceMappingURL=4.vue-dm-components.js.map