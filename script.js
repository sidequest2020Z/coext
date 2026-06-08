// ── Data ──
const opportunities = [
  {
    id: 1,
    platform: 'gebizx',
    ref: 'GBX-2026-04521',
    title: 'IT Infrastructure Modernisation Services',
    description: 'Provision of IT infrastructure modernisation services including cloud migration, network upgrades, and cybersecurity…',
    agency: 'Government Technology Agency (GovTech)',
    budget: 'S$2,500,000 – S$5,000,000',
    closingDate: 'Closes 15 Apr 2026',
    urgent: false
  },
  
];

// ── Render ──
function createCardHTML(op) {
  const platformBadge = op.platform === 'gebizx'
    ? '<span class="badge badge-gebizx">GeBIZ X</span>'
    : '<span class="badge badge-gebiz2">GeBIZ 2.0</span>';

  const urgentBadge = op.urgent
    ? '<span class="badge badge-urgent">⏱ Closing soon</span>'
    : '';

  return `
    <div class="card">
      <div class="card-header">
        <div class="card-badges">
          ${platformBadge}
          ${urgentBadge}
        </div>
        <span class="card-ref">${op.ref}</span>
      </div>
      <div class="card-title">${op.title}</div>
      <div class="card-desc">${op.description}</div>
      <div class="card-meta">
        <div class="meta-row">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
          </svg>
          ${op.agency}
        </div>
        <div class="meta-row">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          ${op.budget}
        </div>
        <div class="meta-row">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          ${op.closingDate}
        </div>
      </div>
      <div class="card-footer">
        <button class="view-details-btn" onclick="viewDetails(${op.id})">
          View Details <span>→</span>
        </button>
      </div>
    </div>
  `;
}

function renderCards() {
  const grid = document.getElementById('cardsGrid');
  grid.innerHTML = opportunities.map(createCardHTML).join('');
}

// ── Actions ──
function viewDetails(id) {
  const op = opportunities.find(o => o.id === id);
  if (op) {
    alert(`Viewing details for: ${op.title}\nReference: ${op.ref}`);
  }
}

// ── Init ──
document.addEventListener('DOMContentLoaded', renderCards);
