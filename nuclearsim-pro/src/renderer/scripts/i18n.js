/**
 * 多语言支持系统 (i18n)
 */

const I18n = {
    currentLanguage: 'zh',
    
    translations: {
        zh: {
            // 标题
            appTitle: '核武器效应模拟器',
            simulator: '模拟器',
            events: '事件',
            education: '教育',
            data: '数据',
            settings: '设置',
            
            // 目标选择
            targetSelection: '目标选择',
            searchCity: '搜索城市...',
            selectCity: '选择城市...',
            coordinates: '坐标:',
            
            // 武器选择
            weaponSelection: '武器选择',
            historicalNukes: '历史核武器',
            usaWeapons: '美国',
            russiaWeapons: '俄罗斯',
            chinaWeapons: '中国',
            tacticalNukes: '战术核武器',
            customWeapon: '自定义当量...',
            customYield: '自定义当量',
            yieldUnit: '千吨 (kt)',
            
            // 参数设置
            parameters: '参数设置',
            populationDensity: '人口密度',
            peoplePerKm2: '人/km²',
            timeOfDay: '时间段',
            day: '白天',
            night: '夜晚',
            rushHour: '高峰时段',
            burstHeight: '爆炸高度',
            airBurst: '空中爆炸',
            surfaceBurst: '地面爆炸',
            highAltitude: '高空爆炸',
            
            // 按钮
            runSimulation: '运行模拟',
            clearResults: '清除结果',
            exportReport: '导出报告',
            
            // 结果标签
            results: '结果',
            basicImpact: '基础影响',
            casualties: '伤亡估算',
            economic: '经济影响',
            infrastructure: '基础设施',
            environment: '环境影响',
            health: '健康影响',
            recovery: '恢复时间',
            
            // 结果数据
            fireballRadius: '火球半径',
            heavyBlastRadius: '重度破坏半径',
            moderateBlastRadius: '中度破坏半径',
            lightBlastRadius: '轻度破坏半径',
            thermalRadius: '热辐射半径',
            radiationRadius: '辐射半径',
            empRadius: 'EMP影响半径',
            
            deaths: '死亡人数',
            injuries: '受伤人数',
            
            // 单位
            km: '公里',
            km2: '平方公里',
            people: '人',
            years: '年',
            
            // 通知
            selectTarget: '请先在地图上选择目标位置！',
            simulationComplete: '模拟完成！',
            exportSuccess: '导出成功！',
            exportFailed: '导出失败',
            
            // 图表
            casualtyDistribution: '伤亡分布',
            impactRadii: '影响半径',
            economicLoss: '经济损失',
            recoveryTimeline: '恢复时间线',
            infrastructureImpact: '基础设施影响',
            environmentImpact: '环境影响',
            healthImpact: '健康影响'
        },
        
        en: {
            // Titles
            appTitle: 'Nuclear Weapon Effect Simulator',
            simulator: 'Simulator',
            events: 'Events',
            education: 'Education',
            data: 'Data',
            settings: 'Settings',
            
            // Target Selection
            targetSelection: 'Target Selection',
            searchCity: 'Search city...',
            selectCity: 'Select city...',
            coordinates: 'Coordinates:',
            
            // Weapon Selection
            weaponSelection: 'Weapon Selection',
            historicalNukes: 'Historical Nuclear Weapons',
            usaWeapons: 'USA',
            russiaWeapons: 'Russia',
            chinaWeapons: 'China',
            tacticalNukes: 'Tactical Nuclear Weapons',
            customWeapon: 'Custom Yield...',
            customYield: 'Custom Yield',
            yieldUnit: 'kilotons (kt)',
            
            // Parameters
            parameters: 'Parameters',
            populationDensity: 'Population Density',
            peoplePerKm2: 'people/km²',
            timeOfDay: 'Time of Day',
            day: 'Day',
            night: 'Night',
            rushHour: 'Rush Hour',
            burstHeight: 'Burst Height',
            airBurst: 'Air Burst',
            surfaceBurst: 'Surface Burst',
            highAltitude: 'High Altitude',
            
            // Buttons
            runSimulation: 'Run Simulation',
            clearResults: 'Clear Results',
            exportReport: 'Export Report',
            
            // Result Tabs
            results: 'Results',
            basicImpact: 'Basic Impact',
            casualties: 'Casualties',
            economic: 'Economic Impact',
            infrastructure: 'Infrastructure',
            environment: 'Environment',
            health: 'Health Impact',
            recovery: 'Recovery Time',
            
            // Result Data
            fireballRadius: 'Fireball Radius',
            heavyBlastRadius: 'Heavy Blast Radius',
            moderateBlastRadius: 'Moderate Blast Radius',
            lightBlastRadius: 'Light Blast Radius',
            thermalRadius: 'Thermal Radius',
            radiationRadius: 'Radiation Radius',
            empRadius: 'EMP Radius',
            
            deaths: 'Deaths',
            injuries: 'Injuries',
            
            // Units
            km: 'km',
            km2: 'km²',
            people: 'people',
            years: 'years',
            
            // Notifications
            selectTarget: 'Please select a target location on the map!',
            simulationComplete: 'Simulation Complete!',
            exportSuccess: 'Export Successful!',
            exportFailed: 'Export Failed',
            
            // Charts
            casualtyDistribution: 'Casualty Distribution',
            impactRadii: 'Impact Radii',
            economicLoss: 'Economic Loss',
            recoveryTimeline: 'Recovery Timeline',
            infrastructureImpact: 'Infrastructure Impact',
            environmentImpact: 'Environment Impact',
            healthImpact: 'Health Impact'
        }
    },
    
    /**
     * 获取翻译文本
     */
    t(key) {
        const lang = this.translations[this.currentLanguage];
        if (!lang) return key;
        return lang[key] || this.translations.zh[key] || key;
    },
    
    /**
     * 设置语言
     */
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            this.updateUI();
            return true;
        }
        return false;
    },
    
    /**
     * 获取当前语言
     */
    getLanguage() {
        return this.currentLanguage;
    },
    
    /**
     * 获取支持的语言列表
     */
    getSupportedLanguages() {
        return [
            { code: 'zh', name: '中文' },
            { code: 'en', name: 'English' }
        ];
    },
    
    /**
     * 更新UI文本
     */
    updateUI() {
        // 查找所有带有 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });
        
        // 查找所有带有 data-i18n-placeholder 属性的元素
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });
        
        // 查找所有带有 data-i18n-title 属性的元素
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.t(key);
        });
    }
};

window.I18n = I18n;
