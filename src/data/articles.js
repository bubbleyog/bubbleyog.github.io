// 文章数据管理
// 从 Markdown 文件读取文章数据

export const categories = {
  physics: {
    id: "physics",
    name: "物理",
    description: "关于物理学的知识、新闻和讨论。",
    icon: "⚛️",
    color: "#f59e0b",
  },
  computer: {
    id: "computer",
    name: "计算机",
    description: "计算机使用，Linux系统及FPGA开发心得。",
    icon: "💻",
    color: "#3b82f6",
  },
  deeplearning: {
    id: "deeplearning",
    name: "深度学习",
    description: "深度学习原理与AI前沿的探讨",
    icon: "🧠",
    color: "#8b5cf6",
  },
  misc: {
    id: "misc",
    name: "杂谈",
    description: "学习方法、感想与思想。",
    icon: "☕",
    color: "#10b981",
  },
};

// 文章数据数组（会被 loadArticlesFromMarkdown 填充）
let articles = [];

// 从 Markdown 文件加载文章数据
// 注意：这个函数需要在 Astro 组件的 frontmatter 中调用
export async function loadArticlesFromMarkdown() {
  try {
    // 使用动态导入来读取 Markdown 文件
    const markdownFiles = import.meta.glob("../content/articles/*.md", {
      eager: true,
    });

    const loadedArticles = [];

    for (const path in markdownFiles) {
      const module = markdownFiles[path];
      const frontmatter = module.frontmatter || {};

      // 从文件路径提取文章 ID
      const id = path.replace("../content/articles/", "").replace(".md", "");

      loadedArticles.push({
        id: id,
        title: frontmatter.title || "无标题",
        category: frontmatter.category || "misc",
        date: frontmatter.date || new Date().toISOString().split("T")[0],
        description: frontmatter.description || "",
        tags: frontmatter.tags || [],
        content: module.default || "",
      });
    }

    articles = loadedArticles;
    return loadedArticles;
  } catch (error) {
    console.error("加载 Markdown 文章失败:", error);
    articles = [];
    return [];
  }
}

// 获取所有文章
export function getAllArticles() {
  return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 根据分类获取文章
export function getArticlesByCategory(categoryId) {
  return articles
    .filter((article) => article.category === categoryId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 获取单篇文章
export function getArticleById(id) {
  return articles.find((article) => article.id === id);
}

// 获取最新文章
export function getLatestArticles(limit = 5) {
  return getAllArticles().slice(0, limit);
}

// 获取所有分类
export function getAllCategories() {
  return Object.values(categories);
}

// 获取分类信息
export function getCategoryById(id) {
  return categories[id];
}
