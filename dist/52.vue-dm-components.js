webpackJsonpVueDmComponents([52],{1012:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,o){try{var l=t[a](o),u=l.value}catch(e){return void n(e)}if(!l.done)return Promise.resolve(u).then(function(e){r("next",e)},function(e){r("throw",e)});e(u)}return r("next")})}}Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{col:[{label:"日期",prop:"date"},{label:"姓名",prop:"name"},{label:"地址",prop:"address"}],dropCol:[{label:"日期",prop:"date"},{label:"姓名",prop:"name"},{label:"地址",prop:"address"}],tableData:[{id:"1",date:"2016-05-02",name:"王小虎1",address:"上海市普陀区金沙江路 100 弄"},{id:"2",date:"2016-05-04",name:"王小虎2",address:"上海市普陀区金沙江路 200 弄"},{id:"3",date:"2016-05-01",name:"王小虎3",address:"上海市普陀区金沙江路 300 弄"},{id:"4",date:"2016-05-03",name:"王小虎4",address:"上海市普陀区金沙江路 400 弄"}]}},mounted:function(){this.rowDrop(),this.columnDrop()},methods:{rowDrop:function(){function e(){return t.apply(this,arguments)}var t=r(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,util.loadJs({url:"//qn-static.dmagic.cn/Sortable.1.10.2.min.js"});case 2:t=document.querySelector(".el-table__body-wrapper tbody"),n=this,Sortable.create(t,{handle:".cell",onEnd:function(e){var t=e.newIndex,r=e.oldIndex,a=n.tableData.splice(r,1)[0];n.tableData.splice(t,0,a)}});case 5:case"end":return e.stop()}},e,this)}));return e}(),columnDrop:function(){function e(){return t.apply(this,arguments)}var t=r(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,util.loadJs({url:"//qn-static.dmagic.cn/Sortable.1.10.2.min.js"});case 2:t=document.querySelector(".el-table__header-wrapper tr"),this.sortable=Sortable.create(t,{animation:180,delay:0,onEnd:function(e){var t=n.dropCol[e.oldIndex];n.dropCol.splice(e.oldIndex,1),n.dropCol.splice(e.newIndex,0,t)}});case 4:case"end":return e.stop()}},e,this)}));return e}()}}},1099:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("dm_debug_list",[n("dm_debug_item",{model:{value:e.tableData,callback:function(t){e.tableData=t},expression:"tableData"}})],1),e._v(" "),n("el-table",{attrs:{data:e.tableData,"row-key":"id"}},[e._l(e.col,function(t,r){return n("el-table-column",{key:"col_"+r,attrs:{prop:e.dropCol[r].prop,label:t.label}})}),e._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{staticClass:"dm_btn_drag",attrs:{type:"text",size:"small"}},[e._v("拖拽")])]}}])})],2)],1)},a=[],o={render:r,staticRenderFns:a};t.a=o},955:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1012),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);var l=n(1099),u=n(0),i=u(a.a,l.a,!1,null,null,null);t.default=i.exports}});
//# sourceMappingURL=52.vue-dm-components.js.map