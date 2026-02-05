// 文章数据管理

export const categories = {
  physics: {
    id: 'physics',
    name: '物理',
    description: '探索宇宙奥秘，从微观粒子到宏观天体',
    icon: '⚛️',
    color: '#f59e0b',
  },
  computer: {
    id: 'computer',
    name: '计算机',
    description: '系统架构、算法与软件工程实践',
    icon: '💻',
    color: '#3b82f6',
  },
  deeplearning: {
    id: 'deeplearning',
    name: '深度学习',
    description: '神经网络、机器学习与人工智能前沿',
    icon: '🧠',
    color: '#8b5cf6',
  },
  misc: {
    id: 'misc',
    name: '杂谈',
    description: '思考、随笔与生活感悟',
    icon: '☕',
    color: '#10b981',
  },
};

// 示例文章数据
export const articles = [
  {
    id: 'quantum-mechanics',
    title: '量子力学的基本原理',
    category: 'physics',
    date: '2024-01-15',
    description: '探索量子世界的奇妙现象，从波粒二象性到不确定性原理。',
    tags: ['量子力学', '物理', '科学'],
    content: '',
  },
  {
    id: 'relativity-intro',
    title: '相对论入门：时空的奥秘',
    category: 'physics',
    date: '2024-02-01',
    description: '爱因斯坦的相对论如何改变了我们对时间和空间的理解。',
    tags: ['相对论', '爱因斯坦', '物理'],
    content: '',
  },
  {
    id: 'distributed-systems',
    title: '分布式系统设计的核心原则',
    category: 'computer',
    date: '2024-01-20',
    description: '探讨构建高可用、可扩展分布式系统的关键概念和模式。',
    tags: ['分布式系统', '架构', '系统设计'],
    content: '',
  },
  {
    id: 'neural-networks-intro',
    title: '神经网络基础：从感知机到深度学习',
    category: 'deeplearning',
    date: '2024-01-10',
    description: '深入理解神经网络的基本结构、训练原理和优化方法。',
    tags: ['深度学习', '神经网络', '机器学习'],
    content: '',
  },
  {
    id: 'learning-method',
    title: '如何高效学习：我的学习方法论',
    category: 'misc',
    date: '2024-02-05',
    description: '分享我在学习新知识时总结的有效方法和心得体会。',
    tags: ['学习方法', '效率', '成长'],
    content: '',
  },
];

// 获取所有文章
export function getAllArticles() {
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 根据分类获取文章
export function getArticlesByCategory(categoryId) {
  return articles
    .filter(article => article.category === categoryId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 获取单篇文章
export function getArticleById(id) {
  return articles.find(article => article.id === id);
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
