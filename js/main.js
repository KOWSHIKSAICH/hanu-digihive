
/* =========================================
   HANU DIGIHIVE - MAIN JAVASCRIPT
   ========================================= */

document.documentElement.classList.add("js-ready");

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const primaryNav = document.getElementById("primaryNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const serviceLinks = document.querySelectorAll("[data-service]");
  const serviceSelect = document.getElementById("service");
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const currentYear = document.getElementById("currentYear");

  /* CURRENT YEAR */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* MOBILE NAVIGATION */
  function closeMenu() {
    if (!menuToggle || !primaryNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener("click", () => {
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isExpanded));
      menuToggle.setAttribute(
        "aria-label",
        isExpanded ? "Open navigation menu" : "Close navigation menu"
      );

      primaryNav.classList.toggle("is-open", !isExpanded);
      document.body.classList.toggle("menu-open", !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    document.addEventListener("click", (event) => {
      const isOpen = primaryNav.classList.contains("is-open");

      if (
        isOpen &&
        !primaryNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });
  }

  /* ACTIVE NAVIGATION LINK */
  const sections = document.querySelectorAll(
    "main section[id]"
  );

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const matches =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", matches);
          });
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  /* SERVICE CARD -> CONTACT FORM */
  serviceLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const selectedService = link.dataset.service;

      if (serviceSelect && selectedService) {
        const matchingOption = Array.from(serviceSelect.options).find(
          (option) => option.textContent.trim() === selectedService
        );

        if (matchingOption) {
          serviceSelect.value = matchingOption.value;
        }
      }
    });
  });

  /* REVEAL ANIMATIONS */
  const revealElements = document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* CONTACT FORM */
  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const formData = new FormData(contactForm);

      const name = String(formData.get("name") || "").trim();
      const business = String(formData.get("business") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const phone = String(formData.get("phone") || "").trim();
      const service = String(formData.get("service") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!name || !email || !service || !message) {
        formStatus.textContent =
          "Please complete all required fields.";
        return;
      }

      const subject = `Project Enquiry - ${service}`;

      const body = [
        "Hello HANU DIGIHIVE,",
        "",
        "I would like to enquire about your services.",
        "",
        `Name: ${name}`,
        `Business / Brand: ${business || "Not provided"}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Service: ${service}`,
        "",
        "Project Details:",
        message,
        "",
        "Thank you."
      ].join("\n");

      const mailtoUrl =
        "mailto:info@hanudigihive.com" +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      formStatus.textContent =
        "Opening your email app. Please review and send the prepared enquiry.";

      window.location.href = mailtoUrl;
    });
  }
});
