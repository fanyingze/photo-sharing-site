<template>
  <div class="tabBar">
    <div class='main'>
      <a  :href="item[0].mainlink">{{item[0].main}}</a>
    </div>

    <div class="second1">
      <div class='second' v-for="(item,index) in item[1]" :key="index">
      <div >
        <a :href="item.link" >{{item.title}}</a>
      </div>
    </div>
    </div>
    

  </div>
</template>

<script>
export default{
  name:'MainTabBarItem',
  props:{
    item:{
      type:Array
    }
  },
  date(){
    return{
      path:''
    }
  },
  methods:{
  },
  computed:{
  }
}
</script>

<style scoped>
.tabBar{
  align-self: center;
  height: 40px;
  /* background: red; */
  padding: 5px;
  position: relative;
}

.main a , .second a{
  padding: 10px 10px;
  display: block;
  text-decoration:none;
  color:#96C6CB;
  font-size:14px;
  font-family:  "PingFang SC";;
}
.second a{
  background: white;
  width: 200px;
}
a:hover{
  color: #AAAAAA;
}
.second1{
  position: absolute;
}
.second{
  display: none;
}
.tabBar:hover .second{
  display: block;
}
/*  */
</style>