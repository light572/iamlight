// I AM LIGHT website
(function () {
  "use strict";
  var WA = "254745130626";
  document.documentElement.classList.add("js");

  // Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile menu
  var btn = document.getElementById("menuBtn");
  var links = document.getElementById("navLinks");
  if (btn && links) {
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Navbar shadow + back-to-top
  var nav = document.getElementById("navbar");
  var top = document.getElementById("toTop");
  function onScroll() {
    var s = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("scrolled", s > 10);
    if (top) top.classList.toggle("show", s > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (top) top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // Booking form -> WhatsApp
  var form = document.getElementById("bookForm");
  if (form) {
    var date = document.getElementById("bDate");
    if (date) date.min = new Date().toISOString().split("T")[0];
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("bName").value.trim();
      var err = document.getElementById("bError");
      if (!name) {
        err.textContent = "Please enter your name.";
        document.getElementById("bName").focus();
        return;
      }
      err.textContent = "";
      var topic = document.getElementById("bTopic").value;
      var d = document.getElementById("bDate").value;
      var t = document.getElementById("bTime").value;
      var note = document.getElementById("bNote").value.trim();
      var msg = "Hello, I would like to book a 30-minute session (KSh 1,000).\n\n" +
        "Name: " + name + "\n" +
        "Topic: " + topic + "\n" +
        "Preferred date: " + (d || "Flexible") + "\n" +
        "Preferred time: " + (t || "Flexible") +
        (note ? "\nNotes: " + note : "");
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  // Copy M-Pesa number
  var copy = document.getElementById("copyBtn");
  if (copy) {
    copy.addEventListener("click", function () {
      var num = document.getElementById("mpesaNum").textContent.trim();
      var msg = document.getElementById("copyMsg");
      function done(ok) { msg.textContent = ok ? "Number copied." : "Copy failed - please copy it manually."; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(num).then(function () { done(true); }, function () { done(false); });
      } else {
        done(false);
      }
    });
  }
})();
