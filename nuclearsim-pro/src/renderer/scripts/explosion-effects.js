const ExplosionEffects = {
    canvas: null,
    ctx: null,
    particles: [],
    shockwaves: [],
    fires: [],
    debris: [],
    isAnimating: false,
    animationId: null,
    
    init(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('Explosion container not found');
            return false;
        }
        
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'explosionCanvas';
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        container.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        
        return true;
    },
    
    resize() {
        if (!this.canvas) return;
        
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    },
    
    createExplosion(x, y, yieldKt, options = {}) {
        const scale = Math.pow(yieldKt, 0.4) * 0.5;
        
        this.createFireball(x, y, scale);
        this.createShockwave(x, y, scale);
        this.createDebris(x, y, scale);
        this.createMushroomCloud(x, y, scale);
        
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
        
        if (options.onComplete) {
            setTimeout(() => {
                options.onComplete();
            }, 3000);
        }
    },
    
    createFireball(x, y, scale) {
        const colors = [
            { r: 255, g: 255, b: 255 },
            { r: 255, g: 255, b: 200 },
            { r: 255, g: 200, b: 100 },
            { r: 255, g: 150, b: 50 },
            { r: 255, g: 100, b: 0 },
            { r: 200, g: 50, b: 0 }
        ];
        
        for (let i = 0; i < 100; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed * scale,
                vy: Math.sin(angle) * speed * scale,
                radius: Math.random() * 8 * scale + 4,
                color: color,
                alpha: 1,
                decay: Math.random() * 0.02 + 0.01,
                type: 'fireball'
            });
        }
    },
    
    createShockwave(x, y, scale) {
        this.shockwaves.push({
            x: x,
            y: y,
            radius: 10,
            maxRadius: 200 * scale,
            alpha: 0.8,
            speed: 8 * scale,
            color: { r: 255, g: 200, b: 100 }
        });
        
        this.shockwaves.push({
            x: x,
            y: y,
            radius: 10,
            maxRadius: 150 * scale,
            alpha: 0.6,
            speed: 5 * scale,
            color: { r: 255, g: 150, b: 50 },
            delay: 5
        });
    },
    
    createDebris(x, y, scale) {
        for (let i = 0; i < 50; i++) {
            const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
            const speed = Math.random() * 15 + 5;
            
            this.debris.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed * scale,
                vy: Math.sin(angle) * speed * scale,
                radius: Math.random() * 3 + 1,
                alpha: 1,
                gravity: 0.3,
                type: 'debris'
            });
        }
    },
    
    createMushroomCloud(x, y, scale) {
        const stemParticles = 30;
        const cloudParticles = 80;
        
        for (let i = 0; i < stemParticles; i++) {
            this.particles.push({
                x: x + (Math.random() - 0.5) * 20 * scale,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 8 - 3,
                radius: Math.random() * 10 * scale + 5,
                color: { r: 100 + Math.random() * 50, g: 100 + Math.random() * 50, b: 100 + Math.random() * 50 },
                alpha: 0.7,
                decay: 0.005,
                type: 'smoke'
            });
        }
        
        for (let i = 0; i < cloudParticles; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 50 * scale;
            
            this.particles.push({
                x: x + Math.cos(angle) * dist,
                y: y - 100 * scale - Math.random() * 50 * scale,
                vx: Math.cos(angle) * (Math.random() * 2 + 1),
                vy: -Math.random() * 2,
                radius: Math.random() * 20 * scale + 10,
                color: { r: 80 + Math.random() * 40, g: 80 + Math.random() * 40, b: 80 + Math.random() * 40 },
                alpha: 0.5,
                decay: 0.003,
                type: 'smoke'
            });
        }
    },
    
    animate() {
        if (!this.ctx || !this.canvas) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateShockwaves();
        this.updateParticles();
        this.updateDebris();
        
        if (this.particles.length > 0 || this.shockwaves.length > 0 || this.debris.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.isAnimating = false;
        }
    },
    
    updateShockwaves() {
        for (let i = this.shockwaves.length - 1; i >= 0; i--) {
            const sw = this.shockwaves[i];
            
            if (sw.delay && sw.delay > 0) {
                sw.delay--;
                continue;
            }
            
            sw.radius += sw.speed;
            sw.alpha -= 0.015;
            
            if (sw.alpha > 0 && sw.radius < sw.maxRadius) {
                this.ctx.beginPath();
                this.ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(${sw.color.r}, ${sw.color.g}, ${sw.color.b}, ${sw.alpha})`;
                this.ctx.lineWidth = 3;
                this.ctx.stroke();
                
                const gradient = this.ctx.createRadialGradient(sw.x, sw.y, sw.radius * 0.8, sw.x, sw.y, sw.radius);
                gradient.addColorStop(0, `rgba(${sw.color.r}, ${sw.color.g}, ${sw.color.b}, 0)`);
                gradient.addColorStop(1, `rgba(${sw.color.r}, ${sw.color.g}, ${sw.color.b}, ${sw.alpha * 0.3})`);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            } else {
                this.shockwaves.splice(i, 1);
            }
        }
    },
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            
            if (p.type === 'fireball') {
                p.vy += 0.1;
                p.radius *= 0.98;
            } else if (p.type === 'smoke') {
                p.vy -= 0.05;
                p.radius *= 1.01;
                p.vx *= 0.99;
            }
            
            if (p.alpha > 0 && p.radius > 0.5) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                
                const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`);
                gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
                
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            } else {
                this.particles.splice(i, 1);
            }
        }
    },
    
    updateDebris() {
        for (let i = this.debris.length - 1; i >= 0; i--) {
            const d = this.debris[i];
            
            d.x += d.vx;
            d.y += d.vy;
            d.vy += d.gravity;
            d.alpha -= 0.01;
            
            if (d.alpha > 0 && d.y < this.canvas.height) {
                this.ctx.beginPath();
                this.ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(50, 50, 50, ${d.alpha})`;
                this.ctx.fill();
            } else {
                this.debris.splice(i, 1);
            }
        }
    },
    
    createMapExplosion(map, lat, lng, yieldKt, options = {}) {
        const point = map.latLngToContainerPoint([lat, lng]);
        
        const explosionIcon = L.divIcon({
            className: 'explosion-marker',
            html: `
                <div class="explosion-container" style="
                    width: 100px;
                    height: 100px;
                    position: relative;
                ">
                    <div class="explosion-ring" style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: radial-gradient(circle, #fff 0%, #ff0 30%, #f80 60%, #f00 100%);
                        animation: explosionPulse 0.5s ease-out forwards;
                    "></div>
                    <div class="explosion-flash" style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 0;
                        height: 0;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.8);
                        animation: explosionFlash 0.3s ease-out forwards;
                    "></div>
                </div>
                <style>
                    @keyframes explosionPulse {
                        0% { width: 10px; height: 10px; opacity: 1; }
                        50% { width: 80px; height: 80px; opacity: 0.8; }
                        100% { width: 100px; height: 100px; opacity: 0; }
                    }
                    @keyframes explosionFlash {
                        0% { width: 0; height: 0; opacity: 1; }
                        100% { width: 200px; height: 200px; opacity: 0; }
                    }
                </style>
            `,
            iconSize: [100, 100],
            iconAnchor: [50, 50]
        });
        
        const marker = L.marker([lat, lng], { icon: explosionIcon }).addTo(map);
        
        setTimeout(() => {
            map.removeLayer(marker);
        }, 1000);
        
        const scale = Math.pow(yieldKt, 0.4) * 0.3;
        this.createImpactCircle(map, lat, lng, scale, options);
    },
    
    createImpactCircle(map, lat, lng, scale, options = {}) {
        const colors = [
            { radius: 0.5, color: '#ff0000', name: '火球' },
            { radius: 2, color: '#ff4500', name: '重度破坏' },
            { radius: 5, color: '#ff8c00', name: '中度破坏' },
            { radius: 10, color: '#ffd700', name: '轻度破坏' }
        ];
        
        const circles = [];
        
        colors.forEach((c, i) => {
            const circle = L.circle([lat, lng], {
                radius: c.radius * scale * 1000,
                color: c.color,
                fillColor: c.color,
                fillOpacity: 0.3 - i * 0.05,
                weight: 2,
                opacity: 0.8
            }).addTo(map);
            
            circle.bindTooltip(`${c.name}: ${(c.radius * scale).toFixed(1)} km`, {
                permanent: false,
                direction: 'center'
            });
            
            circles.push(circle);
        });
        
        if (options.autoFit) {
            const maxRadius = colors[colors.length - 1].radius * scale * 1000;
            map.fitBounds(L.circle([lat, lng], { radius: maxRadius }).getBounds(), { padding: [50, 50] });
        }
        
        return circles;
    },
    
    clear() {
        this.particles = [];
        this.shockwaves = [];
        this.debris = [];
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        this.isAnimating = false;
        
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },
    
    destroy() {
        this.clear();
        
        if (this.canvas && this.canvas.parentElement) {
            this.canvas.parentElement.removeChild(this.canvas);
        }
        
        this.canvas = null;
        this.ctx = null;
    }
};

window.ExplosionEffects = ExplosionEffects;
