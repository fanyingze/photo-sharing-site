<template>
  <div class="item">
    <a href="javascript:" >
       <a href="javascript:" class="delete" @click="de" v-if="isAuthor"><i class="el-icon-delete , icon-delete" ></i></a>
      <div class="mo-fa">
       
      <div class="mo" @click="open"></div>
      </div>
      
      <i class="el-icon-money , icon" v-if="!aloneImg"></i>
      
      
      <el-image
      style="width: 100%; height: 100%"
      :src="coverimg.path"
      fit=" cover"
      @load="imgLoad"></el-image>
    </a>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {deleteArticle} from '@/network/article'

export default{
  name:'aticleItem',
  props:{
    item:{
      type:Object
    },
    index:{
      type:Number
    }
  
  },
  
  data(){
    return{
      coverimg:{},
      imgs:[],
      aloneImg:false,
      detailsShow:false,
      isAuthor:false
    }
  },
  created(){
    this.coverimg = JSON.parse(this.item.cover_img)
    this.imgs = JSON.parse(this.item.imgArray)

    if(this.imgs.length == 1){
        this.aloneImg = true
        return
      }else if(this.imgs.length >1){
        this.aloneImg = false
      }

    
  },
  computed:{
    ...mapGetters([
      	'user',
        'isAuthenticated'
      ]),
  },
  methods:{
   imgLoad(){
     if(this.user.id == this.item.author_id){
       this.isAuthor = true
     }
   },
   open(){
     this.$emit('open',this.index)
   },
   de(){
      this.$confirm('This operation will permanently delete the file. Do you want to continue?', 'Alert', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let id = {article_id:this.item.article_id}
          deleteArticle(id).then(res=>{
            console.log(res);
          })
        }).catch(()=>{
          console.log('取消删除');
        })
   }
    }
  
}
</script>

<style scoped>
img{
  width:30%;
}
.item{
  position: relative;
}
.icon{
  color: white;
  font-size: 20px;
  font-weight: 800;
  position: absolute;
  z-index: 9;
  top: 15px;
  right: 45px;
}
.mo-fa{
  display: none;
}
.mo{
  background: rgba(0,0,0,.08);
  z-index: 20;
  width: 100%;
  height: 100%;
  position: absolute;
  
}
.item:hover .mo-fa{
  display: block;
}
.item:hover .delete{
  display: block;
}
.icon-delete{
  color: rgba(0,0,0,.3);
  font-size: 20px;
  font-weight: 800;
}
.delete{
  display: block;
  /* background: red; */
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
  z-index:40;
  display: none;
}
</style>