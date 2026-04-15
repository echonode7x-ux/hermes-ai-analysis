async function loadResearch() {
  const dataUrl = new URL('data/research.json', window.location.href);
  const response = await fetch(dataUrl);
  if (!response.ok) throw new Error('无法加载研究数据');
  return response.json();
}

const trackTone = {
  'ai-coding': 'sage',
  'mcp': 'clay',
  'browser-automation': 'teal'
};

function pill(text, tone = '') {
  return `<span class="pill ${tone}">${text}</span>`;
}

function byId(id) {
  return document.getElementById(id);
}

function setUpdatedAt(data) {
  const el = byId('updated-at');
  if (el) el.textContent = data.updatedAt;
}

function findTrack(data, slug) {
  return data.tracks.find((track) => track.slug === slug);
}

function findOpportunity(data, slug) {
  return data.priorityOpportunities.find((item) => item.slug === slug);
}

function renderTrackPills(data, slug) {
  const track = findTrack(data, slug);
  if (!track) return '';
  return pill(track.name, trackTone[slug] || '');
}

function renderOpportunityCard(data, item, detailed = false) {
  const track = findTrack(data, item.track);
  return `
    <article class="card">
      <div class="badges">
        ${pill(item.priority, 'dark')}
        ${track ? pill(track.name, trackTone[item.track] || '') : ''}
        ${pill(item.canDoNow === '可以' ? '当前可做' : '后置')}
      </div>
      <div class="op-card-title">
        <h3>${item.name}</h3>
        ${detailed ? '' : `<a class="link-arrow" href="./opportunity.html?slug=${item.slug}">查看详情 →</a>`}
      </div>
      <p>${item.fit}</p>
      <div class="kv">
        <div class="kv-item"><strong>适合形态</strong>${item.format}</div>
        <div class="kv-item"><strong>目标用户</strong>${item.targetUsers}</div>
        <div class="kv-item"><strong>最快上线方式</strong>${item.launch}</div>
        <div class="kv-item"><strong>Cloudflare 适配</strong>${item.cloudflare}</div>
        <div class="kv-item"><strong>API / GPU</strong>${item.apiGpu}</div>
        <div class="kv-item"><strong>变现路径</strong>${item.monetization.join('、')}</div>
        ${detailed ? `<div class="kv-item"><strong>内容来源</strong>${item.contentSources.join('、')}</div>` : ''}
        ${detailed ? `<div class="kv-item"><strong>风险</strong>${item.risk}</div>` : ''}
        ${detailed ? `<div class="kv-item"><strong>最近活跃度</strong>${item.activity}</div>` : ''}
      </div>
      <div class="chip-row" style="margin-top:16px">
        ${item.keywords.map((keyword) => pill(keyword)).join('')}
      </div>
      ${item.highlights ? `<div class="summary-box" style="margin-top:16px"><strong>为什么值得做：</strong>${item.highlights.join(' · ')}</div>` : ''}
    </article>
  `;
}

function renderSignals(signals) {
  return signals.map((item) => `
    <div class="signal">
      <div class="label">${item.label}</div>
      <div>${item.value}</div>
    </div>
  `).join('');
}

function renderHome(data) {
  const heroEyebrow = byId('hero-eyebrow');
  if (heroEyebrow) heroEyebrow.textContent = data.hero.eyebrow;
  const heroTitle = byId('hero-title');
  if (heroTitle) heroTitle.textContent = data.hero.title;
  const heroSubtitle = byId('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
  const spotlightTitle = byId('spotlight-title');
  if (spotlightTitle) spotlightTitle.textContent = data.spotlight.title;
  const spotlightSummary = byId('spotlight-summary');
  if (spotlightSummary) spotlightSummary.textContent = data.spotlight.summary;
  const spotlightPoints = byId('spotlight-points');
  if (spotlightPoints) spotlightPoints.innerHTML = data.spotlight.points.map((point) => `<li>${point}</li>`).join('');
  const quickStats = byId('quick-stats');
  if (quickStats) quickStats.innerHTML = data.quickStats.map((item) => `<div class="metric"><strong>${item.value}</strong><span>${item.label}</span></div>`).join('');
  const topOpps = byId('top-opportunities');
  if (topOpps) topOpps.innerHTML = data.priorityOpportunities.slice(0, 3).map((item) => renderOpportunityCard(data, item)).join('');
  const tracks = byId('tracks-preview');
  if (tracks) tracks.innerHTML = data.tracks.map((track) => `
    <article class="card">
      <div class="badges">${pill(track.name, trackTone[track.slug] || '')}</div>
      <h3>${track.name}</h3>
      <p>${track.summary}</p>
      <ul class="list">${track.whyNow.map((point) => `<li>${point}</li>`).join('')}</ul>
    </article>`).join('');
  const signalMount = byId('signal-list');
  if (signalMount) signalMount.innerHTML = renderSignals(data.signals);
  const keywordMount = byId('keyword-preview');
  if (keywordMount) keywordMount.innerHTML = data.keywordClusters.map((cluster) => `
    <article class="card">
      <div class="badges">${pill(cluster.name, 'amber')}</div>
      <p>${cluster.angle}</p>
      <div class="chip-row">${cluster.terms.map((term) => pill(term)).join('')}</div>
    </article>`).join('');
}

function renderOpportunitiesPage(data) {
  const mount = byId('opportunities-list');
  if (mount) mount.innerHTML = data.priorityOpportunities.map((item) => renderOpportunityCard(data, item)).join('');
}

function renderTracksPage(data) {
  const mount = byId('tracks-list');
  if (mount) mount.innerHTML = data.tracks.map((track) => {
    const related = data.priorityOpportunities.filter((item) => item.track === track.slug);
    return `
      <article class="card">
        <div class="badges">${pill(track.name, trackTone[track.slug] || '')}</div>
        <h3>${track.name}</h3>
        <p>${track.summary}</p>
        <ul class="list">${track.whyNow.map((point) => `<li>${point}</li>`).join('')}</ul>
        <div class="chip-row" style="margin-top:14px">${related.map((item) => pill(item.name)).join('')}</div>
      </article>
    `;
  }).join('');
}

function renderKeywordsPage(data) {
  const mount = byId('keyword-clusters');
  if (mount) mount.innerHTML = data.keywordClusters.map((cluster) => `
    <article class="card">
      <div class="badges">${pill(cluster.name, 'amber')}</div>
      <h3>${cluster.name}</h3>
      <p>${cluster.angle}</p>
      <div class="chip-row">${cluster.terms.map((term) => pill(term)).join('')}</div>
    </article>
  `).join('');
}

function renderSignalsPage(data) {
  const mount = byId('signals-page-list');
  if (mount) mount.innerHTML = renderSignals(data.signals);
}

function renderLaterPage(data) {
  const mount = byId('later-table');
  if (mount) mount.innerHTML = data.laterOpportunities.map((item) => `
    <tr>
      <td><strong>${item.name}</strong></td>
      <td>${item.reason}</td>
      <td>${item.cost}</td>
      <td>${item.risk}</td>
      <td>${item.timing}</td>
    </tr>
  `).join('');
}

function renderMethodPage(data) {
  const signalMount = byId('method-signals');
  if (signalMount) signalMount.innerHTML = renderSignals(data.signals);
  const nextMount = byId('next-actions');
  if (nextMount) nextMount.innerHTML = data.nextActions.map((item) => `<li>${item}</li>`).join('');
}

function renderOpportunityDetail(data) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || data.priorityOpportunities[0]?.slug;
  const item = findOpportunity(data, slug);
  if (!item) return;
  const title = byId('detail-title');
  if (title) title.textContent = item.name;
  const summary = byId('detail-summary');
  if (summary) summary.textContent = item.fit;
  const detailed = byId('detail-card');
  if (detailed) detailed.innerHTML = renderOpportunityCard(data, item, true);
  const related = byId('related-opportunities');
  if (related) {
    const others = data.priorityOpportunities.filter((op) => op.slug !== item.slug).slice(0, 3);
    related.innerHTML = others.map((op) => `<li><a href="./opportunity.html?slug=${op.slug}">${op.name}</a></li>`).join('');
  }
}

loadResearch().then((data) => {
  setUpdatedAt(data);
  renderHome(data);
  renderOpportunitiesPage(data);
  renderTracksPage(data);
  renderKeywordsPage(data);
  renderSignalsPage(data);
  renderLaterPage(data);
  renderMethodPage(data);
  renderOpportunityDetail(data);
}).catch((error) => {
  document.body.innerHTML = `<main style="padding:40px"><h1>页面加载失败</h1><p>${error.message}</p></main>`;
  console.error(error);
});
