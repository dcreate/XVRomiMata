/* =====================================================
   CONFIGURACIÓN DE LA INVITACIÓN
===================================================== */

const CONFIG = {

    nombre: "Helen Romina",

    fechaEvento: "2026-12-19T20:00:00",

    hashtag: "#XVHelen Romina",

    whatsapp:
        "5217851012456",

    mensajeWhatsApp:
        "Hola, confirmo mi asistencia a los XV de Helen Romina.",

    musica:
        "musica.mp3"

};


/* =====================================================
   APERTURA DE INVITACIÓN
===================================================== */

const opening =
    document.getElementById("opening");

const openInvitation =
    document.getElementById("openInvitation");

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


openInvitation.addEventListener(
    "click",
    () => {

        opening.classList.add("open");

        setTimeout(() => {

            opening.classList.add("hidden");

        }, 1800);


        /*
         Intentamos reproducir la música
         después de la interacción del usuario.
        */

        music.play()
            .then(() => {

                musicButton.textContent = "♫";

            })
            .catch(() => {

                musicButton.textContent = "♪";

            });

    }
);


/* =====================================================
   CONTROL DE MÚSICA
===================================================== */

musicButton.addEventListener(
    "click",
    () => {

        if (music.paused) {

            music.play();

            musicButton.textContent = "♫";

        } else {

            music.pause();

            musicButton.textContent = "♪";

        }

    }
);


/* =====================================================
   CUENTA REGRESIVA
===================================================== */

const eventDate =
    new Date(CONFIG.fechaEvento).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();

    const distance =
        eventDate - now;


    if (distance <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* =====================================================
   PARTÍCULAS
===================================================== */

const particlesContainer =
    document.getElementById("particles");


function createParticle() {

    const particle =
        document.createElement("span");

    particle.classList.add(
        "particle"
    );


    particle.style.left =
        Math.random() * 100 + "%";


    particle.style.animationDuration =
        (5 + Math.random() * 8) + "s";


    particle.style.animationDelay =
        Math.random() * 5 + "s";


    const size =
        2 + Math.random() * 4;


    particle.style.width =
        size + "px";


    particle.style.height =
        size + "px";


    particlesContainer.appendChild(
        particle
    );


    setTimeout(() => {

        particle.remove();

    }, 15000);

}


setInterval(
    createParticle,
    500
);


/* =====================================================
   GALERÍA
===================================================== */

const galleryItems =
    document.querySelectorAll(
        ".gallery-item img"
    );


const lightbox =
    document.getElementById("lightbox");


const lightboxImage =
    document.getElementById("lightboxImage");


const closeLightbox =
    document.getElementById("closeLightbox");


const previousImage =
    document.getElementById("previousImage");


const nextImage =
    document.getElementById("nextImage");


let currentImage =
    0;


const images =
    Array.from(galleryItems);


galleryItems.forEach(
    (image, index) => {

        image.addEventListener(
            "click",
            () => {

                currentImage =
                    index;

                showImage();

                lightbox.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }
);


function showImage() {

    lightboxImage.src =
        images[currentImage].src;

    lightboxImage.alt =
        images[currentImage].alt;

}


function closeGallery() {

    lightbox.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


closeLightbox.addEventListener(
    "click",
    closeGallery
);


lightbox.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeGallery();

        }

    }
);


nextImage.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        currentImage++;

        if (
            currentImage >=
            images.length
        ) {

            currentImage = 0;

        }

        showImage();

    }
);


previousImage.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        currentImage--;

        if (
            currentImage < 0
        ) {

            currentImage =
                images.length - 1;

        }

        showImage();

    }
);


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeGallery();

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextImage.click();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousImage.click();

        }

    }
);


/* =====================================================
   SWIPE PARA CELULAR
===================================================== */

let touchStartX = 0;
let touchEndX = 0;


lightbox.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    }
);


lightbox.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (
        Math.abs(difference) < 50
    ) {

        return;

    }


    if (
        difference > 0
    ) {

        nextImage.click();

    } else {

        previousImage.click();

    }

}


/* =====================================================
   ANIMACIONES AL HACER SCROLL
===================================================== */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: .15
        }
    );


document
    .querySelectorAll(
        ".family-card, .event-card, .gallery-item, .dress-card, .gift-box"
    )
    .forEach(
        element => {

            observer.observe(
                element
            );

        }
    );


/* =====================================================
   CONFIGURACIÓN AUTOMÁTICA
===================================================== */

document.querySelectorAll(
    ".opening-name, .hero-name, .final-name"
).forEach(
    element => {

        element.textContent =
            CONFIG.nombre;

    }
);


document.querySelector(
    ".hashtag-section h2"
).textContent =
    CONFIG.hashtag;


/* =====================================================
   WHATSAPP
===================================================== */

const whatsappButton =
    document.querySelector(
        ".rsvp-button"
    );


if (whatsappButton) {

    const encodedMessage =
        encodeURIComponent(
            CONFIG.mensajeWhatsApp
        );


    whatsappButton.href =
        `https://wa.me/${CONFIG.whatsapp}?text=${encodedMessage}`;

}