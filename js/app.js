const STORAGE_KEY = 'heThongLuyenThi_v1';
let data = loadData();
let route = { page: 'home', categoryId: null, levelName: null, groupName: null };
let pendingDelete = null;

const $ = (s) => document.querySelector(s);
const view = $('#view');
const searchInput = $('#searchInput');

function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : clone(INITIAL_DATA);
  } catch { return clone(INITIAL_DATA); }
}
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  updateTotal();
}
function allEditableExams() {
  const arr = [];
  data.forEach(cat => {
    if (cat.type === 'levels') {
      cat.levels.forEach(level => level.exams.forEach(exam => arr.push({ exam, cat, level })));
    } else if (cat.type === 'groups') {
      cat.groups.forEach(group => group.exams.forEach(exam => arr.push({ exam, cat, group })));
    }
  });
  return arr;
}
function totalCount() { return allEditableExams().length; }
function updateTotal() { $('#totalCount').textContent = totalCount(); }
function getCategory(id) { return data.find(c => c.id === id); }
function getLevel(cat, name) { return cat?.levels?.find(l => l.name === name); }
function getGroup(cat, name) { return cat?.groups?.find(g => g.name === name); }
function formatDate(date) {
  if (!date) return 'Chưa có ngày';
  const [y,m,d] = date.split('-');
  return d && m && y ? `${d}/${m}/${y}` : date;
}
function escapeHtml(str = '') {
  return str.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
}
function safeUrl(url) {
  try {
    const u = new URL(url);
    return ['http:', 'https:'].includes(u.protocol) ? u.href : '#';
  } catch { return '#'; }
}
function setBreadcrumb(text) { $('#breadcrumbs').textContent = text; }
function setSearchVisible(visible) { $('#searchWrap').style.display = visible ? '' : 'none'; }
function closeMobileMenu() { $('#sidebar').classList.remove('open'); }

function renderNav() {
  $('#sideNav').innerHTML = data.map(cat => `
    <button class="nav-item ${route.categoryId === cat.id ? 'active' : ''}" data-nav="${cat.id}">
      <span class="nav-num">${cat.icon}</span><span>${escapeHtml(cat.title)}</span>
    </button>
  `).join('');
}

function renderHome() {
  route = { page: 'home', categoryId: null, levelName: null, groupName: null };
  setBreadcrumb('Trang chủ'); setSearchVisible(true); renderNav();
  view.innerHTML = `
    <div class="section-title">
      <div><h3>Chủ đề luyện tập</h3><p>Chọn một chủ đề để đi vào các mức độ hoặc nhóm bài.</p></div>
    </div>
    <div class="category-grid">
      ${data.map(cat => {
        const count = categoryCount(cat);
        const sub = cat.type === 'azt' ? 'Google Forms + HOCIZ' : categorySubtext(cat);
        return `<button class="category-card" data-category="${cat.id}">
          <div class="category-top"><span class="category-icon">${cat.icon}</span><span class="category-count">${count} bài</span></div>
          <h4>${escapeHtml(cat.title)}</h4><p>${escapeHtml(sub)}</p>
        </button>`;
      }).join('')}
    </div>`;
}
function categoryCount(cat) {
  if (cat.type === 'levels') return cat.levels.reduce((n,l)=>n+l.exams.length,0);
  return cat.groups.reduce((n,g)=>n+g.exams.length,0);
}
function categorySubtext(cat) {
  if (cat.type === 'levels') return cat.levels.map(l => l.name).join(' · ');
  return cat.groups.map(g => g.name).join(' · ');
}

function renderCategory(id) {
  const cat = getCategory(id); if (!cat) return renderHome();
  route.categoryId = id; route.page = 'category'; renderNav();
  setBreadcrumb(cat.title); setSearchVisible(true);
  if (cat.type === 'levels') {
    view.innerHTML = `
      <div class="list-head"><div><button class="back-link" id="backHome">← Trang chủ</button><div class="section-title" style="margin-bottom:0"><div><h3>${escapeHtml(cat.title)}</h3><p>Chọn mức độ để xem danh sách bài.</p></div></div></div></div>
      <div class="level-grid">
        ${cat.levels.map(level => `<button class="level-card" data-level="${escapeHtml(level.name)}">
          <h4>${escapeHtml(level.name)}</h4><p>${level.exams.length} bài kiểm tra</p><div class="level-arrow">Xem bài →</div>
        </button>`).join('')}
      </div>`;
  } else if (cat.type === 'groups') {
    view.innerHTML = `
      <div class="list-head"><div><button class="back-link" id="backHome">← Trang chủ</button><div class="section-title" style="margin-bottom:0"><div><h3>${escapeHtml(cat.title)}</h3><p>Chọn nhóm tình huống.</p></div></div></div></div>
      <div class="level-grid">
        ${cat.groups.map(group => `<button class="level-card" data-group="${escapeHtml(group.name)}"><h4>${escapeHtml(group.name)}</h4><p>${group.exams.length} bài</p><div class="level-arrow">Xem bài →</div></button>`).join('')}
      </div>`;
  } else if (cat.type === 'azt') {
    view.innerHTML = `
      <div class="list-head"><div><button class="back-link" id="backHome">← Trang chủ</button><div class="section-title" style="margin-bottom:0"><div><h3>${escapeHtml(cat.title)}</h3><p>Danh sách liên kết có sẵn — không có chức năng thêm bài.</p></div></div></div></div>
      ${cat.groups.map(group => `<div class="azt-group"><h4>${escapeHtml(group.name)}</h4><div class="azt-list">
        ${group.exams.map((exam,i) => `<div class="azt-item"><div class="azt-title"><span class="azt-number">${String(i+1).padStart(2,'0')}</span>${escapeHtml(exam.name)}</div><button class="small-btn open-btn" data-open-url="${encodeURIComponent(exam.url)}">Mở bài →</button></div>`).join('')}
      </div></div>`).join('')}`;
  }
}

function renderList(catId, levelName = null, groupName = null) {
  const cat = getCategory(catId); if (!cat) return renderHome();
  const container = levelName ? getLevel(cat, levelName) : getGroup(cat, groupName);
  if (!container) return renderCategory(catId);
  route.page = 'list'; route.categoryId = catId; route.levelName = levelName; route.groupName = groupName;
  renderNav();
  setBreadcrumb(`${cat.title} / ${container.name}`); setSearchVisible(false);
  const exams = [...container.exams].sort((a,b) => (b.date || '').localeCompare(a.date || ''));
  view.innerHTML = `
    <div class="list-head">
      <div><button class="back-link" id="backCategory">← ${escapeHtml(cat.title)}</button>
        <div class="section-title" style="margin-bottom:0"><div><h3>${escapeHtml(container.name)}</h3><p>${exams.length} bài trong mục này</p></div></div>
      </div>
      <button class="primary-btn" id="addExam">＋ Thêm bài</button>
    </div>
    ${exams.length ? `<div class="exam-list">${exams.map(examCard).join('')}</div>` : emptyState(cat.title, container.name)}`;
}
function emptyState(catTitle, levelName) {
  return `<div class="empty"><strong>Chưa có bài nào</strong><span>Hãy bấm “＋ Thêm bài” để thêm link vào ${escapeHtml(catTitle)} / ${escapeHtml(levelName)}.</span></div>`;
}
function examCard(exam) {
  return `<article class="exam-card">
    <div class="exam-main"><h4 class="exam-name">${escapeHtml(exam.name)}</h4><div class="exam-meta"><span>📅 ${formatDate(exam.date)}</span><span>🔗 ${escapeHtml(hostname(exam.url))}</span></div></div>
    <div class="exam-actions"><button class="small-btn open-btn" data-open-url="${encodeURIComponent(exam.url)}">Làm bài →</button><button class="small-btn" data-edit-id="${exam.id}">Sửa</button><button class="small-btn delete-btn" data-delete-id="${exam.id}">Xóa</button></div>
  </article>`;
}
function hostname(url) { try { return new URL(url).hostname.replace('www.',''); } catch { return 'link'; } }

function findExam(id) {
  return allEditableExams().find(x => x.exam.id === id);
}
function openAddModal() {
  $('#modalTitle').textContent = 'Thêm bài kiểm tra';
  $('#editId').value = '';
  $('#formCategory').value = route.categoryId;
  $('#formLevel').value = route.levelName || route.groupName || '';
  $('#examName').value = '';
  $('#examUrl').value = '';
  $('#examDate').value = new Date().toISOString().slice(0,10);
  $('#modalBackdrop').hidden = false;
  $('#examName').focus();
}
function openEditModal(id) {
  const found = findExam(id); if (!found) return;
  $('#modalTitle').textContent = 'Sửa bài kiểm tra';
  $('#editId').value = id;
  $('#formCategory').value = found.cat.id;
  $('#formLevel').value = found.level ? found.level.name : found.group.name;
  $('#examName').value = found.exam.name;
  $('#examUrl').value = found.exam.url;
  $('#examDate').value = found.exam.date || '';
  $('#modalBackdrop').hidden = false;
  $('#examName').focus();
}
function closeModal() { $('#modalBackdrop').hidden = true; }
function submitExam(e) {
  e.preventDefault();
  const id = $('#editId').value;
  const cat = getCategory($('#formCategory').value);
  const name = $('#examName').value.trim();
  const url = safeUrl($('#examUrl').value.trim());
  const date = $('#examDate').value;
  if (!cat || url === '#') { showToast('Link không hợp lệ. Hãy dùng link http/https.'); return; }
  if (id) {
    const found = findExam(id); if (!found) return;
    Object.assign(found.exam, { name, url, date });
    showToast('Đã cập nhật bài.');
  } else {
    const containerName = $('#formLevel').value;
    const container = cat.type === 'levels' ? getLevel(cat, containerName) : getGroup(cat, containerName);
    if (!container) return;
    container.exams.push({ id: uid(), name, url, date });
    showToast('Đã thêm bài.');
  }
  saveData(); closeModal();
  renderList(route.categoryId, route.levelName, route.groupName);
}
function askDelete(id) {
  const found = findExam(id); if (!found) return;
  pendingDelete = id;
  $('#confirmTitle').textContent = 'Xóa bài kiểm tra?';
  $('#confirmText').textContent = `“${found.exam.name}” sẽ bị xóa khỏi dữ liệu trên trình duyệt.`;
  $('#confirmBackdrop').hidden = false;
}
function confirmDelete() {
  if (!pendingDelete) return;
  const found = findExam(pendingDelete); if (found) {
    found.exam = null;
    const arr = found.level ? found.level.exams : found.group.exams;
    const index = arr.findIndex(x => x === null || x.id === pendingDelete);
    if (index >= 0) arr.splice(index, 1);
  }
  pendingDelete = null; $('#confirmBackdrop').hidden = true; saveData();
  showToast('Đã xóa bài.'); renderList(route.categoryId, route.levelName, route.groupName);
}

function performSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) { if (route.page === 'home') renderHome(); else if (route.page === 'category') renderCategory(route.categoryId); return; }
  route.page = 'search'; setBreadcrumb(`Tìm kiếm: ${query}`); renderNav(); setSearchVisible(true);
  const results = [];
  data.forEach(cat => {
    if (cat.type === 'levels') cat.levels.forEach(level => level.exams.forEach(exam => { if (`${exam.name} ${cat.title} ${level.name}`.toLowerCase().includes(q)) results.push({cat, container: level, exam}); }));
    if (cat.type === 'groups') cat.groups.forEach(group => group.exams.forEach(exam => { if (`${exam.name} ${cat.title} ${group.name}`.toLowerCase().includes(q)) results.push({cat, container: group, exam}); }));
    if (cat.type === 'azt') cat.groups.forEach(group => group.exams.forEach(exam => { if (`${exam.name} ${cat.title} ${group.name}`.toLowerCase().includes(q)) results.push({cat, container: group, exam, azt: true}); }));
  });
  view.innerHTML = `<div class="section-title"><div><h3>Kết quả tìm kiếm</h3><p>${results.length} kết quả cho “${escapeHtml(query)}”</p></div></div>
    ${results.length ? `<div class="exam-list">${results.map(r => r.azt ? `<div class="exam-card"><div class="exam-main"><h4 class="exam-name">${escapeHtml(r.exam.name)}</h4><div class="exam-meta"><span>${escapeHtml(r.cat.title)} / ${escapeHtml(r.container.name)}</span></div></div><div class="exam-actions"><button class="small-btn open-btn" data-open-url="${encodeURIComponent(r.exam.url)}">Mở bài →</button></div></div>` : `<div class="exam-card"><div class="exam-main"><h4 class="exam-name">${escapeHtml(r.exam.name)}</h4><div class="exam-meta"><span>${escapeHtml(r.cat.title)} / ${escapeHtml(r.container.name)}</span><span>📅 ${formatDate(r.exam.date)}</span></div></div><div class="exam-actions"><button class="small-btn open-btn" data-open-url="${encodeURIComponent(r.exam.url)}">Làm bài →</button><button class="small-btn" data-edit-id="${r.exam.id}">Sửa</button><button class="small-btn delete-btn" data-delete-id="${r.exam.id}">Xóa</button></div></div>`).join('')}</div>` : `<div class="empty"><strong>Không tìm thấy bài</strong><span>Thử từ khóa khác.</span></div>`}`;
}

function showToast(msg) {
  const el = $('#toast'); el.textContent = msg; el.classList.add('show');
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => el.classList.remove('show'), 2200);
}
function exportData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `du-lieu-on-thi-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(a.href); showToast('Đã tạo file sao lưu.');
}
function importData(file) {
  const reader = new FileReader();
  reader.onload = () => { try { const parsed = JSON.parse(reader.result); if (!Array.isArray(parsed)) throw new Error(); data = parsed; saveData(); renderHome(); showToast('Đã nhập dữ liệu.'); } catch { showToast('File dữ liệu không hợp lệ.'); } };
  reader.readAsText(file);
}
function resetData() {
  data = clone(INITIAL_DATA); saveData(); renderHome(); showToast('Đã khôi phục dữ liệu ban đầu.');
}

// Event delegation
$('#sideNav').addEventListener('click', e => { const btn = e.target.closest('[data-nav]'); if (btn) { renderCategory(btn.dataset.nav); closeMobileMenu(); } });
view.addEventListener('click', e => {
  const category = e.target.closest('[data-category]'); if (category) return renderCategory(category.dataset.category);
  const level = e.target.closest('[data-level]'); if (level) return renderList(route.categoryId, level.dataset.level, null);
  const group = e.target.closest('[data-group]'); if (group) return renderList(route.categoryId, null, group.dataset.group);
  const open = e.target.closest('[data-open-url]'); if (open) { const url = decodeURIComponent(open.dataset.openUrl); if (safeUrl(url) !== '#') window.open(url, '_blank', 'noopener'); return; }
  const edit = e.target.closest('[data-edit-id]'); if (edit) return openEditModal(edit.dataset.editId);
  const del = e.target.closest('[data-delete-id]'); if (del) return askDelete(del.dataset.deleteId);
  if (e.target.closest('#backHome')) return renderHome();
  if (e.target.closest('#backCategory')) return renderCategory(route.categoryId);
  if (e.target.closest('#addExam')) return openAddModal();
});

searchInput.addEventListener('input', () => { $('#clearSearch').hidden = !searchInput.value; performSearch(searchInput.value); });
$('#clearSearch').addEventListener('click', () => { searchInput.value=''; $('#clearSearch').hidden=true; renderHome(); });
$('#homeBtn').addEventListener('click', () => { searchInput.value=''; $('#clearSearch').hidden=true; renderHome(); });
$('#menuBtn').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#closeModal').addEventListener('click', closeModal); $('#cancelModal').addEventListener('click', closeModal);
$('#modalBackdrop').addEventListener('click', e => { if (e.target === $('#modalBackdrop')) closeModal(); });
$('#examForm').addEventListener('submit', submitExam);
$('#confirmCancel').addEventListener('click', () => { pendingDelete=null; $('#confirmBackdrop').hidden=true; });
$('#confirmOk').addEventListener('click', confirmDelete);
$('#confirmBackdrop').addEventListener('click', e => { if (e.target === $('#confirmBackdrop')) { pendingDelete=null; $('#confirmBackdrop').hidden=true; } });
$('#exportBtn').addEventListener('click', exportData);
$('#importInput').addEventListener('change', e => { if (e.target.files[0]) importData(e.target.files[0]); e.target.value=''; });
$('#resetBtn').addEventListener('click', () => { if (confirm('Khôi phục dữ liệu gốc? Các bài bạn đã thêm/sửa/xóa sẽ bị thay thế.')) resetData(); });

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); $('#confirmBackdrop').hidden=true; closeMobileMenu(); } });

updateTotal(); renderHome();
