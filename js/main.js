/* HANU DIGIHIVE — interactions and enquiry form */
document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const serviceLinks = document.querySelectorAll("[data-service]");
  const serviceSelect = document.getElementById("service");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitButton = document.getElementById("submitButton");
  const currentYear = document.getElementById("currentYear");
  const whatsappFormLink = document.getElementById("whatsappFormLink");

  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const workVideos = document.querySelectorAll("#work .portfolio-video-frame video");
  workVideos.forEach(video => {
    video.addEventListener("play", () => {
      workVideos.forEach(otherVideo => {
        if (otherVideo !== video) otherVideo.pause();
      });
    });
  });

  function closeMenu() {
    if (!menuToggle || !primaryNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      menuToggle.setAttribute("aria-label", expanded ? "Open navigation menu" : "Close navigation menu");
      primaryNav.classList.toggle("is-open", !expanded);
      document.body.classList.toggle("menu-open", !expanded);
    });
    navLinks.forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
    document.addEventListener("click", event => {
      if (primaryNav.classList.contains("is-open") &&
          !primaryNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 850) closeMenu(); });
  }

  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));
  }

  serviceLinks.forEach(link => link.addEventListener("click", () => {
    const selected = link.dataset.service;
    if (serviceSelect && selected) {
      const option = Array.from(serviceSelect.options).find(item => item.textContent.trim() === selected);
      if (option) {
        serviceSelect.value = option.value || option.textContent;
        serviceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  }));

  const revealElements = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const marqueeTrack = document.querySelector(".intro-strip-inner");
  const marqueeGroup = marqueeTrack && marqueeTrack.querySelector(".intro-strip-group");
  if (marqueeTrack && marqueeGroup && !reduceMotion) {
    const setMarqueeSpeed = () => {
      marqueeTrack.style.setProperty("--marquee-duration", `${marqueeGroup.getBoundingClientRect().width / 36}s`);
    };
    setMarqueeSpeed();
    if ("ResizeObserver" in window) {
      new ResizeObserver(setMarqueeSpeed).observe(marqueeGroup);
    }
    window.addEventListener("resize", setMarqueeSpeed);
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -25px 0px" });
    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("is-visible"));
  }

  function getFormData() {
    const data = new FormData(contactForm);
    return {
      name: String(data.get("name") || "").trim(),
      business: String(data.get("business") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      service: String(data.get("service") || "").trim(),
      budget: String(data.get("budget") || "").trim(),
      timeline: String(data.get("timeline") || "").trim(),
      message: String(data.get("message") || "").trim()
    };
  }

  function enquiryMessage(d) {
    return [
      "Hi HANU DIGIHIVE, I'd like to discuss a project.",
      "",
      `Name: ${d.name}`,
      `Business / Brand: ${d.business || "Not provided"}`,
      `Email: ${d.email}`,
      `Phone: ${d.phone || "Not provided"}`,
      `Service: ${d.service}`,
      `Estimated budget: ${d.budget || "Not provided"}`,
      `Expected start: ${d.timeline || "Not provided"}`,
      "",
      "Project details:",
      d.message
    ].join("\n");
  }

  function updateWhatsAppLink() {
    if (!contactForm || !whatsappFormLink) return;
    const d = getFormData();
    const text = (d.name || d.service || d.message) ? enquiryMessage(d) : "Hi HANU DIGIHIVE, I'd like to discuss a project.";
    whatsappFormLink.href = `https://wa.me/916302149477?text=${encodeURIComponent(text)}`;
  }
  if (contactForm) contactForm.addEventListener("input", updateWhatsAppLink);
  if (contactForm) contactForm.addEventListener("change", updateWhatsAppLink);

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async event => {
      event.preventDefault();
      formStatus.className = "form-status";
      formStatus.textContent = "";

      if (!contactForm.reportValidity()) return;
      const d = getFormData();
      if (!d.name || !d.email || !d.service || !d.message || !document.getElementById("consent").checked) {
        formStatus.classList.add("error");
        formStatus.textContent = "Please complete all required fields and accept the privacy notice.";
        return;
      }

      /*
       * FormSubmit setup:
       * The endpoint below emails submissions to info@hanudigihive.com.
       * The inbox owner must activate FormSubmit using the confirmation email
       * received on the first submission. Replace this with your preferred
       * backend endpoint if you have one.
       */
      const endpoint = "https://formsubmit.co/ajax/info@hanudigihive.com";
      const payload = {
        _subject: `Website enquiry — ${d.service}`,
        _template: "table",
        _captcha: "true",
        name: d.name,
        business: d.business || "Not provided",
        email: d.email,
        phone: d.phone || "Not provided",
        service: d.service,
        budget: d.budget || "Not provided",
        timeline: d.timeline || "Not provided",
        message: d.message,
        consent: "Yes"
      };

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending enquiry…";
      }
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        });
        let result = {};
        try { result = await response.json(); } catch (_) {}
        if (!response.ok || result.success === "false" || result.success === false) {
          throw new Error("The form service did not accept the submission.");
        }
        formStatus.classList.add("success");
        formStatus.textContent = "Thank you. Your enquiry has been submitted. We’ll get back to you after reviewing the details.";
        contactForm.reset();
        updateWhatsAppLink();
      } catch (error) {
        formStatus.classList.add("error");
        formStatus.textContent = "We couldn’t confirm delivery. Please use the WhatsApp link below or email info@hanudigihive.com directly. If this is the first submission, activate FormSubmit from the confirmation email.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = 'Send Enquiry <span aria-hidden="true">↗</span>';
        }
      }
    });
  }
});
