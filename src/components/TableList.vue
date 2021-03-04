<template>
  <div>
    <div class="layout">
      <div class="layout_left">
        <div
          v-for="(item, i) in genres"
          :key="i"
          :class="item._id == genreskey ? 'layout_left_hover' : ''"
          @click="setgenres(i)"
        >
          {{ item.name }}
        </div>
      </div>
      <div>
        <div class="layout_left">
          <div style="border: none;">共有{{ list.length }}部电影</div>
        </div>
        <table>
          <tr class="tab">
            <th>title</th>
            <th>genre</th>
            <th @click="setsort">
              numberInStock
              <span v-show="show2">
                <span v-show="show1">▲</span>
                <span v-show="!show1">▼</span>
              </span>
            </th>
            <th>publishDate</th>
            <th>dailyRentalRate</th>
          </tr>
          <tr v-for="(item, i) in dataList" :key="i" class="tab_list">
            <td>{{ item.title }}</td>
            <td>{{ item.genre.name }}</td>
            <td>{{ item.numberInStock }}</td>
            <td>{{ item.publishDate ? item.publishDate : '未配置' }}</td>
            <td>{{ item.dailyRentalRate }}</td>
          </tr>
        </table>

        <div class="page-bar" v-if="ispaging">
          <ul>
            <li v-if="cur > 1"><a @click="cur--, pageClick()">上一页</a></li>
            <li v-if="cur == 1"><a class="banclick">上一页</a></li>
            <li
              v-for="(index, i) in indexs"
              :key="i"
              :class="{ active: cur == index }"
            >
              <a @click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="cur != all"><a @click="cur++, pageClick()">下一页</a></li>
            <li v-if="cur == all"><a class="banclick">下一页</a></li>
            <li>
              <a
                >共<i>{{ all }}</i
                >页</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    list: Array,
    genres: Array, //分类
    ispaging: Boolean,
  },
  data() {
    return {
      all: 10, //总页数
      cur: 1, //当前页码
      totalPage: 0, //当前条数
      pagnum: 5, //每页条数

      dataList: [], //页面数据

      dataListType: [], //用于存放类别数组
      genreskey: 'kkkkkkkkkk', //分类样式显示
      show1: true,
      show2: false,
    };
  },
  mounted() {
    this.dataListFn();
  },
  methods: {
    //请求数据
    dataListFn: function(index) {
      if (!this.ispaging) {
        this.dataList = this.list;
        this.dataListType = this.list;
        return false;
      }
      this.dataList = [];
      if (index) {
        this.dataList = this.list.slice(
          parseInt(index - 1) * this.pagnum,
          parseInt(index) * this.pagnum - 0
        );

        this.all = Math.ceil(this.list.length / this.pagnum); //总页数
        this.cur = index;
        this.totalPage = this.list.slice(0, this.pagnum).length;
      } else {
        this.all = Math.ceil(this.list.length / this.pagnum); //总页数
        this.cur = 1;
        this.totalPage = this.list.slice(0, this.pagnum).length;
        this.dataList = this.list.slice(0, this.pagnum);
      }
      this.dataListType = this.dataList;
      console.log(this.dataList);
    },
    //分页
    btnClick: function(data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
      }
      //根据点击页数请求数据
      this.dataListFn(this.cur.toString());
      this.genreskey = 'kkkkkkkkkk';
      this.show2 = false;
    },
    pageClick: function() {
      //根据点击页数请求数据
      this.dataListFn(this.cur.toString());
      this.genreskey = 'kkkkkkkkkk';
      this.show2 = false;
    },
    //排序
    setArray(c) {
      c.sort(this.compare('numberInStock'));
      return c;
    },
    compare(property) {
      return function(a, b) {
        return a[property] - b[property];
      };
    },
    setsort() {
      this.show1 = !this.show1;
      console.log('sortBy', this.setArray(this.dataList));
      if (!this.show2) {
        this.dataList = this.setArray(this.dataList);
        this.show2 = true;
      } else {
        this.dataList = this.dataList.reverse();
      }
    },
    //分类切换
    setgenres(i) {
      this.show2 = false;
      this.genreskey = this.genres[i]._id;
      let list = [];
      this.dataListType.forEach((item) => {
        if (item.genre.name == this.genres[i].name) {
          list.push(item);
        }
      });
      if (i == '0') {
        this.dataList = this.dataListType;
        return false;
      }
      this.dataList = list;
    },
  },
  computed: {
    //分页
    indexs: function() {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = parseInt(this.cur) - 2;
          right = parseInt(this.cur) + 2;
        } else {
          if (this.cur <= 3) {
            left = 1;
            right = 5;
          } else {
            right = this.all;
            left = this.all - 4;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
  },
};
</script>
<style scoped>
.layout {
  margin-top: 100px;
  display: flex;
}
.layout_left {
  width: 20%;
  overflow: hidden;
}
.layout_left > div {
  height: 50px;
  border-radius: 7px;
  line-height: 50px;
  font-size: 18px;
  border: 1px solid #e5e5e5;
}
.layout_left_hover {
  background: #409eff;
  color: #ffffff;
}
.layout > div:nth-child(2) {
  width: 80%;
}

table {
  width: 100%;
}
table > .tab {
  height: 50px;
  width: 100%;
  background: #f5f5f5;
}
table > .tab_list {
  height: 50px;
}
table > .tab_list:hover {
  background: #f5f5f5;
}

.page-bar {
  margin: 40px auto;
  margin-top: 150px;
}
ul,
li {
  margin: 0px;
  padding: 0px;
}

li {
  list-style: none;
}

.page-bar li:first-child > a {
  margin-left: 0px;
}

.page-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #5d6062;
  cursor: pointer;
  margin-right: 20px;
}

.page-bar a:hover {
  background-color: #eee;
}

.page-bar a.banclick {
  cursor: not-allowed;
}

.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #409eff;
  border-color: #409eff;
}

.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}
</style>
