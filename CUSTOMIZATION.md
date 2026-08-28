# 🎨 网站定制指南

本文档帮助你了解如何定制这个基于 Astro 的深色主题博客网站。

---

## 📁 文件结构

```
quallucan/
├── src/
│   ├── components/          # 组件文件夹
│   │   ├── Header.astro         # 导航头部
│   │   ├── Hero.astro           # 首页主区域
│   │   ├── ArticleCard.astro    # 文章卡片
│   │   ├── ArticleList.astro    # 文章列表
│   │   ├── CategorySection.astro # 分类展示
│   │   └── Footer.astro         # 页脚
│   ├── content/
│   │   └── articles/            # Markdown 文章存放目录
│   │       ├── quantum-mechanics.md
│   │       ├── relativity-intro.md
│   │       ├── distributed-systems.md
│   │       ├── neural-networks-intro.md
│   │       └── learning-method.md
│   ├── data/
│   │   └── articles.js          # 文章数据配置
│   ├── layouts/             # 布局文件夹
│   │   └── Layout.astro         # 主布局
│   ├── pages/               # 页面文件夹
│   │   ├── index.astro          # 首页
│   │   ├── about.astro          # 关于页面
│   │   ├── category/
│   │   │   └── [id].astro       # 分类页面（动态路由）
│   │   └── article/
│   │       └── [id].astro       # 文章详情页（动态路由）
│   └── styles/              # 样式文件夹
│       └── global.css           # 全局样式
├── .github/workflows/       # GitHub Actions
│   └── deploy.yml
├── astro.config.mjs         # Astro 配置
├── package.json
└── CUSTOMIZATION.md         # 本文件
```

---

## 📝 发布新文章

### 方法：两步添加新文章

#### 第一步：创建 Markdown 文件

在 `src/content/articles/` 目录下创建新的 `.md` 文件，文件名建议使用英文小写和连字符：

```bash
# 示例：创建一篇新文章
src/content/articles/my-new-article.md
```

文件内容格式：

```markdown
---
title: "文章标题"
category: "physics"          # 可选：physics / computer / deeplearning / misc
date: "2024-02-10"           # 发布日期
description: "文章简介，会显示在卡片上"
tags: ["标签1", "标签2", "标签3"]  # 文章标签
---

# 正文标题

这里是文章正文内容，支持完整的 Markdown 语法。

## 二级标题

- 列表项 1
- 列表项 2
- 列表项 3

### 代码块

```javascript
function hello() {
  console.log("Hello, World!");
}
```

### 引用

> 这是一段引用文字

### 链接

[链接文字](https://example.com)

### 强调

**粗体文字** 和 *斜体文字*
```

#### 第二步：注册文章数据

编辑 `src/data/articles.js`，在 `articles` 数组中添加文章信息：

```javascript
export const articles = [
  // 已有文章...
  
  {
    id: 'my-new-article',        // 必须与文件名一致（不含 .md）
    title: '文章标题',
    category: 'physics',         // 分类：physics/computer/deeplearning/misc
    date: '2024-02-10',          // 日期
    description: '文章简介，会显示在卡片上',
    tags: ['标签1', '标签2'],   // 标签
  },
];
```

#### 第三步：提交并推送

```bash
cd quallucan
git add .
git commit -m "添加新文章：文章标题"
git push origin main
```

等待 1-2 分钟后，网站会自动更新。

---

## 📂 文章分类说明

网站有四大分类，在添加文章时选择对应的 `category`：

| 分类 ID | 名称 | 图标 | 颜色 |
|---------|------|------|------|
| `physics` | 物理 | ⚛️ | 橙色 #f59e0b |
| `computer` | 计算机 | 💻 | 蓝色 #3b82f6 |
| `deeplearning` | 深度学习 | 🧠 | 紫色 #8b5cf6 |
| `misc` | 杂谈 | ☕ | 绿色 #10b981 |

### 添加新分类（高级）

如需添加新分类，编辑 `src/data/articles.js`：

```javascript
export const categories = {
  // 已有分类...
  
  newcategory: {
    id: 'newcategory',
    name: '新分类',
    description: '分类描述',
    icon: '🎯',              # Emoji 图标
    color: '#ff6b6b',        # 主题色
  },
};
```

---

## ✏️ 修改现有文章

直接编辑 `src/content/articles/` 下的 Markdown 文件，修改后提交推送即可。

```bash
# 修改文章
cd quallucan
# 编辑 src/content/articles/xxx.md

git add .
git commit -m "更新文章：xxx"
git push origin main
```

---

## 🎨 修改颜色主题

所有颜色变量在 `src/styles/global.css` 的 `:root` 中定义：

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

## 🏠 修改首页内容

### 修改主标题和描述

编辑 `src/components/Hero.astro`：

```astro
<h1 class="hero-title">
  探索知识的<br />
  <span class="gradient-text">无限可能</span>
</h1>

<p class="hero-subtitle">
  记录学习物理、计算机、深度学习的心得与思考
</p>
```

### 修改首页显示文章数量

编辑 `src/pages/index.astro`：

```astro
<!-- 显示 6 篇最新文章 -->
<ArticleList limit={6} />

<!-- 改为显示 10 篇 -->
<ArticleList limit={10} />
```

---

## 👤 修改关于页面

编辑 `src/pages/about.astro`：

- 修改博客介绍
- 修改个人介绍
- 修改联系方式

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

## 🚀 部署更新

修改完成后，提交并推送到 GitHub：

```bash
# 进入项目目录
cd quallucan

# 添加所有修改
git add .

# 提交（写上描述本次修改的说明）
git commit -m "更新网站内容"

# 推送到 GitHub
git push origin main
```

GitHub Actions 会自动构建并部署更新。等待 1-2 分钟后刷新网站查看效果。

---

## 💡 常见问题

### 1. 如何修改网站标题和描述？

在 `src/pages/index.astro` 中：

```astro
<Layout 
  title="Blog - 技术博客" 
  description="记录学习物理、计算机、深度学习的心得与思考。"
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

### 3. 文章中的图片怎么用？

1. 将图片放入 `public/` 文件夹，例如 `public/images/my-image.jpg`
2. 在 Markdown 中引用：

```markdown
![图片描述](/images/my-image.jpg)
```

### 4. 如何添加代码高亮？

代码块会自动高亮，只需指定语言：

````markdown
```python
def hello():
    print("Hello, World!")
```
````

### 5. 文章可以嵌套子目录吗？

目前不支持，所有文章都直接放在 `src/content/articles/` 目录下。

### 6. 文章日期格式是什么？

使用 `YYYY-MM-DD` 格式，例如 `2024-02-10`。

### 7. 如何删除文章？

1. 删除 `src/content/articles/` 下的 Markdown 文件
2. 删除 `src/data/articles.js` 中对应的数据
3. 提交推送

---

## 📝 Markdown 语法参考

文章支持标准 Markdown 语法：

| 语法 | 效果 |
|------|------|
| `# 标题` | 一级标题 |
| `## 标题` | 二级标题 |
| `**粗体**` | **粗体** |
| `*斜体*` | *斜体* |
| `` `代码` `` | `代码` |
| `[链接](url)` | [链接](url) |
| `![图片](url)` | 图片 |
| `- 列表` | 无序列表 |
| `1. 列表` | 有序列表 |
| `> 引用` | 引用块 |
| `\|表格\|` | 表格 |

---

## 📚 更多资源

- [Astro 文档](https://docs.astro.build/)
- [Markdown 指南](https://www.markdownguide.org/)
- [CSS 变量指南](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)
- [GitHub Pages 文档](https://docs.github.com/zh/pages)
