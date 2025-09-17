// Initialize Lucide icons when the page loads
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
    
    // Initialize intersection observer for animations
    initializeAnimations();
    
    // Initialize stage interactions
    initializeStageInteractions();
});

// Smooth scroll to roadmap section
function scrollToRoadmap() {
    const roadmapSection = document.getElementById('roadmap');
    if (roadmapSection) {
        roadmapSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle stage description expansion
function toggleStageExpansion(button) {
    const stageCard = button.closest('.stage-card');
    const description = stageCard.querySelector('.stage-description');
    const icon = button.querySelector('[data-lucide]');
    
    if (description.classList.contains('expanded')) {
        description.classList.remove('expanded');
        button.innerHTML = 'Learn More <i data-lucide="chevron-down"></i>';
    } else {
        description.classList.add('expanded');
        button.innerHTML = 'Show Less <i data-lucide="chevron-up"></i>';
    }
    
    // Reinitialize icons after changing innerHTML
    lucide.createIcons();
}

// Initialize stage interactions
function initializeStageInteractions() {
    const stageCards = document.querySelectorAll('.stage-card');
    const progressSteps = document.querySelectorAll('.progress-step');
    
    stageCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the toggle button
            if (e.target.closest('.stage-toggle')) {
                return;
            }
            
            // Update active stage
            setActiveStage(index + 1);
        });
    });
}

// Set active stage
function setActiveStage(stageNumber) {
    const progressSteps = document.querySelectorAll('.progress-step');
    const stageCards = document.querySelectorAll('.stage-card');
    
    // Remove active class from all steps
    progressSteps.forEach(step => step.classList.remove('active'));
    
    // Add active class to current step
    const currentStep = document.querySelector(`[data-stage="${stageNumber}"]`);
    if (currentStep && currentStep.classList.contains('progress-step')) {
        currentStep.classList.add('active');
    }
    
    // Update stage card styles (optional visual feedback)
    stageCards.forEach((card, index) => {
        if (index + 1 === stageNumber) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Apply stage-specific glow
            if (card.classList.contains('discovery')) {
                card.style.boxShadow = 'var(--glow-discovery)';
            } else if (card.classList.contains('growth')) {
                card.style.boxShadow = 'var(--glow-growth)';
            } else if (card.classList.contains('impact')) {
                card.style.boxShadow = 'var(--glow-impact)';
            }
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 2000);
        }
    });
}

// Initialize animations with Intersection Observer
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.fun-fact-card, .stage-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in');
                }, index * 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Add hero content animation on load
window.addEventListener('load', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('animate-slide-in-up');
    }
});

// Smooth scrolling for all internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add parallax effect to hero image
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for better interactivity
document.addEventListener('mouseover', function(e) {
    if (e.target.matches('.fun-fact-card')) {
        e.target.style.transform = 'translateY(-5px)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.matches('.fun-fact-card')) {
        e.target.style.transform = '';
    }
});

// Progress indicator click functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.progress-step')) {
        const step = e.target.closest('.progress-step');
        const stageNumber = parseInt(step.getAttribute('data-stage'));
        
        if (stageNumber) {
            setActiveStage(stageNumber);
            
            // Scroll to the corresponding stage card
            const stageCard = document.querySelector(`.stage-card[data-stage="${stageNumber}"]`);
            if (stageCard) {
                stageCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    }
});

// Add loading animations
function addLoadingAnimations() {
    const elementsToAnimate = [
        '.hero-content',
        '.stage-card',
        '.fun-fact-card',
        '.pro-tip'
    ];
    
    elementsToAnimate.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
}