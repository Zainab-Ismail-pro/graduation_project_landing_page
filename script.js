// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== تهيئة العناصر =====
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const portfolioBtn = document.getElementById('portfolio-btn');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const projectsSection = document.getElementById('projects');
    
    // ===== تأثيرات التمرير لزر الرجوع للأعلى =====
    function handleScroll() {
        // إظهار أو إخفاء زر الرجوع للأعلى
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // تأثيرات التلاشي للعناصر عند التمرير
        animateOnScroll();
    }
    
    // ===== وظيفة الرجوع للأعلى =====
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // ===== وظيفة التمرير السلس =====
    function smoothScroll(target) {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // ===== وظيفة فتح/إغلاق النموذج =====
    function openModal() {
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // منع التمرير
    }
    
    function closeModalFunc() {
        contactModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // إعادة التمرير
    }
    
    // ===== تأثيرات عند التمرير للعناصر =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // ===== تهيئة شريط المهارات =====
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        
        skillBars.forEach(bar => {
            // إعادة تعيين العرض للبدء من الصفر
            const originalWidth = bar.style.width;
            bar.style.width = '0%';
            
            // تأخير بسيط قبل البدء في التحميل
            setTimeout(() => {
                bar.style.width = originalWidth;
            }, 300);
        });
    }
    
    // ===== تأثيرات عند المرور على الروابط =====
    function initLinkHoverEffects() {
        const links = document.querySelectorAll('.link-button');
        
        links.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(-8px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
            });
        });
    }
    
    // ===== تأثيرات عند المرور على البطاقات =====
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // ===== تهيئة بيانات الإحصائيات =====
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50; // تقسيم إلى 50 خطوة
            const duration = 1500; // مدة 1.5 ثانية
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
            }, duration / 50);
        });
    }
    
    // ===== تغيير لون شريط العنوان حسب التمرير =====
    function updateTitleColor() {
        const header = document.querySelector('.header');
        const name = document.querySelector('.name');
        
        if (window.scrollY > 100) {
            name.style.color = 'var(--primary-color)';
            header.style.transform = 'scale(0.98)';
        } else {
            name.style.color = 'var(--neutral-dark)';
            header.style.transform = 'scale(1)';
        }
    }
    
    // ===== تهيئة جميع الأحداث =====
    function initEvents() {
        // حدث التمرير
        window.addEventListener('scroll', function() {
            handleScroll();
            updateTitleColor();
        });
        
        // زر الرجوع للأعلى
        scrollTopBtn.addEventListener('click', scrollToTop);
        
        // زر معرض الأعمال
        portfolioBtn.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#projects');
        });
        
        // فتح النموذج عند الضغط على زر البريد
        const emailBtn = document.querySelector('a[href^="mailto"]');
        emailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal();
        });
        
        // إغلاق النموذج
        closeModal.addEventListener('click', closeModalFunc);
        
        // إغلاق النموذع عند الضغط خارج المحتوى
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                closeModalFunc();
            }
        });
        
        // إغلاق النموذج بمفتاح Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                closeModalFunc();
            }
        });
        
        // تأثيرات للمشاريع عند النقر
        const projectLinks = document.querySelectorAll('.view-project');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('هذا رابط تجريبي. في النسخة الحقيقية، سيتم توجيهك إلى صفحة المشروع.');
            });
        });
        
        // تأثيرات للروابط الاجتماعية
        const socialLinks = document.querySelectorAll('.social-icon');
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // في الحقيقة، سينتقل إلى الرابط، لكن هنا مجرد تأثير
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }
    
    // ===== تهيئة الصفحة عند التحميل =====
    function initPage() {
        // إخفاء العناصر المتحركة في البداية
        const animatedElements = document.querySelectorAll('.project-card, .skill-category, .stat-item');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // تهيئة جميع التأثيرات
        initSkillBars();
        initLinkHoverEffects();
        initCardHoverEffects();
        initStatsCounter();
        initEvents();
        
        // تشغيل تأثيرات التمرير مرة واحدة عند التحميل
        setTimeout(() => {
            handleScroll();
            animateOnScroll();
        }, 500);
        
        // إضافة تأثير للصورة الشخصية
        const profileImg = document.querySelector('.profile-img');
        profileImg.addEventListener('load', function() {
            this.style.opacity = '0';
            setTimeout(() => {
                this.style.transition = 'opacity 0.8s ease, transform 0.3s ease';
                this.style.opacity = '1';
            }, 300);
        });
        
        // تحميل الصورة إذا كانت مخبأة بالفعل
        if (profileImg.complete) {
            profileImg.style.opacity = '1';
        }
    }
    
    // بدء تهيئة الصفحة
    initPage();
    
    // إضافة تأثيرات إضافية للروابط عند النقر
    document.querySelectorAll('.link-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // إذا كان الرابط لا يحتوي على رابط حقيقي (#)
            if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') {
                e.preventDefault();
                
                // تأثير النقر
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'translateX(-8px)';
                }, 150);
            }
        });
    });
    
    // تأثيرات الإحصائيات عند التمرير فوقها
    document.querySelectorAll('.stat-item').forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            const number = this.querySelector('.stat-number');
            const originalText = number.textContent;
            
            // تأثير رفرفة بسيط
            number.style.transform = 'scale(1.1)';
            setTimeout(() => {
                number.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // تأثيرات العلامات في المشاريع
    document.querySelectorAll('.project-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--primary-color)';
            this.style.color = 'white';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--neutral-light)';
            this.style.color = 'var(--primary-color)';
        });
    });
    
    // إضافة تأثير صوتي خفيف (اختياري)
    const buttons = document.querySelectorAll('button, .link-button, .view-project');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            // يمكن إضافة صوت نقر خفيف هنا إذا أردت
            // new Audio('click-sound.mp3').play();
        });
    });
    
    // إضافة تاريخ التحديث التلقائي في الفوتر
    const yearSpan = document.querySelector('.copyright');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = yearSpan.textContent.replace('2023', currentYear);
    }
    
    // رسالة ترحيب في الكونسول
    console.log('%c🎨 مرحباً بكم في صفحة زينب إسماعيل!', 'color: #967BB7; font-size: 18px; font-weight: bold;');
    console.log('%cتم التصميم باستخدام ألوان البراند المحددة', 'color: #C9C3D1; font-size: 14px;');
});