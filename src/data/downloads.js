// 下载中心数据管理
//
// 结构说明：
// - groups：分组（课程）元数据。每个分组对应 public/downloads/<folder>/ 一个真实目录。
//   新增分组 = 在 public/downloads/ 下建一个同名 folder 目录 + 在此文件 groups 里加一条。
// - files：下载文件条目。folder 字段指向所属分组，fileName 是实体文件名，
//   size 为展示用大小字符串，date 为发布日期，articleId 为可选的文章关联（单向：下载页显示来源文章链接）。
//
// 双语：分组名/简介用 name/nameEn、description/descriptionEn；文件条目的 fileName/size 为通用文本。

export const groups = [
  {
    id: "quantum-mechanics",
    folder: "quantum-mechanics",
    name: "量子力学基础",
    nameEn: "Quantum Mechanics Basics",
    description: "量子力学入门讲义，按章节整理。",
    descriptionEn: "Introductory lecture notes on quantum mechanics, organized by chapter.",
    icon: "⚛️",
    color: "#6366f1",
  },
  {
    id: "other",
    folder: "other",
    name: "其它",
    nameEn: "Other",
    description: "其他课程与杂项讲义。",
    descriptionEn: "Notes from other courses and miscellaneous materials.",
    icon: "📄",
    color: "#8b5cf6",
  },
];

export const files = [
  // 示例条目：格式参考，实体文件请放到 public/downloads/<folder>/ 下
  // {
  //   id: "qm-ch1",
  //   groupId: "quantum-mechanics",
  //   path: "/downloads/quantum-mechanics/ch1-intro.pdf",
  //   fileName: "ch1-intro.pdf",
  //   size: "1.2 MB",
  //   date: "2025-07-20",
  //   articleId: "siyuan-building",           // 可选：关联的文章 id
  // },
];

// 按分组 id 取文件
export function getFilesByGroup(groupId) {
  return files.filter((f) => f.groupId === groupId);
}

// 取分组
export function getGroupById(id) {
  return groups.find((g) => g.id === id);
}

// 取所有分组
export function getAllGroups() {
  return groups;
}

// 取分组显示名
export function getGroupName(group, lang = 'zh') {
  return lang === 'en' && group.nameEn ? group.nameEn : group.name;
}

// 取分组简介
export function getGroupDescription(group, lang = 'zh') {
  return lang === 'en' && group.descriptionEn
    ? group.descriptionEn
    : group.description;
}

// 根据文章 id 找关联的文件（供文章页使用）
export function getFilesByArticle(articleId) {
  return files.filter((f) => f.articleId === articleId);
}

// 解析文章 title（供下载页显示"来源文章"链接）
// 根据语言返回对应标题；找不到则返回 null
const zhArticleModules = import.meta.glob('../content/articles/*.md', { eager: true });
const enArticleModules = import.meta.glob('../content/articles/*.en.md', { eager: true });

function resolveTitle(modules, articleId) {
  for (const path in modules) {
    const filename = path.split('/').pop() || '';
    const id = filename.replace(/\.en\.md$|\.md$/, '');
    if (id === articleId) {
      return modules[path].frontmatter?.title || null;
    }
  }
  return null;
}

export function getArticleTitle(articleId, lang = 'zh') {
  if (!articleId) return null;
  const modules = lang === 'en' ? enArticleModules : zhArticleModules;
  return resolveTitle(modules, articleId);
}
