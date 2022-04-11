<template>
  <div class="wrap">
    <div class="left">
      <div class="title">
        <div>Hello!</div>
        <div class="content">感谢你来看访问我的网站
          </div>
          </div>
      <div>因为摄影和编程交织在一起，我搭建了Film Preset网站</div>
      <div>它的功能并不是很完善</div>
      <div>下个版本我会上线点赞功能和图片压缩功能</div>

       <div class="duil">哦对了！</div>
      <div>如果你喜欢这里的预设，向我的邮箱发送说明，我就会发你一份</div>
      <div>网站的源码我也会放在gitHub上面</div>
      <div>未来会分享在下面</div>
        </div>
      
    
    <div class="right">
      <div class="title">Contact</div>
      <div class="content">

        <div>E-mail:761545737@qq.com</div>
      <div>Wechat:fyz761545737</div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name:'about'
}
</script>

<style scoped>
.wrap{
  width: 800px;
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  color: #262626;
  font-size: 14px;
  line-height: 30px;
  padding: 20px;
}
.title , .duil{
  font-size: 16px;
  font-weight: 600;
}
.duil{
  margin-top: 20px;
}
</style>