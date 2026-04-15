async function loadResearch() {
  const dataUrl = new URL('data/research.json', window.location.href);
  const res = await fetch(dataUrl);
  if (!res.ok) throw new Error('Failed to load research data');
  return res.json();
}

function badge(text, cls='') {
  return `<span class="badge ${cls}">${text}</span>`;
}

function renderSignals(signals) {
  return signals.map(item => `
    <div class="signal">
      <div class="label">${item.label}</div>
      <div>${item.value}</div>
    </div>
  `).join('');
}

function renderOpportunityCard(op) {
  return `
    <article class="card">
      <div class="badges">
        ${badge(op.priority, 'accent')}
        ${badge(op.canDoNow === '可以' ? '当前可完成' : '后置', op.canDoNow === '可以' ? '' : 'alert')}
      </div>
      <h3>${op.name}</h3>
      <p>${op.fit}</p>
      <div class="kv">
        <div class="kv-item"><strong>适合形态</strong>${op.format}</div>
        <div class="kv-item"><strong>目标用户</strong>${op.targetUsers}</div>
        <div class="kv-item"><strong>最快上线方式</strong>${op.launch}</div>
        <div class="kv-item"><strong>Cloudflare 适配</strong>${op.cloudflare}</div>
        <div class="kv-item"><strong>API / GPU 依赖</strong>${op.apiGpu}</div>
        <div class="kv-item"><strong>变现路径</strong>${op.monetization.join('、')}</div>
        <div class="kv-item"><strong>许可证 / 平台风险</strong>${op.risk}</div>
        <div class="kv-item"><strong>最近活跃度</strong>${op.activity}</div>
      </div>
      <div class="badges">
        ${op.keywords.map(k => badge(k)).join('')}
      </div>
    </article>
  `;
}

function renderLaterRow(item) {
  return `
    <tr>
      <td><strong>${item.name}</strong></td>
      <td>${item.reason}</td>
      <td>${item.cost}</td>
      <td>${item.risk}</td>
      <td>${item.timing}</td>
    </tr>
  `;
}

function renderHome(data) {
  const updated = document.getElementById('updated-at');
  if (updated) updated.textContent = data.updatedAt;

  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) heroTitle.textContent = data.hero.title;

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;

  const topOps = document.getElementById('top-opportunities');
  if (topOps) topOps.innerHTML = data.priorityOpportunities.slice(0, 3).map(renderOpportunityCard).join('');

  const signals = document.getElementById('signals');
  if (signals) signals.innerHTML = renderSignals(data.signals);

  const nextActions = document.getElementById('next-actions');
  if (nextActions) nextActions.innerHTML = data.nextActions.map(item => `<li>${item}</li>`).join('');
}

function renderOpportunities(data) {
  const mount = document.getElementById('opportunities-list');
  if (mount) mount.innerHTML = data.priorityOpportunities.map(renderOpportunityCard).join('');
}

function renderLater(data) {
  const mount = document.getElementById('later-table');
  if (mount) mount.innerHTML = data.laterOpportunities.map(renderLaterRow).join('');
}

function renderMethod(data) {
  const signalsMount = document.getElementById('method-signals');
  if (signalsMount) signalsMount.innerHTML = renderSignals(data.signals);
}

loadResearch().then(data => {
  renderHome(data);
  renderOpportunities(data);
  renderLater(data);
  renderMethod(data);
}).catch(error => {
  document.body.innerHTML = `<main class="container"><div class="card" style="margin-top:40px"><h1>页面加载失败</h1><p>${error.message}</p></div></main>`;
  console.error(error);
});
