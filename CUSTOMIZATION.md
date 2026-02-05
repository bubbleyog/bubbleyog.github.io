# 🎨 网站定制指南

本文档帮助你了解如何定制这个 Astro 深色主题个人作品集网站。

---

## 📁 文件结构

```
bubbleyog/
├── src/
│   ├── components/      # 组件文件夹
│   │   ├── Header.astro     # 导航头部
│   │   ├── Hero.astro       # 首页主区域
│   │   ├── About.astro      # 关于我
│   │   ├── Projects.astro   # 项目展示
│   │   ├── Skills.astro     # 技能专长
│   │   ├── Contact.astro    # 联系方式
│   │   └── Footer.astro     # 页脚
│   ├── layouts/         # 布局文件夹
│   │   └── Layout.astro     # 主布局
│   ├── pages/           # 页面文件夹
│   │   └── index.astro      # 首页
│   └── styles/          # 样式文件夹
│       └── global.css       # 全局样式
├── .github/workflows/   # GitHub Actions
│   └── deploy.yml
├── astro.config.mjs     # Astro 配置
└── package.json
```

---

## 🎨 修改颜色主题

所有颜色变量都在 `src/styles/global.css` 的 `:root` 中定义：

```css
:root {
  /* 背景颜色 */
  --bg-primary: #0a0a0a;      /* 主背景 */
  --bg-secondary: #141414;    /* 次级背景 */
  --bg-tertiary: #1a1a1a;     /* 第三级背景 */
  --bg-card: #1f1f1f;         /* 卡片背景 */
  
  /* 文字颜色 */
  --text-primary: #ffffff;    /* 主文字 */
  --text-secondary: #a0a0a0;  /* 次级文字 */
  --text-muted: #666666;      /* 弱化文字 */
  
  /* 强调色 - 渐变 */
  --accent-primary: #6366f1;   /* 主强调色（靛蓝） */
  --accent-secondary: #8b5cf6; /* 次强调色（紫） */
}
```

### 推荐配色方案

**1. 蓝青色主题**
```css
--accent-primary: #06b6d4;
--accent-secondary: #3b82f6;
```

**2. 橙红色主题**
```css
--accent-primary: #f97316;
--accent-secondary: #ef4444;
```

**3. 绿青色主题**
```css
--accent-primary: #10b981;
--accent-secondary: #06b6d4;
```

**4. 粉紫色主题**
```css
--accent-primary: #ec4899;
--accent-secondary: #8b5cf6;
```

---

## 📝 修改个人信息

### 1. 首页主区域 (Hero.astro)

修改姓名和简介：

```astro
<!-- 第 15 行 -->
<h1 class="hero-title">
  你好，我是 <span class="gradient-text">你的名字</span>
</h1>

<!-- 第 20 行 -->
<p class="hero-subtitle">
  你的职位 / 身份描述
</p>

<!-- 第 24 行 -->
<p class="hero-description">
  你的个人简介...
</p>
```

修改社交链接（第 44-60 行）：

```astro
<a href="https://github.com/yourusername" class="social-icon" aria-label="GitHub">
```

### 2. 关于我 (About.astro)

修改统计数据（第 4-9 行）：

```javascript
const stats = [
  { number: '5+', label: '年经验' },
  { number: '100+', label: '完成项目' },
  // ...
];
```

修改个人介绍文字（第 20-30 行）。

### 3. 项目展示 (Projects.astro)

修改项目列表（第 4-33 行）：

```javascript
const projects = [
  {
    title: '你的项目名',
    description: '项目描述...',
    tags: ['技术栈1', '技术栈2'],
    image: '🎨',  // 使用 emoji 或替换为真实图片
    demo: 'https://demo-link.com',
    github: 'https://github.com/...',
  },
  // ...
];
```

### 4. 技能专长 (Skills.astro)

修改技能列表（第 4-30 行）：

```javascript
const skillCategories = [
  {
    title: '前端开发',
    skills: [
      { name: '你的技能', level: 90 },  // level: 0-100
    ],
  },
];
```

### 5. 联系方式 (Contact.astro)

修改联系信息（第 4-20 行）：

```javascript
const contactInfo = [
  {
    icon: '📧',
    label: '邮箱',
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
  },
];
```

### 6. 页脚 (Footer.astro)

修改版权信息（第 5 行）：

```javascript
const currentYear = new Date().getFullYear();
```

修改页脚描述（第 31-33 行）。

---

## 🖼️ 添加真实图片

目前使用 emoji 作为项目图片占位符。要添加真实图片：

1. 将图片放入 `public/` 文件夹
2. 在组件中引用：

```astro
<!-- Projects.astro -->
<div class="project-image">
  <img src="/project1.jpg" alt="项目名称" />
</div>
```

---

## 🔤 修改字体

在 `src/layouts/Layout.astro` 中修改字体：

```html
<!-- 替换 Google Fonts 链接 -->
<link href="https://fonts.googleapis.com/css2?family=你的字体&display=swap" rel="stylesheet">
```

在 `src/styles/global.css` 中更新字体：

```css
body {
  font-family: '你的字体', sans-serif;
}
```

---

## 📄 添加新页面

1. 在 `src/pages/` 创建新文件，例如 `about.astro`：

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="关于我">
  <Header />
  <main>
    <!-- 页面内容 -->
  </main>
  <Footer />
</Layout>
```

2. 更新导航链接（在 `Header.astro` 中）

---

## 🚀 部署更新

修改完成后，提交并推送到 GitHub：

```bash
# 添加所有修改
git add .

# 提交
git commit -m "更新网站内容"

# 推送
git push origin main
```

GitHub Actions 会自动构建并部署更新。

---

## 💡 常见问题

### 1. 如何修改网站标题和描述？

在 `src/pages/index.astro` 中：

```astro
<Layout 
  title="你的新标题" 
  description="你的新描述"
>
```

### 2. 如何修改网站 URL？

在 `astro.config.mjs` 中：

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  output: 'static',
});
```

### 3. 表单提交如何工作？

目前表单只是演示，需要后端支持。建议使用：
- [Formspree](https://formspree.io/) - 免费表单处理
- [Netlify Forms](https://docs.netlify.com/forms/setup/)
- [Google Forms](https://forms.google.com)

### 4. 如何添加 Google Analytics？

在 `src/layouts/Layout.astro` 的 `<head>` 中添加跟踪代码。

---

## 📚 更多资源

- [Astro 文档](https://docs.astro.build/)
- [CSS 变量指南](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
- [GitHub Pages 文档](https://docs.github.com/zh/pages)
