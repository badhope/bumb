<div align="center">

# 🌋 NuclearSim Pro

### 专业级核武器效应模拟器

[![Version](https://img.shields.io/badge/version-3.0.0-blue.svg)](https://github.com/badhope/bumb)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey.svg)](https://github.com/badhope/bumb)
[![Electron](https://img.shields.io/badge/Electron-28.2.0-9FEAF9.svg)](https://www.electronjs.org/)

<img src="https://img.shields.io/badge/-%E6%A0%B8%E6%AD%A6%E5%99%A8%E6%95%88%E5%BA%94%E6%A8%A1%E6%8B%9F-red?style=for-the-badge" />
<img src="https://img.shields.io/badge/-%E5%85%A8%E7%90%83%E6%A0%B8%E6%88%98%E4%BA%89%E6%A8%A1%E6%8B%9F-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/-%E6%95%99%E8%82%B2%E7%A7%91%E7%A0%94%E5%B7%A5%E5%85%B7-blue?style=for-the-badge" />

</div>

---

## 📖 项目简介

**NuclearSim Pro** 是一款基于 Electron 开发的专业级核武器效应模拟软件。通过精确的物理模型和直观的可视化界面，帮助用户了解核武器的破坏效应，具有极高的教育意义和科研价值。

### 🎯 核心特性

- **🔬 精确物理模拟** - 基于真实核物理公式计算爆炸效应
- **🌍 全球核战争模拟** - 模拟全球范围内的核战争场景
- **📍 交互式地图** - 支持多种地图源，包括离线地图功能
- **💥 实时爆炸动画** - 3D爆炸效果和冲击波可视化
- **📊 详细数据分析** - 伤亡估算、经济影响、环境影响分析
- **🎓 教育模块** - 核武器知识科普和交互式教程

---

## ✨ 功能亮点

### 🎮 核心模拟功能

| 功能模块 | 描述 |
|---------|------|
| **单次核爆模拟** | 选择任意地点进行核爆炸效应模拟 |
| **全球核战模拟** | 模拟国家间的全面核战争 |
| **多种武器类型** | 包含历史和现代核武器数据 |
| **自定义当量** | 支持0.01kt-100000kt范围调节 |
| **爆炸方式** | 地爆、空爆、高空爆炸 |

### 📊 分析功能

- **伤亡估算** - 死亡人数、受伤人数统计
- **经济影响** - GDP损失、基础设施破坏评估
- **环境影响** - 辐射扩散、核冬天效应
- **健康影响** - 急性辐射病、长期癌症风险
- **恢复时间** - 区域恢复预估

### 🗺️ 地图功能

- **多地图源支持**
  - 高德地图（标准/卫星）
  - GeoQ（彩色版/深色版）
  - OpenStreetMap
  - CartoDB（暗色/亮色）
  - Esri（卫星/街道）
  - Stamen地形

- **离线地图** - 支持区域下载，无网络可用
- **城市标记** - 全球主要城市数据
- **军事基地** - 全球核设施标记

### 💥 可视化效果

- 火球动画
- 冲击波扩散
- 蘑菇云效果
- 影响范围圆圈
- 导弹轨迹动画

---

## 🚀 快速开始

### 系统要求

- **操作系统**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **内存**: 4GB RAM (推荐 8GB+)
- **存储**: 500MB 可用空间
- **网络**: 首次使用需要网络下载地图

### 安装方式

#### 方式一：下载安装包（推荐）

前往 [Releases](https://github.com/badhope/bumb/releases) 页面下载对应平台的安装包：

- Windows: `NuclearSim-Pro-3.0.0-x64.exe`
- macOS: `NuclearSim-Pro-3.0.0.dmg`
- Linux: `NuclearSim-Pro-3.0.0-x64.AppImage`

#### 方式二：从源码构建

```bash
# 克隆仓库
git clone https://github.com/badhope/bumb.git
cd bumb/nuclearsim-pro

# 安装依赖
npm install

# 运行开发版本
npm start

# 构建生产版本
npm run build:win   # Windows
npm run build:mac   # macOS
npm run build:linux # Linux
```

---

## 📚 使用指南

### 基本操作

1. **选择目标位置**
   - 在地图上点击选择目标
   - 或从城市下拉菜单选择
   - 或使用搜索功能定位

2. **配置武器参数**
   - 选择预设武器类型
   - 或自定义当量大小
   - 选择爆炸方式

3. **运行模拟**
   - 点击"开始模拟"按钮
   - 查看爆炸动画效果
   - 分析详细结果数据

### 全球核战模拟

1. 切换到"全球核战"模块
2. 选择攻击方和防御方国家
3. 配置打击策略和武器数量
4. 观看实时模拟动画

### 离线地图下载

1. 进入设置面板
2. 选择下载区域和缩放级别
3. 点击"下载离线地图"
4. 等待下载完成

---

## 🛠️ 技术架构

### 技术栈

```
┌─────────────────────────────────────────┐
│              NuclearSim Pro              │
├─────────────────────────────────────────┤
│  Frontend                                │
│  ├── HTML5 / CSS3 / JavaScript          │
│  ├── Leaflet.js (地图引擎)               │
│  ├── ECharts (数据可视化)                │
│  └── Three.js (3D渲染)                   │
├─────────────────────────────────────────┤
│  Backend                                 │
│  ├── Electron 28.2.0                    │
│  ├── SQL.js (本地数据库)                 │
│  └── Node.js APIs                       │
├─────────────────────────────────────────┤
│  Build Tools                             │
│  ├── electron-builder                   │
│  └── npm                                │
└─────────────────────────────────────────┘
```

### 项目结构

```
nuclearsim-pro/
├── electron/                 # Electron主进程
│   ├── main.js              # 主进程入口
│   └── preload.js           # 预加载脚本
├── src/
│   ├── modules/             # 功能模块
│   │   ├── education/       # 教育系统
│   │   ├── events/          # 事件系统
│   │   └── visualization/   # 可视化模块
│   └── renderer/            # 渲染进程
│       ├── data/            # 数据文件
│       ├── scripts/         # JavaScript脚本
│       ├── styles/          # 样式文件
│       └── *.html           # 页面文件
├── assets/                  # 资源文件
├── package.json             # 项目配置
└── README.md               # 说明文档
```

---

## 📊 物理模型

### 爆炸效应计算公式

| 效应类型 | 公式 | 说明 |
|---------|------|------|
| 火球半径 | R = 0.145 × W^0.4 | W为当量(kt) |
| 重度破坏 | R = 0.28 × W^0.333 | 20 psi超压 |
| 中度破坏 | R = 0.55 × W^0.333 | 5 psi超压 |
| 轻度破坏 | R = 1.0 × W^0.333 | 2 psi超压 |
| 热辐射 | R = 1.9 × W^0.4 | 三度烧伤 |

### 伤亡估算模型

基于人口密度、建筑类型、防护等级等因素，采用多参数模型进行估算：

```
伤亡率 = f(距离, 当量, 人口密度, 建筑类型, 爆炸方式, 时间因素)
```

---

## 🎓 教育价值

### 适用场景

- **高校教学** - 物理学、国际关系、军事科学课程
- **科普教育** - 核武器知识普及
- **政策研究** - 核威慑、核裁军研究
- **应急演练** - 核事故应急响应培训

### 学习模块

1. **核武器基础** - 原理、结构、分类
2. **爆炸效应** - 冲击波、热辐射、核辐射
3. **历史事件** - 广岛、长崎案例分析
4. **防护知识** - 核爆防护措施

---

## 🤝 参与贡献

我们欢迎所有形式的贡献！

### 贡献方式

1. **报告问题** - 提交 Bug 报告或功能建议
2. **代码贡献** - 提交 Pull Request
3. **文档完善** - 改进文档和翻译
4. **分享传播** - 向他人推荐本项目

### 开发指南

```bash
# Fork 本仓库
# 克隆你的 Fork
git clone https://github.com/你的用户名/bumb.git

# 创建功能分支
git checkout -b feature/新功能

# 提交更改
git commit -m '添加新功能'

# 推送到分支
git push origin feature/新功能

# 创建 Pull Request
```

---

## 📜 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

```
MIT License

Copyright (c) 2026 NuclearSim Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## ⚠️ 免责声明

**本软件仅供教育、科研和学术目的使用。**

- 所有模拟结果基于理论模型，实际情况可能存在差异
- 本软件不鼓励、不支持任何形式的核武器使用
- 用户需自行承担使用本软件的风险
- 开发者不对任何因使用本软件造成的后果负责

---

## 📞 联系我们

- **GitHub**: [https://github.com/badhope/bumb](https://github.com/badhope/bumb)
- **问题反馈**: [Issues](https://github.com/badhope/bumb/issues)
- **功能建议**: [Discussions](https://github.com/badhope/bumb/discussions)

---

## 🌟 致谢

感谢以下开源项目的支持：

- [Electron](https://www.electronjs.org/)
- [Leaflet](https://leafletjs.com/)
- [ECharts](https://echarts.apache.org/)
- [Three.js](https://threejs.org/)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star 支持一下！**

[![Star History Chart](https://api.star-history.com/svg?repos=badhope/bumb&type=Date)](https://star-history.com/#badhope/bumb&Date)

**Made with ❤️ by NuclearSim Team**

</div>
