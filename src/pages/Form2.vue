<template>
  <div class="p-6 font-sans max-w-4xl mx-auto">
    <!-- Chọn template -->
    <div class="flex flex-wrap gap-2 mb-4">
      <button
        v-for="tpl in templates"
        :key="tpl.id"
        @click="selectedTemplate = tpl"
        :class="[
          'px-4 py-2 rounded text-sm border',
          selectedTemplate.id === tpl.id
            ? 'bg-pink-500 text-white active'
            : 'bg-white hover:bg-gray-100',
        ]"
      >
        {{ tpl.name }}
      </button>
    </div>

    <!-- Form nhập liệu -->
    <div class="mb-6 grid-form">
      <div class="" style="display: flex; flex-direction: row; gap: 1rem">
        <!-- Cột 1: Tên, lớp, ảnh -->
        <div style="display: flex; flex-direction: column">
          <input
            id="studentName"
            v-model="studentName"
            placeholder="Nhập họ tên học sinh"
            class="input"
          />
          <input
            id="studentImage"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="input"
          />
        </div>
        <!-- Cột 2: Nhận xét -->
        <div class="flex flex-col gap-3 flex-1">
          <textarea
            id="comment"
            v-model="comment"
            rows="7"
            placeholder="Nhận xét..."
            class="input h-full min-h-[120px]"
          />
        </div>
      </div>
    </div>

    <!-- Preview khung -->
    <div
      ref="previewRef"
      class="relative w-[800px] h-[600px] mx-auto rounded overflow-hidden border shadow-lg khung_template"
      :class="`template-${selectedTemplate.id}`"
    >
      <img :src="selectedTemplate.bg" alt="Template" class="absolute inset-0" style="width: 100%"/>
      <div
        class="absolute inset-0 p-8 flex flex-col justify-between text-black content_wrap"
      >
        <div class="content">
          <div v-if="studentImage" class="avatar">
            <img :src="studentImage" alt="Avatar" />
          </div>
          <div
            class="border_avt"  
            v-if="[7].includes(selectedTemplate?.id)"
          ></div>
          <div class="name_wrap">
            <div class="name">{{ studentName }}</div>
          </div>
           <div class="class_wrap">
                   <img :src="class_tem" v-if="![9].includes(selectedTemplate?.id)">
                   <img :src="class_tem2" v-else>
          </div>
           <div class="charm1" v-if="[2, 10].includes(selectedTemplate?.id)">
                   <img :src="charm">
          </div>
          <div class="charm2" v-if="[3].includes(selectedTemplate?.id)">
                   <img :src="charm2">
          </div>
          <div class="charm3" v-if="[3].includes(selectedTemplate?.id)">
                   <img :src="charm2">
          </div>
          <div class="charm4" v-if="[3].includes(selectedTemplate?.id)">
                   <img :src="charm2">
          </div>
            <div class="charm5" v-if="[4,6,9].includes(selectedTemplate?.id)">
               <img :src="charm3">
          </div>
          <div class="mt-4 text-sm leading-relaxed whitespace-pre-line comment_wrap">
            {{ comment }}
          </div>
        </div>
      </div>
    </div>

    <!-- Nút tải ảnh -->
    <div class="text-center mt-6">
      <button
        @click="downloadImage"
        class="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        📥 Tải phiếu về
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import html2canvas from "html2canvas";
import template1 from "../assets/template2/1.png";
import template2 from "../assets/template2/2.png";
import template3 from "../assets/template2/3.png";
import template4 from "../assets/template2/4.png";
import template5 from "../assets/template2/5.png";
import template6 from "../assets/template2/6.png";
import template7 from "../assets/template2/7.png";
import template8 from "../assets/template2/8.png";
import template9 from "../assets/template2/9.png";
import template10 from "../assets/template2/10.png";
import class_tem from "../assets/template2/class.png";
import class_tem2 from "../assets/template2/class2.png";
import charm from "../assets/template2/charm1.png";
import charm2 from "../assets/template2/charm2.png";
import charm3 from "../assets/template2/charm3.png";

const templates = [
  { id: 1, name: "mẫu 1", bg: template1 },
  { id: 2, name: "mẫu 2", bg: template2 },
  { id: 3, name: "mẫu 3", bg: template3 },
  { id: 4, name: "mẫu 4", bg: template4 },
  { id: 5, name: "mẫu 5", bg: template5 },
  { id: 6, name: "mẫu 6", bg: template6 },
  { id: 7, name: "mẫu 7", bg: template7 },
  { id: 8, name: "mẫu 8", bg: template8 },
  { id: 9, name: "mẫu 9", bg: template9 },
  { id: 10, name: "mẫu 10", bg: template10 },
];

const selectedTemplate = ref(templates[0]);
const studentName = ref("");
const studentClass = ref("");
const comment = ref("");
const studentImage = ref(null);
const date = ref("");
const teacherName = ref("");

const previewRef = ref(null);

const formattedDate = computed(() => {
  if (!date.value) return "ngày ...... tháng ...... năm .....";
  const d = new Date(date.value);
  if (isNaN(d)) return "ngày ...... tháng ...... năm .....";
  return `ngày ${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
});

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      studentImage.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const downloadImage = async () => {
  const el = previewRef.value;
  const W = 1050;
  const H = 590.5;
  const avatarRect = el.querySelector(".avatar")?.getBoundingClientRect();

  const canvas = await html2canvas(el, {
    useCORS: true,
    scale: 2,
    width: W,
    height: H,
    windowWidth: W,
    windowHeight: H,
    scrollX: 0,
    scrollY: 0,
    onclone: (doc) => {
      const clonedRoot = doc.querySelector(".khung_template");
      if (clonedRoot instanceof HTMLElement) {
        clonedRoot.style.width = `${W}px`;
        clonedRoot.style.height = `${H}px`;
        clonedRoot.style.transform = "none";
      }
      const bg = doc.querySelector(".bg-img");
      if (bg instanceof HTMLImageElement) {
        bg.style.width = "100%";
        bg.style.height = "100%";
        bg.style.objectFit = "cover";
      }
      if (avatarRect) {
        const s = `${Math.round(avatarRect.width)}px`;
        const clonedAvatar = doc.querySelector(".avatar");
        if (clonedAvatar instanceof HTMLElement) {
          clonedAvatar.style.width = s;
          clonedAvatar.style.height = s;
        }
      }
      const clonedImg = doc.querySelector(".avatar img");
      if (clonedImg instanceof HTMLImageElement) {
        clonedImg.style.width = "100%";
        clonedImg.style.height = "100%";
        clonedImg.style.objectFit = "cover";
      }
    },
  });

  canvas.toBlob((blob) => {
    if (blob) {
      const link = document.createElement("a");
      link.download = `${studentName.value || "phieu-nhan-xet"}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
    } else {
      alert("Không thể tạo ảnh. Thử lại hoặc kiểm tra ảnh đầu vào.");
    }
  }, "image/png");
};
</script>

<style lang="scss" scoped>
.active {
  border: 1px solid red;
}
.input {
  @apply w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white shadow-sm transition duration-150 ease-in-out;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
.form-label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #d6336c;
  letter-spacing: 0.01em;
}
.grid-form {
  background: #fff0f6;
  border-radius: 1rem;
  box-shadow: 0 2px 12px 0 rgba(214, 51, 108, 0.08);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  margin-bottom: 2rem;
}
.template-1 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 317px;
      height: 317px;
      position: absolute;
      top: 176px;
      right: 67px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 450px;
      height: 450px;
      position: absolute;
      top: 275px;
      left: 84px;
      overflow: hidden;
      border: 10px solid #fcf7f8;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
         position: absolute;
        top: 4%;
        left: 18%;
        color: #d15555;
        width: 31%;
        text-align: right;
        font-family: cursive;
        font-style: italic;
        font-weight: bolder;
        text-shadow: 1px 1px 0 #00000078, 2px 2px 0 #00000078, 3px 3px 0 #00000078, 4px 4px 0 #00000078, 5px 5px 5px rgb(0 0 0 / 35%);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
      bottom: 6.5%;
      position: absolute;
      left: 20%;
    }
    .comment_wrap {
      width: 46%;
      position: absolute;
      left: 9%;
      color: #213547;
      font-family: emoji;
      top: 46%;
      font-size: 1.5rem;
      line-height: 1.3;
      font-weight: bold;
      font-style: italic;
      transform: translateY(-50%);
    }
  }
}
.template-2 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 346px;
      height: 346px;
      position: absolute;
      top: 129px;
      right: 77px;
      overflow: hidden;
      border-radius: 10px;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 450px;
      height: 450px;
      position: absolute;
      top: 275px;
      left: 84px;
      overflow: hidden;
      border: 10px solid #fcf7f8;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
         position: absolute;
        top: 5%;
        left: 20%;
        color: #ffc0cb;
        width: 31%;
        text-align: right;
        font-family: cursive;
        font-style: italic;
        font-weight: bolder;
        text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
      bottom: 5.5%;
      position: absolute;
      height: 50px;
      left: 19%;
      img{
        height: 100%;
      }
    }
    .charm1{
          width: 45px;
        right: 60px;
        top: 29px;
        position: absolute;
        transform: rotate(-49deg);
    }
    .comment_wrap {
        width: 46%;
        position: absolute;
        left: 2%;
        color: #213547;
        font-family: emoji;
        top: 51%;
        font-size: 1.5rem;
        line-height: 1.4;
        font-weight: bold;
        font-style: italic;
        transform: translateY(-50%);
    }
  }
}

.template-3 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 318px;
      height: 318px;
      position: absolute;
      top: 125px;
      left: 124px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 450px;
      height: 450px;
      position: absolute;
      top: 275px;
      left: 84px;
      overflow: hidden;
      border: 10px solid #fcf7f8;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
        position: absolute;
      top: 5%;
      left: 50%;
      color: #ffc0cb;
      text-align: right;
      font-family: cursive;
      font-style: italic;
      font-weight: bolder;
      text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
      transform: translateX(-50%);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
         bottom: 8%;
        position: absolute;
        height: 50px;
        left: 57%;
      img{
        height: 100%;
      }
    }
    .charm1{
          width: 45px;
        right: 60px;
        top: 29px;
        position: absolute;
        transform: rotate(-49deg);
    }
    .charm2{
          width: 89px;
        height: 89px;
        position: absolute;
        top: 329px;
        left: 368px;
        img{
          width:100%;
          border-radius: 50%;
        }
    }
    .charm3{
            width: 63px;
          height: 63px;
          position: absolute;
          top: 320px;
          left: 103px;
        img{
          width:100%;
          border-radius: 50%;
        }
    }
    .charm4{
       width: 44px;
      height: 44px;
      position: absolute;
      top: 245px;
      left: 417px;
        img{
          width:100%;
          border-radius: 50%;
        }
    }
    .comment_wrap {
          width: 45%;
      position: absolute;
      right: 6%;
      color: #213547;
      font-family: emoji;
      top: 46%;
      font-size: 1.5rem;
      line-height: 1.5;
      font-weight: bold;
      font-style: italic;
      transform: translateY(-50%);
    }
  }
}
.template-4 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 297px;
      height: 297px;
      position: absolute;
      top: 137px;
      right: 96px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 450px;
      height: 450px;
      position: absolute;
      top: 275px;
      left: 84px;
      overflow: hidden;
      border: 10px solid #fcf7f8;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
        position: absolute;
      top: 5%;
      left: 50%;
      color: #ffc0cb;
      text-align: right;
      font-family: cursive;
      font-style: italic;
      font-weight: bolder;
      text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
      transform: translateX(-50%);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
         bottom: 8%;
        position: absolute;
        height: 50px;
        left: 25%;
      img{
        height: 100%;
      }
    }
    .charm5{
      width: 76px;
      position: absolute;
      right: 82px;
      bottom: 145px;
      transform: rotate(-36deg);
        img{
          width:100%;
        }
    }
    .comment_wrap {
      width: 46%;
      position: absolute;
      left: 9%;
      color: #213547;
      font-family: emoji;
      top: 50%;
      font-size: 1.5rem;
      line-height: 1.5;
      font-weight: bold;
      font-style: italic;
      transform: translateY(-50%);
    }
  }
}
.template-5 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 306px;
      height: 297px;
      position: absolute;
      top: 167px;
      left: 88px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 450px;
      height: 450px;
      position: absolute;
      top: 275px;
      left: 84px;
      overflow: hidden;
      border: 10px solid #fcf7f8;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
        position: absolute;
      top: 5%;
      left: 50%;
      color: #ffc0cb;
      text-align: right;
      font-family: cursive;
      font-style: italic;
      font-weight: bolder;
      text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
      transform: translateX(-50%);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
         bottom: 8%;
        position: absolute;
        height: 50px;
        left: 60%;
      img{
        height: 100%;
      }
    }
    .charm5{
      width: 76px;
      position: absolute;
      right: 82px;
      bottom: 145px;
      transform: rotate(-36deg);
        img{
          width:100%;
        }
    }
    .comment_wrap {
      width: 41%;
      position: absolute;
      left: 49.5%;
      color: #213547;
      font-family: emoji;
      top: 52%;
      font-size: 1.5rem;
      line-height: 1.3;
      font-weight: bold;
      font-style: italic;
      transform: translateY(-50%);
    }
  }
}
.template-6 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 305px;
      height: 305px;
      position: absolute;
      top: 113px;
      right: 123px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 450px;
      height: 450px;
      position: absolute;
      top: 275px;
      left: 84px;
      overflow: hidden;
      border: 10px solid #fcf7f8;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
        position: absolute;
          top: 10%;
      left: 40%;
      color: #ffc0cb;
      text-align: right;
      font-family: cursive;
      font-style: italic;
      font-weight: bolder;
      text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
      transform: translateX(-50%);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
         bottom: 8%;
        position: absolute;
        height: 50px;
        left: 60%;
      img{
        height: 100%;
      }
    }
    .charm5{
      width: 76px;
      position: absolute;
      right: 82px;
      bottom: 145px;
      transform: rotate(-36deg);
        img{
          width:100%;
        }
    }
    .comment_wrap {
      width: 38.5%;
      position: absolute;
      left: 16%;
      color: #213547;
      font-family: emoji;
      top: 50%;
      font-size: 1.5rem;
      line-height: 1.3;
      font-weight: bold;
      font-style: italic;
      transform: translateY(-50%);
    }
  }
}
.template-7 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 355px;
      height: 355px;
      position: absolute;
      top: 124px;
      left: 92px;
      border-radius: 20px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 331px;
      height: 331px;
      position: absolute;
      top: 135px;
      left: 100px;
      overflow: hidden;
      border: 4px solid #fcf7f8;
      border-radius: 10px;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
        position: absolute;
        top: 4%;
        left: 44%;
        width: 35%;
        color: #ffc0cb;
        text-align: center;
        font-family: cursive;
        font-style: italic;
        font-weight: bolder;
        text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
        transform: translateX(-50%);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
      bottom: 5%;
      position: absolute;
      height: 50px;
      left: 51%;
      img{
        height: 100%;
      }
    }
    .charm5{
      width: 76px;
      position: absolute;
      right: 82px;
      bottom: 145px;
      transform: rotate(-36deg);
        img{
          width:100%;
        }
    }
    .comment_wrap {
      width: 45.5%;
      position: absolute;
      right: 4%;
      color: #213547;
      font-family: emoji;
      top: 55%;
      font-size: 1.5rem;
      line-height: 1.7;
      font-weight: bold;
      font-style: italic;
      transform: translateY(-50%);
    }
  }
}
.template-8 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 320px;
      height: 320px;
      position: absolute;
      top: 142px;
      left: 92px;
      border-radius: 54px 54px 35px 35px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 331px;
      height: 331px;
      position: absolute;
      top: 135px;
      left: 100px;
      overflow: hidden;
      border: 4px solid #fcf7f8;
      border-radius: 10px;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
        position: absolute;
        top: 4%;
        left: 63%;
        width: 35%;
        color: #ffc0cb;
        text-align: center;
        font-family: cursive;
        font-style: italic;
        font-weight: bolder;
        text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
        transform: translateX(-50%);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
      bottom: 5%;
      position: absolute;
      height: 50px;
      left: 54%;
      img{
        height: 100%;
      }
    }
    .charm5{
      width: 76px;
      position: absolute;
      right: 82px;
      bottom: 145px;
      transform: rotate(-36deg);
        img{
          width:100%;
        }
    }
    .comment_wrap {
      width: 42.5%;
      position: absolute;
      right: 13%;
      color: #213547;
      font-family: emoji;
      top: 50%;
      font-size: 1.5rem;
      line-height: 1.7;
      font-weight: bold;
      font-style: italic;
      transform: translateY(-50%);
    }
  }
}
.template-9 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 330px;
      height: 330px;
      position: absolute;
      top: 109px;
      right: 110px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 331px;
      height: 331px;
      position: absolute;
      top: 135px;
      left: 100px;
      overflow: hidden;
      border: 4px solid #fcf7f8;
      border-radius: 10px;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
        position: absolute;
        top: 4%;
        left: 50%;
        width: 100%;
        color: #ffc0cb;
        text-align: center;
        font-family: cursive;
        font-style: italic;
        font-weight: bolder;
        text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
        transform: translateX(-50%);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
      bottom: 7%;
      position: absolute;
      height: 50px;
      left: 20%;
      img{
        height: 100%;
      }
    }
    .charm5{
      width: 86px;
      position: absolute;
      right: 82px;
      bottom: 145px;
      transform: rotate(-36deg);
        img{
          width:100%;
        }
    }
    .comment_wrap {
          width: 46.5%;
          position: absolute;
          left: 8%;
          color: #213547;
          font-family: emoji;
          top: 51%;
          font-size: 1.5rem;
          line-height: 1.5;
          font-weight: bold;
          font-style: italic;
          transform: translateY(-50%);
    }
  }
}
.template-10 {
  .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
      width: 346px;
      height: 346px;
      position: absolute;
      top: 129px;
      right: 77px;
      overflow: hidden;
      border-radius: 10px;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt {
      width: 450px;
      height: 450px;
      position: absolute;
      top: 275px;
      left: 84px;
      overflow: hidden;
      border: 10px solid #fcf7f8;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 18%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
         position: absolute;
        top: 16%;
        left: 9%;
        color: #ffc0cb;
        width: 31%;
        text-align: right;
        font-family: cursive;
        font-style: italic;
        font-weight: bolder;
        text-shadow: -3px -3px 0 #e75480, 3px -3px 0 #e75480, -3px 3px 0 #e75480, 3px 3px 0 #e75480, -4px 0px 0 #e75480, 4px 0px 0 #e75480, 0px -4px 0 #e75480, 0px 4px 0 #e75480, 0 0 6px rgba(231, 84, 128, 0.6);
      .name {
        font-size: 3rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
    }
    .class_wrap{
      bottom: 5.5%;
      position: absolute;
      height: 50px;
      left: 19%;
      img{
        height: 100%;
      }
    }
    .charm1{
          width: 45px;
        right: 60px;
        top: 29px;
        position: absolute;
        transform: rotate(-49deg);
    }
    .comment_wrap {
      width: 50%;
      position: absolute;
      left: 3%;
      color: #213547;
      font-family: emoji;
      top: 50%;
      font-size: 1.5rem;
      line-height: 1.7;
      font-weight: bold;
      font-style: italic;
      transform: translateY(-50%);
    }
  }
}
.content_wrap {
  width: 100%;
  height: 100%;
  top: 0;
  position: ABSOLUTE;
  left: 0;
  overflow:hidden;
}
.khung_template {
  position: relative;
  width: 1050px;
  height: 590.5px;
}
</style>

