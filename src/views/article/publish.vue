<template>
  <div class="publish">
    <div v-if="!hadUpload" class="publish-part">
      <el-alert
        class="publish-alert"
        title="You can post new content here"
        type="info"
      >
      </el-alert>
      <!-- 照片上传部分 -->
      <div class="photo">
        <div class="photo-text , desc">Masterpiece {{ imgNum }}/9</div>
        <div v-if="!imgError" class="img-alert">
          <i class="el-icon-warning"></i>Images should be smaller than 3MB and
          in Picture format (jpg/png) !
        </div>

        <el-upload
          ref="upload"
          :action="getPath"
          name="photo"
          list-type="picture-card"
          :auto-upload="false"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlePhotoSuccess"
          :on-error="uploadError"
          :multiple="true"
          :on-change="isExitImg"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>
      <!-- 文字上传部分 -->
      <div class="text">
        <!-- 标题部分 -->
        <div class="text-title">
          <div class="title-text , desc">Title</div>
          <el-input
            placeholder="Title"
            v-model="title"
            maxlength="30"
            show-word-limit
          >
          </el-input>
        </div>
        <!-- 内容部分 -->
        <div class="text-content">
          <div class="title-text , desc">Content</div>
          <el-input
            type="textarea"
            :rows="10"
            v-model="content"
            maxlength="1000"
            show-word-limit
          >
          </el-input>
          <div v-show="false"> {{uploadcontent}}
          {{content}}
          {{keepContent}}</div>
         
        </div>
        
        <!-- 标签部分 -->
        <div class="text-tag">
          <div class="title-tag , desc">Tag</div>
          <el-tag color="#ffffff"
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-input
  class="input-new-tag"
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
>
</el-input>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
        
      </div>

      <div class="btn">
        <a @click="submitUpload" href="javascript:"
          ><i class="el-icon-edit"></i> Save</a
        >
        <a @click="submitToDraft" href="javascript:"
          ><i class="el-icon-document-checked"></i> Save to the draft box</a
        >
      </div>
    </div>
    <div class="had-upload" v-if="hadUpload">
      <img src="@/assets/img/login/login_out.png" alt="" />
      <div class="text">The article has been published！</div>
      <el-button plain size="big">Check out the article</el-button>
    </div>
  </div>
</template>

<script>
import { host } from "@/network/request.js";
import { mapGetters } from "vuex";
import { uploadArticle } from "@/network/article";

export default {
  name: "publish",
  data() {
    return {
      imgNum: 0,
      upLoadedNum:0,
      dialogImageUrl: "",
      dialogVisible: false,
      imgPathArray: [],
      title: "",
      content: "",
      uploadcontent:'',
      articleInfo: {},
      isImg: false,
      isDraft: 0,
      imgError: true,
      bigImgOrder: [],
      errTypeImgOrder: [],
      hadUpload: false,
      // 标签部分
       dynamicTags: ['Masterpiece', 'Film'],
        inputVisible: false,
        inputValue: ''
    };
  },
  
  methods: {
    handlePhotoSuccess(res, file) {
       this.imgPathArray.push(res[0]);
      this.upLoadedNum ++;
      
      if(this.upLoadedNum === this.imgNum){
        this.articleUpload();
      }

    },
    uploadError() {
      this.$alert("图片上传失败，请稍后重试！", "Alert", {
        confirmButtonText: "OK",
      });
    },
    isExitImg(file, fileList) {
      this.imgValidation(file, fileList);
      if (fileList.length !== 0) {
        this.isImg = true;
      }
      this.imgNum = fileList.length;
    },
    imgValidation(file, fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const isSize = fileList[i].raw.size / 1024 / 1024 > 3 ? false : true;
        const isType =
          fileList[i].raw.type !==
          ("image/webp" || "image/png" || "image/jpg" || "image/jpeg")
            ? false
            : true;
        if (!isSize) {
          this.imgError = false;
          return false;
        }
        if (isType) {
          this.imgError = false;
          return false;
        }
        this.imgError = true;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.imgNum = fileList.length;
      this.isExitImg(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    validation() {
      if (!this.isImg) {
        this.$alert("Please upload at least one masterpiece", "Alert", {
          confirmButtonText: "OK",
        });
        return false;
      }
      if (this.title === "") {
        this.$alert("Please enter your title", "Alert", {
          confirmButtonText: "OK",
        });
        return false;
      }
      if (this.content === "") {
        this.$alert(
          "Please enter your content about your masterpiece",
          "Alert",
          {
            confirmButtonText: "OK",
          }
        );
        return false;
      }
      if (!this.isAuthenticated) {
        this.$message.error("登录可能过期，请重试");
        return false;
      }
      if (this.imgNum > 9) {
        this.$alert("A maximum of 9 images can be uploaded", "Alert", {
          confirmButtonText: "OK",
        });
        return false;
      }
      if (!this.imgError) {
        this.$alert(
          "The uploaded content contains images larger than 3MB and not in JPG, PNG, WEBP format",
          "Alert",
          {
            confirmButtonText: "OK",
          }
        );
        return false;
      }
      return true;
    },
    submitUpload() {
      // 判断是否有照片
      let valid = this.validation();
      if (valid) {
        this.$refs.upload.submit();
      }
    },
    submitToDraft() {
      // 这个是草稿箱
      this.isDraft = 1;
      this.submitUpload();
    },
    articleUpload() {
      // 总整合和提交模块
      let imgPathArray_JSON = JSON.stringify(this.imgPathArray);
      let cover_img_JSON = JSON.stringify(this.imgPathArray[0]);
      let article_tag_JSON = JSON.stringify(this.dynamicTags)

      this.articleInfo = {
        title: this.title,
        content: this.uploadcontent,
        cover_img: cover_img_JSON,
        author_id: this.user.id,
        imgArray: imgPathArray_JSON,
        is_draft: this.isDraft,
        article_tag:article_tag_JSON
      };
      // console.log(articleInfo);
      uploadArticle(this.articleInfo).then((res) => {
        console.log(res);
        this.hadUpload = true;
      });
      // uploadArticle(articleInfo).then(res=>{
      //   console.log(res);
      // })
      this.isDraft = 0;
    },   handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    
  },
  computed: {
    getPath() {
      return host() + "/api/upload/photo";
    },
    ...mapGetters(["user", "isAuthenticated"])
    ,keepContent(){
    let res = this.content.replace(/\r\n/g,'<br/>').replace(/\n/g,'<br/>').replace(/\s/g,' ')
    this.uploadcontent  = res
    return res
  }
  }
};
</script>

<style scoped>
.publish {
  margin-top: 20px;
}
.photo {
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.btn > a {
  font-size: 20px;
  text-decoration: none;
  color: #96cbcd;
  left: 0;
}
.text {
  margin-top: 20px;
}
.desc {
  color: #666666;
  font-size: 20px;
  margin-bottom: 20px;
}
.text-content , .text-tag{
  margin-top: 20px;
}
.text {
  margin-bottom: 40px;
}
.btn {
  display: flex;
  justify-content: space-between;
}
.img-alert {
  font-size: 14px;
  color: rgba(223, 67, 67, 0.801);
  margin-bottom: 20px;
}
.publish-alert {
  margin-bottom: 10px;
}
.had-upload > img {
  width: 100px;
  transform: rotate(-7deg);
}
.had-upload {
  width: 100%;
  margin: 100px auto;
  text-align: center;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>