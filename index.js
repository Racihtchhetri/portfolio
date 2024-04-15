var typed = new Typed('#element', {
    strings: [
        '<span style="color:red;">Web Develoooper...<img src="images/cross.svg" style="width: 50px;"></span>',
        '',
        '<span style="color:red;">Web Divloper...<img src="images/cross.svg" style="width: 50px;"></span>',
        '',
        '<span style="color: #87fd00;">Web Developer...<img src="images/correct.svg" style="width: 50px;"></span>'
    ],
    typeSpeed: 70,
    backSpeed: 50, // corrected from backsbackSpeed
    startDelay: 1000,
});




const cursor = document.getElementById("cursor");
const amount = 20;
const sineDots = Math.floor(amount * 0.3);
const width = 26;
const idleTimeout = 150;
let lastFrame = 0;
let mousePosition = { x: 0, y: 0 };
let dots = [];
let timeoutID;
let idle = false;



class Dot {
    constructor(index = 0) {
        this.index = index;
        this.anglespeed = 0.05;
        this.x = 0;
        this.y = 0;
        this.scale = 1 - 0.05 * index;
        this.range = width / 2 - width / 2 * this.scale + 2;
        this.limit = width * 0.75 * this.scale;
        this.element = document.createElement("span");
        TweenMax.set(this.element, { scale: this.scale });
        cursor.appendChild(this.element);
    }

    lock() {
        this.lockX = this.x;
        this.lockY = this.y;
        this.angleX = Math.PI * 2 * Math.random();
        this.angleY = Math.PI * 2 * Math.random();
    }

    draw(delta) {
        if (!idle || this.index <= sineDots) {
            TweenMax.set(this.element, { x: this.x, y: this.y });
        } else {
            this.angleX += this.anglespeed;
            this.angleY += this.anglespeed;
            this.y = this.lockY + Math.sin(this.angleY) * this.range;
            this.x = this.lockX + Math.sin(this.angleX) * this.range;
            TweenMax.set(this.element, { x: this.x, y: this.y });
        }
    }
}

class Circle {
    constructor(id) {
        const el = document.getElementById(id);
        const parent = el.parentElement;
        parent.removeChild(el);
        const chars = el.innerText.split("");
        chars.push(" ");
        for (let i = 0; i < chars.length; i++) {
            const span = document.createElement("span");
            span.innerText = chars[i];
            span.className = `char${i + 1}`;
            parent.appendChild(span);
        }
    }
}

function init() {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    new Circle("circle-content");
    lastFrame += new Date();
    buildDots();
    render();
}

function startIdleTimer() {
    timeoutID = setTimeout(goInactive, idleTimeout);
    idle = false;
}

function resetIdleTimer() {
    clearTimeout(timeoutID);
    startIdleTimer();
}

function goInactive() {
    idle = true;
    for (let dot of dots) {
        dot.lock();
    }
}

function buildDots() {
    for (let i = 0; i < amount; i++) {
        let dot = new Dot(i);
        dots.push(dot);
    }
}

const onMouseMove = event => {
    mousePosition.x = event.clientX - width / 2;
    mousePosition.y = event.clientY - width / 2;
    resetIdleTimer();
};

const onTouchMove = () => {
    mousePosition.x = event.touches[0].clientX - width / 2;
    mousePosition.y = event.touches[0].clientY - width / 2;
    resetIdleTimer();
};

const render = timestamp => {
    const delta = timestamp - lastFrame;
    positionCursor(delta);
    lastFrame = timestamp;
    requestAnimationFrame(render);
};

const positionCursor = delta => {
    let x = mousePosition.x;
    let y = mousePosition.y;
    dots.forEach((dot, index, dots) => {
        let nextDot = dots[index + 1] || dots[0];
        dot.x = x;
        dot.y = y;
        dot.draw(delta);
        if (!idle || index <= sineDots) {
            const dx = (nextDot.x - dot.x) * 0.35;
            const dy = (nextDot.y - dot.y) * 0.35;
            x += dx;
            y += dy;
        }
    });
};

init();


// dynamic active class
$(document).ready(function(){
$(".nav-item").on("click", function() {
    // Remove active class from all links
    $(".nav-item .nav-link").removeClass("active");

    // Add active class to the clicked link
    $(this).find(".nav-link").addClass("active");
});
});

//theme code

$(document).ready(function() {
// Check localStorage for previously chosen theme
var theme = localStorage.getItem('theme');
if (theme === 'dark') {
    $('#color_mode').prop('checked', true);
    colorModePreview(true);
} else {
    $('#color_mode').prop('checked', false);
    colorModePreview(false);
}

// Change theme on checkbox change
$("#color_mode").on("change", function () {
    colorModePreview(this.checked);
    // Store the theme choice in localStorage
    localStorage.setItem('theme', this.checked ? 'dark' : 'light');
});

// Toggle mode when clicking on the inner span
$(".btn-color-mode-switch-inner").on("click", function() {
    $("#color_mode").prop("checked", !$("#color_mode").prop("checked")).change();
});
});

function colorModePreview(isDark) {
if(isDark){
    $('body').addClass('dark-preview');
    $('body').removeClass('white-preview');
} else {
    $('body').addClass('white-preview');
    $('body').removeClass('dark-preview');
}
}