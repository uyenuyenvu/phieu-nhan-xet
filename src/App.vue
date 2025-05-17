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
            ? 'bg-pink-500 text-white'
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
        <div style="display: flex; flex-direction: column">
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
        </div>
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
          <img
            v-if="studentImage"
            :src="studentImage"
            class="w-36 h-36 rounded-full border object-cover"
          />
          <div class="name_wrap">
            <div class="name">{{ studentName }}</div>
            <div class="class">{{ studentClass }}</div>
          </div>

          <div
            class="mt-4 text-sm leading-relaxed whitespace-pre-line comment_wrap"
          >
            {{ comment }}
          </div>

          <div class="text-right mt-6 text-sm date_wrap">
            <div>{{ formattedDate }}</div>
            <div class="mt-2 font-semibold">Giáo viên chủ nhiệm</div>
            <div class="mt-2 font-semibold">{{ teacherName || "..." }}</div>
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
import template1 from "./assets/templates/1.png";
// import template2 from "@/assets/templates/2.png";
// import template3 from "@/assets/templates/3.png";
// import template4 from "@/assets/templates/4.png";

// Danh sách template
const templates = [
  { id: 1, name: "mẫu 1", bg: template1 },
  //   { id: 2, name: "Trường học vui vẻ", bg: "/templates/template2.png" },
  //   { id: 3, name: "Mây xanh chim hót", bg: "/templates/template3.png" },
  //   { id: 4, name: "Bé ngoan năng động", bg: "/templates/template4.png" },
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
  const canvas = await html2canvas(previewRef.value);
  const link = document.createElement("a");
  link.download = `${studentName.value || "phieu-nhan-xet"}.png`;
  link.href = canvas.toDataURL();
  link.click();
};
</script>

<style lang="scss">
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
    img {
      width: 21%;
      object-fit: cover;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      position: absolute;
      top: 18%;
      left: 10.3%;
    }
    .date_wrap {
      position: absolute;
      bottom: 15%;
      right: 10%;
      color: darkred;
      font-family: cursive;
      font-size: 1.125rem;
      line-height: 1.4;
    }
    .name_wrap {
      position: absolute;
      top: 43%;
      left: 6%;
      color: #00a69c;
      width: 30%;
      text-align: center;
      .name {
        font-size: 2rem;
        line-height: 1.2;
        margin-bottom: 23px;
        font-weight: 700;
      }
      .class {
        font-size: 1.125rem;
        line-height: 1.4;
      }
    }
    .comment_wrap {
      width: 55%;
      position: absolute;
      right: 5%;
      color: darkred;
      font-family: cursive;
      top: 37%;
      font-size: 1.5rem;
      line-height: 1.6;
    }
  }
}

.template-2 {
  background: linear-gradient(to bottom, #fceabb, #f8b500);
  background-image: url("/bg/rainbow.svg"); /* cầu vồng, bóng bay */
  background-repeat: no-repeat;
  background-position: center;
}

.template-3 {
  background: linear-gradient(to right, #cce5ff, #e6f7ff);
  background-image: url("/bg/space.svg"); /* tên lửa, hành tinh */
  background-size: cover;
}

.template-4 {
  background: linear-gradient(to bottom left, #fff0f6, #f9f0ff);
  background-image: url("/bg/toys.svg"); /* gấu bông, đồ chơi */
  background-size: cover;
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
}
</style>
