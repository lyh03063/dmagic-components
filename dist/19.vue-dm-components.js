webpackJsonpVueDmComponents([19],{1030:function(e,t,n){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,i){try{var o=t[a](i),s=o.value}catch(e){return void n(e)}if(!o.done)return Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)});e(s)}return r("next")})}}Object.defineProperty(t,"__esModule",{value:!0}),n(210),PUB._systemId="sys_api",t.default={name:"list_tree_data",components:{},data:function(){return{visible:{},cfList:{idKey:"P1",cfElTable:{lazy:!0,"tree-props":{children:"children",hasChildren:"name"},load:function(e,t,n){setTimeout(function(){n([{P1:31,date:"2016-05-01",name:"王小虎11",address:"上海市普陀区金沙江路 1519 弄"},{P1:32,date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"}])},200)}},listIndex:"list_franchisee",twoTitle:"赛事",threeTitle:"加盟商",flag:!0,url:{list:"/crossList?page=tangball_franchisee",add:"/crossAdd?page=tangball_franchisee",modify:"/crossModify?page=tangball_franchisee",detail:"/crossDetail?page=tangball_franchisee",delete:"/crossDelete?page=tangball_franchisee"},columns:[{label:"Id",prop:"P1",width:60},{label:"企业名称",prop:"name",width:200}],searchFormItems:[{label:"Id",prop:"P1",type:"input"},{label:"加盟时间",prop:"joinTime",type:"time_period"}],detailItems:[{label:"Id",prop:"P1"},{label:"企业名称",prop:"name"},{label:"备注",prop:"remark"}],formItems:[{label:"企业名称",prop:"name",type:"input"},{label:"加盟时间",prop:"joinTime",type:"date"}]}}},methods:{},created:function(){},mounted:function(){function e(){return t.apply(this,arguments)}var t=r(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}},e,this)}));return e}()}},1151:function(e,t,n){var r=n(1152);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(2)("ab8f6546",r,!0,{})},1152:function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,"",""])},1153:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("dm_list_data",{attrs:{cf:e.cfList}})],1)},a=[],i={render:r,staticRenderFns:a};t.a=i},973:function(e,t,n){"use strict";function r(e){n(1151)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1030),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var s=n(1153),l=n(0),c=r,u=l(i.a,s.a,!1,c,null,null);t.default=u.exports}});
//# sourceMappingURL=19.vue-dm-components.js.map