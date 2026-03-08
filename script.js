// ==================== //
//  Happy Messages        //
// ==================== //
const surprises = [
    { emoji: "🩷", message: "انتي أحلى حدا بحياتي يا هالة!" },
    { emoji: "🎀", message: "ربي يسعدك ويحفظك يا زعرة!" },
    { emoji: "✨", message: "قلبك أحلى من كل الورد!" },
    { emoji: "🌸", message: "الدنيا أحلى بوجودك فيها!" },
    { emoji: "💖", message: "يارب كل أيامك فرح وسعادة!" },
    { emoji: "🦋", message: "انتي نجمة تنورين كل مكان!" },
    { emoji: "🎂", message: "عيد ميلاد سعيد يا أغلى إنسانة!" },
    { emoji: "🌷", message: "ابتسامتك تسوى الدنيا وما فيها!" },
    { emoji: "💫", message: "كل عام وانتي الأجمل والأحلى!" },
    { emoji: "🩷", message: "يارب يكتب لك كل خير يا زعرتي!" },
    { emoji: "🎀", message: "انتي الشخص اللي يخلي الحياة حلوة!" },
    { emoji: "🌺", message: "ضحكتك أحلى هدية بالدنيا!" },
    { emoji: "💝", message: "يارب تحقق كل أحلامك يا قمر!" },
    { emoji: "🎉", message: "هذي السنة سنتك يا هالة!" },
    { emoji: "🥰", message: "انتي أحلى زعرة بالكون كله!" },
    { emoji: "👑", message: "انتي ملكة وتستاهلين أحلى الأشياء!" },
    { emoji: "🌟", message: "نورك يضوي كل مكان يا حلوة!" },
    { emoji: "🎁", message: "وجودك بحياتنا أحلى هدية!" },
    { emoji: "🫶", message: "يارب دايماً قلبك مرتاح وسعيد!" },
    { emoji: "💐", message: "تستاهلين كل ورد الدنيا يا زعرة!" },
    { emoji: "🩷", message: "الله يحفظك الي يارب ويديمك الي!" },
    { emoji: "🎀", message: "احلى بنوتة واحلى حنونة واحلى انثى!" },
    { emoji: "💕", message: "احلى صديقة ورفيقة درب بالدنيا!" },
    { emoji: "🌹", message: "يارب يملأ حياتك فرح ما ينتهي!" },
    { emoji: "✨", message: "كل سنة وانتي طيبة يا حبيبتي!" },
    { emoji: "🪽", message: "روحك الحلوة تخلي كل شي أحلى!" },
    { emoji: "💖", message: "انتي أحلى حدا عيد ميلاده اجا!" },
    { emoji: "🌸", message: "الدنيا ما تحلى إلا بوجودك فيها يا هالة!" },
];

let lastIndex = -1;
let clickCount = 0;

// ==================== //
//  Glitter Canvas       //
// ==================== //
const canvas = document.getElementById("glitterCanvas");
const ctx = canvas.getContext("2d");
let glitterParticles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createGlitterParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedY: Math.random() * 0.3 + 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random(),
        opacitySpeed: Math.random() * 0.02 + 0.005,
        hue: 330 + Math.random() * 30, // pink hues
    };
}

function initGlitter() {
    resizeCanvas();
    for (let i = 0; i < 80; i++) {
        glitterParticles.push(createGlitterParticle());
    }
}

function animateGlitter() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    glitterParticles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity += p.opacitySpeed;
        
        // Twinkle
        if (p.opacity > 1 || p.opacity < 0) p.opacitySpeed *= -1;
        
        // Reset when off screen
        if (p.y < -5) {
            p.y = canvas.height + 5;
            p.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${Math.max(0, Math.min(1, p.opacity)) * 0.4})`;
        ctx.fill();
        
        // Cross sparkle
        if (p.size > 1.5 && p.opacity > 0.6) {
            ctx.strokeStyle = `hsla(${p.hue}, 80%, 85%, ${p.opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x - p.size * 2, p.y);
            ctx.lineTo(p.x + p.size * 2, p.y);
            ctx.moveTo(p.x, p.y - p.size * 2);
            ctx.lineTo(p.x, p.y + p.size * 2);
            ctx.stroke();
        }
    });
    
    requestAnimationFrame(animateGlitter);
}

// ==================== //
//  Enter Site           //
// ==================== //
function enterSite() {
    const overlay = document.getElementById("introOverlay");
    const main = document.getElementById("mainContent");
    overlay.classList.add("hidden");
    main.classList.add("visible");
    
    createHeartsRain();
    setTimeout(setupScrollReveal, 300);
}

// ==================== //
//  Show Surprise        //
// ==================== //
function showSurprise() {
    const card = document.getElementById("messageCard");
    const messageEl = document.getElementById("cardMessage");
    const emojiEl = document.getElementById("cardEmoji");
    const btn = document.getElementById("magicBtn");

    let idx;
    do {
        idx = Math.floor(Math.random() * surprises.length);
    } while (idx === lastIndex && surprises.length > 1);
    lastIndex = idx;

    const surprise = surprises[idx];
    emojiEl.textContent = surprise.emoji;
    messageEl.textContent = surprise.message;

    card.classList.remove("active");
    void card.offsetWidth;
    card.classList.add("active");

    btn.style.transform = "scale(0.93)";
    setTimeout(() => { btn.style.transform = ""; }, 150);

    clickCount++;
    document.getElementById("clickCount").textContent = clickCount;

    createBurst(btn);
    createConfetti();
}

// ==================== //
//  Blow Candles         //
// ==================== //
let candlesBlown = false;
function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    const flames = document.querySelectorAll(".flame");
    const btn = document.getElementById("blowBtn");
    const wish = document.getElementById("blowWish");

    flames.forEach((flame, i) => {
        setTimeout(() => {
            flame.classList.add("blown");
            const smoke = document.createElement("div");
            smoke.className = "smoke";
            flame.parentElement.appendChild(smoke);
            setTimeout(() => smoke.remove(), 1000);
        }, i * 300);
    });

    setTimeout(() => {
        wish.textContent = "🎉 تمنّي أمنية حلوة يا زعرة! 🎉";
        btn.textContent = "✅ تم!";
        btn.classList.add("done");
        createConfetti();
        createConfetti();
        launchFireworks();
    }, flames.length * 300 + 200);
}

// ==================== //
//  Fireworks            //
// ==================== //
function launchFireworks() {
    const container = document.getElementById("fireworksContainer");
    const colors = ["#f472a8", "#ec4899", "#fbc8df", "#db2777", "#ff69b4", "#ffb6c1", "#ffd6e7"];
    
    for (let f = 0; f < 5; f++) {
        setTimeout(() => {
            const centerX = 15 + Math.random() * 70; // vw
            const centerY = 10 + Math.random() * 40; // vh
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Create particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement("div");
                particle.className = "firework-particle";
                
                const angle = (Math.PI * 2 / 20) * i;
                const distance = 40 + Math.random() * 80;
                const fx = Math.cos(angle) * distance;
                const fy = Math.sin(angle) * distance;
                
                particle.style.left = centerX + "vw";
                particle.style.top = centerY + "vh";
                particle.style.backgroundColor = color;
                particle.style.setProperty("--fx", fx + "px");
                particle.style.setProperty("--fy", fy + "px");
                particle.style.animationDelay = Math.random() * 0.1 + "s";
                particle.style.width = (3 + Math.random() * 4) + "px";
                particle.style.height = particle.style.width;
                
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 1500);
            }
        }, f * 400);
    }
}

// ==================== //
//  Open Gift Box        //
// ==================== //
let giftOpened = false;
function openGift() {
    if (giftOpened) return;
    giftOpened = true;
    
    const wrapper = document.getElementById("giftBoxWrapper");
    const message = document.getElementById("giftMessage");
    
    // Animate lid flying off
    const lid = document.getElementById("giftLid");
    lid.style.transform = "translateY(-60px) rotate(-15deg)";
    lid.style.opacity = "0";
    lid.style.transition = "all 0.5s ease";
    
    createBurstAtPoint(
        wrapper.getBoundingClientRect().left + wrapper.getBoundingClientRect().width / 2,
        wrapper.getBoundingClientRect().top + wrapper.getBoundingClientRect().height / 2
    );
    createConfetti();
    
    setTimeout(() => {
        wrapper.classList.add("opened");
        message.classList.add("open");
    }, 600);
}

// ==================== //
//  Open Love Letter     //
// ==================== //
function openLetter() {
    const envelope = document.getElementById("envelope");
    const paper = document.getElementById("letterPaper");
    
    envelope.classList.add("opened");
    paper.classList.add("open");
    createBurstAtPoint(
        envelope.getBoundingClientRect().left + envelope.getBoundingClientRect().width / 2,
        envelope.getBoundingClientRect().top + envelope.getBoundingClientRect().height / 2
    );
}

// ==================== //
//  Emoji Burst Effect   //
// ==================== //
function createBurst(element) {
    const rect = element.getBoundingClientRect();
    createBurstAtPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function createBurstAtPoint(centerX, centerY) {
    const emojis = ["🩷", "🎀", "✨", "💖", "🌸", "🦋"];

    for (let i = 0; i < 10; i++) {
        const burst = document.createElement("span");
        burst.className = "burst-emoji";
        burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = (Math.PI * 2 / 10) * i;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        burst.style.left = centerX + "px";
        burst.style.top = centerY + "px";
        burst.style.setProperty("--tx", tx + "px");
        burst.style.setProperty("--ty", ty + "px");

        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 1000);
    }
}

// ==================== //
//  Confetti Effect      //
// ==================== //
function createConfetti() {
    const colors = ["#f472a8", "#ec4899", "#fbc8df", "#ffd6e7", "#db2777", "#ffc8dd", "#ffb3d9", "#ff8ec4"];

    for (let i = 0; i < 35; i++) {
        const piece = document.createElement("div");
        piece.className = "confetti-piece";
        piece.style.left = Math.random() * 100 + "vw";
        piece.style.top = -10 + "px";
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (1.5 + Math.random() * 2) + "s";
        piece.style.animationDelay = Math.random() * 0.5 + "s";

        const size = 5 + Math.random() * 7;
        piece.style.width = size + "px";
        piece.style.height = size + "px";
        piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";

        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
    }
}

// ==================== //
//  Hearts Rain          //
// ==================== //
function createHeartsRain() {
    const container = document.getElementById("heartsRain");
    const hearts = ["🩷", "🎀", "💖", "💕", "🌸"];

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement("span");
        heart.className = "heart-drop";
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + "%";
        heart.style.fontSize = (0.8 + Math.random() * 1.2) + "rem";
        heart.style.animationDuration = (2 + Math.random() * 3) + "s";
        heart.style.animationDelay = Math.random() * 2 + "s";
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }
}

// ==================== //
//  Floating BG Emojis   //
// ==================== //
function createFloatingEmojis() {
    const container = document.getElementById("floatingEmojis");
    const emojis = ["🩷", "🎀", "✨", "🌸", "💖", "🦋", "🌷"];

    for (let i = 0; i < 18; i++) {
        const emoji = document.createElement("span");
        emoji.className = "floating-emoji";
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + "%";
        emoji.style.animationDuration = (10 + Math.random() * 15) + "s";
        emoji.style.animationDelay = Math.random() * 12 + "s";
        emoji.style.fontSize = (1 + Math.random() * 1.5) + "rem";
        container.appendChild(emoji);
    }
}

// ==================== //
//  Sparkle Cursor Trail //
// ==================== //
let sparkleThrottle = 0;
document.addEventListener("mousemove", (e) => {
    if (Date.now() - sparkleThrottle < 80) return;
    sparkleThrottle = Date.now();

    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    const sparkles = ["✨", "🩷", "🎀", "💖"];
    sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";

    document.getElementById("sparkleContainer").appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
});

// ==================== //
//  Live Countdown       //
// ==================== //
function updateLiveCountdown() {
    const now = new Date();
    const birthday = new Date(now.getFullYear(), 2, 9); // March 9

    if (now > birthday) {
        birthday.setFullYear(birthday.getFullYear() + 1);
    }

    const diff = birthday - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    animateNumber("cdDays", days);
    animateNumber("cdHours", hours);
    animateNumber("cdMinutes", minutes);
    animateNumber("cdSeconds", seconds);

    const countdownEl = document.getElementById("countdown");
    if (days === 0 && hours === 0 && minutes === 0) {
        countdownEl.textContent = "🎉 Today is the day! 🎉";
    } else if (days === 0) {
        countdownEl.textContent = "Today! 🩷";
    } else {
        countdownEl.textContent = `${days} days to go! 🎀`;
    }
}

function animateNumber(id, newVal) {
    const el = document.getElementById(id);
    if (!el) return;
    const current = parseInt(el.textContent);
    if (current !== newVal) {
        el.style.transform = "translateY(-5px)";
        el.style.opacity = "0.5";
        setTimeout(() => {
            el.textContent = newVal;
            el.style.transform = "translateY(0)";
            el.style.opacity = "1";
        }, 150);
    }
}

// ==================== //
//  Scroll Reveal        //
// ==================== //
function setupScrollReveal() {
    const sections = document.querySelectorAll(
        "#countdownSection, #cakeSection, #giftSection, #traitsSection, #messageSection, #letterSection, #wishesSection, .wish-card"
    );
    sections.forEach(s => s.classList.add("reveal"));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(s => observer.observe(s));
}

// ==================== //
//  Init                 //
// ==================== //
document.addEventListener("DOMContentLoaded", () => {
    createFloatingEmojis();
    updateLiveCountdown();
    initGlitter();
    animateGlitter();

    setInterval(updateLiveCountdown, 1000);
    window.addEventListener("resize", resizeCanvas);
});
