<template>
  <div>
    <tableList :list="list" :genres="genres" :ispaging="ispaging" />
  </div>
</template>
<script>
import tableList from '@/components/TableList.vue';
import { getMovies } from '@/mock/data.js';
import { genres } from '@/mock/gategory.js';
export default {
  name: 'tables',
  components: {
    tableList,
  },
  data() {
    return {
      list: getMovies(), //数据
      genres: genres, //分类
      ispaging: true, //是否分页
    };
  },
};
</script>
<style scoped></style>
