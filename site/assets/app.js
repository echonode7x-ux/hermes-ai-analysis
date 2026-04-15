async function loadResearch() {
  const response = await fetch(new URL('data/research.json', window.location.href));
  if (!response.ok) throw new Error('无法加载研究数据');
  return response.json();
}

const trackTone = {
  'ai-coding': 'forest',
  'mcp': 'plum',
  'browser-automation': 'amber'
};

function byId(id) { return document.getElementById(id); }
function chip(text, tone='') { return `<span class="chip ${tone}">${text}</span>`; }
function badge(text, tone='') { return `<span class="badge ${tone}">${text}</span>`; }
function findTrack(data, slug) { return data.tracks.find(track => track.slug === slug); }
function findOpportunity(data, slug) { return data.priorityOpportunities.find(item => item.slug === slug); }

function renderHome(data) {
  if (byId('updated-at')) byId('updated-at').textContent = data.updatedAt;
  if (byId('hero-eyebrow')) byId('hero-eyebrow').textContent = data.hero.eyebrow;
  if (byId('hero-title')) byId('hero-title').textContent = data.hero.title;
  if (byId('hero-subtitle')) byId('hero-subtitle').textContent = data.hero.subtitle;
  if (byId('spotlight-title')) byId('spotlight-title').textContent = data.spotlight.title;
  if (byId('spotlight-summary')) byId('spotlight-summary').textContent = data.spotlight.summary;
  if (byId('spotlight-points')) byId('spotlight-points').innerHTML = data.spotlight.points.map(p => `<li>${p}</li>`).join('');
  if (byId('hero-stats')) byId('hero-stats').innerHTML = data.quickStats.map(stat => `<div class="hero-stat"><strong>${stat.value}</strong><span>${stat.label}</span></div>`).join('');
  if (byId('featured-opps')) byId('featured-opps').innerHTML = data.priorityOpportunities.slice(0,3).map(item => renderFeatureCard(data, item)).join('');
  if (byId('track-streams')) byId('track-streams').innerHTML = data.tracks.map(track => renderTrackCard(data, track)).join('');
  if (byId('signal-list')) byId('signal-list').innerHTML = data.signals.map(renderSignal).join('');
  if (byId('keyword-mosaic')) byId('keyword-mosaic').innerHTML = data.keywordClusters.map(cluster => renderKeywordCluster(cluster)).join('');
}

function renderFeatureCard(data, item) {
  const track = findTrack(data, item.track);
  return `
    <article class="feature-card">
      <div class="chip-row">
        ${chip(item.priority, 'plum')}
        ${track ? chip(track.name, trackTone[item.track] || '') : ''}
        ${chip('当前可做')}
      </div>
      <h3>${item.name}</h3>
      <p>${item.fit}</p>
      <div class="table-row"><strong>适合形态</strong><div>${item.format}</div></div>
      <div class="table-row"><strong>最快上线</strong><div>${item.launch}</div></div>
      <div class="table-row"><strong>变现路径</strong><div>${item.monetization.join('、')}</div></div>
      <div class="chip-row" style="margin-top:16px">${item.keywords.slice(0,3).map(k => chip(k)).join('')}</div>
      <div style="margin-top:18px"><a class="btn secondary" href="./opportunity.html?slug=${item.slug}">进入详情</a></div>
    </article>`;
}

function renderTrackCard(data, track) {
  const related = data.priorityOpportunities.filter(item => item.track === track.slug).slice(0,2);
  return `
    <article class="stream-card">
      <div class="chip-row">${chip(track.name, trackTone[track.slug] || '')}</div>
      <h3>${track.name}</h3>
      <p>${track.summary}</p>
      <ul class="list">${track.whyNow.map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="chip-row" style="margin-top:14px">${related.map(item => chip(item.name)).join('')}</div>
    </article>`;
}

function renderSignal(signal) {
  return `<div class="signal-item"><strong>${signal.label}</strong><div>${signal.value}</div></div>`;
}

function renderKeywordCluster(cluster) {
  return `<article class="stream-card"><div class="chip-row">${chip(cluster.name, 'amber')}</div><h3>${cluster.name}</h3><p>${cluster.angle}</p><div class="chip-row">${cluster.terms.map(term => chip(term)).join('')}</div></article>`;
}

function renderOpportunityList(data) {
  const mount = byId('opportunities-list');
  if (!mount) return;
  mount.innerHTML = data.priorityOpportunities.map(item => renderFeatureCard(data, item)).join('');
}

function renderTracksPage(data) {
  const mount = byId('tracks-page');
  if (!mount) return;
  mount.innerHTML = data.tracks.map(track => renderTrackCard(data, track)).join('');
}

function renderKeywordsPage(data) {
  const mount = byId('keywords-page');
  if (!mount) return;
  mount.innerHTML = data.keywordClusters.map(cluster => renderKeywordCluster(cluster)).join('');
}

function renderSignalsPage(data) {
  const mount = byId('signals-page');
  if (!mount) return;
  mount.innerHTML = data.signals.map(renderSignal).join('');
}

function renderLaterPage(data) {
  const mount = byId('later-page');
  if (!mount) return;
  mount.innerHTML = data.laterOpportunities.map(item => `<div class="feature-card"><div class="chip-row">${chip(item.timing, 'amber')}</div><h3>${item.name}</h3><p>${item.reason}</p><div class="table-row"><strong>成本</strong><div>${item.cost}</div></div><div class="table-row"><strong>主要风险</strong><div>${item.risk}</div></div></div>`).join('');
}

function renderMethodPage(data) {
  if (byId('next-actions')) byId('next-actions').innerHTML = data.nextActions.map(item => `<li>${item}</li>`).join('');
  if (byId('method-signals')) byId('method-signals').innerHTML = data.signals.map(renderSignal).join('');
}

function renderDetailPage(data) {
  const title = byId('detail-title');
  if (!title) return;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug') || data.priorityOpportunities[0]?.slug;
  const item = findOpportunity(data, slug);
  if (!item) return;
  const track = findTrack(data, item.track);
  title.textContent = item.name;
  if (byId('detail-summary')) byId('detail-summary').textContent = item.fit;
  if (byId('detail-main')) byId('detail-main').innerHTML = `
    <div class="chip-row">
      ${chip(item.priority, 'plum')}
      ${track ? chip(track.name, trackTone[item.track] || '') : ''}
      ${chip('当前可做')}
    </div>
    <div class="table-row"><strong>适合形态</strong><div>${item.format}</div></div>
    <div class="table-row"><strong>目标用户</strong><div>${item.targetUsers}</div></div>
    <div class="table-row"><strong>最快上线</strong><div>${item.launch}</div></div>
    <div class="table-row"><strong>Cloudflare 适配</strong><div>${item.cloudflare}</div></div>
    <div class="table-row"><strong>API / GPU</strong><div>${item.apiGpu}</div></div>
    <div class="table-row"><strong>内容来源</strong><div>${item.contentSources.join('、')}</div></div>
    <div class="table-row"><strong>变现路径</strong><div>${item.monetization.join('、')}</div></div>
    <div class="table-row"><strong>风险</strong><div>${item.risk}</div></div>
    <div class="table-row"><strong>最近活跃度</strong><div>${item.activity}</div></div>
    <div class="chip-row" style="margin-top:18px">${item.keywords.map(term => chip(term)).join('')}</div>
    <div class="note-box" style="margin-top:18px"><strong>为什么值得继续做：</strong>${item.highlights.join(' · ')}</div>`;
  if (byId('detail-side-list')) {
    const related = data.priorityOpportunities.filter(op => op.slug !== item.slug).slice(0,3);
    byId('detail-side-list').innerHTML = related.map(op => `<li><a href="./opportunity.html?slug=${op.slug}">${op.name}</a></li>`).join('');
  }
}

loadResearch().then(data => {
  renderHome(data);
  renderOpportunityList(data);
  renderTracksPage(data);
  renderKeywordsPage(data);
  renderSignalsPage(data);
  renderLaterPage(data);
  renderMethodPage(data);
  renderDetailPage(data);
}).catch(error => {
  document.body.innerHTML = `<main style="padding:40px"><h1>页面加载失败</h1><p>${error.message}</p></main>`;
});
