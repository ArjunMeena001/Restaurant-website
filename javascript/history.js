window.addEventListener('scroll', function() {
    const progressLine = document.getElementById('timelineProgress');
    const greyLine = document.querySelector('.timeline-line');
    const container = document.querySelector('.timeline-container');
    const items = document.querySelectorAll('.timeline-item');
    const dots = document.querySelectorAll('.timeline-dot');
    
    if (!progressLine || !greyLine || items.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const lastDot = dots[dots.length - 1];
    const lastDotRect = lastDot.getBoundingClientRect();

    // 1. Grey Line ko aakhri dot ke center par lock karo
    const stopPosition = (lastDotRect.top - containerRect.top) + (lastDotRect.height / 2);
    greyLine.style.height = stopPosition + 'px';

    // 2. Orange Line Scroll Logic
    const viewportCenter = window.innerHeight / 2;
    let currentProgress = viewportCenter - containerRect.top;

    if (currentProgress > 0) {
        if (currentProgress > stopPosition) {
            currentProgress = stopPosition;
        }
        progressLine.style.height = currentProgress + 'px';

        // 3. Tipki (Dot) aur Date Activation Logic
        items.forEach((item) => {
            const dot = item.querySelector('.timeline-dot');
            // Dot ki position container ke hisab se
            const dotPos = dot.getBoundingClientRect().top - containerRect.top + (dot.offsetHeight / 2);
            
            // Agar orange line dot tak pahuch gayi
            if (currentProgress >= dotPos - 5) { // -5px buffer for better feel
                dot.classList.add('active'); 
                item.classList.add('active-date');
            } else {
                dot.classList.remove('active');
                item.classList.remove('active-date');
            }
        });

    } else {
        progressLine.style.height = '0px';
        items.forEach(item => {
            item.classList.remove('active-date');
            item.querySelector('.timeline-dot').classList.remove('active');
        });
    }
});

// Page load par trigger karo
window.dispatchEvent(new Event('scroll'));