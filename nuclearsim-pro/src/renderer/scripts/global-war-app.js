let map = null;
let currentScenario = null;
let simulationRunning = false;
let simulationPaused = false;
let launchedMissiles = [];
let detonations = [];
let markers = {
    arsenal: [],
    targets: [],
    missiles: [],
    impacts: []
};
let trajectories = [];

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Global War Simulator initializing...');
    
    initMap();
    updateArsenalSummary();
    setupEventListeners();
    
    console.log('Global War Simulator initialized');
});

function initMap() {
    map = L.map('map', {
        center: [30, 100],
        zoom: 3,
        minZoom: 2,
        maxZoom: 18,
        worldCopyJump: true
    });

    const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19
    });

    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri',
        maxZoom: 19
    });

    darkLayer.addTo(map);

    L.control.layers({
        '暗色地图': darkLayer,
        '卫星图': satelliteLayer
    }, {}, { position: 'topright' }).addTo(map);
}

function updateArsenalSummary() {
    if (!window.GlobalNuclearArsenal) return;
    
    document.getElementById('totalWarheads').textContent = 
        GlobalNuclearArsenal.getTotalWarheads().toLocaleString();
    document.getElementById('deployedWarheads').textContent = 
        GlobalNuclearArsenal.getDeployedWarheads().toLocaleString();
}

function setupEventListeners() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const section = item.dataset.section;
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            document.getElementById(`${section}-panel`).classList.add('active');
        });
    });
}

function selectCountry() {
    const countryCode = document.getElementById('countrySelect').value;
    if (!countryCode) {
        document.getElementById('arsenalDetails').style.display = 'none';
        return;
    }
    
    const arsenal = GlobalNuclearArsenal.getCountryArsenal(countryCode);
    if (!arsenal) return;
    
    document.getElementById('arsenalDetails').style.display = 'block';
    document.getElementById('selectedCountryName').textContent = 
        `${arsenal.name} ${getCountryFlag(countryCode)}`;
    document.getElementById('countryTotalWarheads').textContent = 
        arsenal.totalWarheads.toLocaleString();
    document.getElementById('countryDeployed').textContent = 
        arsenal.deployed.toLocaleString();
    document.getElementById('countryStockpile').textContent = 
        arsenal.stockpile.toLocaleString();
    
    displayDeliverySystems(arsenal);
    showArsenalOnMap(countryCode);
}

function getCountryFlag(code) {
    const flags = {
        'USA': '🇺🇸',
        'Russia': '🇷🇺',
        'China': '🇨🇳',
        'UK': '🇬🇧',
        'France': '🇫🇷',
        'India': '🇮🇳',
        'Pakistan': '🇵🇰',
        'NorthKorea': '🇰🇵',
        'Israel': '🇮🇱'
    };
    return flags[code] || '';
}

function displayDeliverySystems(arsenal) {
    const container = document.getElementById('deliverySystems');
    container.innerHTML = '';
    
    for (const [type, system] of Object.entries(arsenal.deliverySystems)) {
        const typeDiv = document.createElement('div');
        typeDiv.className = 'delivery-system';
        
        let typeIcon = '🚀';
        if (type === 'slbm') typeIcon = '🛳️';
        else if (type === 'bomber') typeIcon = '✈️';
        else if (type === 'hypersonic') typeIcon = '⚡';
        
        typeDiv.innerHTML = `<h4>${typeIcon} ${system.name}</h4>`;
        
        system.systems.forEach(sys => {
            const sysDiv = document.createElement('div');
            sysDiv.className = 'system-item';
            
            let statusBadge = '';
            if (sys.status) {
                statusBadge = `<span style="color: #ffd700; font-size: 11px;">(${sys.status})</span>`;
            }
            
            sysDiv.innerHTML = `
                <div class="system-name">${sys.name} ${sys.nameEn ? `(${sys.nameEn})` : ''} ${statusBadge}</div>
                <div class="system-stats">
                    <span>数量: ${sys.count || '--'}</span>
                    <span>弹头/枚: ${sys.warheadsPerMissile || '--'}</span>
                    <span>当量: ${Array.isArray(sys.yield) ? sys.yield.join('/') : sys.yield || '--'} kt</span>
                    <span>射程: ${sys.range ? (sys.range/1000).toFixed(0) + '000' : '--'} km</span>
                </div>
            `;
            
            typeDiv.appendChild(sysDiv);
        });
        
        container.appendChild(typeDiv);
    }
}

function showArsenalOnMap(countryCode) {
    clearMarkers('arsenal');
    
    const targets = GlobalNuclearArsenal.getAllTargets(countryCode);
    
    targets.forEach(target => {
        const icon = L.divIcon({
            className: 'arsenal-marker',
            html: `<div class="arsenal-icon">🚀</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
        
        const marker = L.marker([target.lat, target.lng], { icon })
            .addTo(map)
            .bindTooltip(`${target.name}<br>${target.type}`, { permanent: false });
        
        markers.arsenal.push(marker);
    });
}

function loadScenario(scenarioId) {
    currentScenario = GlobalWarSimulator.scenarios[scenarioId];
    if (!currentScenario) {
        showNotification('场景不存在', 'error');
        return;
    }
    
    showNotification(`已加载场景: ${currentScenario.name}`, 'success');
    
    document.querySelectorAll('.nav-item')[1].click();
    
    document.getElementById('simStatus').textContent = '场景已加载';
}

function updateWarheadLabel() {
    const value = document.getElementById('warheadCount').value;
    document.getElementById('warheadCountLabel').textContent = value;
}

function createCustomScenario() {
    const aggressor = document.getElementById('aggressorSelect').value;
    const defender = document.getElementById('defenderSelect').value;
    const attackType = document.getElementById('attackType').value;
    const warheadCount = parseInt(document.getElementById('warheadCount').value);
    
    if (aggressor === defender) {
        showNotification('攻击方和防御方不能相同', 'error');
        return;
    }
    
    currentScenario = {
        id: 'custom',
        name: '自定义场景',
        aggressor: aggressor,
        defender: defender,
        phases: [
            { name: '第一波打击', type: attackType, warheads: warheadCount }
        ]
    };
    
    showNotification('自定义场景已创建', 'success');
    document.querySelectorAll('.nav-item')[2].click();
}

function startGlobalSimulation() {
    if (!currentScenario) {
        showNotification('请先选择或创建场景', 'error');
        return;
    }
    
    if (simulationRunning) {
        showNotification('模拟已在运行中', 'error');
        return;
    }
    
    simulationRunning = true;
    simulationPaused = false;
    
    document.getElementById('startSimBtn').disabled = true;
    document.getElementById('pauseSimBtn').disabled = false;
    document.getElementById('simStatus').textContent = '运行中...';
    
    showLoading(true);
    
    clearMap();
    
    setTimeout(() => {
        runSimulation();
    }, 1000);
}

function runSimulation() {
    const aggressorCode = currentScenario.aggressor;
    const defenderCode = currentScenario.defender;
    
    const aggressorArsenal = GlobalNuclearArsenal.getCountryArsenal(aggressorCode);
    const defenderArsenal = GlobalNuclearArsenal.getCountryArsenal(defenderCode);
    
    if (!aggressorArsenal || !defenderArsenal) {
        showNotification('无法获取核武库数据', 'error');
        showLoading(false);
        return;
    }
    
    let phaseIndex = 0;
    let missileIndex = 0;
    
    const phases = currentScenario.phases;
    
    function launchNextMissile() {
        if (simulationPaused) {
            setTimeout(launchNextMissile, 500);
            return;
        }
        
        if (phaseIndex >= phases.length) {
            finishSimulation();
            return;
        }
        
        const phase = phases[phaseIndex];
        const isAggressorTurn = phaseIndex % 2 === 0;
        const attacker = isAggressorTurn ? aggressorArsenal : defenderArsenal;
        const defender = isAggressorTurn ? defenderArsenal : aggressorArsenal;
        
        if (missileIndex >= phase.warheads) {
            phaseIndex++;
            missileIndex = 0;
            setTimeout(launchNextMissile, 500);
            return;
        }
        
        const targets = selectTargetsForPhase(defender, phase.type, phase.warheads);
        if (missileIndex >= targets.length) {
            phaseIndex++;
            missileIndex = 0;
            setTimeout(launchNextMissile, 500);
            return;
        }
        
        const target = targets[missileIndex];
        
        const originBases = attacker.deliverySystems.icbm?.systems[0]?.bases || 
                           attacker.deliverySystems.icbm?.systems[0]?.locations ||
                           [{ lat: 40, lng: -100, name: 'Unknown' }];
        const origin = originBases[Math.floor(Math.random() * originBases.length)];
        
        const missile = GlobalWarSimulator.simulateMissileLaunch({
            type: 'icbm',
            origin: origin,
            target: target,
            warhead: 'W78',
            yield: 300
        });
        
        launchedMissiles.push(missile);
        animateMissile(missile);
        
        missileIndex++;
        
        const speed = parseFloat(document.getElementById('simSpeed').value);
        setTimeout(launchNextMissile, 200 / speed);
    }
    
    launchNextMissile();
}

function selectTargetsForPhase(defender, type, count) {
    const targets = [];
    const cities = window.CitiesData?.cities || [];
    const defenderCities = cities.filter(c => c.country === defender.name);
    
    const defenderCode = Object.keys(GlobalNuclearArsenal.countries).find(
        k => GlobalNuclearArsenal.countries[k].name === defender.name
    );
    
    if (type === 'counterforce' || type === 'mixed') {
        const arsenalTargets = GlobalNuclearArsenal.getAllTargets(defenderCode);
        for (let i = 0; i < Math.min(count/2, arsenalTargets.length); i++) {
            const t = arsenalTargets[i];
            targets.push({
                name: t.name,
                lat: t.lat,
                lng: t.lng,
                type: t.type,
                populationDensity: 100
            });
        }
    }
    
    if (type === 'countervalue' || type === 'mixed') {
        const sortedCities = defenderCities.sort((a, b) => 
            (b.population || 0) - (a.population || 0));
        
        const startIdx = type === 'mixed' ? targets.length : 0;
        const targetCount = type === 'mixed' ? count - targets.length : count;
        
        for (let i = 0; i < Math.min(targetCount, sortedCities.length); i++) {
            const city = sortedCities[i];
            targets.push({
                name: city.name,
                lat: city.lat,
                lng: city.lng,
                type: 'city',
                populationDensity: city.density || 5000
            });
        }
    }
    
    return targets;
}

function animateMissile(missile) {
    const showTrajectories = document.getElementById('showTrajectories').checked;
    const animate = document.getElementById('animateMissiles').checked;
    
    if (showTrajectories) {
        const trajectoryLine = L.polyline(
            missile.trajectory.map(p => [p.lat, p.lng]),
            { color: '#00ff00', weight: 2, dashArray: '10, 5' }
        ).addTo(map);
        trajectories.push(trajectoryLine);
    }
    
    if (animate) {
        const missileIcon = L.divIcon({
            className: 'missile-marker',
            html: '<div class="missile-icon"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        
        const missileMarker = L.marker(
            [missile.origin.lat, missile.origin.lng],
            { icon: missileIcon }
        ).addTo(map);
        markers.missiles.push(missileMarker);
        
        const speed = parseFloat(document.getElementById('simSpeed').value);
        const steps = 50;
        const stepTime = (missile.flightTime * 1000) / steps / speed;
        let currentStep = 0;
        
        const moveMissile = setInterval(() => {
            if (currentStep >= steps || !simulationRunning) {
                clearInterval(moveMissile);
                map.removeLayer(missileMarker);
                
                triggerDetonation(missile);
                return;
            }
            
            if (simulationPaused) return;
            
            const point = missile.trajectory[Math.floor(currentStep * missile.trajectory.length / steps)];
            missileMarker.setLatLng([point.lat, point.lng]);
            currentStep++;
        }, stepTime);
    } else {
        setTimeout(() => {
            triggerDetonation(missile);
        }, 100);
    }
    
    updateStats();
}

function triggerDetonation(missile) {
    const detonation = GlobalWarSimulator.simulateDetonation({
        location: missile.target.name,
        coords: { lat: missile.target.lat, lng: missile.target.lng },
        yield: missile.yield,
        weapon: missile.warhead,
        populationDensity: missile.target.populationDensity
    });
    
    detonations.push(detonation);
    
    const showImpact = document.getElementById('showImpactCircles').checked;
    if (showImpact) {
        drawImpactCircle(detonation);
    }
    
    updateStats();
}

function drawImpactCircle(detonation) {
    const results = detonation.results;
    const coords = detonation.coords;
    
    const circles = [
        { radius: results.fireball, color: '#ff0000', opacity: 0.6 },
        { radius: results.heavyBlast, color: '#ff4500', opacity: 0.5 },
        { radius: results.moderateBlast, color: '#ff8c00', opacity: 0.4 },
        { radius: results.lightBlast, color: '#ffd700', opacity: 0.3 }
    ];
    
    circles.forEach(c => {
        if (c.radius > 0) {
            const circle = L.circle([coords.lat, coords.lng], {
                radius: c.radius * 1000,
                color: c.color,
                fillColor: c.color,
                fillOpacity: c.opacity,
                weight: 1
            }).addTo(map);
            markers.impacts.push(circle);
        }
    });
}

function updateStats() {
    document.getElementById('launchedMissiles').textContent = launchedMissiles.length;
    document.getElementById('detonations').textContent = detonations.length;
    
    let totalDeaths = 0;
    let totalInjuries = 0;
    
    detonations.forEach(d => {
        if (d.casualties) {
            totalDeaths += d.casualties.deaths || 0;
            totalInjuries += d.casualties.injuries || 0;
        }
    });
    
    document.getElementById('totalDeaths').textContent = formatNumber(totalDeaths);
    document.getElementById('totalInjuries').textContent = formatNumber(totalInjuries);
    
    if (detonations.length > 0) {
        const effects = GlobalWarSimulator.calculateGlobalEffects(detonations);
        
        document.getElementById('tempDrop').textContent = 
            effects.environmentalImpact.temperatureDrop.toFixed(1) + '°C';
        document.getElementById('nuclearWinter').textContent = 
            effects.environmentalImpact.nuclearWinter ? '是' : '否';
        document.getElementById('civilizationImpact').textContent = 
            effects.civilizationImpact.level;
    }
}

function formatNumber(num) {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
}

function finishSimulation() {
    simulationRunning = false;
    showLoading(false);
    
    document.getElementById('startSimBtn').disabled = false;
    document.getElementById('pauseSimBtn').disabled = true;
    document.getElementById('simStatus').textContent = '完成';
    
    const effects = GlobalWarSimulator.calculateGlobalEffects(detonations);
    displayResults(effects);
    
    showNotification('模拟完成', 'success');
}

function pauseSimulation() {
    simulationPaused = !simulationPaused;
    document.getElementById('pauseSimBtn').textContent = 
        simulationPaused ? '▶️ 继续' : '⏸️ 暂停';
    document.getElementById('simStatus').textContent = 
        simulationPaused ? '已暂停' : '运行中...';
}

function resetSimulation() {
    simulationRunning = false;
    simulationPaused = false;
    launchedMissiles = [];
    detonations = [];
    currentScenario = null;
    
    clearMap();
    
    document.getElementById('startSimBtn').disabled = false;
    document.getElementById('pauseSimBtn').disabled = true;
    document.getElementById('pauseSimBtn').textContent = '⏸️ 暂停';
    document.getElementById('simStatus').textContent = '就绪';
    
    document.getElementById('launchedMissiles').textContent = '0';
    document.getElementById('detonations').textContent = '0';
    document.getElementById('totalDeaths').textContent = '0';
    document.getElementById('totalInjuries').textContent = '0';
    document.getElementById('tempDrop').textContent = '--';
    document.getElementById('nuclearWinter').textContent = '--';
    document.getElementById('civilizationImpact').textContent = '--';
    
    showNotification('已重置', 'info');
}

function clearMap() {
    clearMarkers('all');
    trajectories.forEach(t => map.removeLayer(t));
    trajectories = [];
}

function clearMarkers(type) {
    if (type === 'all' || type === 'arsenal') {
        markers.arsenal.forEach(m => map.removeLayer(m));
        markers.arsenal = [];
    }
    if (type === 'all' || type === 'targets') {
        markers.targets.forEach(m => map.removeLayer(m));
        markers.targets = [];
    }
    if (type === 'all' || type === 'missiles') {
        markers.missiles.forEach(m => map.removeLayer(m));
        markers.missiles = [];
    }
    if (type === 'all' || type === 'impacts') {
        markers.impacts.forEach(m => map.removeLayer(m));
        markers.impacts = [];
    }
}

function setMapTool(tool) {
    document.querySelectorAll('.map-tools .tool-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    showNotification(`工具: ${tool}`, 'info');
}

function toggleArsenalMarkers() {
    const countryCode = document.getElementById('countrySelect').value;
    if (countryCode) {
        showArsenalOnMap(countryCode);
    } else {
        showNotification('请先选择国家', 'info');
    }
}

function toggleTargets() {
    showNotification('目标显示功能', 'info');
}

function displayResults(effects) {
    const panel = document.getElementById('resultsPanel');
    panel.classList.add('show');
    
    document.getElementById('summaryContent').innerHTML = `
        <div class="result-section">
            <h4>📊 模拟概览</h4>
            <div class="result-grid">
                <div class="result-item">
                    <span class="result-label">总爆炸次数</span>
                    <span class="result-value">${effects.totalDetonations}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">总当量</span>
                    <span class="result-value">${effects.totalYield.toLocaleString()} kt</span>
                </div>
                <div class="result-item">
                    <span class="result-label">总伤亡</span>
                    <span class="result-value">${formatNumber(effects.totalCasualties)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">恢复时间</span>
                    <span class="result-value">${effects.recoveryTime}</span>
                </div>
            </div>
        </div>
        
        <div class="result-section">
            <h4>🌍 文明影响</h4>
            <div class="impact-level ${effects.civilizationImpact.level}">
                <div class="impact-title">${effects.civilizationImpact.level}</div>
                <div class="impact-desc">${effects.civilizationImpact.description}</div>
                <div class="impact-survival">生存率: ${effects.civilizationImpact.survivalRate}</div>
            </div>
        </div>
    `;
    
    document.getElementById('casualtiesContent').innerHTML = `
        <div class="result-section">
            <h4>💀 伤亡统计</h4>
            <div class="casualty-chart" id="casualtyChart"></div>
        </div>
    `;
    
    document.getElementById('environmentContent').innerHTML = `
        <div class="result-section">
            <h4>🌡️ 环境影响</h4>
            <div class="env-stats">
                <div class="env-item">
                    <span>温度下降</span>
                    <span>${effects.environmentalImpact.temperatureDrop.toFixed(1)}°C</span>
                </div>
                <div class="env-item">
                    <span>核冬天</span>
                    <span>${effects.environmentalImpact.nuclearWinter ? '是' : '否'}</span>
                </div>
                <div class="env-item">
                    <span>臭氧消耗</span>
                    <span>${effects.environmentalImpact.ozoneDepletion.toFixed(0)}%</span>
                </div>
                <div class="env-item">
                    <span>饥荒风险</span>
                    <span>${effects.environmentalImpact.famineRisk}</span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('timelineContent').innerHTML = `
        <div class="result-section">
            <h4>⏱️ 时间线</h4>
            <div class="timeline">
                ${detonations.map((d, i) => `
                    <div class="timeline-item">
                        <div class="timeline-time">${new Date(d.timestamp).toLocaleTimeString()}</div>
                        <div class="timeline-event">${d.location} - ${d.yield}kt</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function switchResultTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tab}Tab`).classList.add('active');
}

function closeResults() {
    document.getElementById('resultsPanel').classList.remove('show');
}

function openTopic(topic) {
    const topics = {
        delivery: {
            title: '🚀 投送系统',
            content: `
                <h4>洲际弹道导弹 (ICBM)</h4>
                <p>射程超过5500公里的弹道导弹，可携带多个核弹头。飞行时间约30分钟，速度可达7公里/秒。</p>
                
                <h4>潜射弹道导弹 (SLBM)</h4>
                <p>从潜艇发射的弹道导弹，具有高度隐蔽性。核潜艇可在全球海域巡逻，提供二次打击能力。</p>
                
                <h4>战略轰炸机</h4>
                <p>可携带核武器的远程轰炸机，如B-52、B-2、Tu-160等。飞行时间长，可召回。</p>
                
                <h4>高超音速武器</h4>
                <p>速度超过5马赫的新型武器，难以拦截。包括滑翔飞行器和巡航导弹。</p>
            `
        },
        warhead: {
            title: '💣 弹头类型',
            content: `
                <h4>裂变弹 (原子弹)</h4>
                <p>使用铀-235或钚-239的裂变反应，当量通常在几吨到几十万吨。</p>
                
                <h4>聚变弹 (氢弹)</h4>
                <p>使用裂变-聚变反应，当量可达数百万吨甚至数千万吨。</p>
                
                <h4>战术核武器</h4>
                <p>小当量核武器，用于战场目标。当量从几吨到几千吨。</p>
                
                <h4>战略核武器</h4>
                <p>大当量核武器，用于战略目标。当量通常在几十万吨以上。</p>
            `
        },
        doctrine: {
            title: '📜 核战略',
            content: `
                <h4>相互保证毁灭 (MAD)</h4>
                <p>双方都有足够的核武器确保在遭受首次打击后仍能进行毁灭性报复。</p>
                
                <h4>不首先使用 (NFU)</h4>
                <p>承诺不首先使用核武器，只在遭受核攻击后进行报复。</p>
                
                <h4>先发制人</h4>
                <p>在敌方发动攻击前先进行核打击，摧毁其核能力。</p>
                
                <h4>灵活反应</h4>
                <p>根据威胁程度选择不同规模的核回应。</p>
            `
        },
        effects: {
            title: '💥 核效应',
            content: `
                <h4>冲击波</h4>
                <p>核爆炸产生的高压气浪，是造成建筑物破坏和人员伤亡的主要原因。</p>
                
                <h4>热辐射</h4>
                <p>核爆炸产生的极高温度，可导致烧伤和火灾。</p>
                
                <h4>核辐射</h4>
                <p>包括瞬时辐射和剩余辐射，可导致急性辐射病和长期健康影响。</p>
                
                <h4>电磁脉冲 (EMP)</h4>
                <p>核爆炸产生的强电磁场，可破坏电子设备。</p>
            `
        },
        defense: {
            title: '🛡️ 防御系统',
            content: `
                <h4>弹道导弹防御 (BMD)</h4>
                <p>包括预警系统、拦截导弹和指挥控制系统。</p>
                
                <h4>预警卫星</h4>
                <p>探测导弹发射的红外信号，提供早期预警。</p>
                
                <h4>拦截系统</h4>
                <p>包括陆基中段防御(GMD)、萨德(THAAD)、爱国者等。</p>
                
                <h4>民防系统</h4>
                <p>包括防空洞、疏散计划、辐射监测等。</p>
            `
        },
        treaty: {
            title: '📝 国际条约',
            content: `
                <h4>不扩散核武器条约 (NPT)</h4>
                <p>1970年生效，旨在防止核武器扩散，促进核裁军。</p>
                
                <h4>新削减战略武器条约</h4>
                <p>美俄之间的双边条约，限制部署的核弹头数量。</p>
                
                <h4>全面禁止核试验条约 (CTBT)</h4>
                <p>禁止一切核试验，尚未全面生效。</p>
                
                <h4>禁止核武器条约 (TPNW)</h4>
                <p>2021年生效，全面禁止核武器。</p>
            `
        }
    };
    
    const info = document.getElementById('parameterInfo');
    const topicData = topics[topic];
    
    if (topicData) {
        info.innerHTML = `
            <h3>${topicData.title}</h3>
            ${topicData.content}
        `;
    }
}

function exportResults() {
    if (detonations.length === 0) {
        showNotification('没有可导出的结果', 'error');
        return;
    }
    
    const results = GlobalWarSimulator.exportScenarioResults({
        scenario: currentScenario,
        missiles: launchedMissiles,
        detonations: detonations,
        globalEffects: GlobalWarSimulator.calculateGlobalEffects(detonations)
    });
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nuclear_war_simulation_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('结果已导出', 'success');
}

function importScenario() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                showNotification('场景已导入', 'success');
            } catch (error) {
                showNotification('导入失败: 无效的文件格式', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function exportResultsPDF() {
    showNotification('PDF导出功能开发中', 'info');
}

function shareResults() {
    showNotification('分享功能开发中', 'info');
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function showLoading(show) {
    const loading = document.getElementById('loading');
    loading.style.display = show ? 'flex' : 'none';
}

window.selectCountry = selectCountry;
window.loadScenario = loadScenario;
window.updateWarheadLabel = updateWarheadLabel;
window.createCustomScenario = createCustomScenario;
window.startGlobalSimulation = startGlobalSimulation;
window.pauseSimulation = pauseSimulation;
window.resetSimulation = resetSimulation;
window.setMapTool = setMapTool;
window.toggleArsenalMarkers = toggleArsenalMarkers;
window.toggleTargets = toggleTargets;
window.clearMap = clearMap;
window.closeResults = closeResults;
window.switchResultTab = switchResultTab;
window.openTopic = openTopic;
window.exportResults = exportResults;
window.importScenario = importScenario;
window.exportResultsPDF = exportResultsPDF;
window.shareResults = shareResults;
