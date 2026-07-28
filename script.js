(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.getElementById('mainNav');
    const projectVideos = Array.from(document.querySelectorAll('.project-video'));

    function updateNavbar() {
        navbar?.classList.toggle('shrink', window.scrollY > 50);
    }

    function setVideoSource(video, sourceUrl, posterUrl) {
        if (!video || !sourceUrl) {
            return;
        }

        if (posterUrl) {
            video.poster = posterUrl;
        }

        if (video.dataset.activeSource === sourceUrl) {
            return;
        }

        const source = video.querySelector('source');
        video.classList.add('is-switching');

        if (source) {
            source.src = sourceUrl;
        } else {
            video.src = sourceUrl;
        }

        video.dataset.activeSource = sourceUrl;
        video.load();
        video.addEventListener('loadeddata', () => {
            video.classList.remove('is-switching');
        }, { once: true });
    }

    function playWhenAllowed(video) {
        if (!reducedMotion && video?.muted) {
            video.play().catch(() => {
                // Browser autoplay policy can require a user gesture.
            });
        }
    }

    window.changeShowcase = function (sectionId, videoSrc, title, description, triggerElement, posterUrl, orientation, audioEnabled) {
        const video = document.getElementById(sectionId + '-video');
        const titleElement = document.getElementById(sectionId + '-title');
        const descriptionElement = document.getElementById(sectionId + '-desc');
        const container = document.getElementById(sectionId + '-showcase');
        const audioNote = container?.querySelector('[data-audio-note]');
        const isLandscape = orientation === 'landscape';

        container?.classList.toggle('landscape-active', isLandscape);
        if (audioNote) {
            audioNote.hidden = audioEnabled !== 'true';
        }
        if (video && audioEnabled !== 'true') {
            video.muted = true;
        }

        setVideoSource(video, videoSrc, posterUrl);
        playWhenAllowed(video);

        if (titleElement) {
            titleElement.textContent = title;
        }

        if (descriptionElement) {
            descriptionElement.textContent = description;
        }

        container?.querySelectorAll('.mechanic-trigger').forEach((trigger) => {
            const isActive = trigger === triggerElement;
            trigger.classList.toggle('active', isActive);
            trigger.setAttribute('aria-pressed', String(isActive));
        });
    };

    document.querySelectorAll('[data-showcase]').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            window.changeShowcase(
                trigger.dataset.showcase,
                trigger.dataset.video,
                trigger.dataset.title,
                trigger.dataset.description,
                trigger,
                trigger.dataset.poster,
                trigger.dataset.orientation,
                trigger.dataset.audio
            );
        });
    });

    document.querySelectorAll('.mechanic-trigger:not(button)').forEach((trigger) => {
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-pressed', String(trigger.classList.contains('active')));
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                trigger.click();
            }
        });
    });

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                video.dataset.inView = String(entry.isIntersecting);

                if (entry.isIntersecting) {
                    const source = video.querySelector('source');
                    setVideoSource(video, source?.dataset.src || source?.src);
                    playWhenAllowed(video);
                } else {
                    video.pause();
                }
            });
        }, {
            rootMargin: '180px 0px',
            threshold: 0.15
        });

        projectVideos.forEach((video) => videoObserver.observe(video));
    } else {
        projectVideos.forEach((video) => {
            const source = video.querySelector('source');
            setVideoSource(video, source?.dataset.src || source?.src);
        });
    }

    if (reducedMotion) {
        document.querySelector('.video-bg')?.pause();
    }

    document.addEventListener('visibilitychange', () => {
        projectVideos.forEach((video) => {
            if (document.hidden) {
                video.pause();
            } else if (video.dataset.inView === 'true') {
                playWhenAllowed(video);
            }
        });
    });

    document.querySelectorAll('[data-copy-email]').forEach((button) => {
        button.addEventListener('click', async () => {
            const email = button.dataset.copyEmail;
            const status = button.closest('.email-contact')?.querySelector('[data-copy-status]');

            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(email);
                } else {
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    textArea.setAttribute('readonly', '');
                    textArea.style.position = 'fixed';
                    textArea.style.opacity = '0';
                    document.body.appendChild(textArea);
                    textArea.select();
                    const copied = document.execCommand('copy');
                    textArea.remove();

                    if (!copied) {
                        throw new Error('Copy command failed');
                    }
                }

                if (status) {
                    status.textContent = 'Email copied: ' + email;
                }
            } catch {
                if (status) {
                    status.textContent = 'Could not copy automatically. Select the email address above.';
                }
            }
        });
    });

    document.querySelectorAll('[data-current-year]').forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });

    document.querySelectorAll('#navbarResponsive .nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            const navigation = document.getElementById('navbarResponsive');
            const collapse = window.bootstrap?.Collapse.getInstance(navigation);
            collapse?.hide();
        });
    });

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
})();
