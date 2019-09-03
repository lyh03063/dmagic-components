const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['clean'],                                   // remove formatting button
  ['sourceEditor'], //新添加的工具
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image", "video"],
];

//重写事件方法
const handlers = {
  shadeBox:null,
  sourceEditor: function(){     //添加工具方法
       alert('我新添加的工具方法');
  }
};

//默认导出一个对象
export default {
  placeholder: '',
  theme: 'snow',  // 主题
  modules: {
    toolbar: {
      container: toolbarOptions,  // 工具栏选项
      handlers: handlers  // 事件重写
    }
  },
  initButton:function(){      //在使用的页面中初始化按钮样式
    const sourceEditorButton = document.querySelector('.ql-sourceEditor');
    sourceEditorButton.style.cssText = "width:80px; border:1px solid #ccc; border-radius:5px;";
    sourceEditorButton.innerText="源码编辑";
  }
}
