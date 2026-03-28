# ☢️ Nuclear Weapon Simulator

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.1.0-green.svg)]()
[![Platform](https://img.shields.io/badge/platform-Web-orange.svg)]()
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue.svg)]()

一个基于物理模型的核武器效应模拟器，用于教育和研究目的。使用 Leaflet.js 实现交互式地图，支持城市搜索定位、核爆炸效应计算和可视化展示。

> ⚠️ **免责声明**：本模拟器仅供教育和研究目的使用。所有计算基于公开的物理模型和历史数据，结果仅供参考，不构成任何实际决策依据。

---

## 📋 目录

- [功能特性](#-功能特性)
- [在线演示](#-在线演示)
- [快速开始](#-快速开始)
- [技术架构](#-技术架构)
- [计算模型](#-计算模型)
- [项目结构](#-项目结构)
- [部署说明](#-部署说明)
- [贡献指南](#-贡献指南)
- [许可证](#许可证)

---

## ✨ 功能特性

### 🗺️ 交互式地图
- **多地图源支持**：高德地图、GeoQ、卫星图等多种地图源
- **城市搜索定位**：支持城市名称搜索，自动跳转到目标位置
- **层级城市列表**：按大洲/国家分组的城市选择器
- **坐标选择**：点击地图获取任意位置坐标
- **平滑动画**：地图跳转使用飞行动画效果

### 💥 核武器模拟
- **预设武器库**：10+ 真实核武器型号
  - 历史武器：小男孩 (15kt)、胖子 (21kt)、沙皇炸弹 (50Mt)
  - 现役武器：W76、W87、B83、东风-41、布拉瓦等
- **自定义当量**：支持 1kt - 100Mt 自定义
- **爆炸高度**：地面爆炸、空中爆炸、高空爆炸

### 📊 效应计算
- **火球半径**：物质完全气化区域
- **冲击波**：重度/中度/轻度破坏区 (20/5/2 psi)
- **热辐射**：三度烧伤范围
- **电离辐射**：500 rem 辐射区
- **电磁脉冲 (EMP)**：电子设备影响范围

### 🎨 视觉效果
- **爆炸特效**：全屏闪光、冲击波环、粒子飞散
- **动态动画**：按钮发光、面板弹性展开、目标脉冲
- **渐变主题**：深色主题配合红橙渐变
- **响应式设计**：适配桌面和移动设备

### 👥 伤亡估算
- **人口密度**：可调整目标区域人口密度
- **时间段影响**：夜间/白天/高峰时段
- **国家特色数据**：80+ 国家的医疗、避难、建筑数据

---

## 🎮 在线演示

访问 [GitHub Pages](https://badhope.github.io/bumb/) 查看在线演示。

本地运行：
```bash
python -m http.server 8080
# 访问 http://localhost:8080
```

---

## 🚀 快速开始

### 环境要求

- 现代浏览器 (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- 本地 Web 服务器 (可选，用于本地开发)

### 安装运行

```bash
# 克隆仓库
git clone https://github.com/badhope/bumb.git
cd bumb

# 方法1: Python 简易服务器
python -m http.server 8080

# 方法2: Node.js 服务器
npx serve

# 方法3: PHP 内置服务器
php -S localhost:8080

# 打开浏览器访问
# http://localhost:8080
```

### 使用说明

1. **选择武器**：点击 ⚙️ 按钮，选择预设武器或自定义当量
2. **选择目标**：
   - 点击 🎯 按钮，搜索城市名称
   - 或从下拉列表选择城市
   - 或直接点击地图选择位置
3. **开始模拟**：点击 💥 按钮引爆，查看爆炸效果和伤亡数据

---

## 🏗️ 技术架构

### 前端技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 页面结构 |
| CSS3 | 样式和动画 |
| Vanilla JavaScript | 核心逻辑 |
| Leaflet.js | 地图引擎 |
| 高德地图/GeoQ | 地图瓦片源 |

### 模块设计

```
┌─────────────────────────────────────────────────────────┐
│                     App (主控制器)                        │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ MapHandler  │  │  Nuclear    │  │   Country   │     │
│  │ (地图模块)   │  │  Calculator │  │    Data     │     │
│  │             │  │  (计算引擎)  │  │  (国家数据)  │     │
│  │ - 地图初始化  │  │             │  │             │     │
│  │ - 城市跳转   │  │ - 效应计算   │  │ - 医疗数据   │     │
│  │ - 坐标选择   │  │ - 伤亡估算   │  │ - 建筑数据   │     │
│  │ - 影响圈绘制  │  │ - 长期影响   │  │ - 经济数据   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐                      │
│  │   Cities    │  │   Styles    │                      │
│  │    Data     │  │   (视觉)     │                      │
│  │  (城市数据)  │  │             │                      │
│  │             │  │ - 爆炸特效   │                      │
│  │ - 60+ 城市   │  │ - 动画效果   │                      │
│  │ - 坐标人口   │  │ - 渐变主题   │                      │
│  └─────────────┘  └─────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

---

## 🧮 计算模型

### 核心公式

#### 火球半径
```
R_fireball = 0.145 × Y^0.4  (km)
```

#### 冲击波半径
```
R_blast = k × Y^(1/3)  (km)

k 值:
- 20 psi (重度): k = 0.28
- 5 psi (中度):  k = 0.60
- 2 psi (轻度):  k = 1.00
```

#### 热辐射半径
```
R_thermal = 1.9 × Y^0.41  (km)
```

#### 电离辐射半径
```
R_radiation = 1.2 × Y^0.19  (km)
```

---

## 📁 项目结构

```
bumb/
├── index.html           # 主页面
├── styles.css           # 样式文件 (含爆炸特效)
├── app.js               # 应用主逻辑
├── map.js               # 地图交互模块
├── nuclear.js           # 核爆计算引擎
├── cities.js            # 城市数据 (60+ 城市)
├── country-data.js      # 国家特色数据 (80+ 国家)
├── world-map-data.js    # 世界地图 SVG 数据
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions 部署配置
├── README.md            # 项目文档
└── LICENSE              # MIT 许可证
```

---

## 🚀 部署说明

### GitHub Pages 部署

项目已配置 GitHub Actions 自动部署：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建并部署到 GitHub Pages
3. 访问 `https://badhope.github.io/bumb/`

### 手动部署

```bash
# 构建项目 (无需构建步骤，纯静态文件)
# 直接将所有文件上传到 Web 服务器

# 或使用 GitHub Pages
# Settings -> Pages -> Source: main branch
```

---

## 🤝 贡献指南

欢迎所有形式的贡献！

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 4 空格缩进
- 变量命名使用 camelCase
- 函数命名使用 PascalCase
- 添加必要的注释

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

- [NUKEMAP](https://nuclearsecrecy.com/nukemap/) - 灵感来源
- [Leaflet.js](https://leafletjs.com/) - 地图引擎
- [高德地图](https://lbs.amap.com/) - 地图瓦片
- [GeoQ](http://geoq.cn/) - 地图瓦片

---

<p align="center">
  <b>⚠️ 和平利用核能，反对核战争 ⚠️</b>
</p>

<p align="center">
  Made with ❤️ for Education and Research
</p>
