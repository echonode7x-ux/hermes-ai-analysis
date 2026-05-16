async function loadTools() {
  try {
    const response = await fetch(new URL('data/tools.json', window.location.href));
    if (!response.ok) throw new Error('无法加载工具数据');
    return response.json();
  } catch (error) {
    console.error('加载失败:', error);
    return { categories: [] };
  }
}

function renderTool(tool) {
  const stars = '★'.repeat(Math.floor(tool.rating)) + (tool.rating % 1 >= 0.5 ? '½' : '');
  return `
    <article class="feature-card">
      <div class="chip-row">
        <span class="chip">${tool.price}</span>
        <span class="chip amber">${stars}</span>
        ${tool.affiliate ? '<span class="chip plum">联盟推荐</span>' : ''}
      </div>
      <h3>${tool.name}</h3>
      <p>${tool.description}</p>
      <div class="table-row"><strong>最适合</strong><div>${tool.bestFor}</div></div>
      <div style="margin-top:18px">
        <a class="btn primary" href="${tool.url}" target="_blank">
          ${tool.affiliate ? '立即使用（支持本站）' : '查看工具'}
        </a>
      </div>
    </article>`;
}

function renderToolsPage(data) {
  const mount = document.getElementById('tools-list');
  if (!mount) return;
  
  if (!data.categories || data.categories.length === 0) {
    mount.innerHTML = '<div class="note-box">工具数据加载中...</div>';
    return;
  }
  
  let html = '';
  data.categories.forEach(category => {
    html += `<div style="grid-column: 1 / -1; margin: 24px 0 12px;"><h2>${category.name}</h2></div>`;
    html += category.tools.map(renderTool).join('');
  });
  
  mount.innerHTML = html;
}

loadTools().then(renderToolsPage);
