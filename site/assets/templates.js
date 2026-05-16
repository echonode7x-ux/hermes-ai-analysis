async function loadTemplates() {
  try {
    const response = await fetch(new URL('data/templates.json', window.location.href));
    if (!response.ok) throw new Error('无法加载模板数据');
    return response.json();
  } catch (error) {
    console.error('加载失败:', error);
    return { categories: [] };
  }
}

function renderTemplate(template) {
  const isFree = template.price === '免费';
  return `
    <article class="feature-card">
      <div class="chip-row">
        <span class="chip ${isFree ? 'forest' : 'plum'}">${template.price}</span>
        <span class="chip">${template.category}</span>
      </div>
      <h3>${template.name}</h3>
      <p>${template.description}</p>
      <div class="note-box" style="margin:12px 0">
        <strong>预览：</strong><code>${template.preview}</code>
      </div>
      <div style="margin-top:18px">
        <a class="btn ${isFree ? 'primary' : 'secondary'}" href="${template.downloadUrl}">
          ${isFree ? '免费下载' : '购买模板'}
        </a>
      </div>
    </article>`;
}

function renderTemplatesPage(data) {
  const mount = document.getElementById('templates-list');
  if (!mount) return;
  
  if (!data.categories || data.categories.length === 0) {
    mount.innerHTML = '<div class="note-box">模板数据加载中...</div>';
    return;
  }
  
  let html = '';
  data.categories.forEach(category => {
    html += `<div style="grid-column: 1 / -1; margin: 24px 0 12px;"><h2>${category.name}</h2></div>`;
    html += category.templates.map(renderTemplate).join('');
  });
  
  mount.innerHTML = html;
}

loadTemplates().then(renderTemplatesPage);
