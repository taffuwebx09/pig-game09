var confetti = {
  maxCount: 150,
  speed: 2,
  frameInterval: 15,
  alpha: 1,
  gradient: false,
  start: null,
  stop: null,
};

(function () {
  confetti.start = startConfetti;
  confetti.stop = stopConfetti;

  const requestAnim =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  const colors = [
    'rgba(30,144,255,',
    'rgba(107,142,35,',
    'rgba(255,215,0,',
    'rgba(255,192,203,',
    'rgba(106,90,205,',
    'rgba(173,216,230,',
    'rgba(238,130,238,',
    'rgba(152,251,152,',
    'rgba(70,130,180,',
    'rgba(244,164,96,',
    'rgba(210,105,30,',
    'rgba(220,20,60,',
  ];

  let running = false;
  let particles = [];
  let angle = 0;
  let ctx = null;

  function createParticle(p, w, h) {
    p.color = colors[(Math.random() * colors.length) | 0] + '1)';
    p.x = Math.random() * w;
    p.y = Math.random() * h - h;
    p.diameter = Math.random() * 10 + 5;
    p.tilt = Math.random() * 10 - 10;
    p.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    p.tiltAngle = Math.random() * Math.PI;
    return p;
  }

  function draw() {
    if (!running) return;

    const canvas = ctx.canvas;
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);
    angle += 0.01;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.tiltAngle += p.tiltAngleIncrement;
      p.x += Math.sin(angle) - 0.5;
      p.y += Math.cos(angle) + p.diameter + confetti.speed;
      p.tilt = Math.sin(p.tiltAngle) * 15;

      if (p.y > H) {
        createParticle(p, W, H);
        p.y = -20;
      }

      ctx.beginPath();
      ctx.lineWidth = p.diameter;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt, p.y);
      ctx.lineTo(p.x, p.y + p.tilt + p.diameter);
      ctx.stroke();
    }

    requestAnim(draw);
  }

  function startConfetti() {
    const target = document.querySelector('.winner-player');
    if (!target) return;

    let canvas = target.querySelector('#confetti-canvas');

    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.style.cssText =
        'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;';
      target.prepend(canvas);
      ctx = canvas.getContext('2d');
    }

    canvas.width = target.clientWidth;
    canvas.height = target.clientHeight;

    // 🔥 Particle density auto adjust
    const area = canvas.width * canvas.height;
    const referenceArea = 800 * 600;
    const particleCount = Math.max(
      25,
      Math.floor(confetti.maxCount * (area / referenceArea))
    );

    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle({}, canvas.width, canvas.height));
    }

    running = true;
    draw();
  }

  function stopConfetti() {
    running = false;

    // 🔥 canvas remove = particles fully gone
    const canvas = document.querySelector('#confetti-canvas');
    if (canvas) canvas.remove();

    particles = [];
  }
})();
