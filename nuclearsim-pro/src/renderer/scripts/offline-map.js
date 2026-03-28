const OfflineMapManager = {
    dbName: 'NuclearSimMapTiles',
    dbVersion: 1,
    db: null,
    cacheExpiry: 7 * 24 * 60 * 60 * 1000,
    
    mapSources: {
        gaode: {
            name: '高德地图',
            url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
            subdomains: ['1', '2', '3', '4'],
            maxZoom: 18,
            attribution: '© 高德地图'
        },
        gaodeSatellite: {
            name: '高德卫星',
            url: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
            subdomains: ['1', '2', '3', '4'],
            maxZoom: 18,
            attribution: '© 高德地图'
        },
        geoq: {
            name: 'GeoQ彩色版',
            url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 16,
            attribution: '© GeoQ'
        },
        geoqDark: {
            name: 'GeoQ深色版',
            url: 'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplish/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 16,
            attribution: '© GeoQ'
        },
        cartoDB: {
            name: 'CartoDB暗色',
            url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            subdomains: ['a', 'b', 'c', 'd'],
            maxZoom: 19,
            attribution: '© CartoDB'
        },
        cartoDBLight: {
            name: 'CartoDB亮色',
            url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            subdomains: ['a', 'b', 'c', 'd'],
            maxZoom: 19,
            attribution: '© CartoDB'
        },
        stamen: {
            name: 'Stamen地形',
            url: 'https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png',
            maxZoom: 18,
            attribution: '© Stadia Maps'
        },
        osm: {
            name: 'OpenStreetMap',
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            subdomains: ['a', 'b', 'c'],
            maxZoom: 18,
            attribution: '© OpenStreetMap'
        },
        esri: {
            name: 'Esri卫星',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19,
            attribution: '© Esri'
        },
        esriStreet: {
            name: 'Esri街道',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19,
            attribution: '© Esri'
        }
    },
    
    async init() {
        try {
            this.db = await this.openDatabase();
            console.log('OfflineMapManager initialized');
            return true;
        } catch (error) {
            console.error('Failed to init OfflineMapManager:', error);
            return false;
        }
    },
    
    openDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains('tiles')) {
                    const store = db.createObjectStore('tiles', { keyPath: 'key' });
                    store.createIndex('source', 'source', { unique: false });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('metadata')) {
                    db.createObjectStore('metadata', { keyPath: 'id' });
                }
            };
        });
    },
    
    getTileKey(source, x, y, z) {
        return `${source}_${z}_${x}_${y}`;
    },
    
    async getTile(source, x, y, z) {
        if (!this.db) return null;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['tiles'], 'readonly');
            const store = transaction.objectStore('tiles');
            const key = this.getTileKey(source, x, y, z);
            const request = store.get(key);
            
            request.onsuccess = () => {
                const tile = request.result;
                if (tile && (Date.now() - tile.timestamp) < this.cacheExpiry) {
                    resolve(tile.data);
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    },
    
    async saveTile(source, x, y, z, data) {
        if (!this.db) return;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['tiles'], 'readwrite');
            const store = transaction.objectStore('tiles');
            const key = this.getTileKey(source, x, y, z);
            
            const tileData = {
                key: key,
                source: source,
                x: x,
                y: y,
                z: z,
                data: data,
                timestamp: Date.now()
            };
            
            const request = store.put(tileData);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },
    
    async downloadTile(sourceConfig, x, y, z) {
        const url = sourceConfig.url
            .replace('{x}', x)
            .replace('{y}', y)
            .replace('{z}', z)
            .replace('{r}', '');
        
        let finalUrl = url;
        if (sourceConfig.subdomains && sourceConfig.subdomains.length > 0) {
            const subdomain = sourceConfig.subdomains[Math.floor(Math.random() * sourceConfig.subdomains.length)];
            finalUrl = finalUrl.replace('{s}', subdomain);
        }
        
        try {
            const response = await fetch(finalUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.warn(`Failed to download tile ${x},${y},${z}:`, error);
            return null;
        }
    },
    
    async downloadRegion(source, bounds, minZoom, maxZoom, progressCallback) {
        const sourceConfig = this.mapSources[source];
        if (!sourceConfig) {
            throw new Error(`Unknown map source: ${source}`);
        }
        
        let totalTiles = 0;
        let downloadedTiles = 0;
        
        for (let z = minZoom; z <= maxZoom; z++) {
            const xMin = Math.floor((bounds.west + 180) / 360 * Math.pow(2, z));
            const xMax = Math.ceil((bounds.east + 180) / 360 * Math.pow(2, z));
            const yMin = Math.floor((1 - Math.log(Math.tan(bounds.north * Math.PI / 180) + 1 / Math.cos(bounds.north * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z));
            const yMax = Math.ceil((1 - Math.log(Math.tan(bounds.south * Math.PI / 180) + 1 / Math.cos(bounds.south * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z));
            
            totalTiles += (xMax - xMin + 1) * (yMax - yMin + 1);
        }
        
        for (let z = minZoom; z <= maxZoom; z++) {
            const xMin = Math.max(0, Math.floor((bounds.west + 180) / 360 * Math.pow(2, z)));
            const xMax = Math.min(Math.pow(2, z) - 1, Math.ceil((bounds.east + 180) / 360 * Math.pow(2, z)));
            const yMin = Math.max(0, Math.floor((1 - Math.log(Math.tan(Math.min(85.0511, bounds.north) * Math.PI / 180) + 1 / Math.cos(Math.min(85.0511, bounds.north) * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z)));
            const yMax = Math.min(Math.pow(2, z) - 1, Math.ceil((1 - Math.log(Math.tan(Math.max(-85.0511, bounds.south) * Math.PI / 180) + 1 / Math.cos(Math.max(-85.0511, bounds.south) * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, z)));
            
            for (let x = xMin; x <= xMax; x++) {
                for (let y = yMin; y <= yMax; y++) {
                    const cached = await this.getTile(source, x, y, z);
                    if (!cached) {
                        const data = await this.downloadTile(sourceConfig, x, y, z);
                        if (data) {
                            await this.saveTile(source, x, y, z, data);
                        }
                    }
                    
                    downloadedTiles++;
                    if (progressCallback) {
                        progressCallback({
                            progress: downloadedTiles / totalTiles,
                            downloaded: downloadedTiles,
                            total: totalTiles,
                            zoom: z,
                            x: x,
                            y: y
                        });
                    }
                    
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
        }
        
        return { downloaded: downloadedTiles, total: totalTiles };
    },
    
    createCachedTileLayer(source, options = {}) {
        const sourceConfig = this.mapSources[source];
        if (!sourceConfig) {
            console.error(`Unknown map source: ${source}`);
            return null;
        }
        
        const self = this;
        
        const CachedTileLayer = L.TileLayer.extend({
            createTile: function(coords, done) {
                const tile = document.createElement('img');
                
                self.getTile(source, coords.x, coords.y, coords.z).then(cached => {
                    if (cached) {
                        tile.src = cached;
                        done(null, tile);
                    } else {
                        const url = this.getTileUrl(coords);
                        tile.src = url;
                        
                        tile.onload = () => {
                            const canvas = document.createElement('canvas');
                            canvas.width = tile.naturalWidth;
                            canvas.height = tile.naturalHeight;
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(tile, 0, 0);
                            
                            const data = canvas.toDataURL('image/png');
                            self.saveTile(source, coords.x, coords.y, coords.z, data);
                            
                            done(null, tile);
                        };
                        
                        tile.onerror = () => done(new Error('Tile load error'));
                    }
                });
                
                return tile;
            }
        });
        
        return new CachedTileLayer(sourceConfig.url, {
            ...options,
            subdomains: sourceConfig.subdomains,
            maxZoom: sourceConfig.maxZoom,
            attribution: sourceConfig.attribution
        });
    },
    
    createFastTileLayer(source, options = {}) {
        const sourceConfig = this.mapSources[source];
        if (!sourceConfig) {
            console.error(`Unknown map source: ${source}`);
            return null;
        }
        
        return L.tileLayer(sourceConfig.url, {
            ...options,
            subdomains: sourceConfig.subdomains,
            maxZoom: sourceConfig.maxZoom,
            attribution: sourceConfig.attribution,
            crossOrigin: true
        });
    },
    
    async getCacheStats() {
        if (!this.db) return { count: 0, size: 0 };
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['tiles'], 'readonly');
            const store = transaction.objectStore('tiles');
            const request = store.getAll();
            
            request.onsuccess = () => {
                const tiles = request.result;
                let totalSize = 0;
                
                tiles.forEach(tile => {
                    if (tile.data) {
                        totalSize += tile.data.length;
                    }
                });
                
                resolve({
                    count: tiles.length,
                    size: totalSize,
                    sizeMB: (totalSize / 1024 / 1024).toFixed(2)
                });
            };
            
            request.onerror = () => reject(request.error);
        });
    },
    
    async clearCache() {
        if (!this.db) return;
        
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['tiles'], 'readwrite');
            const store = transaction.objectStore('tiles');
            const request = store.clear();
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
};

window.OfflineMapManager = OfflineMapManager;
