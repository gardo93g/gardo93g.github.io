(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.getElementById('mainNav');
    const projectVideos = Array.from(document.querySelectorAll('.project-video'));

    function updateNavbar() {
        navbar?.classList.toggle('shrink', window.scrollY > 40);
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
            source.dataset.src = sourceUrl;
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
                // Browser autoplay policy may require a user gesture.
            });
        }
    }

    function focusFeaturedVideo() {
        const videoFrame = document.querySelector('.case-video-frame');
        if (!videoFrame) {
            return;
        }

        const navigationHeight = navbar?.getBoundingClientRect().height || 72;
        const targetTop = videoFrame.getBoundingClientRect().top + window.scrollY - navigationHeight - 16;
        window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: reducedMotion ? 'auto' : 'smooth'
        });
    }

    function updateFeaturedCase(trigger) {
        const stage = document.getElementById('featured-case-stage');
        const video = document.getElementById('featured-case-video');
        const title = document.getElementById('featured-case-title');
        const description = document.getElementById('featured-case-description');
        const role = document.getElementById('featured-case-role');
        const focus = document.getElementById('featured-case-focus');
        const stack = document.getElementById('featured-case-stack');
        const isLandscape = trigger.dataset.orientation === 'landscape';
        const includesAudio = trigger.dataset.audio === 'true';

        document.querySelectorAll('[data-case-trigger]').forEach((candidate) => {
            const isActive = candidate === trigger;
            candidate.classList.toggle('active', isActive);
            candidate.setAttribute('aria-pressed', String(isActive));
        });

        stage?.classList.toggle('landscape-active', isLandscape);

        if (title) {
            title.textContent = trigger.dataset.title || '';
        }
        if (description) {
            description.textContent = trigger.dataset.description || '';
        }
        if (role) {
            role.textContent = trigger.dataset.role || '';
        }
        if (focus) {
            focus.textContent = trigger.dataset.focus || '';
        }
        if (stack) {
            stack.textContent = trigger.dataset.stack || '';
        }
        if (video) {
            video.muted = !includesAudio;
            setVideoSource(video, trigger.dataset.video, trigger.dataset.poster);
            if (!includesAudio) {
                playWhenAllowed(video);
            } else {
                video.play().catch(() => {
                    // The user can start playback with the visible controls.
                });
            }
        }

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(focusFeaturedVideo);
        });
    }

    document.querySelectorAll('[data-case-trigger]').forEach((trigger) => {
        trigger.addEventListener('click', () => updateFeaturedCase(trigger));
    });

    window.changeShowcase = function (sectionId, videoSrc, title, description, triggerElement, posterUrl) {
        const video = document.getElementById(sectionId + '-video');
        const titleElement = document.getElementById(sectionId + '-title');
        const descriptionElement = document.getElementById(sectionId + '-desc');
        const container = document.getElementById(sectionId + '-showcase');

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
                trigger.dataset.poster
            );
        });
    });

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                video.dataset.inView = String(entry.isIntersecting);

                if (entry.isIntersecting) {
                    const source = video.querySelector('source');
                    setVideoSource(video, source?.dataset.src || source?.src, video.poster);
                    playWhenAllowed(video);
                } else {
                    video.pause();
                }
            });
        }, {
            rootMargin: '160px 0px',
            threshold: 0.12
        });

        projectVideos.forEach((video) => videoObserver.observe(video));
    } else {
        projectVideos.forEach((video) => {
            const source = video.querySelector('source');
            setVideoSource(video, source?.dataset.src || source?.src, video.poster);
        });
    }

    document.querySelectorAll('.archive-drawer').forEach((drawer) => {
        drawer.addEventListener('toggle', () => {
            const videos = drawer.querySelectorAll('video');

            if (!drawer.open) {
                videos.forEach((video) => video.pause());
                return;
            }

            const activeVideo = drawer.querySelector('video');
            const source = activeVideo?.querySelector('source');
            setVideoSource(activeVideo, source?.dataset.src || source?.src, activeVideo?.poster);
            playWhenAllowed(activeVideo);
        });
    });

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
            const status = button.closest('.contact-panel')?.querySelector('[data-copy-status]');

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

    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) {
                return;
            }

            navLinks.forEach((link) => {
                const isCurrent = link.getAttribute('href') === '#' + visible.target.id;
                if (isCurrent) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }, {
            rootMargin: '-28% 0px -58%',
            threshold: [0, 0.1, 0.35]
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    document.querySelectorAll('[data-current-year]').forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            const navigation = document.getElementById('navbarResponsive');
            const collapse = window.bootstrap?.Collapse.getInstance(navigation);
            collapse?.hide();
        });
    });

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
})();