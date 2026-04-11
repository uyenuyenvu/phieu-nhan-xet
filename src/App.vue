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
            id="studentClass"
            v-model="studentClass"
            placeholder="Lớp"
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
        <!-- Cột 3: Ngày và giáo viên chủ nhiệm -->
         <!--<div style="display: flex; flex-direction: column">
          <input
            id="date"
            type="date"
            v-model="date"
            class="input"
            placeholder="Chọn ngày"
          />
          <input
            id="teacherName"
            v-model="teacherName"
            placeholder="Tên giáo viên chủ nhiệm"
            class="input"
          />
        </div> -->
      </div>
    </div>

    <!-- Preview khung -->
    <div
      ref="previewRef"
      class="relative w-[800px] h-[600px] mx-auto rounded overflow-hidden border shadow-lg khung_template"
      :class="`template-${selectedTemplate.id}`"
    >
      <img :src="selectedTemplate.bg" alt="Template" class="absolute inset-0" />
      <!-- Khung nền sẽ thay đổi theo class template-1, 2, 3... -->
      <div
        class="absolute inset-0 p-8 flex flex-col justify-between text-black content_wrap"
      >
        <div class="content">
          <div v-if="studentImage" class="avatar">
            <img :src="studentImage" alt="Avatar" />
          </div>
          <div class="border_avt" v-if="[1,4].includes(selectedTemplate?.id)"></div>
           <div class="name_wrap">
            <div class="name">{{ studentName }}</div>
            <div class="class">{{ studentClass }}</div>
          </div> 

          <div
            class="mt-4 text-sm leading-relaxed whitespace-pre-line comment_wrap"
          >
            {{ comment }}
          </div>

           <!--<div class="text-right mt-6 text-sm date_wrap">
            <div>{{ formattedDate }}</div>
            <div class="mt-2 font-semibold">Giáo viên chủ nhiệm</div>
            <div class="mt-2 font-semibold">{{ teacherName || "..." }}</div>
          </div> -->
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
import template1 from "./assets/templates/1.png";
import template2 from "./assets/templates/2.png";
import template3 from "./assets/templates/3.png";
import template4 from "./assets/templates/4.png";
import template5 from "./assets/templates/5.png";
import template6 from "./assets/templates/6.png";


// Danh sách template
const templates = [
  { id: 1, name: "mẫu 1", bg: template1 },
  { id: 2, name: "mẫu 2", bg: template2 },
  { id: 3, name: "mẫu 3", bg: template3 },
  { id: 4, name: "mẫu 4", bg: template4 },
  { id: 5, name: "mẫu 5", bg: template5 },
  { id: 6, name: "mẫu 6", bg: template6 },
];

// Trạng thái
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
  // Khung thiết kế cố định 1536x1024 (đồng bộ với CSS `.khung_template`)
  const W = 1536;
  const H = 1024;
  const avatarRect = el.querySelector(".avatar")?.getBoundingClientRect();

  const canvas = await html2canvas(el, {
    useCORS: true, // rất quan trọng nếu bạn dùng hình ảnh từ file hoặc background có SVG
    scale: 2, // tăng độ nét cho ảnh xuất ra
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
      // Ép kích thước vuông trong bản clone để tránh làm tròn khác khi render canvas
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

<style lang="scss">
.active{
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
      width: 493px;
      height: 493px;
      position: absolute;
      top: 265px;
      left: 74px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt{
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
        top: 76%;
        left: 4%;
        color: #000000;
        width: 34%;
        text-align: center;
      .name {
        font-size: 2.5rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
      .class {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.4;
        font-style: italic;
      }
    }
    .comment_wrap {
      width: 50%;
      position: absolute;
      right: 10%;
      color: #213547;
      font-family: emoji;
      top: 48%;
      font-size: 2rem;
      line-height: 1.6;
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
        width: 422px; /* ~27.5% của 1536px */
        height: 422px;
        border-radius: 50%;
        position: absolute;
        top: 26.6%;
        left: 10%;
        overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
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
      top: 71%;
      left: 9%;
      color: #000000;
      width: 30%;
      text-align: center;
      .name {
        font-size: 2.5rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
      .class {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.4;
        font-style: italic;
      }
    }
    .comment_wrap {
      width: 50%;
      position: absolute;
      right: 10%;
      color: #213547;
      font-family: emoji;
      top: 48%;
      font-size: 2rem;
      line-height: 1.6;
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
        width: 443px;
      height: 443px;
      border-radius: 50%;
      position: absolute;
      top: 30%;
      left: 11%;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
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
        top: 77%;
        left: 9%;
        color: #000000;
        width: 33%;
        text-align: center;
      .name {
        font-size: 2.5rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
      .class {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.4;
        font-style: italic;
      }
    }
    .comment_wrap {
          width: 50%;
        position: absolute;
        right: 8%;
        color: #213547;
        font-family: emoji;
        top: 48%;
        font-size: 2rem;
        line-height: 1.6;
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
         width: 505px;
      height: 505px;
      position: absolute;
      top: 255px;
      left: 121px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .border_avt{
      width: 450px;
      height: 450px;
      position: absolute;
      top: 273px;
      left: 138px;
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
        top: 76%;
        left: 4%;
        color: #000000;
        width: 34%;
        text-align: center;
      .name {
        font-size: 2.5rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
      .class {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.4;
        font-style: italic;
      }
    }
    .comment_wrap {
      width: 47%;
      position: absolute;
      right: 10%;
      color: #213547;
      font-family: emoji;
      top: 48%;
      font-size: 2rem;
      line-height: 1.6;
      font-weight: bold;
      transform: translateY(-50%);
      font-style: italic;
    }
  }
}

.template-5 {
    .content {
    position: relative;
    width: 100%;
    height: 100%;
    .avatar {
           width: 445px;
      height: 445px;
      border-radius: 50%;
      position: absolute;
      top: 251px;
      left: 133px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .date_wrap {
      position: absolute;
      bottom: 18%;
      right: 25%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
      position: absolute;
      top: 71%;
      left: 9%;
      color: #000000;
      width: 30%;
      text-align: center;
      .name {
        font-size: 2.5rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
      .class {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.4;
        font-style: italic;
      }
    }
    .comment_wrap {
      width: 54%;
      position: absolute;
      right: 5%;
      color: #213547;
      font-family: emoji;
      top: 48%;
      font-size: 2rem;
      line-height: 1.6;
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
          width: 443px;
      height: 443px;
      border-radius: 50% 50% 0 0;
      position: absolute;
      top: 322px;
      left: 131px;
      overflow: hidden;
    }
    .avatar img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 25%;
      color: #213547;
      font-family: auto;
      font-size: 1.5rem;
      line-height: 1.4;
      font-style: italic;
    }
    .name_wrap {
          position: absolute;
        top: 75%;
        left: 7%;
        color: #000000;
        width: 32%;
        text-align: center;
      .name {
        font-size: 2.5rem;
        line-height: 1.2;
        margin-bottom: 15px;
        font-weight: 700;
      }
      .class {
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.4;
        font-style: italic;
      }
    }
    .comment_wrap {
          width: 52%;
        position: absolute;
        right: 7%;
       color: #213547;
      font-family: emoji;
        top: 52%;
        font-size: 2rem;
      line-height: 1.6;
        transform: translateY(-50%);
      font-style: italic;
      font-weight: bold;
    }
  }
}

.content_wrap {
  width: 100%;
  height: 100%;
  top: 0;
  position: ABSOLUTE;
  left: 0;
}
.khung_template {
  position: relative;
  width: 1536px;
  height: 1024px;
}
</style>
