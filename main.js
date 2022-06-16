const body = document.body;
const main = document.getElementById("main");

let sx = 0,
  sy = 0;
let dx = sx,
  dy = sy;

body.style.height = main.clientHeight + "px";

main.style.position = "fixed";
main.style.top = 0;
main.style.left = 0;

window.addEventListener("scroll", easeScroll);

function easeScroll() {
  sx = window.pageXOffset;
  sy = window.pageYOffset;
}

window.requestAnimationFrame(render);

function render() {
  dx = li(dx, sx, 0.09);
  dy = li(dy, sy, 0.09);

  dx = Math.floor(dx * 100) / 100;
  dy = Math.floor(dy * 100) / 100;

  main.style.transform = `translate3d(-${dx}px, -${dy}px, 0px)`;

  window.requestAnimationFrame(render);
}

function li(a, b, n) {
  return (1 - n) * a + n * b;
}

const button = document.querySelector("#btn");
const menu = document.querySelector(".menu");

let navLinks = Array.from(document.querySelectorAll(".nav-link"));

button.addEventListener("click", openMenu);

button.onclick = () => {
  if (button.textContent === "menu") {
    button.textContent = "close";
    button.style.color = "grey";
  } else {
    button.textContent = "menu";
    button.style.color = "grey";
  }
};

function openMenu() {
  menu.classList.toggle("active");

  setTimeout(() => {
    navLinks.forEach((link, idx) => {
      setTimeout(() => {
        link.classList.toggle("activeN");
      }, idx * 100);
    });
  }, 1000);
}


const svg = document.querySelector(".svg");
const clickTarget = document.getElementById("click-target");


let toggle = false;

function makeBackgroundBlack() {
  toggle
    ? (body.classList.add("light"), body.classList.remove("dark"))
    : (body.classList.add("dark"), body.classList.remove("light"));

  toggle = !toggle;
}

function makeBackgroundWhite() {
  toggle
    ? (body.classList.add("dark"), body.classList.remove("light"))
    : (body.classList.add("light"), body.classList.remove("dark"));

  toggle = !toggle;
}

clickTarget.addEventListener("mouseenter", makeBackgroundBlack, false);
clickTarget.addEventListener("mouseleave", makeBackgroundBlack, false);

clickTarget.addEventListener("click", makeBackgroundWhite, false);

clickTarget.addEventListener("click", function () {
  makeBackgroundBlack();
  makeBackgroundWhite();
  clickTarget.removeEventListener("mouseleave", makeBackgroundBlack, false);
  clickTarget.addEventListener("mouseleave", makeBackgroundBlack, false);
  if (clickTarget.textContent === "Light") {
    clickTarget.textContent = "Dark";
  } else {
    clickTarget.textContent = "Light";
  }
});

const findMystate = () => {
  const status = document.querySelector(".status");
  const statusTwo = document.querySelector(".status_");

  const succes = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
      .then((res) => res.json())
      .then((data) => {
        status.textContent = data.countryName;
        statusTwo.textContent = data.city;
      });

    const time = document.getElementById("time");
    time.innerHTML = formatAMPM(new Date());

    function formatAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }
  };
  const error = () => {
    statusTwo.textContent = `tbilisi`;
    status.textContent = `georgia`;
  };

  navigator.geolocation.getCurrentPosition(succes, error);
};

let back = document.querySelector(".pre_wrap");
let num = document.querySelector("#count");

setTimeout(() => {
  back.style.opacity = "0";
  back.style.zIndex = "-999999999999";
  num.style.opacity = "0";
  animation()
  findMystate()
  
}, 1000);


const imageAddresses = [
  "images/1.webp",
  "images/2.webp",
  "images/3.webp",
  "images/4.webp",
  "images/5.webp",
  "images/6.webp",
  "images/7.webp",
  "images/8.webp",
  "images/9.webp",
  "images/10.webp",
  "images/11.webp",
  "images/12.webp",
  "images/13.webp",
  "images/14.webp",
  "images/15.webp",
  "images/16.webp",
  "images/17.webp",
  "images/18.webp",
  "images/19.webp",
  "images/20.webp",
  "images/21.webp",
  "images/22.webp",
  "images/23.webp",
  "images/24.webp",
  "images/25.webp",
  "images/26.webp"
];

const init = () => {
  const node = document.createElement("section");
  node.classList.add("image-group");

  document.firstElementChild.insertBefore(node, document.body);
  return node;
};

const createToast = (imageIndex) => {
  const node = document.createElement("output");

  node.classList.add("image-toast");
  node.style.backgroundImage = `url('${imageAddresses[imageIndex]}')`;

  return node;
};

const addToast = (toast) => {
  const { matches: motionOK } = window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
  );

  Toaster.children.length && motionOK
    ? flipToast(toast)
    : Toaster.appendChild(toast);
};

const Toast = (imageIndex) => {
  let toast = createToast(imageIndex);
  addToast(toast);

  return new Promise(async (resolve, reject) => {
    await Promise.allSettled(
      toast.getAnimations().map((animation) => animation.finished)
    );
    Toaster.removeChild(toast);
    resolve();
  });
};

const flipToast = (toast) => {
  const first = Toaster.offsetWidth;

  Toaster.appendChild(toast);

  const last = Toaster.offsetWidth;

  const invert = last - first;

  const animation = Toaster.animate(
    [{ transform: `translateX(${invert}px)` }, { transform: "translateX(0)" }],
    {
      duration: 150,
      easing: "ease-out",
    }
  );

  animation.startTime = document.timeline.currentTime;
};

const Toaster = init();

const allImages = document.querySelectorAll(".image_hover");

allImages.forEach((img) => {
  img.addEventListener("mouseenter", () => {
    Toast(img.dataset.imageIndex);
  });
});

const heading = document.querySelectorAll('h1')

const animation = () => {
  const tl = gsap.timeline({defaults:{duration: 1}})
  tl.from(heading, {x: 250, stagger: 0.1, opacity: 0, ease: "power3.out"})
}

gsap.from('.image_wrap', {
  scrollTrigger: {
    trigger: '.image_wrap',
    start: "top bottom",
  },
  y: 200,
  opacity:0,
  ease: "expo.out",
  stagger: .1,
  duration: 1.5
});
