const App = {
    currentCountryData: null,

    init() {
        console.log('App initializing...');
        
        setTimeout(() => {
            if (!window.MapHandler) {
                console.error('MapHandler not loaded');
                return;
            }
            
            if (!window.MapHandler.map) {
                window.MapHandler.init();
            }
            
            this.populateCitySelect();
            this.setupEventListeners();
            console.log('App initialized');
        }, 100);
    },

    populateCitySelect() {
        const select = document.getElementById('citySelect');
        if (!select) {
            console.error('citySelect element not found');
            return;
        }
        
        if (!window.CitiesData || window.CitiesData.length === 0) {
            console.error('CitiesData not loaded');
            return;
        }
        
        console.log('Populating city select with', window.CitiesData.length, 'cities');
        
        select.innerHTML = '<option value="">-- 选择城市 --</option>';
        
        const regions = {
            '🌍 亚洲': ['中国', '日本', '韩国', '朝鲜', '印度', '巴基斯坦', '孟加拉国', '印度尼西亚', '泰国', '越南', '菲律宾', '马来西亚', '新加坡', '缅甸', '柬埔寨', '老挝'],
            '🌍 欧洲': ['英国', '法国', '德国', '意大利', '西班牙', '波兰', '荷兰', '比利时', '瑞士', '瑞典', '挪威', '丹麦', '芬兰', '奥地利', '希腊', '葡萄牙', '捷克'],
            '🌍 北美': ['美国', '加拿大', '墨西哥'],
            '🌍 南美': ['巴西', '阿根廷', '智利', '哥伦比亚', '秘鲁'],
            '🌍 俄罗斯/东欧': ['俄罗斯', '乌克兰', '白俄罗斯', '哈萨克斯坦', '乌兹别克斯坦'],
            '🌍 中东': ['土耳其', '伊朗', '伊拉克', '沙特阿拉伯', '阿联酋', '以色列'],
            '🌍 非洲': ['埃及', '南非', '尼日利亚', '埃塞俄比亚', '肯尼亚'],
            '🌍 大洋洲': ['澳大利亚', '新西兰']
        };

        const grouped = {};
        window.CitiesData.forEach(city => {
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
                        .sort((a, b) => b.population - a.population)
                        .forEach(city => {
                            const option = document.createElement('option');
                            option.value = city.name;
                            option.textContent = `${city.name} (${this.formatPopulation(city.population)})`;
                            option.dataset.lat = city.lat;
                            option.dataset.lng = city.lng;
                            regionGroup.appendChild(option);
                        });
                }
            });
            
            select.appendChild(regionGroup);
        });
        
        console.log('City select populated');
    },

    formatPopulation(pop) {
        if (pop >= 10000000) {
            return (pop / 10000000).toFixed(1) + '千万';
        } else if (pop >= 10000) {
            return (pop / 10000).toFixed(0) + '万';
        }
        return pop.toLocaleString();
    },

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        const weaponTypeSelect = document.getElementById('weaponType');
        if (weaponTypeSelect) {
            weaponTypeSelect.addEventListener('change', (e) => {
                const customGroup = document.getElementById('customYieldGroup');
                if (customGroup) {
                    customGroup.style.display = e.target.value === 'custom' ? 'block' : 'none';
                }
            });
        }

        const citySelect = document.getElementById('citySelect');
        if (citySelect) {
            citySelect.addEventListener('change', (e) => {
                const cityName = e.target.value;
                console.log('City select changed:', cityName);
                if (cityName) {
                    this.jumpToCity(cityName);
                }
            });
        }

        const searchInput = document.getElementById('searchCity');
        const searchResults = document.getElementById('searchResults');
        
        if (searchInput && searchResults) {
            let searchTimeout = null;
            
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value;
                console.log('Search input:', query);
                
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
        
        console.log('Event listeners set up');
    },

    searchCities(query) {
        if (!query || query.length < 1 || !window.CitiesData) return [];
        
        const q = query.toLowerCase();
        return window.CitiesData.filter(city => 
            city.name.toLowerCase().includes(q) ||
            city.country.toLowerCase().includes(q)
        ).slice(0, 10);
    },

    performSearch(query) {
        const results = this.searchCities(query);
        console.log('Search results:', results.length);
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
        
        if (!window.CitiesData) {
            console.error('CitiesData not available');
            return;
        }
        
        const city = window.CitiesData.find(c => c.name === cityName);
        if (!city) {
            console.error('City not found:', cityName);
            return;
        }
        
        console.log('Found city:', city);
        
        if (!window.MapHandler) {
            console.error('MapHandler not available');
            return;
        }
        
        window.MapHandler.selectCity(city);
        
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
        if (countryData) {
            this.currentCountryData = countryData;
        } else {
            this.currentCountryData = null;
        }

        if (city && city.population) {
            const populationInput = document.getElementById('population');
            if (populationInput) {
                populationInput.value = Math.round(city.population / 100);
            }
        }
    },

    getYield() {
        const weaponType = document.getElementById('weaponType')?.value;
        
        if (weaponType === 'custom') {
            return parseFloat(document.getElementById('customYield')?.value) || 100;
        }
        
        return window.NuclearCalculator?.weaponPresets[weaponType]?.yield || 100;
    },

    runSimulation() {
        if (!window.MapHandler?.selectedCoords) {
            alert('请先在地图上选择目标位置！');
            return;
        }

        const yieldKt = this.getYield();
        const populationDensity = parseInt(document.getElementById('population')?.value) || 5000;
        const timeOfDay = document.getElementById('timeOfDay')?.value || 'day';
        const burstHeight = document.getElementById('burstHeight')?.value || 'air';

        const results = window.NuclearCalculator.calculate(yieldKt, burstHeight);
        const casualties = window.NuclearCalculator.estimateCasualties(
            results, 
            populationDensity, 
            this.currentCountryData, 
            timeOfDay
        );
        const longTerm = window.NuclearCalculator.calculateLongTermEffects(results, this.currentCountryData);

        this.displayResults(results, casualties, longTerm);
        window.MapHandler.drawImpactCircles(results);

        if (typeof toggleTool === 'function') {
            toggleTool('results');
        }
    },

    displayResults(results, casualties, longTerm) {
        const fireballRadius = document.getElementById('fireballRadius');
        const heavyBlastRadius = document.getElementById('heavyBlastRadius');
        const moderateBlastRadius = document.getElementById('moderateBlastRadius');
        const thermalRadius = document.getElementById('thermalRadius');
        const deaths = document.getElementById('deaths');
        const injuries = document.getElementById('injuries');
        const effectiveDensity = document.getElementById('effectiveDensity');
        const economicLoss = document.getElementById('economicLoss');
        const recoveryTime = document.getElementById('recoveryTime');

        if (fireballRadius) fireballRadius.textContent = results.fireball.toFixed(2);
        if (heavyBlastRadius) heavyBlastRadius.textContent = results.heavyBlast.toFixed(2);
        if (moderateBlastRadius) moderateBlastRadius.textContent = results.moderateBlast.toFixed(2);
        if (thermalRadius) thermalRadius.textContent = results.thermal.toFixed(2);
        
        if (deaths) deaths.textContent = window.NuclearCalculator.formatNumber(casualties.deaths);
        if (injuries) injuries.textContent = window.NuclearCalculator.formatNumber(casualties.injuries);

        if (effectiveDensity) effectiveDensity.textContent = casualties.effectiveDensity.toLocaleString() + ' 人/km²';
        if (economicLoss) economicLoss.textContent = window.NuclearCalculator.formatCurrency(longTerm.economicLoss.total);
        if (recoveryTime) recoveryTime.textContent = longTerm.recoveryTime.years + ' 年';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    App.init();
});

window.App = App;
