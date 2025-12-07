document.addEventListener('DOMContentLoaded', function() {
    const startLearningBtn = document.querySelector('.hero-btn');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', function() {
            window.location.href = 'lessons.html';
        });
    }

    
    const boxes = document.querySelectorAll('.box');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('box-visible');
            }
        });
    }, observerOptions);

    boxes.forEach(box => {
        observer.observe(box);
    });

    
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgressBar() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateProgressBar);

    
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    
    navLinks.forEach(link => link.classList.remove('active'));
    
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        
        if (currentPage === 'index.html' && linkHref === 'index.html') {
            link.classList.add('active');
        }
        
        
        link.addEventListener('click', function(e) {
            
            if (!this.getAttribute('href').startsWith('#')) {
                
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                
                if (currentPage === 'index.html') {
                    navLinks.forEach(l => l.classList.remove('active'));
                    const targetLink = document.querySelector(`a[href="#${targetId}"]`);
                    if (targetLink) targetLink.classList.add('active');
                }
            }, 100);
        }
    }
});