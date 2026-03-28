/**
 * 多武器模拟系统
 */

const MultiWeaponSimulator = {
    simulations: [],
    isRunning: false,
    
    /**
     * 添加武器模拟
     */
    addWeapon(config) {
        const sim = {
            id: Date.now() + Math.random(),
            name: config.name || '武器',
            yield: config.yield || 100,
            lat: config.lat,
            lng: config.lng,
            burstHeight: config.burstHeight || 'air',
            delay: config.delay || 0,
            results: null
        };
        
        this.simulations.push(sim);
        return sim.id;
    },
    
    /**
     * 移除武器
     */
    removeWeapon(id) {
        this.simulations = this.simulations.filter(s => s.id !== id);
    },
    
    /**
     * 清空所有
     */
    clear() {
        this.simulations = [];
    },
    
    /**
     * 获取武器列表
     */
    getWeapons() {
        return [...this.simulations];
    },
    
    /**
     * 运行所有模拟
     */
    runAll(callback) {
        if (this.simulations.length === 0) {
            if (callback) callback([]);
            return;
        }
        
        const results = [];
        
        this.simulations.forEach(sim => {
            if (!window.NuclearCalculator) return;
            
            const result = window.NuclearCalculator.calculate(sim.yield, sim.burstHeight);
            
            results.push({
                ...sim,
                results: result,
                casualties: null
            });
        });
        
        if (callback) callback(results);
    },
    
    /**
     * 批量计算伤亡
     */
    calculateTotalCasualties(populationDensity, countryData, timeOfDay) {
        let totalDeaths = 0;
        let totalInjuries = 0;
        
        this.simulations.forEach(sim => {
            if (!sim.results || !window.NuclearCalculator) return;
            
            const casualties = window.NuclearCalculator.estimateCasualties(
                sim.results,
                populationDensity,
                countryData,
                timeOfDay
            );
            
            sim.casualties = casualties;
            totalDeaths += casualties.deaths;
            totalInjuries += casualties.injuries;
        });
        
        return {
            deaths: totalDeaths,
            injuries: totalInjuries,
            weaponCount: this.simulations.length
        };
    },
    
    /**
     * 获取总影响区域
     */
    getTotalImpactArea() {
        let maxRadius = 0;
        let centerLat = 0;
        let centerLng = 0;
        let count = 0;
        
        this.simulations.forEach(sim => {
            if (!sim.results) return;
            
            const radius = sim.results.radiation || sim.results.thermal || 0;
            if (radius > maxRadius) {
                maxRadius = radius;
            }
            
            if (sim.lat && sim.lng) {
                centerLat += sim.lat;
                centerLng += sim.lng;
                count++;
            }
        });
        
        return {
            maxRadius: maxRadius,
            centerLat: count > 0 ? centerLat / count : 0,
            centerLng: count > 0 ? centerLng / count : 0
        };
    }
};

window.MultiWeaponSimulator = MultiWeaponSimulator;
