const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);

// Mobile navigation
$("#menu")?.addEventListener("click", () => {
  const nav = $("#nav");
  nav.classList.toggle("open");
  $("#menu").classList.toggle("active");
});
$$(".nav a").forEach((link) =>
  link.addEventListener("click", () => {
    $("#nav")?.classList.remove("open");
    $("#menu")?.classList.remove("active");
  }),
);

// Product filtering
$$(".filters button").forEach((btn) =>
  btn.addEventListener("click", () => {
    $$(".filters button").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    $$(".product-card").forEach((card) =>
      card.classList.toggle("hide", f !== "all" && card.dataset.category !== f),
    );
  }),
);

// Quote modal
const modal = $("#quoteModal");
function openQuote(product = "Custom Apparel") {
  if (!modal) return;
  $("#quoteProduct").value = product;
  modal.classList.add("show");
}
function closeQuote() {
  modal?.classList.remove("show");
}
$$(".quote-btn").forEach((b) =>
  b.addEventListener("click", () =>
    openQuote(b.dataset.product || "Custom Apparel"),
  ),
);
$("#closeModal")?.addEventListener("click", closeQuote);
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeQuote();
});

// FAQ
$$(".faq-item button").forEach((btn) =>
  btn.addEventListener("click", () => {
    const item = btn.parentElement,
      open = item.classList.contains("open");
    $$(".faq-item").forEach((x) => x.classList.remove("open"));
    if (!open) item.classList.add("open");
  }),
);


$("#quoteForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert(
    "Quote request submitted. Connect this form to your backend/email/WhatsApp service for real submissions.",
  );
  closeQuote();
  e.target.reset();
});

// Customizer
const shirt = $("#shirt"),
  color = $("#shirtColor"),
  text = $("#designText"),
  preview = $("#textPreview"),
  upload = $("#logoUpload"),
  logo = $("#logoPreview"),
  product = $("#designerProduct"),
  price = $("#price");
const prices = {
  "T-Shirt": 850,
  Polo: 1100,
  Hoodie: 1850,
  Sweatshirt: 1650,
  Jersey: 1500,
};
color?.addEventListener("input", () => {
  shirt.style.background = color.value;
});
text?.addEventListener("input", () => {
  preview.textContent = text.value || "YOUR BRAND";
});
upload?.addEventListener("change", () => {
  const file = upload.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    logo.src = e.target.result;
    logo.style.display = "block";
    preview.style.display = "none";
  };
  reader.readAsDataURL(file);
});
product?.addEventListener(
  "change",
  () => (price.textContent = "Rs. " + prices[product.value].toLocaleString()),
);
$("#designerQuote")?.addEventListener("click", () => openQuote(product.value));

// Smooth page transitions between internal pages.
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  const url = link.getAttribute("href");
  if (
    !url ||
    url.startsWith("#") ||
    url.startsWith("http") ||
    url.startsWith("tel:") ||
    url.startsWith("mailto:") ||
    link.target === "_blank"
  )
    return;
  if (url.endsWith(".html") || url === "index.html") {
    e.preventDefault();
    document.body.classList.add("page-leaving");
    setTimeout(() => (window.location.href = url), 180);
  }
});

// Scroll reveal
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document
  .querySelectorAll(
    ".heading,.product-card,.service,.step,.split-img,.split-copy,.detail-img,.detail-copy,.form-copy,.contact-form,.customizer-copy,.designer,.value,.cta",
  )
  .forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = Math.min((i % 4) * 70, 210) + "ms";
    revealObserver.observe(el);
  });

// Lazy-load remote images after the initial page has become interactive.
document.querySelectorAll("img").forEach((img) => {
  if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
});

// Escape closes overlays.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeQuote();
    $("#nav")?.classList.remove("open");
    $("#menu")?.classList.remove("active");
  }
});

// function sendEmail(event) {
//     event.preventDefault();

//     emailjs.send("service_y1crlfk", "template_yaejfco", {
//         name: document.getElementById("name").value,
//         phone: document.getElementById("phone").value,
//         email: document.getElementById("email").value,
//         service: document.querySelector("select").value,
//         company: document.getElementById("company").value,
//         message: document.querySelector("textarea").value
//     })
//     .then(function () {
//         document.getElementById("formMessage").textContent =
//             "Your request has been sent successfully!";
//         document.getElementById("contactForm").reset();
//     })
//     .catch(function () {
//         document.getElementById("formMessage").textContent =
//             "Failed to send your request. Please try again.";
//     });
// }

// Initialize EmailJS
emailjs.init("EjF6AUkzwiLHjh3lS");

function sendEmail(event) {
    event.preventDefault();

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    emailjs.send("service_y1crlfk", "template_yaejfco", {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        service: form.querySelector("select").value,
        company: document.getElementById("company").value,
        message: form.querySelector("textarea").value
    })
    .then(function () {
        formMessage.textContent = "Your request has been sent successfully!";
        form.reset();
    })
    .catch(function (error) {
        console.error(error);
        formMessage.textContent = "Failed to send your request. Please try again.";
    });
}
