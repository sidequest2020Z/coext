// ── Data ──
const hardcodedOpportunities = [
  {
    id: 1,
    platform: 'gebizx',
    badgeClass: 'badge-gebizx',
    badgeText: 'GeBIZ X',
    ref: 'GBX-2026-04521',
    title: 'IT Infrastructure Modernisation Services',
    agency: 'Government Technology Agency (GovTech)',
    closingDate: 'Closes 15 Apr 2026',
    category: 'Information Technology',
    url: 'details.html?id=1'
  },
  {
    id: 2,
    platform: 'gebiz2',
    badgeClass: 'badge-gebiz2',
    badgeText: 'GeBIZ 2.0',
    ref: 'GB-2026-08745',
    title: 'Supply, installation, testing and commissioning of integrated audio-visual systems for Project Sandbox Classroom - Anglo-Chinese School (Primary)',
    agency: 'Ministry of Education - Schools',
    closingDate: 'Closes 24 Jun 2026, 01:00PM',
    category: 'AV Equipment, Photographic Equipment & Accessories',
    url: 'details.html?id=2'
  }
];

let opportunities = [];

async function fetchExternalOpportunities() {
  try {
    const response = await fetch('https://lem2wowzbg.execute-api.ap-southeast-1.amazonaws.com/default/co-ex-poc');
    const data = await response.json();
    console.log('API Response:', data);
    
    // Transform API data to match opportunities format
    const apiOpportunities = data.result || [];
    const transformedData = apiOpportunities.map((item, index) => {
      // Format closing date from ISO timestamp
      let formattedDate = 'Date not specified';
      if (item['Closing Date']) {
        const dateObj = new Date(item['Closing Date']);
        formattedDate = dateObj.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
      
      return {
        id: 100 + index,
        platform: 'api',
        badgeClass: 'badge-api',
        badgeText: 'External',
        ref: `API-${100 + index}`,
        title: item.Title || 'Untitled Opportunity',
        agency: item.Agency || 'N/A',
        closingDate: formattedDate,
        category: item.Category || 'Uncategorized',
        url: '#'
      };
    });
    
    // Combine hardcoded and API data
    opportunities = [...hardcodedOpportunities, ...transformedData];
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    opportunities = hardcodedOpportunities;
  }
}

// ── Render ──
function createCardHTML(op) {
  return `
    <div class="card">
      <div class="card-header">
        <div class="card-badges">
          <span class="badge ${op.badgeClass}">${op.badgeText}</span>
        </div>
        <span class="card-ref">${op.ref}</span>
      </div>
      <div class="card-title">${op.title}</div>
      <div class="card-meta">
        <div class="meta-row">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
          </svg>
          ${op.agency}
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
        <div class="meta-row">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          ${op.category}
        </div>
      </div>
      <div class="card-footer">
        <a href="${op.url}" class="view-details-btn">View Details <span>→</span></a>
      </div>
    </div>
  `;
}

function renderCards() {
  const grid = document.getElementById('cardsGrid');
  const count = document.querySelector('.results-count span');
  grid.innerHTML = opportunities.map(createCardHTML).join('');
  if (count) {
    count.textContent = opportunities.length;
  }
}

// ── Init ──
document.addEventListener('DOMContentLoaded', async () => {
  await fetchExternalOpportunities();
  renderCards();
});
