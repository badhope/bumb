const MapHandler = {
    map: null,
    targetMarker: null,
    impactCircles: [],
    selectedCoords: null,
    selectedCity: null,
    
    init() {
        this.map = L.map('map', {
            center: [35, 105],
            zoom: 4,
            minZoom: 2,
            maxZoom: 18,
            worldCopyJump: true
        });

        const gaodeLayer = L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            subdomains: ['1', '2', '3', '4'],
            attribution: '&copy; 高德地图',
            maxZoom: 18
        });

        const gaodeSatellite = L.tileLayer('https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
            subdomains: ['1', '2', '3', '4'],
            attribution: '&copy; 高德地图',
            maxZoom: 18
        });

        const gaodeSatelliteLabel = L.layerGroup([
            gaodeSatellite,
            L.tileLayer('https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', {
                subdomains: ['1', '2', '3', '4']
            })
        ]);

        const geoqLayer = L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; GeoQ',
            maxZoom: 16
        });

        const geoqDarkLayer = L.tileLayer('http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplish/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; GeoQ',
            maxZoom: 16
        });

        gaodeLayer.addTo(this.map);

        const baseLayers = {
            '高德地图': gaodeLayer,
            '高德卫星': gaodeSatelliteLabel,
            'GeoQ 彩色版': geoqLayer,
            'GeoQ 深色版': geoqDarkLayer
        };

        L.control.layers(baseLayers, null, { position: 'topright' }).addTo(this.map);

        this.createTargetIcon();

        this.map.on('click', (e) => {
            this.selectLocation(e.latlng.lat, e.latlng.lng);
        });

        console.log('MapHandler initialized');
    },

    createTargetIcon() {
        this.targetIcon = L.divIcon({
            className: 'target-marker',
            html: '<div class="target-cross">+</div>',
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });
    },

    flyTo(lat, lng, zoom = 10) {
        console.log('Flying to:', lat, lng);
        this.map.flyTo([lat, lng], zoom, {
            duration: 1.5
        });
    },

    selectCity(city) {
        console.log('Selecting city:', city.name, city.lat, city.lng);
        
        this.selectedCity = city;
        this.selectedCoords = { lat: city.lat, lng: city.lng };
        
        if (this.targetMarker) {
            this.map.removeLayer(this.targetMarker);
        }

        this.targetMarker = L.marker([city.lat, city.lng], {
            icon: this.targetIcon,
            zIndexOffset: 1000
        }).addTo(this.map);

        this.map.flyTo([city.lat, city.lng], 10, {
            duration: 1.5
        });

        this.updateCoordDisplay(city.lat, city.lng, city.name);

        const countryCode = this.getCountryCode(city.country);
        const countryData = countryCode ? window.CountryData[countryCode] : null;
        
        if (window.App) {
            window.App.updateCountryInfo(countryData, city);
        }
    },

    selectLocation(lat, lng) {
        console.log('Selecting location:', lat, lng);
        
        this.selectedCity = null;
        this.selectedCoords = { lat, lng };

        if (this.targetMarker) {
            this.map.removeLayer(this.targetMarker);
        }

        this.targetMarker = L.marker([lat, lng], {
            icon: this.targetIcon,
            zIndexOffset: 1000
        }).addTo(this.map);

        this.updateCoordDisplay(lat, lng, '自定义位置');

        const countryCode = this.getCountryByCoords(lat, lng);
        const countryData = countryCode ? window.CountryData[countryCode] : null;

        if (window.App) {
            window.App.updateCountryInfo(countryData, {
                name: '自定义目标',
                lat, lng
            });
        }
    },

    updateCoordDisplay(lat, lng, name) {
        const latEl = document.getElementById('targetLat');
        const lngEl = document.getElementById('targetLng');
        const nameEl = document.getElementById('targetName');
        
        if (latEl) latEl.textContent = lat.toFixed(4);
        if (lngEl) lngEl.textContent = lng.toFixed(4);
        if (nameEl) nameEl.textContent = name;

        const toast = document.getElementById('coordToast');
        const toastLat = document.getElementById('toastLat');
        const toastLng = document.getElementById('toastLng');
        
        if (toast && toastLat && toastLng) {
            toastLat.textContent = lat.toFixed(4);
            toastLng.textContent = lng.toFixed(4);
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }
    },

    getCountryCode(countryName) {
        const countryMap = {
            '中国': 'CN', '日本': 'JP', '韩国': 'KR', '朝鲜': 'KP',
            '印度': 'IN', '巴基斯坦': 'PK', '孟加拉国': 'BD', '印度尼西亚': 'ID',
            '泰国': 'TH', '越南': 'VN', '菲律宾': 'PH', '马来西亚': 'MY',
            '新加坡': 'SG', '缅甸': 'MM', '柬埔寨': 'KH', '老挝': 'LA',
            '美国': 'US', '加拿大': 'CA', '墨西哥': 'MX', '巴西': 'BR',
            '阿根廷': 'AR', '智利': 'CL', '哥伦比亚': 'CO', '秘鲁': 'PE',
            '英国': 'GB', '法国': 'FR', '德国': 'DE', '意大利': 'IT',
            '西班牙': 'ES', '波兰': 'PL', '荷兰': 'NL', '比利时': 'BE',
            '瑞士': 'CH', '瑞典': 'SE', '挪威': 'NO', '丹麦': 'DK',
            '芬兰': 'FI', '奥地利': 'AT', '希腊': 'GR', '葡萄牙': 'PT',
            '俄罗斯': 'RU', '乌克兰': 'UA', '白俄罗斯': 'BY', '哈萨克斯坦': 'KZ',
            '乌兹别克斯坦': 'UZ', '土耳其': 'TR', '伊朗': 'IR', '伊拉克': 'IQ',
            '沙特阿拉伯': 'SA', '阿联酋': 'AE', '以色列': 'IL', '埃及': 'EG',
            '南非': 'ZA', '尼日利亚': 'NG', '埃塞俄比亚': 'ET', '肯尼亚': 'KE',
            '澳大利亚': 'AU', '新西兰': 'NZ'
        };
        return countryMap[countryName] || null;
    },

    getCountryByCoords(lat, lng) {
        if (lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135) return 'CN';
        if (lat >= 30 && lat <= 46 && lng >= 129 && lng <= 146) return 'JP';
        if (lat >= 33 && lat <= 39 && lng >= 124 && lng <= 132) return 'KR';
        if (lat >= 38 && lat <= 43 && lng >= 124 && lng <= 131) return 'KP';
        if (lat >= 6 && lat <= 36 && lng >= 68 && lng <= 98) return 'IN';
        if (lat >= 24 && lat <= 50 && lng >= -125 && lng <= -66) return 'US';
        if (lat >= 41 && lat <= 83 && lng >= -141 && lng <= -52) return 'CA';
        if (lat >= 35 && lat <= 72 && lng >= -10 && lng <= 60) return 'EU';
        if (lat >= 41 && lat <= 82 && lng >= 19 && lng <= 180) return 'RU';
        if (lat >= -44 && lat <= -10 && lng >= 113 && lng <= 154) return 'AU';
        return null;
    },

    drawImpactCircles(results) {
        this.clearImpactCircles();

        if (!this.selectedCoords) return;

        const lat = this.selectedCoords.lat;
        const lng = this.selectedCoords.lng;

        const circles = [
            { radius: results.electromagnetic, color: '#00bfff', opacity: 0.2, name: 'EMP' },
            { radius: results.radiation, color: '#9400d3', opacity: 0.3, name: '辐射' },
            { radius: results.thermal, color: '#ff6347', opacity: 0.35, name: '热辐射' },
            { radius: results.lightBlast, color: '#ffd700', opacity: 0.4, name: '轻度破坏' },
            { radius: results.moderateBlast, color: '#ff8c00', opacity: 0.45, name: '中度破坏' },
            { radius: results.heavyBlast, color: '#ff4500', opacity: 0.5, name: '重度破坏' },
            { radius: results.fireball, color: '#ff0000', opacity: 0.7, name: '火球' }
        ];

        circles.forEach(c => {
            if (c.radius > 0) {
                const circle = L.circle([lat, lng], {
                    radius: c.radius * 1000,
                    color: c.color,
                    fillColor: c.color,
                    fillOpacity: c.opacity,
                    weight: 2,
                    className: 'impact-circle'
                }).addTo(this.map);

                circle.bindTooltip(`${c.name}: ${c.radius.toFixed(2)} km`, {
                    permanent: false,
                    direction: 'center',
                    className: 'impact-tooltip'
                });

                this.impactCircles.push(circle);
            }
        });

        const maxRadius = results.electromagnetic || results.radiation || results.thermal;
        const bounds = L.circle([lat, lng], { radius: maxRadius * 1000 }).getBounds();
        this.map.fitBounds(bounds, { padding: [50, 50] });
    },

    clearImpactCircles() {
        this.impactCircles.forEach(circle => {
            this.map.removeLayer(circle);
        });
        this.impactCircles = [];
    },

    formatPopulation(pop) {
        if (pop >= 10000000) {
            return (pop / 10000000).toFixed(1) + '千万';
        } else if (pop >= 10000) {
            return (pop / 10000).toFixed(0) + '万';
        }
        return pop.toLocaleString();
    },

    searchCities(query) {
        if (!query || query.length < 1 || !window.CitiesData) return [];
        
        const q = query.toLowerCase();
        return window.CitiesData.filter(city => 
            city.name.toLowerCase().includes(q) ||
            city.country.toLowerCase().includes(q)
        ).slice(0, 10);
    }
};

window.MapHandler = MapHandler;
