const STORAGE = {
  calls: "voiceops.calls",
  settings: "voiceops.settings",
  theme: "voiceops.theme"
};

const state = {
  calls: loadJson(STORAGE.calls, []),
  settings: loadJson(STORAGE.settings, { endpoint: "", agentId: "" })
};

window.addEventListener("DOMContentLoaded", init);

function init() {
  const els = getEls();
  bindEvents(els);
  hydrateTheme();
  hydrateSettings(els);
  renderActivity(els);
  renderMetrics(els);
}

function getEls() {
  return {
    tabs: document.querySelectorAll(".tab"),
    panels: document.querySelectorAll(".panel"),
    callForm: document.getElementById("callForm"),
    settingsForm: document.getElementById("settingsForm"),
    themeToggle: document.getElementById("themeToggle"),
    clearLog: document.getElementById("clearLog"),
    activityList: document.getElementById("activityList"),
    activityTemplate: document.getElementById("activityTemplate"),
    agentState: document.getElementById("agentState"),
    totalCalls: document.getElementById("totalCalls"),
    successCalls: document.getElementById("successCalls"),
    failedCalls: document.getElementById("failedCalls"),
    successRate: document.getElementById("successRate"),
    successBar: document.getElementById("successBar"),
    apiEndpoint: document.getElementById("apiEndpoint"),
    agentId: document.getElementById("agentId"),
    contactName: document.getElementById("contactName"),
    phoneNumber: document.getElementById("phoneNumber"),
    topic: document.getElementById("topic"),
    openingLine: document.getElementById("openingLine")
  };
}

function bindEvents(els) {
  els.tabs.forEach((tab) => {
    tab.addEventListener("click", () => switchPanel(els, tab.dataset.target));
  });

  els.themeToggle.addEventListener("click", toggleTheme);

  els.callForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      contactName: els.contactName.value.trim(),
      phoneNumber: els.phoneNumber.value.trim(),
      topic: els.topic.value,
      openingLine: els.openingLine.value.trim()
    };

    if (!payload.phoneNumber.startsWith("+")) {
      setStatus(els, "error", "Invalid Number");
      alert("Phone number must start with +countrycode");
      return;
    }

    setStatus(els, "active", "Calling...");

    let result;
    try {
      result = await requestCall(payload);
    } catch {
      result = { ok: false, message: "Network issue" };
    }

    state.calls.unshift({
      ...payload,
      status: result.ok ? "success" : "failed",
      message: result.message
    });
    state.calls = state.calls.slice(0, 30);
    localStorage.setItem(STORAGE.calls, JSON.stringify(state.calls));

    renderActivity(els);
    renderMetrics(els);
    setStatus(els, result.ok ? "idle" : "error", result.ok ? "Idle" : "Call Error");

    if (result.ok) {
      els.callForm.reset();
    }
  });

  els.settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.settings.endpoint = els.apiEndpoint.value.trim();
    state.settings.agentId = els.agentId.value.trim();
    localStorage.setItem(STORAGE.settings, JSON.stringify(state.settings));
    alert("Settings saved");
  });

  els.clearLog.addEventListener("click", () => {
    state.calls = [];
    localStorage.removeItem(STORAGE.calls);
    renderActivity(els);
    renderMetrics(els);
  });
}

function switchPanel(els, panelId) {
  els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.target === panelId));
  els.panels.forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
}

async function requestCall(payload) {
  if (!state.settings.endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ok: true, message: "Demo mode: simulated successful call" };
  }

  const response = await fetch(state.settings.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      agentId: state.settings.agentId || null
    })
  });

  if (!response.ok) {
    return { ok: false, message: `Request failed (${response.status})` };
  }

  const json = await response.json().catch(() => ({}));
  return { ok: true, message: json.message || "Call queued" };
}

function renderActivity(els) {
  els.activityList.innerHTML = "";
  if (!state.calls.length) {
    els.activityList.innerHTML = "<li class='hint'>No calls yet. Start with New Call.</li>";
    return;
  }

  state.calls.forEach((item) => {
    const node = els.activityTemplate.content.cloneNode(true);
    node.querySelector(".entry-name").textContent = `${item.contactName} (${item.phoneNumber})`;
    node.querySelector(".entry-detail").textContent = `${topicLabel(item.topic)} - ${item.message}`;
    const status = node.querySelector(".entry-status");
    status.textContent = item.status.toUpperCase();
    status.classList.add(item.status);
    els.activityList.appendChild(node);
  });
}

function renderMetrics(els) {
  const total = state.calls.length;
  const success = state.calls.filter((item) => item.status === "success").length;
  const failed = total - success;
  const rate = total > 0 ? Math.round((success / total) * 100) : 0;

  els.totalCalls.textContent = String(total);
  els.successCalls.textContent = String(success);
  els.failedCalls.textContent = String(failed);
  els.successRate.textContent = `${rate}%`;
  els.successBar.style.width = `${rate}%`;
}

function setStatus(els, type, text) {
  const classMap = {
    idle: "status status-idle",
    active: "status status-active",
    error: "status status-error"
  };
  els.agentState.className = classMap[type] || classMap.idle;
  els.agentState.textContent = text;
}

function hydrateSettings(els) {
  els.apiEndpoint.value = state.settings.endpoint || "";
  els.agentId.value = state.settings.agentId || "";
}

function hydrateTheme() {
  if (localStorage.getItem(STORAGE.theme) === "dark") {
    document.body.classList.add("dark");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(STORAGE.theme, document.body.classList.contains("dark") ? "dark" : "light");
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function topicLabel(topic) {
  const labels = {
    "tech-news": "Tech News",
    "product-update": "Product Update",
    "follow-up": "Follow-up"
  };
  return labels[topic] || topic;
}
