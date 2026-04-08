/* ═══════════════════════════════════════════════════
   Finance AI — NBA System JavaScript
   ═══════════════════════════════════════════════════ */

// ─── Financial Action Master Data ───────────────────
const ACTIONS = {
  1: { name: "Emergency Fund",    icon: "🛡️", category: "Safety",      color: "#10b981" },
  2: { name: "S&P 500 ETF",       icon: "📈", category: "Investment",  color: "#3b82f6" },
  3: { name: "Debt Repayment",    icon: "💳", category: "Debt",        color: "#f87171" },
  4: { name: "Gold Investment",   icon: "🥇", category: "Investment",  color: "#f59e0b" },
  5: { name: "Tax Saving Scheme", icon: "💰", category: "Tax",         color: "#8b5cf6" }
};

// ─── Simulated ALS Recommendation Engine ────────────
// Mimics what model.recommendForAllUsers(3) would produce
function simulateALS(userId) {
  const seed = userId * 7919 + 137;               // deterministic pseudo-random from userId
  const rng  = (n) => { let x = Math.sin(seed * n + n) * 10000; return x - Math.floor(x); };

  // Cold start scenario for new users
  if (userId === 999) {
    return [
      { actionId: 1, rating: 15.00, isPopular: true }, // Emergency Fund
      { actionId: 3, rating: 12.00, isPopular: true }, // Debt Repayment
      { actionId: 2, rating: 10.00, isPopular: true }  // S&P 500
    ];
  }

  // Generate 5 scores, each in range 8–28
  const scores = Object.keys(ACTIONS).map((id, i) => ({
    actionId : parseInt(id),
    rating   : parseFloat((8 + rng(i + 1) * 20).toFixed(2))
  }));

  // Sort desc, return top 3
  return scores.sort((a, b) => b.rating - a.rating).slice(0, 3);
}

// ─── Fake User Profiles ─────────────────────────────
const getUserProfile = (userId) => {
  const seed = userId * 42;
  const rng  = (n) => { let x = Math.sin(seed * n) * 10000; return x - Math.floor(x); };
  
  const ages = [22, 28, 35, 42, 55, 62];
  const incomes = ["$45k", "$60k", "$85k", "$120k", "$150k", "$200k+"];
  const risks = ["Low", "Medium", "High"];
  const goals = ["Debt Free", "Buy a Car", "Buy a House", "Retirement", "Wealth Building"];

  if (userId === 999) return { age: "Unknown", income: "Unknown", risk: "Unknown", goal: "Unknown" };

  return {
    age: ages[Math.floor(rng(1) * ages.length)],
    income: incomes[Math.floor(rng(2) * incomes.length)],
    risk: risks[Math.floor(rng(3) * risks.length)],
    goal: goals[Math.floor(rng(4) * goals.length)]
  };
};

// ─── Sample CSV Data for the Dataset section ────────
const SAMPLE_DATA = [
  [100, 5, 12], [101, 3, 9],  [102, 2, 7],  [103, 4, 15], [104, 1, 11],
  [105, 5, 18], [106, 2, 6],  [107, 3, 14], [108, 4, 10], [109, 1, 13],
  [110, 5, 20], [111, 2, 8],  [112, 3, 16], [113, 4, 9],  [114, 1, 17],
  [115, 5, 11], [116, 2, 19], [117, 3, 7],  [118, 4, 22], [119, 1, 5],
];

// ─── Render CSV Table ────────────────────────────────
function renderCSV() {
  const container = document.getElementById('csvRows');
  if (!container) return;
  container.innerHTML = SAMPLE_DATA.map(([u, a, r]) => `
    <div class="csv-row">
      <div>${u}</div>
      <div>${a}</div>
      <div>${r}</div>
    </div>`).join('');
}

// ─── Navbar scroll effect ────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 40);

  // Active nav link based on scroll position
  const sections = ['hero', 'architecture', 'demo', 'dataset', 'tech'];
  let current = 'hero';
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) current = id;
  }
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
});

// ─── Animated counter for hero stats ────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current  = 0;
    const step   = Math.ceil(target / 40);
    const timer  = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (target > 10 ? '+' : '');
      if (current >= target) clearInterval(timer);
    }, 30);
  });
}

// Observe hero section to trigger counters
const heroObs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) animateCounters();
}, { threshold: 0.3 });
const heroEl = document.getElementById('hero');
if (heroEl) heroObs.observe(heroEl);

// ─── Particle Canvas ─────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  const resize = () => {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x   = Math.random() * canvas.width;
      this.y   = Math.random() * canvas.height;
      this.vx  = (Math.random() - 0.5) * 0.4;
      this.vy  = (Math.random() - 0.5) * 0.4;
      this.r   = Math.random() * 1.5 + 0.5;
      this.a   = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96,165,250,${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(96,165,250,${0.12 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// ─── Highlight action row in table ───────────────────
window.highlightAction = function(id) {
  document.querySelectorAll('.table-row').forEach((row, i) => {
    row.style.background = i === id - 1 ? 'rgba(59,130,246,0.12)' : '';
  });
};

// ─── Export JSON Function ────────────────────────────
window.exportJson = function() {
  const jsonText = document.getElementById('jsonOutput').textContent;
  if (!jsonText) return;
  const blob = new Blob([jsonText], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'recommendations.json';
  a.click();
  URL.revokeObjectURL(url);
};

// ─── Quick User Buttons ──────────────────────────────
window.quickUser = function(id) {
  document.getElementById('userIdInput').value = id;
  runDemo();
};

// ─── Main Demo Function ──────────────────────────────
window.runDemo = function() {
  const input = document.getElementById('userIdInput');
  const userId = parseInt(input.value);

  if (!userId || userId < 1) {
    input.style.borderColor = '#ef4444';
    input.placeholder = 'Please enter a valid User ID!';
    setTimeout(() => { input.style.borderColor = ''; input.placeholder = 'e.g. 127'; }, 2000);
    return;
  }

  // Show progress panel
  const progressEl = document.getElementById('pipelineProgress');
  const outputResult = document.getElementById('outputResult');
  const outputPlaceholder = document.getElementById('outputPlaceholder');

  progressEl.style.display = 'block';
  outputResult.style.display = 'none';
  outputPlaceholder.style.display = 'none';

  // Reset terminal
  const terminal = document.getElementById('sparkTerminalOut');
  terminal.innerHTML = '';
  
  const isColdStart = (userId === 999);
  
  const lines = isColdStart ? [
    `[INFO] SparkContext: Running Spark version 3.4.1`,
    `[INFO] FileScanRDD: Reading HDFS path: hdfs:///finance/data/finance_nba_data.csv`,
    `[INFO] ALSModel: Generating top 3 recommendations for User 999`,
    `<span style="color:#fbbf24">[WARN] ALSModel: User 999 not present in training factor matrix</span>`,
    `[INFO] ALSModel: Applying coldStartStrategy="drop"`,
    `<span style="color:#a78bfa">[INFO] FallbackRecommender: User has no history. Fetching globally popular actions...</span>`,
    `[INFO] FallbackRecommender: Found top 3 global preferences`,
    `[INFO] FileOutputCommitter: Saved output to hdfs:///finance/output/recommendations`,
    `[INFO] SparkContext: Successfully stopped SparkContext`
  ] : [
    `[INFO] SparkContext: Running Spark version 3.4.1`,
    `[INFO] SparkContext: Submitted application: FinanceNBA_Recommender`,
    `[INFO] BlockManager: Found block broadcast_0_piece0 locally`,
    `[INFO] DAGScheduler: Got job 0 (csv at FinanceNBA.scala:42)`,
    `[INFO] FileScanRDD: Reading HDFS path: hdfs:///finance/data/finance_nba_data.csv`,
    `[INFO] TaskSetManager: Finished task 0.0 in stage 0.0 (TID 0) in 124 ms`,
    `[INFO] DAGScheduler: Job 0 finished: csv at FinanceNBA.scala:42`,
    `[INFO] ALS: Running Alternating Least Squares with rank=10, maxIter=10`,
    `[INFO] ALS: Initializing Users & Items Factor Matrices`,
    `[INFO] DAGScheduler: Got job 1 (ALS Matrix Factorization Phase 1)`,
    `[INFO] TaskSetManager: Starting task 1.0 in stage 1.0 (TID 1) on 10.0.0.4`,
    `[INFO] TaskSetManager: Starting task 2.0 in stage 1.0 (TID 2) on 10.0.0.5`,
    `[INFO] ALS: Iteration 1 finished (time: 412ms)`,
    `[INFO] ALS: Iteration 2 finished (time: 398ms)`,
    `[INFO] ALS: Iteration 5 finished (time: 388ms)`,
    `[INFO] ALS: Iteration 10 finished (time: 390ms) - Optimal convergence reached`,
    `[INFO] DAGScheduler: Job 1 finished: ALS training`,
    `[INFO] ModelEvaluator: Calculating RMSE...`,
    `[INFO] ModelEvaluator: RMSE = 0.8241`,
    `[INFO] ALSModel: Generating top 3 recommendations for User ${userId}`,
    `[INFO] FileOutputCommitter: Saved output to hdfs:///finance/output/recommendations`,
    `[INFO] SparkContext: Successfully stopped SparkContext`
  ];

  let currentLine = 0;
  const termInterval = setInterval(() => {
    if (currentLine < lines.length) {
      terminal.innerHTML += `<div>${lines[currentLine]}</div>`;
      terminal.scrollTop = terminal.scrollHeight;
      currentLine++;
    } else {
      clearInterval(termInterval);
    }
  }, 120);

  const steps = ['ps1', 'ps2', 'ps3', 'ps4'];
  const statuses = ['ps1s', 'ps2s', 'ps3s', 'ps4s'];

  // Reset all steps
  steps.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('active', 'done');
  });
  statuses.forEach(id => { document.getElementById(id).textContent = '⏳'; });

  // Simulate pipeline execution with delays
  const delays = [400, 900, 1600, 2400];
  const doneTimes = [800, 1400, 2200, 3000];

  steps.forEach((stepId, i) => {
    setTimeout(() => {
      document.getElementById(stepId).classList.add('active');
      document.getElementById(statuses[i]).textContent = '⟳';
    }, delays[i]);

    setTimeout(() => {
      document.getElementById(stepId).classList.remove('active');
      document.getElementById(stepId).classList.add('done');
      document.getElementById(statuses[i]).textContent = '✅';

      // After last step, show results
      if (i === steps.length - 1) {
        setTimeout(() => showResults(userId), 300);
      }
    }, doneTimes[i]);
  });
};

// ─── Show Results ────────────────────────────────────
function showResults(userId) {
  const isColdStart = (userId === 999);
  const recs = simulateALS(userId);
  const maxRating = recs[0].rating;

  document.getElementById('resultUserId').textContent = isColdStart ? `New User #999` : `User #${userId}`;
  
  if (isColdStart) {
    document.querySelector('.result-badge').textContent = "Cold Start: Popular Actions";
    document.querySelector('.result-badge').style.background = 'rgba(236,72,153,0.15)';
    document.querySelector('.result-badge').style.color = 'var(--pink)';
  } else {
    document.querySelector('.result-badge').textContent = "Top 3 Recommendations";
    document.querySelector('.result-badge').style.background = '';
    document.querySelector('.result-badge').style.color = '';
  }
  
  // Update User Profile UI
  const profile = getUserProfile(userId);
  document.getElementById('profileAge').textContent = profile.age;
  document.getElementById('profileIncome').textContent = profile.income;
  document.getElementById('profileRisk').textContent = profile.risk;
  document.getElementById('profileGoal').textContent = profile.goal;

  const rankClass = ['r1', 'r2', 'r3'];
  const rankLabel = ['🥇 #1', '🥈 #2', '🥉 #3'];

  document.getElementById('resultCards').innerHTML = recs.map((rec, i) => {
    const action = ACTIONS[rec.actionId];
    const barWidth = Math.round((rec.rating / maxRating) * 100);
    return `
      <div class="rec-card" style="animation-delay:${i * 0.15}s">
        <div class="rec-rank ${rankClass[i]}">${rankLabel[i]}</div>
        <div>
          <div style="font-size:1.8rem;">${action.icon}</div>
        </div>
        <div class="rec-info">
          <div class="rec-action-name">${action.name}</div>
          <div class="rec-action-id">Action ID: ${rec.actionId} • ${action.category}</div>
          <div class="rec-bar-wrap">
            <div class="rec-bar" style="width:${barWidth}%;background:linear-gradient(90deg, ${action.color}, ${action.color}88)"></div>
          </div>
        </div>
        <div class="rec-score">
          <div class="rec-score-val">${rec.rating}</div>
          <div class="rec-score-label">${isColdStart ? 'Popularity Score' : 'ALS Score'}</div>
        </div>
      </div>`;
  }).join('');

  // JSON Output
  const jsonData = {
    userId: userId,
    recommendations: recs.map(r => ({ actionId: r.actionId, rating: r.rating }))
  };
  document.getElementById('jsonOutput').textContent = JSON.stringify(jsonData, null, 2);

  document.getElementById('outputResult').style.display = 'block';

  // Model Evaluation Metrics
  document.getElementById('metricRmse').textContent = (0.75 + Math.random() * 0.15).toFixed(4);
  document.getElementById('metricTime').textContent = (12.4 + Math.random() * 5).toFixed(2) + "s";
  document.getElementById('metricNodes').textContent = Math.floor(4 + Math.random() * 4);

  // Smooth scroll to output
  document.getElementById('outputResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── Highlight action row in table ───────────────────
window.highlightAction = function(id) {
  document.querySelectorAll('.table-row').forEach((row, i) => {
    row.style.background = i === id - 1 ? 'rgba(59,130,246,0.12)' : '';
  });
};

// ─── Intersection Observer — fade-in sections ────────
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.arch-block, .tech-card, .als-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObs.observe(el);
});

// ─── Enter key on input ──────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCSV();
  initParticles();

  const input = document.getElementById('userIdInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') runDemo();
    });
  }
});
