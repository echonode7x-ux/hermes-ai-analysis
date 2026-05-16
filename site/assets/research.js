async function loadResearch() {
  try {
    const response = await fetch(new URL('data/research-index.json', window.location.href));
    if (!response.ok) throw new Error('无法加载研究数据');
    return response.json();
  } catch (error) {
    console.error('加载失败:', error);
    return { research: [] };
  }
}

function renderResearchItem(item) {
  return `
    <article class="feature-card">
      <div class="chip-row">
        <span class="chip forest">${item.track}</span>
        <span class="chip">${item.date}</span>
        <span class="chip plum">${item.status}</span>
      </div>
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <div class="table-row"><strong>成本</strong><div>${item.cost}</div></div>
      <div class="table-row"><strong>预期收益</strong><div>${item.expectedRevenue}</div></div>
      <div class="table-row"><strong>执行周期</strong><div>${item.timeline}</div></div>
      <div class="note-box" style="margin-top:16px">
        <strong>核心亮点：</strong>${item.highlight}
      </div>
      <div style="margin-top:18px">
        <a class="btn primary" href="./research-detail.html?id=${item.id}">查看完整方案</a>
      </div>
    </article>`;
}

function renderResearchPage(data) {
  const mount = document.getElementById('research-list');
  if (!mount) return;
  
  if (!data.research || data.research.length === 0) {
    mount.innerHTML = '<div class="note-box">暂无深度研究，每周三/周日自动更新。</div>';
    return;
  }
  
  mount.innerHTML = data.research.map(renderResearchItem).join('');
}

loadResearch().then(renderResearchPage);
