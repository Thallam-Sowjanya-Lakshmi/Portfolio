import { ABOUT, EDUCATION, PROJECTS, EXPERIENCE, SKILLS, CONTACT } from './js/constants.js';

document.addEventListener('DOMContentLoaded', () => {
    // Hide Loader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('loader-hidden');
        }, 1000);
    });

    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const roles = ["Full Stack Web Developer", "Java Developer", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // Render About
    const aboutText = document.getElementById('about-text');
    if (aboutText) aboutText.textContent = ABOUT;

    // Render Education
    const educationContainer = document.getElementById('education-container');
    if (educationContainer) {
        EDUCATION.forEach(edu => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="exp-header">
                    <h3>${edu.degree}</h3>
                    <span class="period">${edu.year}</span>
                </div>
                <p class="company">${edu.institution}</p>
                <p class="description">${edu.description}</p>
            `;
            educationContainer.appendChild(item);
        });
    }

    // Render Projects
    const projectsContainer = document.getElementById('projects-container');
    PROJECTS.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <a href="${project.github}" target="_blank" class="project-link"><i class="fab fa-github"></i> View Project</a>
        `;
        projectsContainer.appendChild(card);
    });

    // Render Experience
    const experienceTimeline = document.getElementById('experience-timeline');
    EXPERIENCE.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="exp-header">
                <h3>${exp.role}</h3>
                <span class="period">${exp.period}</span>
            </div>
            <p class="company">${exp.company}</p>
            <ul>
                ${exp.points.map(p => `<li>${p}</li>`).join('')}
            </ul>
        `;
        experienceTimeline.appendChild(item);
    });

    // Render Skills
    const skillsGrid = document.getElementById('skills-grid');
    if (skillsGrid) {
        SKILLS.forEach(skillGroup => {
            const group = document.createElement('div');
            group.className = 'skill-group';
            group.innerHTML = `
                <h4>${skillGroup.category}</h4>
                <div class="skill-items">
                    ${skillGroup.items.map(s => `
                        <div class="skill-item">
                            <i class="${s.icon}"></i>
                            <span>${s.name}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            skillsGrid.appendChild(group);
        });
    }

    // Render Contact
    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = `
        <div class="contact-links">
            <a href="mailto:${CONTACT.email}" class="contact-card">
                <i class="fas fa-envelope"></i>
                <p>${CONTACT.email}</p>
            </a>
            <a href="tel:${CONTACT.phone}" class="contact-card">
                <i class="fas fa-phone"></i>
                <p>${CONTACT.phone}</p>
            </a>
            <div class="social-links">
                <a href="${CONTACT.github}" target="_blank"><i class="fab fa-github"></i></a>
                <a href="${CONTACT.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
            </div>
        </div>
    `;

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });
});
