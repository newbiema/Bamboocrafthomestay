const WHATSAPP_NUMBER = "+6287864725425";

const buildWhatsAppUrl = (message) => {
    const text = message && message.trim()
        ? message.trim()
        : "Hello Bamboo Craft Homestay, I want to book via WhatsApp.";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("siteHeader");
    const menuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle("nav-solid", window.scrollY > 24);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            const isOpen = !mobileMenu.classList.contains("hidden");
            mobileMenu.classList.toggle("hidden", isOpen);
            menuButton.setAttribute("aria-expanded", String(!isOpen));
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.add("hidden");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    document.querySelectorAll("[data-whatsapp-message]").forEach((link) => {
        link.setAttribute("href", buildWhatsAppUrl(link.dataset.whatsappMessage));
    });

    document.querySelectorAll("[data-whatsapp-form]").forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const message = [
                "Hello Bamboo Craft Homestay, I want to request a quote.",
                `Name: ${formData.get("name") || "-"}`,
                `Country: ${formData.get("country") || "-"}`,
                `Travel dates: ${formData.get("dates") || "-"}`,
                `Guests: ${formData.get("guests") || "-"}`,
                `Interested in: ${formData.get("interest") || "-"}`,
                `Message: ${formData.get("message") || "-"}`
            ].join("\n");

            window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
        });
    });

    const revealTargets = document.querySelectorAll("[data-reveal]");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealTargets.forEach((target) => observer.observe(target));
    } else {
        revealTargets.forEach((target) => target.classList.add("is-visible"));
    }
});
