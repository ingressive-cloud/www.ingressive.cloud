'use strict';

// ── Globe Background Animation ────────────────────────────────────────────────

const canvas = document.getElementById('globe-bg');
const ctx = canvas.getContext('2d');

const ACCENT_RGB = '118, 87, 255';
const GLOBE_RADIUS_FACTOR = 0.32;
const ROTATION_SPEED = 0.00022; // radians per ms
const MAX_ARCS = 8;

let width, height, cx, cy, radius;
let rotationY = 0;
let lastTimestamp = null;

// Major internet hub cities [lat, lon]
const CITIES = [
    [40.7128,  -74.006 ],  // New York
    [51.5074,   -0.1278],  // London
    [48.8566,    2.3522],  // Paris
    [52.52,     13.405 ],  // Berlin
    [55.7558,   37.6173],  // Moscow
    [25.2048,   55.2708],  // Dubai
    [19.076,    72.8777],  // Mumbai
    [ 1.3521,  103.8198],  // Singapore
    [35.6762,  139.6503],  // Tokyo
    [-33.8688, 151.2093],  // Sydney
    [37.5665,  126.978 ],  // Seoul
    [39.9042,  116.4074],  // Beijing
    [31.2304,  121.4737],  // Shanghai
    [-23.5505, -46.6333],  // São Paulo
    [34.0522, -118.2437],  // Los Angeles
    [47.6062, -122.3321],  // Seattle
    [37.7749, -122.4194],  // San Francisco
    [41.8781,  -87.6298],  // Chicago
    [43.6532,  -79.3832],  // Toronto
    [59.3293,   18.0686],  // Stockholm
    [50.8503,    4.3517],  // Brussels
    [ 6.5244,    3.3792],  // Lagos
    [-26.2041,  28.0473],  // Johannesburg
    [-34.6037, -58.3816],  // Buenos Aires
];

// Convert lat/lon to 3D unit vector with Y-axis rotation applied
function toXYZ(lat, lon, rotY) {
    const phi = (lat * Math.PI) / 180;
    const lam = (lon * Math.PI) / 180 + rotY;
    return {
        x:  Math.cos(phi) * Math.sin(lam),
        y: -Math.sin(phi),
        z:  Math.cos(phi) * Math.cos(lam),
    };
}

// Project 3D unit vector to 2D screen coordinates
function project(p) {
    return {
        sx: cx + p.x * radius,
        sy: cy + p.y * radius,
    };
}

// Active arc list: { a, b, t, speed }
const arcs = [];

function spawnArc() {
    const a = Math.floor(Math.random() * CITIES.length);
    let b;
    do { b = Math.floor(Math.random() * CITIES.length); } while (b === a);
    arcs.push({ a, b, t: 0, speed: 0.1 + Math.random() * 0.15 });
}

function resize() {
    width  = canvas.width  = window.innerWidth;
    height = canvas.height = window.innerHeight;
    cx = width  / 2;
    cy = height / 2;
    radius = Math.min(width, height) * GLOBE_RADIUS_FACTOR;
}

// ── Draw grid lines ──
function drawGrid() {
    // Latitude lines every 30°
    for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lon = -180; lon <= 180; lon += 3) {
            const p = toXYZ(lat, lon, rotationY);
            if (p.z < 0.01) { first = true; continue; }
            const { sx, sy } = project(p);
            if (first) { ctx.moveTo(sx, sy); first = false; }
            else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(${ACCENT_RGB}, 0.07)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }

    // Longitude lines every 30°
    for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -80; lat <= 80; lat += 3) {
            const p = toXYZ(lat, lon, rotationY);
            if (p.z < 0.01) { first = true; continue; }
            const { sx, sy } = project(p);
            if (first) { ctx.moveTo(sx, sy); first = false; }
            else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(${ACCENT_RGB}, 0.07)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
    }

    // Globe outline circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${ACCENT_RGB}, 0.18)`;
    ctx.lineWidth = 1;
    ctx.stroke();
}

// ── Draw city dots ──
function drawCities() {
    for (const city of CITIES) {
        const p = toXYZ(city[0], city[1], rotationY);
        if (p.z < 0.05) continue;
        const { sx, sy } = project(p);
        const alpha = 0.3 + p.z * 0.7;

        // Glow halo
        const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
        glow.addColorStop(0, `rgba(${ACCENT_RGB}, ${alpha * 0.55})`);
        glow.addColorStop(1, `rgba(${ACCENT_RGB}, 0)`);
        ctx.beginPath();
        ctx.arc(sx, sy, 8, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
    }
}

// ── Draw animated arcs + packet dots ──
function drawArcs(dt) {
    while (arcs.length < MAX_ARCS) spawnArc();

    for (let i = arcs.length - 1; i >= 0; i--) {
        const arc = arcs[i];
        arc.t += arc.speed * (dt / 1000);

        if (arc.t >= 1) {
            arcs.splice(i, 1);
            continue;
        }

        const cityA = CITIES[arc.a];
        const cityB = CITIES[arc.b];
        const pA = toXYZ(cityA[0], cityA[1], rotationY);
        const pB = toXYZ(cityB[0], cityB[1], rotationY);

        // Skip if both endpoints are on the back of the globe
        if (pA.z < -0.2 && pB.z < -0.2) continue;

        const A = project(pA);
        const B = project(pB);

        // Control point: geographic midpoint lifted above the globe surface
        const midLat = (cityA[0] + cityB[0]) / 2;
        const midLon = (cityA[1] + cityB[1]) / 2;
        const midP   = toXYZ(midLat, midLon, rotationY);
        const LIFT   = 0.42;
        const CP = project({ x: midP.x * (1 + LIFT), y: midP.y * (1 + LIFT) });

        const t    = arc.t;
        const fade = t < 0.1 ? t / 0.1 : t > 0.85 ? (1 - t) / 0.15 : 1;

        // Sub-bezier trail from arc start to current position t
        // (de Casteljau split: ctrl = lerp(A, CP, t), end = point on bezier at t)
        const ctrlX = A.sx + t * (CP.sx - A.sx);
        const ctrlY = A.sy + t * (CP.sy - A.sy);
        const endX  = (1 - t) * (1 - t) * A.sx + 2 * (1 - t) * t * CP.sx + t * t * B.sx;
        const endY  = (1 - t) * (1 - t) * A.sy + 2 * (1 - t) * t * CP.sy + t * t * B.sy;

        ctx.beginPath();
        ctx.moveTo(A.sx, A.sy);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
        ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${0.5 * fade})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Packet dot at the leading edge
        const glow = ctx.createRadialGradient(endX, endY, 0, endX, endY, 7);
        glow.addColorStop(0,   `rgba(255, 255, 255, ${fade})`);
        glow.addColorStop(0.4, `rgba(${ACCENT_RGB}, ${0.7 * fade})`);
        glow.addColorStop(1,   `rgba(${ACCENT_RGB}, 0)`);
        ctx.beginPath();
        ctx.arc(endX, endY, 7, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endX, endY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
        ctx.fill();
    }
}

// ── Animation loop ──
function animate(ts) {
    const dt = lastTimestamp ? Math.min(ts - lastTimestamp, 50) : 0;
    lastTimestamp = ts;

    rotationY += ROTATION_SPEED * dt;

    ctx.clearRect(0, 0, width, height);
    drawGrid();
    drawCities();
    drawArcs(dt);

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
requestAnimationFrame(animate);

// ── Scroll Reveal ─────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
