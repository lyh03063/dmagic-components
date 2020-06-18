
   <template>
  <div>
    <dm_debug_list>
      <dm_debug_item v-model="tableData" />
    </dm_debug_list>

    <el-table :data="tableData" row-key="id">
      <el-table-column
        v-for="(item, index) in col"
        :key="`col_${index}`"
        :prop="dropCol[index].prop"
        :label="item.label"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button class="dm_btn_drag" type="text" size="small">拖拽</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>


export default {
  data() {
    return {
      col: [{ label: '日期', prop: 'date' }, { label: '姓名', prop: 'name' }, { label: '地址', prop: 'address' }],
      dropCol: [{ label: '日期', prop: 'date' }, { label: '姓名', prop: 'name' }, { label: '地址', prop: 'address' }],
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 100 弄'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 200 弄'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 300 弄'
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 400 弄'
        }
      ]
    };
  },
  mounted() {
    this.rowDrop();
    this.columnDrop();
  },
  methods: {

    async rowDrop() {
      await util.loadJs({ url: `//qn-static.dmagic.cn/Sortable.1.10.2.min.js` })//加载
      // 此时找到的元素是要拖拽元素的父容器
      const tbody = document.querySelector('.el-table__body-wrapper tbody');
      const _this = this;
      Sortable.create(tbody, {
        handle: '.cell',//执行拖拽的元素
        //  指定父元素下可被拖拽的子元素
        // draggable: ".el-table__row .cell",
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);
        }
      });
    },
    // 列拖拽
    async columnDrop() {
      await util.loadJs({ url: `//qn-static.dmagic.cn/Sortable.1.10.2.min.js` })//加载
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: evt => {
          const oldItem = this.dropCol[evt.oldIndex];
          this.dropCol.splice(evt.oldIndex, 1);
          this.dropCol.splice(evt.newIndex, 0, oldItem);
        }
      });
    }
  }
};
</script>
