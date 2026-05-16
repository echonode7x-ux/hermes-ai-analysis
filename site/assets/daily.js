async function loadDailySignals() {
  try {
    const response = await fetch(new URL('data/daily-signals.json', window.location.href));
    if (!response.ok) throw new Error('无法加载每日信号数据');
    return response.json();
  } catch (error) {
    console.error('加载失败:', error);
    return { signals: [] };
  }
}

function renderSignal(signal) {
  const valueClass = signal.value === 'high' ? 'forest' : signal.value === 'medium' ? 'amber' : '';
  return `
    <article class="feature-card">
      <div class="chip-row">
        <span class="chip ${valueClass}">${signal.value === 'high' ? '高价值' : '中等'}</span>
        <span class="chip">${signal.track}</span>
        <span class="chip">${signal.date}</span>
      </div>
      <h3>${signal.title}</h3>
      <p>${signal.opportunity}</p>
      <div class="table-row"><strong>成本</strong><div>${signal.cost}</div></div>
      <div class="table-row"><strong>来源</strong><div>${signal.source}</div></div>
      <div class="table-row"><strong>证据</strong><div>${signal.evidence}</div></div>
      <div class="note-box" style="margin-top:16px">
        <strong>MVP路径：</strong>${signal.mvp}
      </div>
      <div style="margin-top:18px">
        <a class="btn secondary" href="${signal.url}" target="_blank">查看源项目</a>
      </div>
    </article>`;
}

function renderDailyPage(data) {
  const mount = document.getElementById('daily-signals-list');
  if (!mount) return;
  
  if (!data.signals || data.signals.length === 0) {
    mount.innerHTML = '<div class="note-box">暂无信号数据，每日凌晨2点自动更新。</div>';
    return;
  }
  
  mount.innerHTML = data.signals.map(renderSignal).join('');
}

loadDailySignals().then(renderDailyPage);
