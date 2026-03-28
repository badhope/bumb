/**
 * 风向/天气系统
 * 影响放射性尘埃飘散方向
 */

const WeatherSystem = {
    // 风向角度（北为0，顺时针）
    windDirection: 0,
    windSpeed: 5, // m/s
    
    // 天气类型
    weatherType: 'clear', // clear, cloudy, rainy, snowy
    
    /**
     * 设置风向
     * @param {number} direction - 角度（0-360）
     */
    setWindDirection(direction) {
        this.windDirection = direction % 360;
    },
    
    /**
     * 设置风速
     * @param {number} speed - m/s
     */
    setWindSpeed(speed) {
        this.windSpeed = Math.max(0, Math.min(50, speed));
    },
    
    /**
     * 设置天气类型
     */
    setWeatherType(type) {
        const validTypes = ['clear', 'cloudy', 'rainy', 'snowy'];
        this.weatherType = validTypes.includes(type) ? type : 'clear';
    },
    
    /**
     * 获取风向名称
     */
    getWindDirectionName() {
        const directions = [
            { min: 337.5, max: 360, name: '北风' },
            { min: 0, max: 22.5, name: '北风' },
            { min: 22.5, max: 67.5, name: '东北风' },
            { min: 67.5, max: 112.5, name: '东风' },
            { min: 112.5, max: 157.5, name: '东南风' },
            { min: 157.5, max: 202.5, name: '南风' },
            { min: 202.5, max: 247.5, name: '西南风' },
            { min: 247.5, max: 292.5, name: '西风' },
            { min: 292.5, max: 337.5, name: '西北风' }
        ];
        
        for (const dir of directions) {
            if (this.windDirection >= dir.min && this.windDirection < dir.max) {
                return dir.name;
            }
        }
        return '无风';
    },
    
    /**
     * 计算放射性尘埃漂移
     * @param {number} lat - 纬度
     * @param {number} lng - 经度
     * @param {number} yieldKt - 当量
     * @param {number} hours - 小时数
     * @returns {Object} 漂移后的坐标和区域
     */
    calculateFalloutDrift(lat, lng, yieldKt, hours = 24) {
        // 风速换算为 km/h
        const windSpeedKmh = this.windSpeed * 3.6;
        
        // 漂移距离（简化模型）
        const driftDistance = windSpeedKmh * hours * 0.1; // km
        
        // 角度转弧度
        const angle = (this.windDirection - 90) * Math.PI / 180;
        
        // 经纬度偏移（近似）
        const latOffset = driftDistance * Math.sin(angle) / 111;
        const lngOffset = driftDistance * Math.cos(angle) / (111 * Math.cos(lat * Math.PI / 180));
        
        return {
            originLat: lat,
            originLng: lng,
            targetLat: lat + latOffset,
            targetLng: lng + lngOffset,
            driftDistance: driftDistance,
            direction: this.getWindDirectionName(),
            windSpeed: this.windSpeed
        };
    },
    
    /**
     * 获取天气对辐射的影响因子
     */
    getWeatherFactor() {
        const factors = {
            clear: 1.0,
            cloudy: 0.9,
            rainy: 0.6, // 雨水会加速沉降
            snowy: 0.7
        };
        
        return factors[this.weatherType] || 1.0;
    },
    
    /**
     * 获取完整天气信息
     */
    getWeatherInfo() {
        return {
            windDirection: this.windDirection,
            windDirectionName: this.getWindDirectionName(),
            windSpeed: this.windSpeed,
            weatherType: this.weatherType,
            weatherFactor: this.getWeatherFactor()
        };
    },
    
    /**
     * 应用天气到计算结果
     */
    applyWeatherToResults(results) {
        if (!results) return results;
        
        const factor = this.getWeatherFactor();
        
        return {
            ...results,
            radiation: results.radiation * factor,
            areas: {
                ...results.areas,
                radiation: results.areas.radiation * factor
            },
            weather: this.getWeatherInfo()
        };
    }
};

window.WeatherSystem = WeatherSystem;
