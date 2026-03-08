// ============================================================
//  InsurAI – Main Application JS
// ============================================================

// ── Navbar Scroll Effect ─────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Hamburger Toggle ─────────────────────────────────────
function toggleMobileMenu() {
  document.getElementById('mobileMenu')?.classList.toggle('open');
}

// ── Tabs ─────────────────────────────────────────────────
function switchTab(tabId, groupId = 'main') {
  const group = document.querySelectorAll(`[data-tab-group="${groupId}"] .tab-btn`);
  const contents = document.querySelectorAll(`[data-tab-group="${groupId}"] .tab-content`);
  group.forEach(b => b.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));
  const btn = document.querySelector(`[data-tab-group="${groupId}"] [data-tab="${tabId}"]`);
  const content = document.getElementById(tabId);
  if (btn) btn.classList.add('active');
  if (content) content.classList.add('active');
}

// ── Modal ─────────────────────────────────────────────────
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ── Toast ─────────────────────────────────────────────────
function showToast(title, msg = '', type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <div class="toast-body">
      <div class="title">${title}</div>
      ${msg ? `<div class="msg">${msg}</div>` : ''}
    </div>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

// ── Sidebar Active Link ───────────────────────────────────
function setSidebarActive(id) {
  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}
function toggleSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
}

// ── Animate On Scroll ─────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

function initAOS() {
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${el.dataset.delay || '0'}ms, transform 0.6s ease ${el.dataset.delay || '0'}ms`;
    observer.observe(el);
  });
}
document.addEventListener('DOMContentLoaded', initAOS);

// ── Chart Bars (CSS Animated) ─────────────────────────────
function renderBarChart(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const max = Math.max(...data.map(d => d.value));
  const colors = ['#1565C0', '#1976D2', '#1E88E5', '#42A5F5', '#64B5F6', '#90CAF9'];
  el.innerHTML = `
    <div class="chart-bar" id="${containerId}-bars" style="align-items:flex-end; gap:8px; height:140px; padding:0 0.5rem; border-bottom:1.5px solid #E2E8F0; display:flex;">
      ${data.map((d, i) => {
        const hPct = Math.round((d.value / max) * 120);
        return `
          <div class="chart-bar-item" style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;">
            <span class="chart-bar-value" style="font-size:0.6875rem;font-weight:700;color:#1565C0;">${d.value}</span>
            <div class="chart-bar-fill" style="border-radius:4px 4px 0 0;width:100%;max-width:36px;background:${colors[i % colors.length]};height:0;transition:height 0.9s cubic-bezier(0.34,1.56,0.64,1) ${i * 80}ms;" data-height="${hPct}px"></div>
            <span class="chart-bar-label" style="font-size:0.6875rem;color:#9E9E9E;font-weight:500;">${d.label}</span>
          </div>`;
      }).join('')}
    </div>`;
  setTimeout(() => {
    el.querySelectorAll('.chart-bar-fill').forEach(bar => {
      bar.style.height = bar.dataset.height;
    });
  }, 200);
}

// ── Donut Chart (SVG) ─────────────────────────────────────
function renderDonut(containerId, data, total) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const r = 60, cx = 70, cy = 70, circ = 2 * Math.PI * r;
  let offset = 0;
  const colors = ['#1565C0', '#00ACC1', '#4CAF50', '#FFA726', '#9C27B0'];
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const dash = pct * circ;
    const gap = circ - dash;
    const slice = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="22"
      stroke-dasharray="${dash} ${gap}" stroke-dashoffset="${-offset}" style="transition:stroke-dashoffset 0.8s ease ${i * 150}ms"/>`;
    offset += dash;
    return slice;
  });
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
      <div style="position:relative;flex-shrink:0;">
        <svg width="140" height="140" style="transform:rotate(-90deg);">
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#EEEEEE" stroke-width="22"/>
          ${slices.join('')}
        </svg>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
          <div style="font-size:1.375rem;font-weight:800;color:#1A1A2E;">${total}</div>
          <div style="font-size:0.6875rem;color:#9E9E9E;font-weight:600;">Total</div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.625rem;">
        ${data.map((d, i) => `
          <div style="display:flex;align-items:center;gap:0.625rem;">
            <div style="width:12px;height:12px;border-radius:3px;background:${colors[i % colors.length]};flex-shrink:0;"></div>
            <span style="font-size:0.8125rem;color:#4A5568;">${d.label}</span>
            <span style="font-size:0.8125rem;font-weight:700;color:#1A1A2E;margin-left:auto;">${d.value}</span>
          </div>`).join('')}
      </div>
    </div>`;
}

// ── Page Router (Hash-Based) ──────────────────────────────
const routes = {};
function registerPage(hash, initFn) { routes[hash] = initFn; }
function navigate(hash) {
  window.location.href = hash;
}
window.addEventListener('hashchange', () => {
  const fn = routes[window.location.hash];
  if (fn) fn();
});

// ── Format Helpers ─────────────────────────────────────────
const fmt = {
  currency: (n) => '₹' + Number(n).toLocaleString('en-IN'),
  date: (d)  => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  time: (t)  => t,
  ago: (d) => {
    const diff = Date.now() - new Date(d).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }
};

// ── Expose globals ─────────────────────────────────────────
window.InsurAI = { toggleMobileMenu, switchTab, openModal, closeModal, showToast, setSidebarActive, toggleSidebar, renderBarChart, renderDonut, navigate, fmt };
