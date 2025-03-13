document.addEventListener("DOMContentLoaded", function () {
    const headerHeight = document.querySelector("header").offsetHeight;
    const slidewrap = document.querySelector(".slidewrap");
    const slidescnt = document.querySelectorAll(".slide").length;
    const slideContainer = document.querySelector(".slides");
    const slideWidth = slidewrap.offsetWidth;
    let currentSlide = 0;

    
    function goToSlide(index) {
        currentSlide = index;
        slideContainer.style.transition = 'transform 0.5s ease';
        slideContainer.style.transform = `translateX(-${slideWidth * currentSlide}px)`;

        document.querySelectorAll(".pagination li").forEach((dot, idx) => {
            dot.classList.toggle("act", idx === index);
        });
    }

    function createPagination() {
        const pagination = document.createElement("div");
        pagination.className = "pagination";
        for (let i = 0; i < slidescnt; i++) {
            const li = document.createElement("li");
            li.classList.toggle("act", i === 0);
            li.addEventListener("click", () => goToSlide(i));
            pagination.appendChild(li);
        }
        slidewrap.appendChild(pagination);
    }

    function createButtons() {
        const leftBtn = document.createElement("div");
        leftBtn.className = "leftbtn btn";
        leftBtn.textContent = "◀";
        leftBtn.addEventListener("click", () => {
            const index = (currentSlide - 1 + slidescnt) % slidescnt;
            goToSlide(index);
        });

        const rightBtn = document.createElement("div");
        rightBtn.className = "rightbtn btn";
        rightBtn.textContent = "▶";
        rightBtn.addEventListener("click", () => {
            const index = (currentSlide + 1) % slidescnt;
            goToSlide(index);
        });

        slidewrap.appendChild(leftBtn);
        slidewrap.appendChild(rightBtn);
    }

    function autoSlide() {
        setInterval(() => {
            const index = (currentSlide + 1) % slidescnt;
            goToSlide(index);
        }, 3000);
    }

    createPagination();
    createButtons();
    autoSlide();

    document.querySelectorAll("nav ul li a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            const offsetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        });
    });

    setEnglish();

    document.getElementById('korean-btn').addEventListener('click', function () {
        setKorean();
    });

    document.getElementById('english-btn').addEventListener('click', function () {
        setEnglish();
    });

    document.querySelectorAll(".slide a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const message = this.getAttribute("data-message");
            if (confirm(message)) {
                window.location.href = this.href;
            }
        });
    });

    function typeEffectWithLineBreak(text, element) {
        let i = 0;
        element.innerHTML = '';
        const caret = document.createElement('span');
        caret.className = 'caret';
        element.appendChild(caret);

        function typing() {
            if (i < text.length) {
                if (text.charAt(i) === '\n') {
                    caret.before(document.createElement('br'));
                } else {
                    caret.before(text.charAt(i));
                }
                i++;
                setTimeout(typing, 100);
            }
        }
        typing();
    }

    function setTypingEffectText(text) {
        const homeQuoteElement = document.getElementById('home-quote');
        typeEffectWithLineBreak(text, homeQuoteElement);
    }

    function isMobile() {
        return window.innerWidth <= 1000;
    }

    function setKorean() {
        const koreanText = isMobile() 
            ? "절망을 위하여 희망을 위해\n개발하는 권혁진입니다."
            : "절망을 위하여 희망을 위해 개발하는 권혁진입니다.";
        typeEffectWithLineBreak(koreanText, document.getElementById('home-quote'));

        document.title = "권혁진의 포트폴리오";
        document.getElementById('menu-home').textContent = "메인화면";
        document.getElementById('menu-about').textContent = "자기소개";
        document.getElementById('menu-skills').textContent = "스킬";
        document.getElementById('menu-experience').textContent = "경력";
        document.getElementById('menu-contact').textContent = "연락처";

        document.getElementById('about-title').textContent = "자기소개";
        document.getElementById('name').textContent = "권혁진";
        document.getElementById('intro-1').innerHTML = "안녕하세요.<div class='spacing'></div>절망을 위하여 희망을 위해 개발하는 대학생 권혁진 입니다.";
        document.getElementById('intro-2').innerHTML = "실패나 포기는 제 사전에 존재하지 않고<div class='spacing'></div>무엇이든지 더 좋은 방법을 위해 생각하며<div class='spacing'></div>한 발자국 더 앞으로 나아가기 위해<div class='spacing'></div>항상 최선을 다하고 있습니다.";
        document.getElementById('intro-3').textContent = "감사합니다!";

        document.getElementById('skills-title').textContent = "스킬";
        updateSkillsKorean();

        document.getElementById('experience-title').textContent = "경력 [ 주요 ]";
        document.getElementById('contact-title').textContent = "연락처";

        updateContactKorean();

        document.getElementById('footer-left').textContent = "Copyright © 2024 권혁진의 포트폴리오";
        document.getElementById('footer-right').textContent = "제작자 : HopeProject.Dev";
    }

    function setEnglish() {
        const englishText = isMobile()
            ? "Developing for despair,\nfor hope - KevinKweon"
            : "Developing for despair, for hope - KevinKweon";
        typeEffectWithLineBreak(englishText, document.getElementById('home-quote'));

        document.title = "Kevin's Portfolio";
        document.getElementById('menu-home').textContent = "Home";
        document.getElementById('menu-about').textContent = "About Me";
        document.getElementById('menu-skills').textContent = "Skills";
        document.getElementById('menu-experience').textContent = "Experience";
        document.getElementById('menu-contact').textContent = "Contact";

        document.getElementById('about-title').textContent = "About Me";
        document.getElementById('name').textContent = "Kevin Kweon";
        document.getElementById('intro-1').innerHTML = "Hi!<div class='spacing'></div>I'm Kevin Kweon, a university student developing<div class='spacing'></div>for despair and for hope.";
        document.getElementById('intro-2').innerHTML = "Failure or giving up does not exist in my dictionary.<div class='spacing'></div>I always strive to think of better solutions<div class='spacing'></div>and take one more step forward.";
        document.getElementById('intro-3').textContent = "Thank you!";

        document.getElementById('skills-title').textContent = "Skills";
        updateSkillsEnglish();

        document.getElementById('experience-title').textContent = "Experience [Major]";
        document.getElementById('contact-title').textContent = "Contact";

        updateContactEnglish();

        document.getElementById('footer-left').textContent = "Copyright © 2024 Kevin's Portfolio";
        document.getElementById('footer-right').textContent = "Maker : HopeProject.Dev";
    }

    function updateSkillsKorean() {
        document.querySelectorAll(".skill-card").forEach((card, index) => {
            switch (index) {
                case 0:
                    card.querySelector(".skill-title").textContent = "Android JAVA ( 메인 )";
                    card.querySelector(".skill-description").textContent = "Android Studio 사용";
                    break;
                case 1:
                    card.querySelector(".skill-title").textContent = "워드프레스 ( 메인 )";
                    card.querySelector(".skill-description").textContent = "WordPress tool 사용";
                    break;
                case 2:
                    card.querySelector(".skill-title").textContent = "HTML / CSS ( 서브 )";
                    card.querySelector(".skill-description").textContent = "VS CODE & VS 사용";
                    break;
                case 3:
                    card.querySelector(".skill-title").textContent = "JSP ( 서브 )";
                    card.querySelector(".skill-description").textContent = "이클립스 사용";
                    break;
                case 4:
                    card.querySelector(".skill-title").textContent = "etc.";
                    card.querySelector(".skill-description").innerHTML = "필요하다면 언제든지<br>추가로 학습 합니다.";
                    break;
            }
        });
    }

    function updateSkillsEnglish() {
        document.querySelectorAll(".skill-card").forEach((card, index) => {
            switch (index) {
                case 0:
                    card.querySelector(".skill-title").textContent = "Android JAVA (Main)";
                    card.querySelector(".skill-description").textContent = "Using Android Studio";
                    break;
                case 1:
                    card.querySelector(".skill-title").textContent = "WordPress (Main)";
                    card.querySelector(".skill-description").textContent = "Using WordPress tool";
                    break;
                case 2:
                    card.querySelector(".skill-title").textContent = "HTML / CSS (Sub)";
                    card.querySelector(".skill-description").textContent = "Using VS CODE & VS";
                    break;
                case 3:
                    card.querySelector(".skill-title").textContent = "JSP (Sub)";
                    card.querySelector(".skill-description").textContent = "Using Eclipse";
                    break;
                case 4:
                    card.querySelector(".skill-title").textContent = "etc.";
                    card.querySelector(".skill-description").innerHTML = "Always learning<br>whenever necessary.";
                    break;
            }
        });
    }

    function updateContactKorean() {
        document.querySelector(".contact-card h2").textContent = "이름: 권혁진";
        document.querySelector(".contact-card p").textContent = "이메일: hopeproject.dev@gmail.com";
    }

    function updateContactEnglish() {
        document.querySelector(".contact-card h2").textContent = "Name: Kevin Kweon";
        document.querySelector(".contact-card p").textContent = "E-Mail: hopeproject.dev@gmail.com";
    }

    window.addEventListener('resize', function() {
        if (document.getElementById('name').textContent.includes("권혁진")) {
            setKorean();
        } else {
            setEnglish();
        }
    });

    document.addEventListener('contextmenu', function (e) {
        e.preventDefault(); 
    });

    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    document.addEventListener('copy', function (e) {
        e.preventDefault();
    });

    document.addEventListener('cut', function (e) {
        e.preventDefault();
    });

    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
    });
});
