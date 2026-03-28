/**
 * App.js - 主应用控制器 (优化版)
 * 修复：错误处理、初始化流程、跨平台兼容
 */

const App = {
    currentCountryData: null,
    lastSimulationResult: null,
    initialized: false,
    initRetryCount: 0,
    maxInitRetries: 15,

    init() {
        if (this.initialized) {
            console.log('App already initialized');
            return;
        }

        console.log('App initializing...');
        this.waitForDependencies();
    },

    waitForDependencies() {
        this.initRetryCount++;
        
        if (this.initRetryCount > this.maxInitRetries) {
            console.error('App: Max initialization retries reached');
            this.showNotification('应用初始化超时，请刷新页面', 'error');
            return;
        }

        // 检查 Leaflet
        if (typeof L === 'undefined') {
            console.log(`App: Waiting for Leaflet... (${this.initRetryCount}/${this.maxInitRetries})`);
            setTimeout(() => this.waitForDependencies(), 100);
            return;
        }

        // 检查城市数据
        if (!window.CitiesData || !Array.isArray(window.CitiesData)) {
            console.log(`App: Waiting for CitiesData... (${this.initRetryCount}/${this.maxInitRetries})`);
            setTimeout(() => this.waitForDependencies(), 100);
            return;
        }

        // 检查国家数据
        if (!window.CountryData || typeof window.CountryData !== 'object') {
            console.log(`App: Waiting for CountryData... (${this.initRetryCount}/${this.maxInitRetries})`);
            setTimeout(() => this.waitForDependencies(), 100);
            return;
        }

        // 检查核计算器
        if (!window.NuclearCalculator) {
            console.log(`App: Waiting for NuclearCalculator... (${this.initRetryCount}/${this.maxInitRetries})`);
            setTimeout(() => this.waitForDependencies(), 100);
            return;
        }

        this.doInit();
    },

    doInit() {
        if (!window.MapHandler) {
            console.error('MapHandler not loaded');
            this.showNotification('地图处理器加载失败', 'error');
            return;
        }

        if (!window.MapHandler.initialized) {
            const success = window.MapHandler.init();
            if (!success) {
                console.error('MapHandler initialization failed');
                this.showNotification('地图初始化失败', 'error');
                return;
            }
        }

        this.populateCitySelect();
        this.setupEventListeners();

        // 初始化图表管理器
        if (window.ChartManager && typeof window.ChartManager.init === 'function') {
            try {
                window.ChartManager.init();
            } catch (e) {
                console.error('ChartManager init error:', e);
            }
        }

        this.initialized = true;
        console.log('App initialized successfully');
    },

    populateCitySelect() {
        const select = document.getElementById('citySelect');
        if (!select) {
            console.error('citySelect element not found');
            return;
        }

        if (!window.CitiesData || !Array.isArray(window.CitiesData) || window.CitiesData.length === 0) {
            console.error('CitiesData not loaded or empty');
            return;
        }

        console.log('Populating city select with', window.CitiesData.length, 'cities');

        select.innerHTML = '<option value="">-- 选择城市 --</option>';

        const regions = {
            '🌍 亚洲': ['中国', '中国台湾', '日本', '韩国', '朝鲜', '印度', '巴基斯坦', '孟加拉国', '印度尼西亚', '泰国', '越南', '菲律宾', '马来西亚', '新加坡', '缅甸', '柬埔寨', '老挝'],
            '🌍 欧洲': ['英国', '法国', '德国', '意大利', '西班牙', '波兰', '荷兰', '比利时', '瑞士', '瑞典', '挪威', '丹麦', '芬兰', '奥地利', '希腊', '葡萄牙', '捷克'],
            '🌍 北美': ['美国', '加拿大', '墨西哥'],
            '🌍 南美': ['巴西', '阿根廷', '智利', '哥伦比亚', '秘鲁'],
            '🌍 俄罗斯/东欧': ['俄罗斯', '乌克兰', '白俄罗斯', '哈萨克斯坦', '乌兹别克斯坦'],
            '🌍 中东': ['土耳其', '伊朗', '伊拉克', '沙特阿拉伯', '阿联酋', '以色列'],
            '🌍 非洲': ['埃及', '南非', '尼日利亚', '埃塞俄比亚', '肯尼亚', '刚果(金)', '加纳', '科特迪瓦', '坦桑尼亚'],
            '🌍 大洋洲': ['澳大利亚', '新西兰']
        };

        const grouped = {};
        window.CitiesData.forEach(city => {
            if (!city || !city.country || !city.name) return;
            if (!grouped[city.country]) {
                grouped[city.country] = [];
            }
            grouped[city.country].push(city);
        });

        Object.keys(regions).forEach(region => {
            const regionGroup = document.createElement('optgroup');
            regionGroup.label = region;

            regions[region].forEach(country => {
                if (grouped[country]) {
                    grouped[country]
                        .sort((a, b) => (b.population || 0) - (a.population || 0))
                        .forEach(city => {
                            const option = document.createElement('option');
                            option.value = city.name;
                            option.textContent = `${city.name} (${this.formatPopulation(city.population || 0)})`;
                            option.dataset.lat = city.lat;
                            option.dataset.lng = city.lng;
                            regionGroup.appendChild(option);
                        });
                }
            });

            if (regionGroup.children.length > 0) {
                select.appendChild(regionGroup);
            }
        });

        console.log('City select populated');
    },

    formatPopulation(pop) {
        if (pop >= 100000000) return (pop / 100000000).toFixed(1) + '亿';
        if (pop >= 10000000) return (pop / 10000000).toFixed(1) + '千万';
        if (pop >= 10000) return (pop / 10000).toFixed(0) + '万';
        return pop.toLocaleString();
    },

    setupEventListeners() {
        console.log('Setting up event listeners...');

        // 武器类型选择
        const weaponTypeSelect = document.getElementById('weaponType');
        if (weaponTypeSelect) {
            const updateWeaponInfo = (weaponKey) => {
                const customGroup = document.getElementById('customYieldGroup');
                const weaponInfo = document.getElementById('weaponInfo');
                const weaponDesc = document.getElementById('weaponDescription');
                
                if (customGroup) {
                    customGroup.style.display = weaponKey === 'custom' ? 'block' : 'none';
                }
                
                if (window.NuclearCalculator && window.NuclearCalculator.weaponPresets) {
                    const weapon = window.NuclearCalculator.weaponPresets[weaponKey];
                    if (weapon && weapon.description && weaponInfo && weaponDesc) {
                        weaponDesc.innerHTML = `<strong>${weapon.name}</strong><br>` +
                            `📅 年份: ${weapon.year}<br>` +
                            `🌍 国家: ${weapon.country}<br>` +
                            `📝 ${weapon.description}`;
                        weaponInfo.style.display = 'block';
                    } else if (weaponInfo) {
                        weaponInfo.style.display = 'none';
                    }
                }
            };
            
            weaponTypeSelect.addEventListener('change', (e) => {
                updateWeaponInfo(e.target.value);
            });
            
            updateWeaponInfo(weaponTypeSelect.value);
        }

        // 城市选择
        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
            citySelect.addEventListener('change', (e) => {
                const cityName = e.target.value;
                if (cityName) {
                    this.jumpToCity(cityName);
                }
            });
        }

        // 城市搜索
        const searchInput = document.getElementById('searchCity');
        const searchResults = document.getElementById('searchResults');

        if (searchInput && searchResults) {
            let searchTimeout = null;

            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;

                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    if (query.length >= 1) {
                        this.performSearch(query);
                    } else {
                        searchResults.classList.remove('show');
                        searchResults.innerHTML = '';
                    }
                }, 200);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = searchInput.value;
                    if (query.length >= 1) {
                        const results = this.searchCities(query);
                        if (results.length > 0) {
                            this.jumpToCity(results[0].name);
                            searchInput.value = results[0].name;
                            searchResults.classList.remove('show');
                        }
                    }
                }
            });

            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                    searchResults.classList.remove('show');
                }
            });
        }

        // 运行模拟按钮
        const runBtn = document.getElementById('runSimulationBtn');
        if (runBtn) {
            runBtn.addEventListener('click', () => this.runSimulation());
        }

        console.log('Event listeners set up');
    },

    searchCities(query) {
        if (!query || query.length < 1 || !window.CitiesData) return [];

        const q = query.toLowerCase();
        return window.CitiesData.filter(city =>
            city && city.name && city.name.toLowerCase().includes(q) ||
            city && city.country && city.country.toLowerCase().includes(q)
        ).slice(0, 10);
    },

    performSearch(query) {
        const results = this.searchCities(query);
        this.showSearchResults(results);
    },

    showSearchResults(results) {
        const container = document.getElementById('searchResults');
        if (!container) return;

        if (results.length === 0) {
            container.classList.remove('show');
            container.innerHTML = '';
            return;
        }

        container.innerHTML = results.map(city => `
            <div class="search-result-item" onclick="App.jumpToCity('${city.name}')">
                <strong>${city.name}</strong>
                <span style="color:#888; margin-left:8px;">${city.country}</span>
            </div>
        `).join('');

        container.classList.add('show');
    },

    jumpToCity(cityName) {
        console.log('Jumping to city:', cityName);

        if (!window.CitiesData || !Array.isArray(window.CitiesData)) {
            console.error('CitiesData not available');
            this.showNotification('城市数据未加载', 'error');
            return;
        }

        const city = window.CitiesData.find(c => c && c.name === cityName);
        if (!city) {
            console.error('City not found:', cityName);
            this.showNotification('未找到城市: ' + cityName, 'warning');
            return;
        }

        if (!window.MapHandler) {
            console.error('MapHandler not available');
            this.showNotification('地图处理器未加载', 'error');
            return;
        }

        if (!window.MapHandler.initialized) {
            console.log('MapHandler not initialized, initializing...');
            window.MapHandler.init();
        }

        window.MapHandler.selectCity(city);

        // 更新选择框
        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
            citySelect.value = cityName;
        }

        const searchInput = document.getElementById('searchCity');
        if (searchInput) {
            searchInput.value = cityName;
        }

        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.classList.remove('show');
        }
    },

    updateCountryInfo(countryData, city) {
        this.currentCountryData = countryData || null;

        if (city && city.population) {
            const populationInput = document.getElementById('population');
            if (populationInput) {
                populationInput.value = Math.round(city.density || city.population / 100);
            }
        }
    },

    getYield() {
        const weaponType = document.getElementById('weaponType')?.value;

        if (weaponType === 'custom') {
            const customYield = parseFloat(document.getElementById('customYield')?.value);
            return isNaN(customYield) || customYield <= 0 ? 100 : customYield;
        }

        return window.NuclearCalculator?.weaponPresets?.[weaponType]?.yield || 100;
    },

    runSimulation() {
        // 检查地图处理器
        if (!window.MapHandler) {
            console.error('MapHandler not available');
            this.showNotification('地图处理器未加载', 'error');
            return;
        }

        // 检查是否选择了目标
        if (!window.MapHandler.selectedCoords) {
            this.showNotification('请先在地图上选择目标位置！', 'warning');
            return;
        }

        // 检查核计算器
        if (!window.NuclearCalculator) {
            console.error('NuclearCalculator not available');
            this.showNotification('计算引擎未加载', 'error');
            return;
        }

        // 获取参数
        const weaponTypeEl = document.getElementById('weaponType');
        const customYieldEl = document.getElementById('customYield');
        const populationEl = document.getElementById('population');
        const timeOfDayEl = document.getElementById('timeOfDay');
        const burstHeightEl = document.getElementById('burstHeight');

        const weaponType = weaponTypeEl ? weaponTypeEl.value : 'w76';
        const customYield = customYieldEl ? parseFloat(customYieldEl.value) : 100;
        const populationDensity = populationEl ? parseInt(populationEl.value) : 5000;
        const timeOfDay = timeOfDayEl ? timeOfDayEl.value : 'day';
        const burstHeight = burstHeightEl ? burstHeightEl.value : 'air';

        // 计算当量
        let yieldKt;
        if (weaponType === 'custom') {
            yieldKt = isNaN(customYield) || customYield <= 0 ? 100 : customYield;
        } else {
            yieldKt = window.NuclearCalculator.weaponPresets?.[weaponType]?.yield || 100;
        }

        if (yieldKt <= 0) {
            this.showNotification('武器当量必须大于0', 'warning');
            return;
        }

        console.log('Running simulation with yield:', yieldKt, 'kt');

        try {
            // 计算结果
            const results = window.NuclearCalculator.calculate(yieldKt, burstHeight);
            
            if (!results) {
                throw new Error('Calculation returned null');
            }

            // 计算伤亡
            const casualties = window.NuclearCalculator.estimateCasualties(
                results,
                populationDensity,
                this.currentCountryData,
                timeOfDay
            );

            // 计算长期影响
            const longTerm = window.NuclearCalculator.calculateLongTermEffects 
                ? window.NuclearCalculator.calculateLongTermEffects(results, this.currentCountryData)
                : { recoveryTime: { years: 10 } };

            // 计算基础设施影响
            const infrastructure = window.NuclearCalculator.calculateInfrastructureImpact 
                ? window.NuclearCalculator.calculateInfrastructureImpact(results, populationDensity, this.currentCountryData)
                : { hospitals: 0, schools: 0, transport: 0, power: 0, details: { hospitalBeds: 0, schoolCapacity: 0, transportCapacity: 0, powerCapacity: 0 } };

            // 计算环境影响
            const environment = window.NuclearCalculator.calculateEnvironmentImpact 
                ? window.NuclearCalculator.calculateEnvironmentImpact(results, this.currentCountryData)
                : { falloutArea: 0, landContamination: 0, waterAffected: 0, carbonEmission: 0, radiationLevel: 0, landPollution: 0, waterPollution: 0, airPollution: 0, ecologyDamage: 0 };

            // 计算健康影响
            const health = window.NuclearCalculator.calculateHealthImpact 
                ? window.NuclearCalculator.calculateHealthImpact(results, casualties, this.currentCountryData)
                : { acuteRadiation: 0, burns: 0, trauma: 0, psychological: 0, homeless: 0, cancerProjection: [0,0,0,0,0], geneticProjection: [0,0,0,0,0], chronicProjection: [0,0,0,0,0] };

            // 计算 GDP 损失
            const gdpLoss = window.NuclearCalculator.calculateGDPLoss 
                ? window.NuclearCalculator.calculateGDPLoss(results, casualties, this.currentCountryData)
                : { total: 0, direct: 0, indirect: 0, gdpPerCapitaLoss: 0 };

            // 保存结果
            this.lastSimulationResult = {
                targetName: document.getElementById('targetName')?.textContent || '未知',
                lat: window.MapHandler.selectedCoords.lat,
                lng: window.MapHandler.selectedCoords.lng,
                yieldKt: yieldKt,
                weaponType: weaponType,
                weaponName: weaponType === 'custom' ? '自定义武器' : 
                    (window.NuclearCalculator.weaponPresets?.[weaponType]?.name || '未知'),
                burstHeight: burstHeight,
                results: results,
                casualties: casualties,
                economic: gdpLoss,
                recovery: longTerm.recoveryTime,
                infrastructure: infrastructure,
                environment: environment,
                health: health
            };

            // 显示结果
            this.displayResults(results, casualties, gdpLoss, longTerm, infrastructure, environment, health);
            
            // 绘制影响圈
            window.MapHandler.drawImpactCircles(results);

            // 切换到结果标签
            if (typeof toggleTool === 'function') {
                toggleTool('results');
            }

            console.log('Simulation completed successfully');
        } catch (error) {
            console.error('Simulation error:', error);
            this.showNotification('模拟计算出错: ' + error.message, 'error');
        }
    },

    displayResults(results, casualties, gdpLoss, longTerm, infrastructure, environment, health) {
        // 更新基础数据
        const elements = {
            fireballRadius: results.fireball?.toFixed(2) || '0.00',
            heavyBlastRadius: results.heavyBlast?.toFixed(2) || '0.00',
            moderateBlastRadius: results.moderateBlast?.toFixed(2) || '0.00',
            thermalRadius: results.thermal?.toFixed(2) || '0.00',
            deaths: window.NuclearCalculator?.formatNumber(casualties.deaths) || casualties.deaths.toLocaleString(),
            injuries: window.NuclearCalculator?.formatNumber(casualties.injuries) || casualties.injuries.toLocaleString()
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = elements[id];
        });

        // 更新各标签页
        this.updateEconomicTab(gdpLoss, longTerm);
        this.updateInfrastructureTab(infrastructure);
        this.updateEnvironmentTab(environment);
        this.updateHealthTab(health);

        // 渲染图表
        if (window.ChartManager) {
            setTimeout(() => {
                try {
                    window.ChartManager.init();
                    window.ChartManager.renderCasualtyPieChart(casualties);
                    window.ChartManager.renderRadiusBarChart(results);
                    window.ChartManager.renderEconomicBarChart(gdpLoss, this.currentCountryData?.gdpPerCapita);
                    window.ChartManager.renderRecoveryTimelineChart(longTerm.recoveryTime?.years || 10);
                    window.ChartManager.renderInfrastructureChart(infrastructure);
                    window.ChartManager.renderEnvironmentChart(environment);
                    window.ChartManager.renderHealthChart(health);
                    window.ChartManager.renderLongTermHealthChart(health);
                } catch (e) {
                    console.error('Chart rendering error:', e);
                }
            }, 150);
        }
    },

    updateEconomicTab(gdpLoss, longTerm) {
        const elements = {
            gdpLossTotal: this.formatCurrency(gdpLoss?.total || 0),
            directLoss: this.formatCurrency(gdpLoss?.direct || 0),
            indirectLoss: this.formatCurrency(gdpLoss?.indirect || 0),
            gdpPerCapitaLoss: this.formatCurrency(gdpLoss?.gdpPerCapitaLoss || 0),
            recoveryTime: (longTerm?.years || 10) + ' 年'
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = elements[id];
        });
    },

    updateInfrastructureTab(infrastructure) {
        const elements = {
            hospitalsAffected: (infrastructure?.hospitals || 0) + ' 座',
            schoolsAffected: (infrastructure?.schools || 0) + ' 座',
            transportAffected: (infrastructure?.transport || 0) + ' 个',
            powerAffected: (infrastructure?.power || 0) + ' 座'
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = elements[id];
        });

        const infrastructureDetails = document.getElementById('infrastructureDetails');
        if (infrastructureDetails && infrastructure?.details) {
            infrastructureDetails.innerHTML = `
                <strong>详细影响:</strong><br>
                • 医院床位损失: ${(infrastructure.details.hospitalBeds || 0).toLocaleString()} 张<br>
                • 学校容量损失: ${(infrastructure.details.schoolCapacity || 0).toLocaleString()} 人<br>
                • 交通枢纽容量: ${(infrastructure.details.transportCapacity || 0).toLocaleString()} 人次/日<br>
                • 发电容量损失: ${(infrastructure.details.powerCapacity || 0).toLocaleString()} MW
            `;
        }
    },

    updateEnvironmentTab(environment) {
        const elements = {
            falloutArea: (environment?.falloutArea || 0).toFixed(1) + ' km²',
            landContamination: (environment?.landContamination || 0).toFixed(1) + ' km²',
            waterAffected: this.formatNumber((environment?.waterAffected || 0) * 1000) + ' 人',
            carbonEmission: this.formatNumber(environment?.carbonEmission || 0) + ' 吨CO₂当量'
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = elements[id];
        });
    },

    updateHealthTab(health) {
        const cancerProj = health?.cancerProjection || [0, 0, 0, 0, 0];
        const elements = {
            acuteRadiation: this.formatNumber(health?.acuteRadiation || 0) + ' 人',
            cancerIncrease: this.formatNumber(cancerProj[4] || 0) + ' 人',
            psychologicalTrauma: this.formatNumber(health?.psychological || 0) + ' 人',
            homeless: this.formatNumber(health?.homeless || 0) + ' 人'
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = elements[id];
        });
    },

    formatNumber(num) {
        if (typeof num !== 'number' || isNaN(num)) return '0';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + '十亿';
        if (num >= 1e8) return (num / 1e8).toFixed(2) + '亿';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + '百万';
        if (num >= 1e4) return (num / 1e4).toFixed(2) + '万';
        return num.toLocaleString();
    },

    formatCurrency(value) {
        if (typeof value !== 'number' || isNaN(value)) return '$0';
        if (value >= 1e12) return '$' + (value / 1e12).toFixed(2) + '万亿';
        if (value >= 1e9) return '$' + (value / 1e9).toFixed(2) + '十亿';
        if (value >= 1e6) return '$' + (value / 1e6).toFixed(2) + '百万';
        if (value >= 1e3) return '$' + (value / 1e3).toFixed(2) + '千';
        return '$' + value.toFixed(2);
    },

    showNotification(message, type = 'info') {
        const toast = document.getElementById('coordToast');
        if (toast) {
            const toastLat = document.getElementById('toastLat');
            const toastLng = document.getElementById('toastLng');
            if (toastLat) toastLat.textContent = message;
            if (toastLng) toastLng.textContent = '';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        } else {
            alert(message);
        }
    }
};

// 等待 DOM 加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content Loaded');
        App.init();
    });
} else {
    // DOM 已经加载完成
    console.log('DOM already loaded');
    App.init();
}

window.App = App;
