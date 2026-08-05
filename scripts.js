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
            period: "2021 - 2025",
            degree: "B.Tech in Computer Science & Engineering",
            school: "Your University",
            desc: "Focus on cybersecurity, operating systems, and networks. Active member of the cybersecurity club.",
        },
        {
            period: "2019 - 2021",
            degree: "Higher Secondary (Science)",
            school: "Your College",
            desc: "Computer Science, Mathematics, and Physics.",
        },
        {
            period: "2017 - 2019",
            degree: "Secondary School",
            school: "Your School",
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
let data = loadData();
let editMode = false;

async function loadData() {

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
        const response = await fetch("./data.json");

        if (response.ok) {
            return await response.json();
        }

    } catch (error) {
        console.error("Could not load data.json:", error);
    }

    return structuredClone(DEFAULT_DATA);
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Photo handling
function renderPhoto() {
    const photoEl = document.getElementById("heroPhoto");
    const placeholder = document.getElementById("heroPhotoPlaceholder");
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

document.getElementById("heroPhotoUpload").addEventListener("click", () => {
    document.getElementById("heroPhotoInput").click();
});

document.getElementById("heroPhotoInput").addEventListener("change", (e) => {
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

// Render functions
function renderProfile() {
    const p = data.profile;
    document.getElementById("navName").textContent = p.name;
    document.getElementById("heroName").textContent = p.name;
    document.getElementById("heroRole").textContent = p.role;
    document.getElementById("heroTagline").textContent = p.tagline;
    document.getElementById("heroStatus").textContent = p.status;
    document.getElementById("footerName").textContent = p.name;
    document.getElementById("footerYear").textContent = new Date().getFullYear();

    renderPhoto();

    const aboutEl = document.getElementById("aboutText");
    aboutEl.textContent = p.about;
    aboutEl.setAttribute("data-field", "about");

    const statsEl = document.getElementById("aboutStats");
    statsEl.innerHTML = "";
    p.stats.forEach((s, i) => {
        const card = document.createElement("div");
        card.className = "stat-card";
        card.innerHTML = `<div class="stat-num" data-stat-num="${i}">${s.num}</div><div class="stat-label" data-stat-label="${i}">${s.label}</div>`;
        statsEl.appendChild(card);
    });
}

function renderEducation() {
    const list = document.getElementById("educationList");
    list.innerHTML = "";
    if (data.education.length === 0) {
        list.innerHTML = '<div class="empty-state">No education entries yet. Click "+ Add Education".</div>';
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
                <span class="edu-period" data-field="education.period" data-index="${i}">${escapeHtml(edu.period)}</span>
                <span class="edu-level-badge ${level}">${level}</span>
            </div>
            <div class="edu-degree" data-field="education.degree" data-index="${i}">${escapeHtml(edu.degree)}</div>
            <div class="edu-school" data-field="education.school" data-index="${i}">${escapeHtml(edu.school)}</div>
            <div class="edu-desc" data-field="education.desc" data-index="${i}">${escapeHtml(edu.desc)}</div>
            <div class="edu-actions">
                <button class="delete-btn" onclick="deleteEducation(${i})">✕ Delete</button>
                <button class="edit-btn" onclick="editEducation(${i})" style="font-size:0.72rem;padding:4px 10px;">Edit</button>
            </div>`;
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
    list.innerHTML = "";
    if (data.projects.length === 0) {
        list.innerHTML = '<div class="empty-state">No projects yet. Click "+ Add Project".</div>';
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
                <div class="project-icon" data-field="project.icon" data-index="${i}">${escapeHtml(proj.icon)}</div>
                <div class="project-title" data-field="project.title" data-index="${i}">${escapeHtml(proj.title)}</div>
                <div class="project-desc" data-field="project.desc" data-index="${i}">${escapeHtml(proj.desc)}</div>
                <div class="project-tags">${tagsHtml}</div>
                <div class="project-links">${linkHtml}</div>
                <div class="project-actions">
                    <button class="delete-btn" onclick="deleteProject(${i})">✕ Delete</button>
                    <button class="edit-btn" onclick="editProject(${i})" style="font-size:0.72rem;padding:4px 10px;">Edit</button>
                </div>
            </div>`;
        list.appendChild(card);
    });
}

function renderSkills() {
    const wrap = document.getElementById("skillsList");
    wrap.innerHTML = "";
    if (data.skills.length === 0) {
        wrap.innerHTML = '<div class="empty-state">No skills yet. Click "+ Add Skill".</div>';
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
            <span data-field="skill" data-index="${i}">${escapeHtml(s)}</span>
            <span class="skill-num">0x${(i + 1).toString(16).padStart(2, "0")}</span>
            <button class="delete-btn delete-btn-sm" onclick="deleteSkill(${i})">✕</button>
        `;
        grid.appendChild(chip);
    });
    inner.appendChild(grid);
    wrap.appendChild(inner);
}

function renderContacts() {
    const list = document.getElementById("contactList");
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
            <div class="contact-actions">
                <button class="delete-btn delete-btn-sm" onclick="deleteContact(${i})">✕</button>
                <button class="edit-btn" onclick="editContact(${i})" style="font-size:0.72rem;padding:4px 10px;">Edit</button>
            </div>`;
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
    applyEditMode();
}

// Edit mode
function applyEditMode() {
    document.body.classList.toggle("edit-mode", editMode);
    const toggle = document.getElementById("editToggle");
    toggle.classList.toggle("active", editMode);
    toggle.querySelector("span").textContent = editMode ? "Done" : "Edit";

    if (editMode) {
        makeEditable("heroName", "profile.name");
        makeEditable("heroRole", "profile.role");
        makeEditable("heroTagline", "profile.tagline");
        makeEditable("heroStatus", "profile.status");
        makeEditable("aboutText", "profile.about");
    } else {
        document.querySelectorAll("[contenteditable]").forEach((el) => {
            el.removeAttribute("contenteditable");
            el.removeAttribute("data-editing");
        });
    }
}

function makeEditable(id, fieldPath) {
    const el = document.getElementById(id);
    if (!el) return;
    el.setAttribute("contenteditable", "true");
    el.setAttribute("data-editing", fieldPath);
}

function setByPath(obj, path, value) {
    const parts = path.split(".");
    let o = obj;
    for (let i = 0; i < parts.length - 1; i++) o = o[parts[i]];
    o[parts[parts.length - 1]] = value;
}

// Handle inline edits
document.addEventListener("blur", (e) => {
    const el = e.target;
    if (el.hasAttribute && el.hasAttribute("data-editing")) {
        const path = el.getAttribute("data-editing");
        setByPath(data, path, el.textContent.trim());
        saveData();
    }
}, true);

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.hasAttribute && e.target.hasAttribute("data-editing") && e.target.id !== "aboutText") {
        e.preventDefault();
        e.target.blur();
    }
});

// Modal
const modalOverlay = document.getElementById("modalOverlay");
const modalForm = document.getElementById("modalForm");
const modalTitle = document.getElementById("modalTitle");
let currentModalContext = null;

function openModal(title, fields, onSave) {
    modalTitle.textContent = title;
    modalForm.innerHTML = "";
    fields.forEach((f) => {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const label = document.createElement("label");
        label.textContent = f.label;
        const input = f.type === "textarea" ? document.createElement("textarea") : document.createElement("input");
        if (f.type !== "textarea") input.type = f.type || "text";
        input.value = f.value || "";
        input.name = f.name;
        if (f.placeholder) input.placeholder = f.placeholder;
        wrap.appendChild(label);
        wrap.appendChild(input);
        modalForm.appendChild(wrap);
    });
    const actions = document.createElement("div");
    actions.className = "modal-actions";
    actions.innerHTML = '<button type="button" class="btn btn-cancel">Cancel</button><button type="submit" class="btn btn-save">Save</button>';
    modalForm.appendChild(actions);

    currentModalContext = onSave;
    modalOverlay.classList.add("open");
}

function closeModal() {
    modalOverlay.classList.remove("open");
    currentModalContext = null;
}

modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (currentModalContext) {
        const formData = {};
        new FormData(modalForm).forEach((v, k) => (formData[k] = v));
        currentModalContext(formData);
    }
    closeModal();
});

document.getElementById("modalClose").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
});

// Education CRUD
window.editEducation = function (i) {
    const edu = data.education[i];
    openModal(
        "Edit Education",
        [
            { name: "period", label: "Period", value: edu.period },
            { name: "degree", label: "Degree / Qualification", value: edu.degree },
            { name: "school", label: "School / College / University", value: edu.school },
            { name: "desc", label: "Description", value: edu.desc, type: "textarea" },
        ],
        (f) => {
            data.education[i] = { period: f.period, degree: f.degree, school: f.school, desc: f.desc };
            saveData();
            renderEducation();
        }
    );
};

window.deleteEducation = function (i) {
    if (confirm(`Remove this education entry?`)) {
        data.education.splice(i, 1);
        saveData();
        renderEducation();
    }
};

// Project CRUD
window.editProject = function (i) {
    const proj = data.projects[i] || { icon: "bi", title: "", desc: "", tags: [], link: "", linkLabel: "View" };
    openModal(
        i >= 0 ? "Edit Project" : "Add Project",
        [
            { name: "title", label: "Project Title", value: proj.title },
            { name: "icon", label: "Icon (short text, e.g. 'bi', 'asm', 'net')", value: proj.icon },
            { name: "desc", label: "Description", value: proj.desc, type: "textarea" },
            { name: "tags", label: "Tags (comma separated)", value: (proj.tags || []).join(", ") },
            { name: "link", label: "Project Link (URL)", value: proj.link },
            { name: "linkLabel", label: "Link Label", value: proj.linkLabel || "View" },
        ],
        (f) => {
            const project = {
                icon: f.icon || "bi",
                title: f.title,
                desc: f.desc,
                tags: f.tags.split(",").map((t) => t.trim()).filter(Boolean),
                link: f.link,
                linkLabel: f.linkLabel || "View",
            };
            if (i >= 0) data.projects[i] = project;
            else data.projects.push(project);
            saveData();
            renderProjects();
        }
    );
};

window.deleteProject = function (i) {
    if (confirm(`Remove "${data.projects[i].title}" from your projects?`)) {
        data.projects.splice(i, 1);
        saveData();
        renderProjects();
    }
};

// Skill delete
window.deleteSkill = function (i) {
    if (confirm(`Remove "${data.skills[i]}" from your skills?`)) {
        data.skills.splice(i, 1);
        saveData();
        renderSkills();
    }
};

// Contact CRUD
window.editContact = function (i) {
    const c = data.contacts[i] || { type: "link", label: "", value: "", link: "" };
    openModal(
        i >= 0 ? "Edit Contact" : "Add Contact",
        [
            { name: "label", label: "Label (e.g. Email, Phone, GitHub)", value: c.label },
            { name: "type", label: "Type", value: c.type },
            { name: "value", label: "Value (shown text)", value: c.value },
            { name: "link", label: "Link (URL, mailto:, or tel:)", value: c.link },
        ],
        (f) => {
            const contact = { type: f.type, label: f.label, value: f.value, link: f.link };
            if (i >= 0) data.contacts[i] = contact;
            else data.contacts.push(contact);
            saveData();
            renderContacts();
        }
    );
};

window.deleteContact = function (i) {
    if (confirm(`Remove this contact?`)) {
        data.contacts.splice(i, 1);
        saveData();
        renderContacts();
    }
};

// Add buttons
document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-add");
        if (type === "education") {
            openModal(
                "Add Education",
                [
                    { name: "period", label: "Period", value: "" },
                    { name: "degree", label: "Degree / Qualification", value: "" },
                    { name: "school", label: "School / College / University", value: "" },
                    { name: "desc", label: "Description", value: "", type: "textarea" },
                ],
                (f) => {
                    data.education.push({ period: f.period, degree: f.degree, school: f.school, desc: f.desc });
                    saveData();
                    renderEducation();
                }
            );
        } else if (type === "project") {
            editProject(-1);
        } else if (type === "skill") {
            openModal(
                "Add Skill",
                [{ name: "skill", label: "Skill Name", value: "" }],
                (f) => {
                    if (f.skill.trim()) {
                        data.skills.push(f.skill.trim());
                        saveData();
                        renderSkills();
                    }
                }
            );
        }
    });
});

// Edit toggle
document.getElementById("editToggle").addEventListener("click", () => {
    editMode = !editMode;
    applyEditMode();
});

// Nav scroll effect
window.addEventListener("scroll", () => {
    document.getElementById("nav").classList.toggle("scrolled", window.scrollY > 30);
});

// Mobile burger
document.getElementById("navBurger").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll("#navLinks a").forEach((a) => {
    a.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("open");
    });
});

// Helpers
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
}

function escapeAttr(str) {
    return String(str == null ? "" : str).replace(/"/g, "&quot;");
}

// Init
async function init() {

    data = await loadData();

    renderAll();

}

init();