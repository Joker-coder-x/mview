<template>
  <div class="demo">
    <h1>Table表格</h1>
    <p>用于展示多条结构类似的数据</p>

    <h3>基础用法</h3>
    <p>基础的表格展示用法。</p>
    <m-table :data="data">
      <m-table-column prop="name" label="姓名"></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>带斑马条纹的表格</h3>
    <p>使用带斑马纹的表格，可以更容易区分出不同行的数据。</p>
    <m-table :data="data" stripe>
      <m-table-column prop="name" label="姓名" width="400"></m-table-column>
      <m-table-column prop="age" label="年龄" width="300"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>带边框的表格</h3>
    <p>
      默认情况下，Table
      组件是不具有竖直方向的边框的，如果需要，可以使用border属性，它接受一个Boolean，设置为true即可启用。
    </p>
    <m-table :data="data" border stripe>
      <m-table-column prop="name" label="姓名"></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>自定义样式</h3>
    <p>
      可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加
      class，表明该行处于某种状态。
    </p>
    <m-table :data="data" border stripe :row-class-name="handleRowClassName">
      <m-table-column prop="name" label="姓名"></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>
    <p>
      通过给列 columns 设置字段 className 可以给某一列指定一个样式。
    </p>
    <m-table :data="data" border stripe :row-class-name="handleRowClassName">
      <m-table-column
        prop="name"
        label="姓名"
        className="purple"
      ></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>
    <p>
      通过给数据 data 设置字段 cellClassName
      可以给任意一个单元格(cell)指定样式。
    </p>
    <m-table :data="data2" border stripe :row-class-name="handleRowClassName">
      <m-table-column prop="name" label="姓名" width="180"></m-table-column>
      <m-table-column prop="age" label="年龄" width="180"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>是否显示表头</h3>
    <p>通过给table 组件设置字段 show-header 可以控制表头的显示。</p>
    <m-table :data="data" border stripe :show-header="false">
      <m-table-column prop="name" label="姓名"></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>单元格(cell) 中的对齐方式</h3>
    <p>
      通过给table 组件设置字段 text-align(默认为center)、
      vertical-align(默认为middle)可控制单元格中行内元素的对齐方式。
    </p>
    <m-table :data="data" border stripe text-align="left">
      <m-table-column prop="name" label="姓名"></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>
    <m-table :data="data" border stripe text-align="center">
      <m-table-column prop="name" label="姓名"></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>
    <m-table :data="data" border stripe text-align="right">
      <m-table-column prop="name" label="姓名"></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>固定表头</h3>
    <p>
      要在m-table元素中定义了height属性，即可实现固定表头的表格，而不需要额外的代码。
    </p>
    <m-table :data="data3" border stripe height="150px">
      <m-table-column prop="name" label="姓名"></m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>固定列</h3>
    <p>
      固定列需要使用fixed属性，它接受 Boolean
      值或者left、right，表示左边固定还是右边固定。
    </p>
    <m-table :data="data4" border stripe>
      <m-table-column prop="name" label="姓名" width="120"></m-table-column>
      <m-table-column
        prop="age"
        label="年龄"
        fixed="left"
        width="120"
      ></m-table-column>
      <m-table-column
        prop="hobby"
        label="爱好"
        fixed="right"
        width="120"
      ></m-table-column>
      <m-table-column prop="gender" label="性别" width="120"></m-table-column>
      <m-table-column prop="type" label="类型" width="180"></m-table-column>
      <m-table-column prop="road" label="分路" width="180"></m-table-column>
      <m-table-column prop="date" label="日期" width="240"></m-table-column>
      <m-table-column prop="date2" label="日期" width="240"></m-table-column>
      <m-table-column prop="date3" label="日期" width="240"></m-table-column>
      <m-table-column prop="date4" label="日期" width="240"></m-table-column>
      <m-table-column prop="date5" label="日期" width="240"></m-table-column>
    </m-table>

    <h3>固定列和表头</h3>
    <p>固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。</p>
    <m-table :data="data5" border stripe height="200px">
      <m-table-column prop="name" label="姓名" width="120"></m-table-column>
      <m-table-column
        prop="age"
        label="年龄"
        fixed="left"
        width="120"
      ></m-table-column>
      <m-table-column
        prop="hobby"
        label="爱好"
        fixed="right"
        width="120"
      ></m-table-column>
      <m-table-column prop="gender" label="性别" width="120"></m-table-column>
      <m-table-column prop="type" label="类型" width="180"></m-table-column>
      <m-table-column prop="road" label="分路" width="180"></m-table-column>
      <m-table-column prop="date" label="日期" width="240"></m-table-column>
      <m-table-column prop="date2" label="日期" width="240"></m-table-column>
      <m-table-column prop="date3" label="日期" width="240"></m-table-column>
      <m-table-column prop="date4" label="日期" width="240"></m-table-column>
      <m-table-column prop="date5" label="日期" width="240"></m-table-column>
    </m-table>

    <h3>可排序的表格</h3>
    <m-table
      :data="data"
      border
      stripe
      :default-sort="{ prop: 'name', order: 'asc' }"
    >
      <m-table-column prop="name" label="姓名" sortable></m-table-column>
      <m-table-column prop="age" label="年龄" sortable></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>导出表格</h3>
    <m-table :data="data5" stripe ref="exportTable">
      <m-table-column prop="name" label="姓名" width="120"></m-table-column>
      <m-table-column
        prop="age"
        label="年龄"
        fixed="left"
        width="120"
      ></m-table-column>
      <m-table-column
        prop="hobby"
        label="爱好"
        fixed="right"
        width="120"
      ></m-table-column>
      <m-table-column prop="gender" label="性别" width="120"></m-table-column>
      <m-table-column prop="type" label="类型" width="180"></m-table-column>
      <m-table-column prop="road" label="分路" width="180"></m-table-column>
      <m-table-column prop="date" label="日期" width="240"></m-table-column>
      <m-table-column prop="date2" label="日期" width="240"></m-table-column>
      <m-table-column prop="date3" label="日期" width="240"></m-table-column>
      <m-table-column prop="date4" label="日期" width="240"></m-table-column>
      <m-table-column prop="date5" label="日期" width="240"></m-table-column>
    </m-table>
    <m-button type="primary" style="marginTop:20px;" @click="handleExportTable"
      >导出表格</m-button
    >

    <h3>自定义列模板</h3>
    <p>通过 Scoped slot 可以获取到 row, column, $index 等数据。</p>
    <m-table :data="data" border stripe>
      <m-table-column prop="name" label="姓名">
        <template v-slot:default="{ column, $index }">
          <m-button type="primary">{{ column.label }}+{{ $index }}</m-button>
        </template>
      </m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>

    <h3>自定义表头</h3>
    <p>通过设置 Scoped slot 来自定义表头。</p>
    <m-table :data="data" border stripe>
      <m-table-column prop="name" label="姓名">
        <template v-slot:default="{ column, $index }">
          <m-button type="primary">{{ column.prop }}+{{ $index }}</m-button>
        </template>
        <template v-slot:header="scope">
          <m-button>{{ scope.column.label }}</m-button>
        </template>
      </m-table-column>
      <m-table-column prop="age" label="年龄"></m-table-column>
      <m-table-column prop="hobby" label="爱好"></m-table-column>
    </m-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          name: "程咬金",
          age: 1000,
          hobby: "女"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女"
        }
      ],
      data2: [
        {
          name: "程咬金",
          age: 1000,
          hobby: "女"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女"
        },
        {
          name:
            "西门庆88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888855555555555555",
          age: 58,
          hobby: "女",
          cellClassName: {
            age: "custom-cell",
            name: "custom-cell"
          }
        }
      ],
      data3: [
        {
          name: "程咬金",
          age: 1000,
          hobby: "女"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女"
        },
        {
          name: "程咬金",
          age: 1000,
          hobby: "女"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女"
        },
        {
          name: "程咬金",
          age: 1000,
          hobby: "女"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女"
        }
      ],
      data4: [
        {
          name: "程咬金",
          age: 1000,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女",
          gender: "男",
          type: "射手",
          road: "下路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女",
          gender: "女",
          type: "法师",
          road: "中单",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        }
      ],
      data5: [
        {
          name: "程咬金",
          age: 1000,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女",
          gender: "男",
          type: "射手",
          road: "下路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女",
          gender: "女",
          type: "法师",
          road: "中单",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "程咬金",
          age: 1000,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女",
          gender: "男",
          type: "射手",
          road: "下路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女",
          gender: "女",
          type: "法师",
          road: "中单",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "程咬金",
          age: 1000,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女",
          gender: "男",
          type: "射手",
          road: "下路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女",
          gender: "女",
          type: "法师",
          road: "中单",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "程咬金",
          age: 1000,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "百里守约",
          age: 78,
          hobby: "女",
          gender: "男",
          type: "射手",
          road: "下路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "王昭君",
          age: 20,
          hobby: "女",
          gender: "女",
          type: "法师",
          road: "中单",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        },
        {
          name: "西门庆",
          age: 58,
          hobby: "女",
          gender: "男",
          type: "坦克",
          road: "上路",
          date: "2020-05-13",
          date2: "2020-05-13",
          date3: "2020-05-13",
          date4: "2020-05-13",
          date5: "2020-05-13"
        }
      ]
    };
  },

  methods: {
    handleRowClassName({ index }) {
      if (index > 2) {
        return "primary";
      }
    },

    handleExportTable() {
      const exportTable = this.$refs.exportTable;
      if (exportTable) {
        exportTable.exportCsv();
      }
    }
  }
};
</script>

<style>
.demo {
  flex: 1;
}
.m-table .primary {
  background-color: rgb(107, 194, 235);
  color: white;
}

.m-table .custom-cell {
  background-color: rgb(104, 201, 104);
}

.m-table .purple {
  background-color: #27ae60;
  color: white;
}
</style>
