<template>
  <div class="recommend">
    <h4 class="title">
      为你推荐
    </h4>
    <div class="items">
      <div class="item"
      v-for="(item, index) in items"
      :key="item.id"
      @click="clickItem(item.id, index)"
      >
      <img v-lazy="item.pic" alt="">
      <h5>{{ item.name }}</h5>
      <p class="acion">{{ item.characteristic?item.characteristic:'暂无描述' }}</p>
      <p class="price">￥{{ item.minPrice }}</p>
      </div>
    </div>
  </div>
  
</template>

<script>
  export default {
    props: {
      items:{
        type:Array,
        required:true
      }
    },
    methods: {
      clickItem(id ,index){
        this.$emit('clickItem', { id , index})
      }
    }
  }
</script>

<style lang="scss" scoped>
.recommend{
  margin-top:8px;
  padding: 20px 17px 0;
  background-color: #fff;
}
.title{
  color: #666;

}
.items{
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
}
.item{
  width: 49%;
  padding: 10px 0;
  position: relative;
  img{
    width: 100%;
    border-radius: 10px;
  }
  h5{
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .acion{
    font-size: 10px;
    color: #ccc;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 17px;
  }
  .price{
    color: #ef1f1f;
    font-size: 19px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
}
</style>