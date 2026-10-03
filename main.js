(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Footer year and a "Last login" line in macOS Terminal format
  var now = new Date();
  document.getElementById("year").textContent = now.getFullYear();
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  document.getElementById("lastlogin").textContent =
    days[now.getDay()] + " " + months[now.getMonth()] + " " + String(now.getDate()).padStart(2, " ") + " " +
    pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());

  // Intro: type "welcome" after a short pause, like direction.mov
  var typed = document.querySelector(".typed");
  var intro = document.getElementById("top");
  var word = typed.getAttribute("data-type");

  function finishIntro() {
    typed.textContent = word;
    intro.classList.remove("booting");
    var cursor = intro.querySelector(".cursor");
    if (cursor) cursor.remove();
    shell.hidden = false;
    if (window.matchMedia("(hover: hover)").matches) input.focus({ preventScroll: true });
  }

  var shell = document.getElementById("shell");

  if (reduceMotion) {
    setTimeout(finishIntro, 0); // after the shell elements below are looked up
  } else {
    intro.classList.add("booting");
    typed.textContent = "";
    var i = 0;
    setTimeout(function tick() {
      typed.textContent = word.slice(0, ++i);
      if (i < word.length) setTimeout(tick, 90 + Math.random() * 90);
      else setTimeout(finishIntro, 350);
    }, 900);
  }

  // Interactive shell
  var form = document.getElementById("cli");
  var input = document.getElementById("cmd");
  var history = document.getElementById("history");
  var past = [];
  var pos = 0;

  var sections = ["whoami", "experience", "projects", "skills", "education", "accolades", "contact"];
  var links = {
    resume: "MartinQuintanaResume.pdf",
    github: "https://www.github.com/Martyqqq",
    linkedin: "https://www.linkedin.com/in/martin-quintana",
    gallery: "https://gallery.martinqj.com"
  };

  function print(text) {
    var p = document.createElement("p");
    p.className = "line";
    p.textContent = text;
    history.appendChild(p);
  }

  function goTo(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }

  var commands = {
    help: function () {
      print("available commands:\n" +
        "  " + sections.join("  ") + "\n" +
        "  resume  github  linkedin  gallery\n" +
        "  ls  date  echo  history  clear  help");
    },
    ls: function () {
      print("experience.log  education.txt  skills.txt  accolades  contact.sh  projects/  MartinQuintanaResume.pdf");
    },
    date: function () { print(new Date().toString()); },
    echo: function (args) { print(args.join(" ")); },
    history: function () { past.forEach(function (c, n) { print(String(n + 1).padStart(4, " ") + "  " + c); }); },
    clear: function () { history.innerHTML = ""; },
    sudo: function () { print("martin is not in the sudoers file. This incident will be reported."); },
    exit: function () { print("logout\n[Process completed] ...just kidding, thanks for visiting."); }
  };
  sections.forEach(function (s) {
    commands[s] = function () { print("-> " + s); goTo(s); };
  });
  commands.cat = function (args) {
    var name = (args[0] || "").replace(/\.(txt|log|sh)$/, "");
    if (sections.indexOf(name) !== -1) commands[name]();
    else print("cat: " + (args[0] || "") + ": No such file or directory");
  };
  commands.cd = function (args) {
    var name = (args[0] || "").replace(/\/$/, "");
    if (sections.indexOf(name) !== -1) commands[name]();
    else if (!name || name === "~") goTo("top");
    else print("cd: no such file or directory: " + name);
  };
  Object.keys(links).forEach(function (k) {
    commands[k] = function () { print("opening " + links[k] + " ..."); window.open(links[k], "_blank", "noopener"); };
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var raw = input.value.trim();
    input.value = "";
    print("MacBook-Pro ~ % " + raw);
    if (!raw) return;
    past.push(raw);
    pos = past.length;
    var parts = raw.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    if (commands.hasOwnProperty(cmd)) commands[cmd](parts.slice(1));
    else print("zsh: command not found: " + parts[0] + "  (try 'help')");
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" && pos > 0) { input.value = past[--pos]; e.preventDefault(); }
    else if (e.key === "ArrowDown") { pos = Math.min(past.length, pos + 1); input.value = past[pos] || ""; e.preventDefault(); }
    else if (e.key === "Tab" && input.value) {
      var match = Object.keys(commands).filter(function (c) { return c.indexOf(input.value) === 0; });
      if (match.length === 1) { input.value = match[0]; e.preventDefault(); }
    }
  });

  // Clicking empty terminal space focuses the prompt, like a real terminal
  document.querySelector(".screen").addEventListener("click", function (e) {
    if (!shell.hidden && e.target === e.currentTarget && !window.getSelection().toString()) input.focus({ preventScroll: true });
  });
})();
