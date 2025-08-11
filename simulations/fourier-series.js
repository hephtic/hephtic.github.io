document.addEventListener("DOMContentLoaded", () => {
  const modeSelect = document.getElementById("dimension-select");
  const wavesContainer = document.getElementById("waves-container");
  const epiContainer = document.getElementById("epicycle-container");

  let currentMode = null;

  modeSelect.addEventListener("change", () => {
    const mode = modeSelect.value;
    wavesContainer.style.display = mode === "waves" ? "block" : "none";
    epiContainer.style.display = mode === "epicycles" ? "block" : "none";

    if (mode !== currentMode) {
      if (mode === "waves") {
        initWavesMode();
      } else if (mode === "epicycles") {
        initEpicycleMode();
      }
      currentMode = mode;
    }
  });

  // Default start
  modeSelect.value = "waves";
  modeSelect.dispatchEvent(new Event("change"));
});

function initWavesMode() {
    const canvas = document.getElementById('drawCanvasWaves');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const fourierCanvas = document.getElementById('fourierCanvasWaves');
    const fctx = fourierCanvas.getContext('2d');
    const fwidth = fourierCanvas.width;
    const fheight = fourierCanvas.height;

    const termSlider = document.getElementById('termSlider');
    const termCount = document.getElementById('termCount');

    // User drawn raw points (mouse coords)
    let drawing = false;
    let rawPoints = [];

    // Resampled to M points for Fourier calculation
    const M = 512;
    let resampledYs = new Array(M).fill(0);

    // Fourier coeffs
    let a = [], b = [];

    termSlider.addEventListener('input', () => {
        termCount.textContent = termSlider.value;
        if (rawPoints.length > 1) {
        computeAndDraw();
        }
    });

    canvas.addEventListener('mousedown', (e) => {
        drawing = true;
        rawPoints = [];
        clearCanvas();
        addPoint(e);
    });
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        if (rawPoints.length > 1) {
        computeAndDraw();
        }
    });
    canvas.addEventListener('mouseout', () => {
        drawing = false;
    });
    canvas.addEventListener('mousemove', (e) => {
        if (!drawing) return;
        addPoint(e);
    });

    // Support touch events for mobile
    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        drawing = true;
        rawPoints = [];
        clearCanvas();
        addPoint(e.touches[0]);
    }, {passive: false});
    canvas.addEventListener('touchend', e => {
        e.preventDefault();
        drawing = false;
        if (rawPoints.length > 1) {
        computeAndDraw();
        }
    }, {passive: false});
    canvas.addEventListener('touchmove', e => {
        e.preventDefault();
        if (!drawing) return;
        addPoint(e.touches[0]);
    }, {passive: false});

    function addPoint(e) {
        const rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        // Clamp to canvas
        x = Math.max(0, Math.min(width, x));
        y = Math.max(0, Math.min(height, y));
        rawPoints.push({x, y});
        drawLatestLine();
    }

    function drawLatestLine() {
        if (rawPoints.length < 2) return;
        const p1 = rawPoints[rawPoints.length - 2];
        const p2 = rawPoints[rawPoints.length - 1];
        ctx.strokeStyle = '#0077ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }

    function drawFourierTerms() {
        fctx.clearRect(0, 0, fwidth, fheight);

        const N = parseInt(termSlider.value);

        // Adjust scaling for vertical spacing
        const maxOffset = fheight - 20; // leave some bottom margin
        const logMax = Math.log(N + 1);

        for (let n = 1; n <= N; n++) {
            // Map n to compressed vertical position
            const yOffset = (Math.log(n + 1) / logMax) * maxOffset;

            // Draw center line
            fctx.strokeStyle = 'rgba(81, 81, 81, 0.5)'; // for decomposition center lines
            fctx.beginPath();
            fctx.moveTo(0, yOffset);
            fctx.lineTo(fwidth, yOffset);
            fctx.stroke();

            // Draw nth Fourier term
            fctx.strokeStyle = '#0077ff';
            fctx.lineWidth = 1.5;
            fctx.beginPath();

            for (let i = 0; i < M; i++) {
                const t = (2 * Math.PI * i) / M;
                const y = a[n] * Math.cos(n * t) + b[n - 1] * Math.sin(n * t);
                const cy = yOffset - y * 20; // fixed amplitude scale
                const cx = (i / (M - 1)) * fwidth;
                if (i === 0) fctx.moveTo(cx, cy);
                else fctx.lineTo(cx, cy);
            }

            fctx.stroke();
        }
    }


    function clearCanvas() {
        ctx.clearRect(0, 0, width, height);
    }

    // Resample rawPoints evenly in x over [0, width] to get M points y-values
    function resamplePoints() {
        if (rawPoints.length === 0) return new Array(M).fill(height/2);
        const ys = new Array(M);
        let idx = 0;
        for (let i = 0; i < M; i++) {
        const targetX = (i / (M - 1)) * width;

        // Move idx forward until rawPoints[idx].x >= targetX
        while (idx < rawPoints.length - 1 && rawPoints[idx].x < targetX) idx++;
        if (idx === 0) {
            ys[i] = rawPoints[0].y;
        } else {
            // linear interpolate between rawPoints[idx-1] and rawPoints[idx]
            const p0 = rawPoints[idx - 1];
            const p1 = rawPoints[idx];
            const t = (targetX - p0.x) / (p1.x - p0.x);
            ys[i] = p0.y + t * (p1.y - p0.y);
        }
        }
        return ys;
    }

    // Compute Fourier coeffs a,b of real function sampled at resampledYs
    function computeFourierCoeffs(ys, N) {
        a = [];
        b = [];
        // Convert canvas y to math y (flip y axis and center at 0)
        // We'll set y=0 at center height, scale so max amplitude ~1
        const centerY = height / 2;
        const scaledYs = ys.map(y => (centerY - y) / centerY);

        // a0
        let a0 = 0;
        for (let i = 0; i < M; i++) a0 += scaledYs[i];
        a.push((2 / M) * (a0 / 2));

        for (let n = 1; n <= N; n++) {
        let an = 0, bn = 0;
        for (let k = 0; k < M; k++) {
            const t = (2 * Math.PI * k) / M;
            an += scaledYs[k] * Math.cos(n * t);
            bn += scaledYs[k] * Math.sin(n * t);
        }
        a.push((2 / M) * an);
        b.push((2 / M) * bn);
        }
    }

    // Reconstruct value at t (in [0, 2pi])
    function reconstruct(t) {
        let sum = a[0];
        for (let n = 1; n < a.length; n++) {
        sum += a[n] * Math.cos(n * t) + b[n - 1] * Math.sin(n * t);
        }
        return sum;
    }

    // Draw original and approximation
    function drawCurves() {
        clearCanvas();

        // Draw x-axis center line
        ctx.strokeStyle = 'rgba(81, 81, 81, 0.5)'; // for the wave center line
        ctx.beginPath();
        ctx.moveTo(0, height/2);
        ctx.lineTo(width, height/2);
        ctx.stroke();

        // Draw original user function
        ctx.strokeStyle = '#0077ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < rawPoints.length; i++) {
        const p = rawPoints[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();

        // Draw Fourier approximation
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < M; i++) {
        const t = (2 * Math.PI * i) / M;
        const y = reconstruct(t);
        // map y [-1,1] back to canvas coords
        const cy = height/2 - y * (height/2);
        const cx = (i / (M - 1)) * width;
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
    }

    // Full compute + draw pipeline
    function computeAndDraw() {
        resampledYs = resamplePoints();
        const N = parseInt(termSlider.value);
        computeFourierCoeffs(resampledYs, N);
        drawCurves();
        drawFourierTerms();
    }

    // Initial blank state
    clearCanvas();
    ctx.fillStyle = '#0077ff';
    ctx.font = '16px computer-modern-serif';
    ctx.fillText('Draw a function by dragging your mouse horizontally, then use the slider.', 60, height/2);
}

function initEpicycleMode() {
    const drawCanvas = document.getElementById('drawCanvasEpi');
    const drawCtx = drawCanvas.getContext('2d');
    const epiCanvas = document.getElementById('epiCanvas');
    const epiCtx = epiCanvas.getContext('2d');

    const slider = document.getElementById('termSlider');
    const termCount = document.getElementById('termCount');

    let drawing = false;
    let path = [];
    let fourier = [];
    let time = 0;
    let trace = [];

    let clock = 0; // Monotonic time for fading
    let lastTimestamp = performance.now();
    const fadeDuration = 5.0; // seconds

    slider.addEventListener('input', () => {
    termCount.textContent = slider.value;
    });

    drawCanvas.addEventListener('mousedown', () => {
    drawing = true;
    path = [];
    drawCtx.clearRect(0, 0, drawCanvas.width, drawCanvas.height);
    });
    drawCanvas.addEventListener('mouseup', () => {
    drawing = false;
    if (path.length > 1) {
        computeFourier();
    }
    });
    drawCanvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const rect = drawCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    path.push({x, y});
    if (path.length > 1) {
        drawCtx.strokeStyle = '#0077ff';
        drawCtx.lineWidth = 3;
        drawCtx.beginPath();
        drawCtx.moveTo(path[path.length - 2].x, path[path.length - 2].y);
        drawCtx.lineTo(x, y);
        drawCtx.stroke();
    }
    });

    function computeFourier() {
    const resampled = resample(path, 300).map(p => ({
        re: p.x - drawCanvas.width / 2,
        im: p.y - drawCanvas.height / 2
    }));
    fourier = dft(resampled);
    time = 0;
    clock = 0;
    trace = [];
    lastTimestamp = performance.now();
    }

    function resample(pts, N) {
    if (pts.length === 0) return [];
    const out = [];
    let total = 0;
    const dists = [];
    for (let i = 1; i < pts.length; i++) {
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        const d = Math.hypot(dx, dy);
        dists.push(d);
        total += d;
    }
    const step = total / N;
    let distSoFar = 0;
    out.push(pts[0]);
    for (let i = 1; i < pts.length && out.length < N; i++) {
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        const d = dists[i - 1];
        while (distSoFar + d >= out.length * step) {
        const t = ((out.length * step) - distSoFar) / d;
        out.push({
            x: pts[i - 1].x + t * dx,
            y: pts[i - 1].y + t * dy
        });
        }
        distSoFar += d;
    }
    return out;
    }

    function dft(points) {
    const N = points.length;
    const X = [];
    for (let k = 0; k < N; k++) {
        let re = 0, im = 0;
        for (let n = 0; n < N; n++) {
        const phi = (2 * Math.PI * k * n) / N;
        re += points[n].re * Math.cos(phi) + points[n].im * Math.sin(phi);
        im += -points[n].re * Math.sin(phi) + points[n].im * Math.cos(phi);
        }
        re /= N;
        im /= N;
        const freq = k < N / 2 ? k : k - N;
        X.push({ re, im, freq, amp: Math.hypot(re, im), phase: Math.atan2(im, re) });
    }
    return X.sort((a, b) => b.amp - a.amp);
    }

    function drawEpicycles(cx, cy, time, terms) {
        let x = cx, y = cy;
        for (const term of terms) {
            const {amp, freq, phase} = term;
            const prevX = x, prevY = y;
            x += amp * Math.cos(freq * time + phase);
            y += amp * Math.sin(freq * time + phase);
            epiCtx.strokeStyle = 'rgba(0, 119, 255, 0.7)';
            epiCtx.beginPath();
            epiCtx.arc(prevX, prevY, amp, 0, 2 * Math.PI);
            epiCtx.stroke();
            epiCtx.beginPath();
            epiCtx.moveTo(prevX, prevY);
            epiCtx.lineTo(x, y);
            epiCtx.stroke();
        }
        return {x, y};
    }

    function animate(now) {
        const deltaTime = (now - lastTimestamp) / 1000;
        lastTimestamp = now;
        clock += deltaTime;

        epiCtx.clearRect(0, 0, epiCanvas.width, epiCanvas.height);

        const N = parseInt(slider.value);
        const terms = fourier.slice(0, N);
        const origin = { x: epiCanvas.width / 2, y: epiCanvas.height / 2 };
        const pos = drawEpicycles(origin.x, origin.y, time, terms);

        trace.unshift({ x: pos.x, y: pos.y, t: clock });

        for (let i = 0; i < trace.length - 1; i++) {
            const pt1 = trace[i];
            const pt2 = trace[i + 1];
            const age = clock - pt1.t;
            const alpha = Math.max(0, Math.min(1, 1 - (age / fadeDuration)));
            if (alpha <= 0) continue;

            epiCtx.save();
            epiCtx.strokeStyle = 'purple';
            epiCtx.lineWidth = 3;
            epiCtx.globalAlpha = alpha;
            epiCtx.beginPath();
            epiCtx.moveTo(pt1.x, pt1.y);
            epiCtx.lineTo(pt2.x, pt2.y);
            epiCtx.stroke();
            epiCtx.restore();
        }

        trace = trace.filter(pt => clock - pt.t <= fadeDuration);

        const T = 2 * Math.PI;
        const dt = T / fourier.length;
        time += dt;
        if (time > T) time -= T;

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}
