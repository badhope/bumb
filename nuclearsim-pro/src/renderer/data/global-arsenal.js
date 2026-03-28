const GlobalNuclearArsenal = {
    countries: {
        USA: {
            name: '美国',
            nameEn: 'United States',
            totalWarheads: 5550,
            deployed: 1700,
            stockpile: 3850,
            deliverySystems: {
                icbm: {
                    name: '洲际弹道导弹',
                    systems: [
                        {
                            name: 'LGM-30G 民兵III',
                            nameEn: 'Minuteman III',
                            count: 400,
                            warheadsPerMissile: 1,
                            warheadType: 'W78/W87',
                            yield: [300, 335, 475],
                            range: 13000,
                            accuracy: 120,
                            bases: ['马姆斯特罗姆空军基地', '迈诺特空军基地', '沃伦空军基地'],
                            locations: [
                                { name: '马姆斯特罗姆空军基地', lat: 47.5069, lng: -111.1833, missiles: 150 },
                                { name: '迈诺特空军基地', lat: 48.4167, lng: -101.3500, missiles: 150 },
                                { name: '沃伦空军基地', lat: 41.1500, lng: -104.8000, missiles: 150 }
                            ]
                        },
                        {
                            name: 'LGM-35A 哨兵',
                            nameEn: 'Sentinel',
                            count: 0,
                            status: '研发中',
                            expectedYear: 2029,
                            warheadsPerMissile: 1,
                            yield: 300,
                            range: 15000
                        }
                    ]
                },
                slbm: {
                    name: '潜射弹道导弹',
                    systems: [
                        {
                            name: 'UGM-133A 三叉戟II D5',
                            nameEn: 'Trident II D5',
                            count: 280,
                            warheadsPerMissile:: 4,
                            warheadType: 'W76-1/W76-2/W88',
                            yield: [100, 8, 455],
                            range: 12000,
                            accuracy: 90,
                            submarines: [
                                {
                                    class: '俄亥俄级',
                                    name: 'Ohio-class SSBN',
                                    count: 14,
                                    missilesPerSub: 24,
                                    patrolAreas: ['太平洋', '大西洋'],
                                    homePorts: [
                                        { name: '基察普海军基地', lat: 47.5583, lng: -122.6333 },
                                        { name: '金斯湾海军基地', lat: 30.8000, lng: -81.5000 }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                bomber: {
                    name: '战略轰炸机',
                    systems: [
                        {
                            name: 'B-2A 幽灵',
                            nameEn: 'B-2 Spirit',
                            count: 20,
                            warheadsCapacity: 16,
                            weapons: ['B61-12', 'B83-1'],
                            bases: [
                                { name: '怀特曼空军基地', lat: 38.7333, lng: -93.5500 }
                            ]
                        },
                        {
                            name: 'B-52H 同温层堡垒',
                            nameEn: 'B-52H Stratofortress',
                            count: 46,
                            warheadsCapacity: 20,
                            weapons: ['AGM-86B', 'B61-12', 'B83-1'],
                            bases: [
                                { name: '迈诺特空军基地', lat: 48.4167, lng: -101.3500 },
                                { name: '巴克斯代尔空军基地', lat: 32.5000, lng: -93.6667 }
                            ]
                        },
                        {
                            name: 'B-21 突袭者',
                            nameEn: 'B-21 Raider',
                            count: 0,
                            status: '研发中',
                            expectedYear: 2025
                        }
                    ]
                },
                hypersonic: {
                    name: '高超音速武器',
                    systems: [
                        {
                            name: 'AGM-183A ARRW',
                            status: '测试中',
                            speed: 'Mach 20',
                            range: 1600,
                            warhead: 'W76-2'
                        }
                    ]
                }
            },
            nuclearDoctrine: {
                type: '灵活反应',
                firstUse: false,
                launchOnWarning: true,
                counterforce: true,
                countervalue: true
            }
        },
        
        Russia: {
            name: '俄罗斯',
            nameEn: 'Russia',
            totalWarheads: 6255,
            deployed: 1600,
            stockpile: 4655,
            deliverySystems: {
                icbm: {
                    name: '洲际弹道导弹',
                    systems: [
                        {
                            name: 'RS-24 亚尔斯',
                            nameEn: 'RS-24 Yars',
                            count: 171,
                            warheadsPerMissile: 4,
                            yield: 300,
                            range: 12000,
                            accuracy: 150,
                            bases: [
                                { name: '捷伊科沃', lat: 54.8500, lng: 34.3833, missiles: 60 },
                                { name: '新西伯利亚', lat: 55.0167, lng: 82.9167, missiles: 36 },
                                { name: '约什卡尔奥拉', lat: 56.6333, lng: 47.8500, missiles: 45 }
                            ]
                        },
                        {
                            name: 'R-36M2 撒旦',
                            nameEn: 'SS-18 Satan',
                            count: 46,
                            warheadsPerMissile: 10,
                            yield: 750,
                            range: 16000,
                            accuracy: 220,
                            bases: [
                                { name: '乌茹尔', lat: 54.3167, lng: 89.8333, missiles: 46 }
                            ]
                        },
                        {
                            name: 'RS-28 萨尔马特',
                            nameEn: 'RS-28 Sarmat',
                            count: 0,
                            status: '部署中',
                            warheadsPerMissile: 15,
                            yield: [300, 500],
                            range: 18000,
                            expectedCount: 50
                        },
                        {
                            name: 'RT-2PM2 白杨-M',
                            nameEn: 'Topol-M',
                            count: 60,
                            warheadsPerMissile: 1,
                            yield: 800,
                            range: 11000,
                            mobile: true
                        }
                    ]
                },
                slbm: {
                    name: '潜射弹道导弹',
                    systems: [
                        {
                            name: 'RSM-56 布拉瓦',
                            nameEn: 'Bulava',
                            count: 176,
                            warheadsPerMissile: 6,
                            yield: 100,
                            range: 9300,
                            submarines: [
                                {
                                    class: '北风之神级',
                                    count: 5,
                                    missilesPerSub: 16,
                                    homePort: { name: '加吉耶沃', lat: 69.2500, lng: 33.3333 }
                                }
                            ]
                        },
                        {
                            name: 'R-29RMU2 轻舟',
                            nameEn: 'Sineva',
                            count: 96,
                            warheadsPerMissile: 4,
                            yield: 100,
                            range: 11500
                        }
                    ]
                },
                bomber: {
                    name: '战略轰炸机',
                    systems: [
                        {
                            name: 'Tu-160 海盗旗',
                            nameEn: 'Tu-160 Blackjack',
                            count: 16,
                            warheadsCapacity: 12,
                            bases: [
                                { name: '恩格斯空军基地', lat: 51.4833, lng: 46.1167 }
                            ]
                        },
                        {
                            name: 'Tu-95MS 熊',
                            nameEn: 'Tu-95MS Bear',
                            count: 44,
                            warheadsCapacity: 6
                        }
                    ]
                },
                hypersonic: {
                    name: '高超音速武器',
                    systems: [
                        {
                            name: '先锋',
                            nameEn: 'Avangard',
                            status: '已部署',
                            speed: 'Mach 27',
                            range: 6000,
                            warheadYield: 800,
                            count: 6
                        },
                        {
                            name: '匕首',
                            nameEn: 'Kinzhal',
                            status: '已部署',
                            speed: 'Mach 10',
                            range: 2000,
                            platforms: ['MiG-31K']
                        }
                    ]
                }
            },
            nuclearDoctrine: {
                type: '升级控制',
                firstUse: false,
                launchOnWarning: true,
                counterforce: true,
                countervalue: true,
                escalateToDeescalate: true
            }
        },
        
        China: {
            name: '中国',
            nameEn: 'China',
            totalWarheads: 500,
            deployed: 410,
            stockpile: 90,
            deliverySystems: {
                icbm: {
                    name: '洲际弹道导弹',
                    systems: [
                        {
                            name: '东风-41',
                            nameEn: 'DF-41',
                            count: 36,
                            warheadsPerMissile: 10,
                            yield: 300,
                            range: 15000,
                            accuracy: 100,
                            mobile: true,
                            bases: [
                                { name: '河南', lat: 34.7500, lng: 113.6500 },
                                { name: '青海', lat: 36.6167, lng: 101.7500 }
                            ]
                        },
                        {
                            name: '东风-31AG',
                            nameEn: 'DF-31AG',
                            count: 36,
                            warheadsPerMissile: 3,
                            yield: 300,
                            range: 12000,
                            mobile: true
                        },
                        {
                            name: '东风-5B',
                            nameEn: 'DF-5B',
                            count: 20,
                            warheadsPerMissile: 4,
                            yield: 500,
                            range: 15000,
                            silo: true,
                            bases: [
                                { name: '河南', lat: 34.7500, lng: 113.6500 }
                            ]
                        }
                    ]
                },
                slbm: {
                    name: '潜射弹道导弹',
                    systems: [
                        {
                            name: '巨浪-3',
                            nameEn: 'JL-3',
                            count: 48,
                            warheadsPerMissile: 3,
                            yield: 250,
                            range: 12000,
                            submarines: [
                                {
                                    class: '094型',
                                    count: 6,
                                    missilesPerSub: 12,
                                    homePort: { name: '三亚', lat: 18.2500, lng: 109.5000 }
                                }
                            ]
                        },
                        {
                            name: '巨浪-2',
                            nameEn: 'JL-2',
                            count: 48,
                            warheadsPerMissile: 1,
                            yield: 250,
                            range: 8000
                        }
                    ]
                },
                bomber: {
                    name: '战略轰炸机',
                    systems: [
                        {
                            name: '轰-6N',
                            nameEn: 'H-6N',
                            count: 20,
                            warheadsCapacity: 1,
                            weapons: ['空射弹道导弹'],
                            bases: [
                                { name: '西安', lat: 34.2667, lng: 108.9500 }
                            ]
                        }
                    ]
                },
                hypersonic: {
                    name: '高超音速武器',
                    systems: [
                        {
                            name: '东风-17',
                            nameEn: 'DF-17',
                            status: '已部署',
                            speed: 'Mach 10',
                            range: 2500,
                            count: 54
                        },
                        {
                            name: '东风-27',
                            nameEn: 'DF-27',
                            status: '测试中',
                            speed: 'Mach 10',
                            range: 8000
                        }
                    ]
                }
            },
            nuclearDoctrine: {
                type: '最低威慑',
                firstUse: false,
                launchOnWarning: false,
                counterforce: false,
                countervalue: true,
                noFirstUse: true
            }
        },
        
        UK: {
            name: '英国',
            nameEn: 'United Kingdom',
            totalWarheads: 225,
            deployed: 120,
            stockpile: 105,
            deliverySystems: {
                slbm: {
                    name: '潜射弹道导弹',
                    systems: [
                        {
                            name: '三叉戟II D5',
                            nameEn: 'Trident II D5',
                            count: 58,
                            warheadsPerMissile: 8,
                            yield: 100,
                            range: 12000,
                            submarines: [
                                {
                                    class: '先锋级',
                                    count: 4,
                                    missilesPerSub: 16,
                                    homePort: { name: '法斯兰', lat: 55.9667, lng: -4.8167 }
                                }
                            ]
                        }
                    ]
                }
            },
            nuclearDoctrine: {
                type: '最低威慑',
                firstUse: false,
                noFirstUse: false
            }
        },
        
        France: {
            name: '法国',
            nameEn: 'France',
            totalWarheads: 290,
            deployed: 280,
            stockpile: 10,
            deliverySystems: {
                slbm: {
                    name: '潜射弹道导弹',
                    systems: [
                        {
                            name: 'M51',
                            count: 64,
                            warheadsPerMissile: 6,
                            yield: 100,
                            range: 10000,
                            submarines: [
                                {
                                    class: '凯旋级',
                                    count: 4,
                                    missilesPerSub: 16,
                                    homePort: { name: '布雷斯特', lat: 48.3833, lng: -4.5000 }
                                }
                            ]
                        }
                    ]
                },
                bomber: {
                    name: '空基核力量',
                    systems: [
                        {
                            name: '阵风',
                            nameEn: 'Rafale',
                            count: 40,
                            weapons: ['ASMP-A'],
                            bases: [
                                { name: '圣迪济耶', lat: 48.6333, lng: 4.8500 }
                            ]
                        }
                    ]
                }
            }
        },
        
        India: {
            name: '印度',
            nameEn: 'India',
            totalWarheads: 172,
            deployed: 0,
            stockpile: 172,
            deliverySystems: {
                icbm: {
                    name: '洲际弹道导弹',
                    systems: [
                        {
                            name: '烈火-V',
                            nameEn: 'Agni-V',
                            count: 12,
                            warheadsPerMissile: 1,
                            yield: 150,
                            range: 8000,
                            mobile: true
                        }
                    ]
                },
                slbm: {
                    name: '潜射弹道导弹',
                    systems: [
                        {
                            name: 'K-4',
                            count: 12,
                            warheadsPerMissile: 1,
                            yield: 35,
                            range: 3500
                        }
                    ]
                }
            }
        },
        
        Pakistan: {
            name: '巴基斯坦',
            nameEn: 'Pakistan',
            totalWarheads: 170,
            deployed: 0,
            stockpile: 170,
            deliverySystems: {
                icbm: {
                    name: '弹道导弹',
                    systems: [
                        {
                            name: '沙欣-III',
                            nameEn: 'Shaheen-III',
                            count: 24,
                            warheadsPerMissile: 1,
                            yield: 35,
                            range: 2750
                        }
                    ]
                }
            }
        },
        
        NorthKorea: {
            name: '朝鲜',
            nameEn: 'North Korea',
            totalWarheads: 50,
            deployed: 0,
            stockpile: 50,
            deliverySystems: {
                icbm: {
                    name: '洲际弹道导弹',
                    systems: [
                        {
                            name: '火星-17',
                            nameEn: 'Hwasong-17',
                            count: 10,
                            warheadsPerMissile: 1,
                            yield: 100,
                            range: 15000
                        },
                        {
                            name: '火星-18',
                            nameEn: 'Hwasong-18',
                            count: 5,
                            warheadsPerMissile: 1,
                            yield: 100,
                            range: 13000,
                            solid: true
                        }
                    ]
                }
            }
        },
        
        Israel: {
            name: '以色列',
            nameEn: 'Israel',
            totalWarheads: 90,
            deployed: 0,
            stockpile: 90,
            deliverySystems: {
                icbm: {
                    name: '弹道导弹',
                    systems: [
                        {
                            name: '杰里科-III',
                            nameEn: 'Jericho III',
                            count: 24,
                            warheadsPerMissile: 1,
                            yield: 150,
                            range: 11000
                        }
                    ]
                },
                slbm: {
                    name: '潜射导弹',
                    systems: [
                        {
                            name: '海豚级潜艇',
                            count: 5,
                            weapons: ['巡航导弹']
                        }
                    ]
                }
            }
        }
    },
    
    targetSets: {
        USA: {
            primary: ['俄罗斯军事基地', '中国军事基地', '朝鲜核设施'],
            counterforce: ['俄罗斯ICBM发射井', '俄罗斯潜艇基地', '中国导弹基地'],
            countervalue: ['莫斯科', '北京', '平壤'],
            siop: {
                name: '统一联合作战计划',
                nameEn: 'SIOP',
                targets: 1200,
                warheads: 1500
            }
        },
        Russia: {
            primary: ['美国军事基地', '北约军事设施', '欧洲指挥中心'],
            counterforce: ['美国ICBM发射井', '美国潜艇基地', '美国空军基地'],
            countervalue: ['华盛顿', '纽约', '洛杉矶', '伦敦', '巴黎']
        },
        China: {
            primary: ['美国亚太基地', '印度军事设施'],
            counterforce: ['关岛', '日本基地'],
            countervalue: ['美国西海岸城市']
        }
    },
    
    scenarios: {
        limitedExchange: {
            name: '有限核交换',
            description: '小规模核冲突，双方各使用10-50枚核弹头',
            warheadsUsed: [10, 50],
            casualties: '100万-5000万',
            globalImpact: '区域性气候影响'
        },
        regionalWar: {
            name: '区域核战争',
            description: '印巴或中东地区核冲突',
            warheadsUsed: [50, 200],
            casualties: '2000万-2亿',
            globalImpact: '全球气候变冷1-2°C'
        },
        fullScaleWar: {
            name: '全面核战争',
            description: '美俄全面核交换',
            warheadsUsed: [2000, 4000],
            casualties: '直接死亡: 3.6亿-9亿，间接死亡: 50亿+',
            globalImpact: '核冬天，文明崩溃'
        }
    },
    
    getCountryArsenal(countryCode) {
        return this.countries[countryCode] || null;
    },
    
    getTotalWarheads() {
        let total = 0;
        for (const country of Object.values(this.countries)) {
            total += country.totalWarheads;
        }
        return total;
    },
    
    getDeployedWarheads() {
        let total = 0;
        for (const country of Object.values(this.countries)) {
            total += country.deployed;
        }
        return total;
    },
    
    getAllTargets(countryCode) {
        const country = this.countries[countryCode];
        if (!country) return [];
        
        const targets = [];
        
        for (const systemType of Object.values(country.deliverySystems)) {
            for (const system of systemType.systems) {
                if (system.bases) {
                    for (const base of system.bases) {
                        targets.push({
                            name: base.name,
                            lat: base.lat,
                            lng: base.lng,
                            type: 'base',
                            system: system.name
                        });
                    }
                }
                if (system.locations) {
                    for (const loc of system.locations) {
                        targets.push({
                            name: loc.name,
                            lat: loc.lat,
                            lng: loc.lng,
                            type: 'silo',
                            system: system.name,
                            missiles: loc.missiles
                        });
                    }
                }
                if (system.submarines) {
                    for (const sub of system.submarines) {
                        if (sub.homePort) {
                            targets.push({
                                name: sub.homePort.name,
                                lat: sub.homePort.lat,
                                lng: sub.homePort.lng,
                                type: 'submarine_base',
                                system: system.name
                            });
                        }
                    }
                }
            }
        }
        
        return targets;
    }
};

window.GlobalNuclearArsenal = GlobalNuclearArsenal;
