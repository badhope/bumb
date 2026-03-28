const GlobalWarSimulator = {
    activeScenario: null,
    launchedMissiles: [],
    detonations: [],
    globalEffects: null,
    
    scenarios: {
        usVsChina: {
            name: '中美核交换',
            description: '模拟美国与中国之间的核战争场景',
            aggressor: 'USA',
            defender: 'China',
            phases: [
                { name: '第一波打击', type: 'counterforce', warheads: 200 },
                { name: '报复性打击', type: 'countervalue', warheads: 150 },
                { name: '补充打击', type: 'mixed', warheads: 100 }
            ]
        },
        usVsRussia: {
            name: '美俄全面核战争',
            description: '模拟美国与俄罗斯之间的全面核战争',
            aggressor: 'USA',
            defender: 'Russia',
            phases: [
                { name: '先发制人打击', type: 'counterforce', warheads: 800 },
                { name: '大规模报复', type: 'countervalue', warheads: 1200 },
                { name: '补充打击', type: 'mixed', warheads: 500 }
            ]
        },
        regional: {
            name: '印巴核战争',
            description: '模拟印度与巴基斯坦之间的区域核战争',
            aggressor: 'India',
            defender: 'Pakistan',
            phases: [
                { name: '战术核打击', type: 'counterforce', warheads: 30 },
                { name: '战略报复', type: 'countervalue', warheads: 50 }
            ]
        },
        custom: {
            name: '自定义场景',
            description: '用户自定义核战争场景',
            aggressor: null,
            defender: null,
            phases: []
        }
    },
    
    missileTypes: {
        icbm: {
            name: '洲际弹道导弹',
            flightTime: 30,
            altitude: 1200,
            speed: 7,
            phases: ['发射', '助推段', '中段', '再入段', '引爆']
        },
        slbm: {
            name: '潜射弹道导弹',
            flightTime: 20,
            altitude: 800,
            speed: 6,
            phases: ['发射', '助推段', '中段', '再入段', '引爆']
        },
        bomber: {
            name: '战略轰炸机',
            flightTime: 480,
            altitude: 15,
            speed: 0.8,
            phases: ['起飞', '巡航', '投弹', '返航']
        },
        hypersonic: {
            name: '高超音速武器',
            flightTime: 15,
            altitude: 50,
            speed: 20,
            phases: ['发射', '滑翔', '末端机动', '引爆']
        },
        cruise: {
            name: '巡航导弹',
            flightTime: 120,
            altitude: 0.1,
            speed: 0.8,
            phases: ['发射', '巡航', '末端', '引爆']
        }
    },
    
    init() {
        console.log('GlobalWarSimulator initialized');
    },
    
    createScenario(config) {
        return {
            id: Date.now(),
            name: config.name || '自定义场景',
            aggressor: config.aggressor,
            defender: config.defender,
            targets: config.targets || [],
            warheads: config.warheads || [],
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
    },
    
    simulateMissileLaunch(missile) {
        const type = this.missileTypes[missile.type] || this.missileTypes.icbm;
        const distance = this.calculateDistance(
            missile.origin.lat, missile.origin.lng,
            missile.target.lat, missile.target.lng
        );
        
        const flightTime = (distance / type.speed) * 60;
        
        return {
            id: `missile_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: missile.type,
            typeName: type.name,
            origin: missile.origin,
            target: missile.target,
            warhead: missile.warhead,
            yield: missile.yield,
            distance: distance,
            flightTime: flightTime,
            launchTime: Date.now(),
            eta: Date.now() + flightTime * 1000,
            status: 'launched',
            trajectory: this.calculateTrajectory(missile, type)
        };
    },
    
    calculateTrajectory(missile, type) {
        const points = [];
        const steps = 100;
        const origin = missile.origin;
        const target = missile.target;
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const lat = origin.lat + (target.lat - origin.lat) * t;
            const lng = origin.lng + (target.lng - origin.lng) * t;
            
            const altitude = type.altitude * Math.sin(t * Math.PI);
            
            points.push({
                lat: lat,
                lng: lng,
                altitude: altitude,
                time: t * type.flightTime * 60
            });
        }
        
        return points;
    },
    
    calculateDistance(lat1, lng1, lat2, lng2) {
        const R = 6371;
        const dLat = this.toRad(lat2 - lat1);
        const dLng = this.toRad(lng2 - lng1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },
    
    toRad(deg) {
        return deg * Math.PI / 180;
    },
    
    simulateDetonation(detonation) {
        const results = window.NuclearCalculator.calculate(detonation.yield, 'air');
        const casualties = window.NuclearCalculator.estimateCasualties(
            results,
            detonation.populationDensity || 1000,
            null,
            'day'
        );
        
        return {
            id: `detonation_${Date.now()}`,
            location: detonation.location,
            coords: detonation.coords,
            yield: detonation.yield,
            weapon: detonation.weapon,
            results: results,
            casualties: casualties,
            timestamp: Date.now()
        };
    },
    
    calculateGlobalEffects(detonations) {
        const totalYield = detonations.reduce((sum, d) => sum + d.yield, 0);
        const totalCasualties = detonations.reduce((sum, d) => 
            sum + (d.casualties?.deaths || 0) + (d.casualties?.injuries || 0), 0);
        
        const sootProduction = totalYield * 0.1;
        const temperatureDrop = Math.min(10, sootProduction * 0.001);
        const famineRisk = temperatureDrop > 2 ? 'high' : temperatureDrop > 1 ? 'medium' : 'low';
        
        return {
            totalDetonations: detonations.length,
            totalYield: totalYield,
            totalCasualties: totalCasualties,
            environmentalImpact: {
                sootProduction: sootProduction,
                temperatureDrop: temperatureDrop,
                nuclearWinter: temperatureDrop > 5,
                ozoneDepletion: Math.min(70, totalYield * 0.01),
                famineRisk: famineRisk
            },
            recoveryTime: this.estimateRecovery(totalYield, detonations.length),
            civilizationImpact: this.assessCivilizationImpact(totalYield, totalCasualties)
        };
    },
    
    estimateRecovery(totalYield, detonationCount) {
        if (totalYield > 5000) return '100+ 年';
        if (totalYield > 1000) return '50-100 年';
        if (totalYield > 100) return '20-50 年';
        if (totalYield > 10) return '10-20 年';
        return '5-10 年';
    },
    
    assessCivilizationImpact(totalYield, totalCasualties) {
        if (totalCasualties > 5000000000) {
            return {
                level: '文明崩溃',
                description: '人类文明基本毁灭，可能退回石器时代',
                survivalRate: '< 10%'
            };
        } else if (totalCasualties > 1000000000) {
            return {
                level: '严重倒退',
                description: '工业文明崩溃，社会秩序瓦解',
                survivalRate: '10-30%'
            };
        } else if (totalCasualties > 100000000) {
            return {
                level: '重大灾难',
                description: '全球经济崩溃，大规模饥荒',
                survivalRate: '30-50%'
            };
        } else if (totalCasualties > 10000000) {
            return {
                level: '严重危机',
                description: '区域性毁灭，全球经济衰退',
                survivalRate: '50-70%'
            };
        } else {
            return {
                level: '局部影响',
                description: '区域性灾难，全球影响有限',
                survivalRate: '> 90%'
            };
        }
    },
    
    runFullScenario(scenarioId, callback) {
        const scenario = this.scenarios[scenarioId] || this.scenarios.custom;
        
        const results = {
            scenario: scenario,
            missiles: [],
            detonations: [],
            globalEffects: null,
            timeline: []
        };
        
        const aggressorArsenal = GlobalNuclearArsenal.getCountryArsenal(scenario.aggressor);
        const defenderArsenal = GlobalNuclearArsenal.getCountryArsenal(scenario.defender);
        
        if (!aggressorArsenal || !defenderArsenal) {
            console.error('Invalid scenario: missing arsenal data');
            return null;
        }
        
        let phaseIndex = 0;
        let totalWarheadsUsed = 0;
        
        const runPhase = () => {
            if (phaseIndex >= scenario.phases.length) {
                results.globalEffects = this.calculateGlobalEffects(results.detonations);
                if (callback) callback(results);
                return;
            }
            
            const phase = scenario.phases[phaseIndex];
            const attacker = phaseIndex % 2 === 0 ? aggressorArsenal : defenderArsenal;
            const defender = phaseIndex % 2 === 0 ? defenderArsenal : aggressorArsenal;
            
            results.timeline.push({
                phase: phase.name,
                attacker: attacker.name,
                warheads: phase.warheads,
                timestamp: Date.now()
            });
            
            const targets = this.selectTargets(defender, phase.type, phase.warheads);
            
            targets.forEach((target, index) => {
                setTimeout(() => {
                    const missile = {
                        type: 'icbm',
                        origin: attacker.deliverySystems.icbm?.systems[0]?.bases?.[0] || 
                                { lat: 0, lng: 0, name: 'Unknown' },
                        target: target,
                        warhead: target.warheadType,
                        yield: target.yield
                    };
                    
                    const launched = this.simulateMissileLaunch(missile);
                    results.missiles.push(launched);
                    
                    setTimeout(() => {
                        const detonation = this.simulateDetonation({
                            location: target.name,
                            coords: { lat: target.lat, lng: target.lng },
                            yield: missile.yield,
                            weapon: missile.warhead,
                            populationDensity: target.populationDensity || 5000
                        });
                        
                        results.detonations.push(detonation);
                        totalWarheadsUsed++;
                        
                        if (totalWarheadsUsed >= phase.warheads) {
                            phaseIndex++;
                            setTimeout(runPhase, 1000);
                        }
                    }, launched.flightTime * 100);
                }, index * 100);
            });
        };
        
        runPhase();
        
        return results;
    },
    
    selectTargets(defender, type, count) {
        const targets = [];
        const cities = window.CitiesData?.cities || [];
        const defenderCities = cities.filter(c => c.country === defender.name);
        
        if (type === 'counterforce') {
            const arsenalTargets = GlobalNuclearArsenal.getAllTargets(
                Object.keys(GlobalNuclearArsenal.countries).find(
                    k => GlobalNuclearArsenal.countries[k].name === defender.name
                )
            );
            
            for (let i = 0; i < Math.min(count, arsenalTargets.length); i++) {
                const t = arsenalTargets[i];
                targets.push({
                    name: t.name,
                    lat: t.lat,
                    lng: t.lng,
                    type: t.type,
                    yield: 300,
                    warheadType: 'W78',
                    populationDensity: 100
                });
            }
        } else if (type === 'countervalue') {
            const sortedCities = defenderCities.sort((a, b) => 
                (b.population || 0) - (a.population || 0));
            
            for (let i = 0; i < Math.min(count, sortedCities.length); i++) {
                const city = sortedCities[i];
                targets.push({
                    name: city.name,
                    lat: city.lat,
                    lng: city.lng,
                    type: 'city',
                    yield: 475,
                    warheadType: 'W88',
                    populationDensity: city.density || 5000
                });
            }
        } else {
            const halfCount = Math.floor(count / 2);
            const counterforce = this.selectTargets(defender, 'counterforce', halfCount);
            const countervalue = this.selectTargets(defender, 'countervalue', count - halfCount);
            return [...counterforce, ...countervalue];
        }
        
        return targets;
    },
    
    exportScenarioResults(results) {
        return {
            exportDate: new Date().toISOString(),
            scenario: results.scenario.name,
            summary: {
                totalMissiles: results.missiles.length,
                totalDetonations: results.detonations.length,
                totalCasualties: results.globalEffects?.totalCasualties || 0,
                civilizationImpact: results.globalEffects?.civilizationImpact?.level || 'Unknown'
            },
            details: {
                missiles: results.missiles.map(m => ({
                    type: m.typeName,
                    origin: m.origin.name,
                    target: m.target.name,
                    yield: m.yield,
                    flightTime: m.flightTime
                })),
                detonations: results.detonations.map(d => ({
                    location: d.location,
                    yield: d.yield,
                    deaths: d.casualties?.deaths || 0,
                    injuries: d.casualties?.injuries || 0
                })),
                globalEffects: results.globalEffects
            }
        };
    }
};

window.GlobalWarSimulator = GlobalWarSimulator;
GlobalWarSimulator.init();
