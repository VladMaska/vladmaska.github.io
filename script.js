// --- Переключение темы ---
const toggleBtn = document.getElementById('toggleTheme');

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    toggleBtn.textContent = '🌙';
  } else {
    document.body.classList.remove('light-theme');
    toggleBtn.textContent = '☀️';
  }
}

toggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});

// --- Тексты для разных языков ---
const texts = {
  ru: {
    aboutTitle: "Обо мне",
    aboutText: "Привет! Я Влад, занимаюсь Unity C#, Python и веб-разработкой. Люблю простые и эффективные решения.",
    skillsTitle: "Навыки",
    skillsList: [
      "Unity C#",
      "Python",
      "JavaScript",
      "Node.js",
      "Git & GitHub",
      "REST APIs",
      "Linux"
    ],
    projectsTitle: "Проекты",
    projectsList: [
      {name: "Unity Platformer Game", desc: "2D игра на Unity с приятным управлением и несколькими уровнями."},
      {name: "Python Automation Script", desc: "Скрипт для автоматизации рутинных задач в Linux."}
    ],
    reposTitle: "Репозитории GitHub",
    repoFilterPlaceholder: "Фильтр репозиториев по названию..."
  },
  en: {
    aboutTitle: "About Me",
    aboutText: "Hi, I'm Vlad. I specialize in Unity C#, Python scripting, and I have a growing passion for web development. I love open-source, creating tools and games, and constantly learning new technologies.",
    skillsTitle: "Skills",
    skillsList: [
      "Unity C#",
      "Python",
      "JavaScript",
      "Node.js",
      "Git & GitHub",
      "REST APIs",
      "Linux"
    ],
    projectsTitle: "Projects",
    projectsList: [
      {name: "Unity Platformer Game", desc: "A 2D platformer made in Unity with smooth controls and multiple levels."},
      {name: "Python Automation Script", desc: "Automates daily tasks and file management on Linux."}
    ],
    reposTitle: "GitHub Repositories",
    repoFilterPlaceholder: "Filter repos by name..."
  },
  pl: {
    aboutTitle: "O mnie",
    aboutText: "Cześć! Jestem Vlad, zajmuję się Unity C#, Pythonem i web developmentem. Lubię proste i skuteczne rozwiązania.",
    skillsTitle: "Umiejętności",
    skillsList: [
      "Unity C#",
      "Python",
      "JavaScript",
      "Node.js",
      "Git & GitHub",
      "REST APIs",
      "Linux"
    ],
    projectsTitle: "Projekty",
    projectsList: [
      {name: "Unity Platformer Game", desc: "2D platformówka stworzona w Unity z płynnym sterowaniem i wieloma poziomami."},
      {name: "Python Automation Script", desc: "Automatyzuje codzienne zadania i zarządzanie plikami w Linux."}
    ],
    reposTitle: "Repozytoria GitHub",
    repoFilterPlaceholder: "Filtruj repozytoria po nazwie..."
  },
  uk: {
    aboutTitle: "Про мене",
    aboutText: "Привіт! Я Влад, займаюся Unity C#, Python та веб-розробкою. Люблю прості та ефективні рішення.",
    skillsTitle: "Навички",
    skillsList: [
      "Unity C#",
      "Python",
      "JavaScript",
      "Node.js",
      "Git & GitHub",
      "REST APIs",
      "Linux"
    ],
    projectsTitle: "Проекти",
    projectsList: [
      {name: "Unity Platformer Game", desc: "2D гра на Unity з плавним керуванням і кількома рівнями."},
      {name: "Python Automation Script", desc: "Скрипт для автоматизації рутинних задач у Linux."}
    ],
    reposTitle: "Репозиторії GitHub",
    repoFilterPlaceholder: "Фільтр репозиторіїв за назвою..."
  }
};

// --- Элемент select для языка ---
const languageSelect = document.getElementById('languageSelect');

function updateLanguage(lang) {
  const t = texts[lang];

  document.getElementById('aboutTitle').textContent = t.aboutTitle;
  document.getElementById('aboutText').textContent = t.aboutText;

  document.getElementById('skillsTitle').textContent = t.skillsTitle;
  const skillsList = document.getElementById('skillsList');
  skillsList.innerHTML = '';
  t.skillsList.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  document.getElementById('projectsTitle').textContent = t.projectsTitle;
  const projectsList = document.getElementById('projectsList');
  projectsList.innerHTML = '';
  t.projectsList.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.name}</strong> — ${p.desc}`;
    projectsList.appendChild(li);
  });

  document.getElementById('reposTitle').textContent = t.reposTitle;
  const repoFilter = document.getElementById('repoFilter');
  repoFilter.placeholder = t.repoFilterPlaceholder;

  // Синхронизируем select с языком
  if (languageSelect.value !== lang) {
    languageSelect.value = lang;
  }
}

languageSelect.addEventListener('change', () => {
  const selectedLang = languageSelect.value;
  updateLanguage(selectedLang);
  localStorage.setItem('language', selectedLang);
});

// --- Загрузка репозиториев с GitHub и фильтр ---
async function fetchRepos() {
  const reposContainer = document.getElementById('repos');
  reposContainer.textContent = 'Loading...';

  try {
    const res = await fetch('https://api.github.com/users/VladMaska/repos?sort=updated&per_page=50');
    const repos = await res.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      reposContainer.innerHTML = '<p>No repositories found.</p>';
      return;
    }

    function renderRepos(list) {
      reposContainer.innerHTML = list.map(r => `
        <div class="repo">
          <h3><a href="${r.html_url}" target="_blank" rel="noopener noreferrer">${r.name}</a></h3>
          <p>${r.description || 'No description'}</p>
          <small>⭐ ${r.stargazers_count} | 🍴 ${r.forks_count}</small>
        </div>
      `).join('');
    }

    renderRepos(repos);

    const filterInput = document.getElementById('repoFilter');
    filterInput.addEventListener('input', () => {
      const query = filterInput.value.toLowerCase().trim();
      if (!query) {
        renderRepos(repos);
      } else {
        const filtered = repos.filter(r => r.name.toLowerCase().includes(query));
        renderRepos(filtered);
      }
    });

  } catch (err) {
    reposContainer.textContent = 'Failed to load repositories.';
    console.error(err);
  }
}

// --- Инициализация ---
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  const savedLang = localStorage.getItem('language') || 'en'; // по умолчанию English
  updateLanguage(savedLang);

  fetchRepos();
});
