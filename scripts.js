// Portfolio data manager with localStorage persistence
const APP_VERSION = "1.0.0";
const STORAGE_KEY = "malware_portfolio_data";

const DEFAULT_DATA = {
    profile: {
        name: "Your Name",
        role: "Malware Analyst",
        tagline: "Dissecting malicious code to understand threats and defend systems.",
        status: "Available for opportunities",
        about: "I am a Computer Science & Engineering student passionate about cybersecurity and malware analysis. I specialize in reverse engineering, static and dynamic analysis of malicious samples, and understanding attack techniques to build better defenses.\n\nMy journey began with a curiosity about how software works at the lowest level, which led me into the world of threat research, binary analysis, and incident response.",
        stats: [
            { num: "3+", label: "Years in Cybersecurity" },
            { num: "20+", label: "Malware Samples Analyzed" },
            { num: "10+", label: "Projects Completed" },
        ],
    },
    education: [
        {
            period: "2023 - 2027",
            degree: "Bachelor in Computer Science & Engineering",
            school: "International University of Bussiness Agriculture and Technology",
            desc: "Focus on cybersecurity, operating systems, and networks. Active member of the cybersecurity club.",
        },
        {
            period: "2019 - 2021",
            degree: "Higher Secondary (Science)",
            school: "Shaheed Bir Bikram Ramiz Uddin Cantoonment College",
            desc: "Computer Science, Mathematics, and Physics.",
        },
        {
            period: "2017 - 2019",
            degree: "Secondary School (Science)",
            school: "Nabarun Public School",
            desc: "Foundation in computers and programming.",
        },
    ],
    projects: [
        {
            icon: "bi",
            title: "Malware Sandbox Analyzer",
            desc: "A lightweight sandbox environment for detonating suspicious files and capturing behavioral indicators including API calls, file system changes, and network activity.",
            tags: ["Python", "VirtualBox", "YARA"],
            link: "",
            linkLabel: "View Project",
        },
        {
            icon: "asm",
            title: "Reverse Engineering Toolkit",
            desc: "Collection of scripts for static analysis of PE files, extracting strings, imports, and entropy to identify packed or obfuscated malware.",
            tags: ["Ghidra", "IDA", "Python"],
            link: "",
            linkLabel: "View Project",
        },
    ],
    skills: [
        "Reverse Engineering",
        "Static & Dynamic Analysis",
        "IDA Pro / Ghidra",
        "YARA Rules",
        "Python",
        "Wireshark",
        "Network Forensics",
        "Linux / Bash",
        "PE File Analysis",
        "Threat Intelligence",
    ],
    contacts: [
        { type: "email", label: "Email", value: "alimulhuq3179@gmail.com", link: "mailto:alimulhuq3179@gmail.com" },
        { type: "phone", label: "Phone", value: "+88 018605 07009", link: "tel:+8801860507009" },
        { type: "github", label: "GitHub", value: "github.com/alimulhuq", link: "https://github.com/alimulhuq" },
        { type: "linkedin", label: "LinkedIn", value: "linkedin.com/in/Alimul razib", link: "https://www.linkedin.com/in/alimul-razib-b549a4277/" },
    ],
};

// Icons for contact types
const CONTACT_ICONS = {
    email: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
    phone: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
    github: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
    linkedin: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
    link: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    location: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
};

// State
let data = null;

// Safe clone function for older browsers
function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
}

async function loadData() {
    // If opened directly from file://, skip the fetch to avoid CORS
    if (window.location.protocol === 'file:') {
        console.log('Running from file:// – using default data');
        // Still try localStorage first
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.warn('Invalid localStorage data, ignoring');
            }
        }
        return cloneDeep(DEFAULT_DATA);
    }

    // Normal HTTP(S) flow
    const savedVersion = localStorage.getItem("app_version");
    if (!savedVersion) {
        localStorage.setItem("app_version", APP_VERSION);
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (error) {
            console.error("Invalid localStorage data:", error);
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    try {
        const response = await fetch(`./data.json?t=${Date.now()}`);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Could not load data.json:", error);
    }

    return cloneDeep(DEFAULT_DATA);
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Photo handling
function renderPhoto() {
    const photoEl = document.getElementById("heroPhoto");
    const placeholder = document.getElementById("heroPhotoPlaceholder");
    if (!photoEl || !placeholder) return;
    const existingImg = photoEl.querySelector("img");
    if (data.profile.photo) {
        if (existingImg) {
            existingImg.src = data.profile.photo;
        } else {
            const img = document.createElement("img");
            img.src = data.profile.photo;
            img.alt = data.profile.name || "Profile";
            photoEl.appendChild(img);
        }
        placeholder.style.display = "none";
    } else {
        if (existingImg) existingImg.remove();
        placeholder.style.display = "";
        const initials = (data.profile.name || "YA")
            .split(" ")
            .map((w) => w[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
        placeholder.textContent = initials;
    }
}

// Event listeners for photo upload
const uploadBtn = document.getElementById("heroPhotoUpload");
const uploadInput = document.getElementById("heroPhotoInput");
if (uploadBtn && uploadInput) {
    uploadBtn.addEventListener("click", () => uploadInput.click());
    uploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            alert("Please choose an image smaller than 2MB.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            data.profile.photo = ev.target.result;
            saveData();
            renderPhoto();
        };
        reader.readAsDataURL(file);
    });
}

// Render functions
function renderProfile() {
    const p = data.profile;
    setText("navName", p.name);
    setText("heroName", p.name);
    setText("heroRole", p.role);
    setText("heroTagline", p.tagline);
    setText("heroStatus", p.status);
    setText("footerName", p.name);
    setText("footerYear", new Date().getFullYear());

    renderPhoto();

    const aboutEl = document.getElementById("aboutText");
    if (aboutEl) {
        aboutEl.textContent = p.about;
        aboutEl.setAttribute("data-field", "about");
    }

    const statsEl = document.getElementById("aboutStats");
    if (statsEl) {
        statsEl.innerHTML = "";
        p.stats.forEach((s) => {
            const card = document.createElement("div");
            card.className = "stat-card";
            card.innerHTML = `<div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div>`;
            statsEl.appendChild(card);
        });
    }
}

function renderEducation() {
    const list = document.getElementById("educationList");
    if (!list) return;
    list.innerHTML = "";
    if (data.education.length === 0) {
        list.innerHTML = '<div class="empty-state">No education entries yet.</div>';
        return;
    }
    data.education.forEach((edu, i) => {
        const item = document.createElement("div");
        item.className = "edu-item";
        const level = detectEduLevel(edu.school + " " + edu.degree);
        const markerLabel = String(i + 1).padStart(2, "0");
        item.innerHTML = `
            <div class="edu-marker">${markerLabel}</div>
            <div class="edu-header">
                <span class="edu-period">${escapeHtml(edu.period)}</span>
                <span class="edu-level-badge ${level}">${level}</span>
            </div>
            <div class="edu-degree">${escapeHtml(edu.degree)}</div>
            <div class="edu-school">${escapeHtml(edu.school)}</div>
            <div class="edu-desc">${escapeHtml(edu.desc)}</div>
        `;
        list.appendChild(item);
    });
}

function detectEduLevel(text) {
    const t = text.toLowerCase();
    if (t.includes("university") || t.includes("b.tech") || t.includes("btech") || t.includes("b.e") || t.includes("bachelor")) return "university";
    if (t.includes("college") || t.includes("higher secondary") || t.includes("intermediate") || t.includes("12th")) return "college";
    return "school";
}

function renderProjects() {
    const list = document.getElementById("projectsList");
    if (!list) return;
    list.innerHTML = "";
    if (data.projects.length === 0) {
        list.innerHTML = '<div class="empty-state">No projects yet.</div>';
        return;
    }
    data.projects.forEach((proj, i) => {
        const card = document.createElement("div");
        card.className = "project-card";
        const tagsHtml = (proj.tags || [])
            .map((t) => `<span class="project-tag">${escapeHtml(t)}</span>`)
            .join("");
        const linkHtml = proj.link
            ? `<a class="project-link" href="${escapeAttr(proj.link)}" target="_blank" rel="noopener">${escapeHtml(proj.linkLabel || "View")} &rarr;</a>`
            : "";
        const fileLabel = (proj.title || "project").toLowerCase().replace(/\s+/g, "_").substring(0, 24);
        card.innerHTML = `
            <div class="project-bar">
                <span class="project-bar-dot r"></span>
                <span class="project-bar-dot y"></span>
                <span class="project-bar-dot g"></span>
                <span class="project-bar-title">~/${escapeHtml(fileLabel)}</span>
                <span class="project-status">active</span>
            </div>
            <div class="project-body">
                <div class="project-icon">${escapeHtml(proj.icon)}</div>
                <div class="project-title">${escapeHtml(proj.title)}</div>
                <div class="project-desc">${escapeHtml(proj.desc)}</div>
                <div class="project-tags">${tagsHtml}</div>
                <div class="project-links">${linkHtml}</div>
            </div>`;
        list.appendChild(card);
    });
}

function renderSkills() {
    const wrap = document.getElementById("skillsList");
    if (!wrap) return;
    wrap.innerHTML = "";
    if (data.skills.length === 0) {
        wrap.innerHTML = '<div class="empty-state">No skills yet.</div>';
        return;
    }
    const inner = document.createElement("div");
    inner.className = "skills-wrap";
    inner.innerHTML = `
        <div class="skills-wrap-bar">
            <span class="project-bar-dot r" style="width:11px;height:11px;border-radius:50%;display:inline-block;background:#ff5f57;"></span>
            <span style="width:11px;height:11px;border-radius:50%;display:inline-block;background:#febc2e;"></span>
            <span style="width:11px;height:11px;border-radius:50%;display:inline-block;background:#28c840;"></span>
            <span class="prompt">skills --list<span class="blink"></span></span>
        </div>`;
    const grid = document.createElement("div");
    grid.className = "skills-grid-inner";
    data.skills.forEach((s, i) => {
        const chip = document.createElement("div");
        chip.className = "skill-chip";
        chip.innerHTML = `
            <span class="skill-dot"></span>
            <span>${escapeHtml(s)}</span>
            <span class="skill-num">0x${(i + 1).toString(16).padStart(2, "0")}</span>
        `;
        grid.appendChild(chip);
    });
    inner.appendChild(grid);
    wrap.appendChild(inner);
}

function renderContacts() {
    const list = document.getElementById("contactList");
    if (!list) return;
    list.innerHTML = "";
    data.contacts.forEach((c, i) => {
        const card = document.createElement("div");
        card.className = "contact-card";
        const icon = CONTACT_ICONS[c.type] || CONTACT_ICONS.link;
        const arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>';
        const copyIcon = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
        const linkEl = c.link
            ? `<a class="contact-arrow" href="${escapeAttr(c.link)}" target="_blank" rel="noopener" title="Open">${arrow}</a>`
            : "";
        card.innerHTML = `
            <div class="contact-icon">${icon}</div>
            <div class="contact-info">
                <div class="contact-label">${escapeHtml(c.label)}</div>
                <div class="contact-value">${escapeHtml(c.value)}</div>
            </div>
            ${linkEl}
            <button class="contact-copy" onclick="copyContact(${i})" title="Copy">${copyIcon}</button>
        `;
        list.appendChild(card);
    });
}

window.copyContact = function (i) {
    const c = data.contacts[i];
    const text = c.value || c.link || "";
    navigator.clipboard.writeText(text).then(() => {
        const btns = document.querySelectorAll(".contact-copy");
        if (btns[i]) {
            btns[i].classList.add("copied");
            setTimeout(() => btns[i].classList.remove("copied"), 1400);
        }
    });
};

function renderAll() {
    renderProfile();
    renderEducation();
    renderProjects();
    renderSkills();
    renderContacts();
}

// Helper to set text content safely
function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
}

// Helpers
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
}

function escapeAttr(str) {
    return String(str == null ? "" : str).replace(/"/g, "&quot;");
}

// Nav scroll effect
window.addEventListener("scroll", () => {
    const nav = document.getElementById("nav");
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 30);
});

// Mobile burger
const burger = document.getElementById("navBurger");
const navLinks = document.getElementById("navLinks");
if (burger && navLinks) {
    burger.addEventListener("click", () => navLinks.classList.toggle("open"));
    document.querySelectorAll("#navLinks a").forEach((a) => {
        a.addEventListener("click", () => navLinks.classList.remove("open"));
    });
}

// Init
async function init() {
    data = await loadData();
    renderAll();
}

init();