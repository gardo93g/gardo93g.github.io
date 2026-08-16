(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    const navBackdrop = document.getElementById('navBackdrop');
    const projectVideos = Array.from(document.querySelectorAll('.project-video'));
    const heroVideo = document.getElementById('heroVideo');
    const heroVideoToggle = document.getElementById('heroVideoToggle');

    // ==========================================================================
    // Bilingual Translation Dictionary
    // ==========================================================================
    const translations = {
        en: {
            skip_link: 'Skip to main content',
            nav_menu_btn: 'MENU',
            nav_selected_work: 'Selected work',
            nav_experience: 'Experience',
            nav_rnd: 'R&D Lab',
            nav_about: 'About',
            nav_contact: 'Contact',
            hero_status: 'AVAILABLE FOR REMOTE ROLES · WORLDWIDE',
            hero_kicker_title: 'UNITY DEVELOPER · UI & GAMEPLAY SYSTEMS',
            hero_h1_top: 'UNITY DEVELOPER.',
            hero_h1_span: 'UI, GAMEPLAY & SYSTEMS.',
            hero_summary: '5+ years crafting responsive game interfaces, LiveOps architectures, tactile gameplay feedback, and robust C# systems in Unity.',
            hero_btn_explore: 'Explore selected work',
            hero_btn_cv: 'Download CV',
            hero_metric_1_strong: '5+ years',
            hero_metric_1_span: 'Shipped Mobile Games',
            hero_metric_2_strong: 'Unity & C#',
            hero_metric_2_span: 'UI · Gameplay · LiveOps',
            hero_metric_3_strong: 'Remote Ready',
            hero_metric_3_span: 'US Teams & Global Studios',
            hero_bg_video_toggle: 'BG VIDEO',
            hero_scroll_hint: 'SCROLL TO CASES',
            section_01_index: '01 // SELECTED WORK',
            section_01_title: 'Production Work at Harmony Games.',
            section_01_subtitle: 'LiveOps architectures, dynamic progression maps, responsive menus, DOTween feedback sequences, and integrated audio systems.',
            filter_label: 'FILTER BY:',
            filter_all: 'ALL WORK',
            filter_liveops: 'LIVEOPS & UI',
            filter_gameplay: 'GAMEPLAY & MOTION',
            filter_rnd: 'R&D · BLENDER · VR',
            case01_card_title: 'LiveOps & Progression',
            case01_card_sub: 'Systems / Player Flow',
            case02_card_title: 'Gameplay Feedback',
            case02_card_sub: 'Motion / Interaction',
            case03_card_title: 'Tile Motion & VFX',
            case03_card_sub: 'DOTween / Game Feel',
            btn_expand_theater: 'EXPAND THEATER',
            case_company_eyebrow: 'HARMONY GAMES · PRODUCTION',
            badge_shipped: 'SHIPPED TITLE',
            fact_my_part: 'MY PART',
            fact_focus: 'FOCUS',
            fact_built_with: 'BUILT WITH',
            btn_deep_dive: 'Technical Deep-Dive',
            btn_visit_harmony: 'Visit Harmony Games',
            sample_rail_heading: 'MORE MODULES FROM HARMONY GAMES',
            sample_rail_hint: 'SELECT TO LOAD PREVIEW',
            rail_sample_1_title: 'Domino Adventures',
            rail_sample_1_sub: 'Full minigame loop',
            rail_sample_2_title: 'Endless Horde',
            rail_sample_2_sub: 'Reward tally flow',
            rail_sample_3_title: 'Match3D Rewards',
            rail_sample_3_sub: 'UI + Integrated SFX',
            section_02_index: '02 // CAREER TIMELINE',
            section_02_title: 'Experience & Track Record.',
            section_02_subtitle: '5+ years collaborating with international and US-based teams on mobile game production, rapid prototyping, and software engineering.',
            timeline_loc_remote_usa: 'REMOTE · USA',
            role_harmony: 'MOBILE GAME DEVELOPER',
            desc_harmony: 'Engineered core UI modules, live-game event flows, meta progression systems, and Firebase Remote Config hooks. Translated Figma designs into responsive uGUI screens with DOTween micro-animations and zero-GC allocations.',
            harmony_h1: 'Live menus, events, progression, boosters, and rewards',
            harmony_h2: 'Pixel-perfect Figma-to-Unity UI implementation',
            harmony_h3: 'Addressables asset delivery and memory optimization',
            harmony_h4: 'Production bug fixing and LiveOps maintenance',
            role_kubiak: 'MOBILE GAME DEVELOPER',
            desc_kubiak: 'Built reusable gameplay mechanics, interaction architectures, and menu systems for multiple mobile prototypes under fast iterative cycles.',
            result_kubiak_strong: '3 Playable Prototypes',
            result_kubiak_span: 'delivered within six weeks from concept to device.',
            role_treecloud: 'GAME DEVELOPER INTERN',
            desc_treecloud: 'Prototyped motion-controlled interactive games, Kinect hardware integrations, drone pathfinding, and point-cloud LiDAR visualization in Unreal Engine 4.',
            role_ofbox: 'JUNIOR SOFTWARE DEVELOPER',
            desc_ofbox: 'Developed internal workflow tools, automated data integration pipelines, and resolved production bugs across legacy enterprise codebases.',
            archive_label: 'MECHANICS ARCHIVE',
            archive_kubiak_title: 'Kubiak LLC — Mobile Prototypes',
            archive_kubiak_sub: 'Five interactive mechanics and UI systems',
            archive_treecloud_title: 'TreeCloud — Technical Prototypes',
            archive_treecloud_sub: 'Hardware inputs, LiDAR data, and gesture control',
            archive_explore: 'EXPLORE MECHANICS',
            kubiak_m1_title: 'Stable Cleaning',
            kubiak_m1_sub: 'Interaction system',
            kubiak_m2_title: 'Horse Grooming',
            kubiak_m2_sub: 'Shaders & particles',
            kubiak_m3_title: 'Feeding System',
            kubiak_m3_sub: 'Physics logic',
            kubiak_m4_title: 'Strategy Economy UI',
            kubiak_m4_sub: 'UI/UX Economy',
            kubiak_m5_title: 'Car Upgrade UI',
            kubiak_m5_sub: 'Data binding',
            tc_m1_title: 'Kinect Ping Pong',
            tc_m1_sub: 'Hardware input',
            tc_m2_title: 'Smash Bug',
            tc_m2_sub: 'Motion detection',
            tc_m3_title: 'LiDAR Visualization',
            tc_m3_sub: 'Data processing',
            tc_m4_title: 'Memory Game',
            tc_m4_sub: 'Gesture control',
            section_03_index: '03 // R&D LAB',
            section_03_title: 'Blender + MCP & Engine Studies.',
            section_03_subtitle: 'Exploring automated character retopology, shader pipelines, Blender-to-game spritesheets, and VR spatial navigation.',
            lab_exp1_title: 'Automated Character Pipeline',
            lab_exp1_desc: 'Using Blender via Model Context Protocol (MCP) to automate iteration from high-poly character sculpts to clean, animation-ready quad topology and stylized shader setups.',
            lab_fig_1: 'DENSE MESH → CLEAN TOPOLOGY',
            lab_fig_2: 'LOOK DEVELOPMENT STUDY',
            lab_exp2_title: 'Motion to 2D Spritesheet Workflow',
            lab_exp2_desc: 'Authoring character animations in 3D Blender space and automatically rendering baked normal/color sprite frames for real-time 2D game engines.',
            lab_fig_3: 'ANIMATION RIGGING TEST',
            lab_fig_4: 'SPRITESHEET GENERATION',
            vr_duration_label: 'VR IMMERSIVE WALKTHROUGH',
            lab_exp3_title: 'UCA VR Museum',
            lab_exp3_desc: 'An interactive virtual museum application developed for VR headsets, focusing on continuous spatial locomotion, object inspectability, and ambient acoustic zones.',
            ue4_studies_kicker: 'TECHNICAL STUDIES',
            ue4_studies_title: 'Unreal Engine 4 Mechanics',
            ue4_m1_title: 'Animation Retargeting',
            ue4_m1_desc: 'Skeletal retargeting between diverse humanoid proportions.',
            ue4_m2_title: 'Dynamic Mesh Swap',
            ue4_m2_desc: 'Seamless runtime character swapping without state interruption.',
            ue4_m3_title: 'Shield State Machines',
            ue4_m3_desc: 'Shield activation, impact dissipation, and audio sync logic.',
            section_04_index: '04 // ABOUT ME',
            section_04_title: 'Building responsive, feel-good games.',
            about_lead: 'I am a Unity Developer and C# Software Engineer with over 5 years of hands-on game development experience.',
            about_p2: 'I specialize in taking intricate UI designs from Figma into production-grade Unity uGUI/UI Toolkit, hooking them into LiveOps backends, optimizing draw calls, and writing clean, maintainable C# gameplay systems.',
            about_loc: 'San Salvador, El Salvador',
            about_lang: 'Fluent English & Native Spanish',
            about_remote: 'Remote Collaboration with US/Global Teams',
            tech_stack_title: 'CORE TECH STACK:',
            section_05_index: '05 // GET IN TOUCH',
            section_05_title: "Let's build great games together.",
            contact_p: "I'm open to full-time remote opportunities, contractor roles, and technical collaborations in Unity UI and gameplay systems.",
            btn_write_email: 'Write an Email',
            btn_copy_email: 'Copy Email',
            link_resume: 'Resume / CV',
            footer_back_to_top: 'BACK TO TOP',
            modal_block_01: 'THE CHALLENGE',
            modal_block_02: 'ARCHITECTURE & IMPLEMENTATION',
            modal_block_03: 'KEY TECHNICAL RESULTS',
            modal_block_04: 'APPLIED TECHNOLOGIES',
            btn_close_breakdown: 'CLOSE BREAKDOWN',
            toast_copied: 'Email copied to clipboard: ',
            toast_copy_error: 'Could not copy automatically. Email: '
        },
        es: {
            skip_link: 'Saltar al contenido principal',
            nav_menu_btn: 'MENÚ',
            nav_selected_work: 'Trabajos selectos',
            nav_experience: 'Experiencia',
            nav_rnd: 'Lab I+D',
            nav_about: 'Sobre mí',
            nav_contact: 'Contacto',
            hero_status: 'DISPONIBLE PARA ROLES REMOTOS · A NIVEL GLOBAL',
            hero_kicker_title: 'DESARROLLADOR UNITY · UI Y SISTEMAS DE GAMEPLAY',
            hero_h1_top: 'DESARROLLADOR UNITY.',
            hero_h1_span: 'UI, GAMEPLAY Y SISTEMAS.',
            hero_summary: 'Más de 5 años creando interfaces responsivas, arquitecturas LiveOps, feedback táctil y sistemas robustos en C# con Unity.',
            hero_btn_explore: 'Explorar trabajos selectos',
            hero_btn_cv: 'Descargar CV',
            hero_metric_1_strong: '5+ años',
            hero_metric_1_span: 'Juegos Móviles Publicados',
            hero_metric_2_strong: 'Unity y C#',
            hero_metric_2_span: 'UI · Gameplay · LiveOps',
            hero_metric_3_strong: 'Trabajo Remoto',
            hero_metric_3_span: 'Equipos en EE.UU. y Globales',
            hero_bg_video_toggle: 'VIDEO DE FONDO',
            hero_scroll_hint: 'VER CASOS DE ESTUDIO',
            section_01_index: '01 // TRABAJOS SELECTOS',
            section_01_title: 'Trabajo de Producción en Harmony Games.',
            section_01_subtitle: 'Arquitecturas LiveOps, mapas de progresión dinámicos, menús responsivos, secuencias de feedback con DOTween y sistemas de audio integrados.',
            filter_label: 'FILTRAR POR:',
            filter_all: 'TODOS',
            filter_liveops: 'LIVEOPS Y UI',
            filter_gameplay: 'GAMEPLAY Y ANIMACIÓN',
            filter_rnd: 'I+D · BLENDER · VR',
            case01_card_title: 'LiveOps y Progresión',
            case01_card_sub: 'Sistemas / Flujo de Jugador',
            case02_card_title: 'Feedback de Gameplay',
            case02_card_sub: 'Animación / Interacción',
            case03_card_title: 'Movimiento y VFX',
            case03_card_sub: 'DOTween / Game Feel',
            btn_expand_theater: 'PANTALLA COMPLETA',
            case_company_eyebrow: 'HARMONY GAMES · PRODUCCIÓN',
            badge_shipped: 'TÍTULO PUBLICADO',
            fact_my_part: 'MI ROL',
            fact_focus: 'ENFOQUE',
            fact_built_with: 'TECNOLOGÍAS',
            btn_deep_dive: 'Ficha Técnica',
            btn_visit_harmony: 'Visitar Harmony Games',
            sample_rail_heading: 'MÁS MÓDULOS EN HARMONY GAMES',
            sample_rail_hint: 'SELECCIONA PARA PREVISUALIZAR',
            rail_sample_1_title: 'Domino Adventures',
            rail_sample_1_sub: 'Minijuego completo',
            rail_sample_2_title: 'Endless Horde',
            rail_sample_2_sub: 'Recompensas y conteo',
            rail_sample_3_title: 'Match3D Rewards',
            rail_sample_3_sub: 'UI + Audio integrado',
            section_02_index: '02 // TRAYECTORIA PROFESIONAL',
            section_02_title: 'Experiencia y Trayectoria.',
            section_02_subtitle: 'Más de 5 años colaborando con equipos internacionales y de EE.UU. en producción de juegos móviles, prototipado rápido e ingeniería de software.',
            timeline_loc_remote_usa: 'REMOTO · EE.UU.',
            role_harmony: 'DESARROLLADOR DE JUEGOS MÓVILES',
            desc_harmony: 'Desarrollo de módulos principales de UI, flujos de eventos en vivo, sistemas de progresión meta e integraciones con Firebase Remote Config. Implementación pixel-perfect de diseños de Figma a uGUI responsivo con micro-animaciones en DOTween y cero asignaciones de GC.',
            harmony_h1: 'Menús en vivo, eventos, progresión, boosters y recompensas',
            harmony_h2: 'Implementación pixel-perfect de UI de Figma a Unity',
            harmony_h3: 'Entrega de assets con Addressables y optimización de memoria',
            harmony_h4: 'Corrección de bugs en producción y mantenimiento LiveOps',
            role_kubiak: 'DESARROLLADOR DE JUEGOS MÓVILES',
            desc_kubiak: 'Creación de mecánicas de gameplay reutilizables, arquitecturas de interacción y sistemas de menús para múltiples prototipos móviles en ciclos de iteración rápida.',
            result_kubiak_strong: '3 Prototipos Jugables',
            result_kubiak_span: 'entregados en seis semanas desde el concepto hasta el dispositivo.',
            role_treecloud: 'PASANTE DE DESARROLLO DE VIDEOJUEGOS',
            desc_treecloud: 'Prototipado de juegos interactivos controlados por movimiento, integración con Kinect, navegación de drones y visualización de nubes de puntos LiDAR en Unreal Engine 4.',
            role_ofbox: 'DESARROLLADOR DE SOFTWARE JUNIOR',
            desc_ofbox: 'Desarrollo de herramientas internas, automatización de flujos de integración de datos y resolución de incidencias en sistemas empresariales.',
            archive_label: 'ARCHIVO DE MECÁNICAS',
            archive_kubiak_title: 'Kubiak LLC — Prototipos Móviles',
            archive_kubiak_sub: 'Cinco mecánicas interactivas y sistemas de UI',
            archive_treecloud_title: 'TreeCloud — Prototipos Técnicos',
            archive_treecloud_sub: 'Entradas por hardware, datos LiDAR y control por gestos',
            archive_explore: 'EXPLORAR MECÁNICAS',
            kubiak_m1_title: 'Limpieza de Establo',
            kubiak_m1_sub: 'Sistema de interacción',
            kubiak_m2_title: 'Cuidado de Caballos',
            kubiak_m2_sub: 'Shaders y partículas',
            kubiak_m3_title: 'Sistema de Alimentación',
            kubiak_m3_sub: 'Lógica física',
            kubiak_m4_title: 'UI de Economía Estratégica',
            kubiak_m4_sub: 'Economía UI/UX',
            kubiak_m5_title: 'UI de Mejora de Autos',
            kubiak_m5_sub: 'Vinculación de datos',
            tc_m1_title: 'Ping Pong con Kinect',
            tc_m1_sub: 'Entrada por hardware',
            tc_m2_title: 'Smash Bug',
            tc_m2_sub: 'Detección de movimiento',
            tc_m3_title: 'Visualización LiDAR',
            tc_m3_sub: 'Procesamiento de datos',
            tc_m4_title: 'Juego de Memoria',
            tc_m4_sub: 'Control por gestos',
            section_03_index: '03 // LABORATORIO I+D',
            section_03_title: 'Estudios con Blender + MCP y Motores.',
            section_03_subtitle: 'Exploración de retopología automatizada de personajes, shaders, generación de spritesheets desde Blender y navegación espacial en RV.',
            lab_exp1_title: 'Pipeline Automatizado de Personajes',
            lab_exp1_desc: 'Uso de Blender mediante Model Context Protocol (MCP) para iterar automáticamente desde esculturas de alto poligonaje hasta topologías limpias listas para animación y shaders estilizados.',
            lab_fig_1: 'MALLA DENSA → TOPOLOGÍA LIMPIA',
            lab_fig_2: 'ESTUDIO DE DESARROLLO VISUAL',
            lab_exp2_title: 'Flujo de Animación a Spritesheets 2D',
            lab_exp2_desc: 'Creación de animaciones 3D en Blender y renderizado automático de cuadros de sprites con color y normales para motores de juegos 2D.',
            lab_fig_3: 'PRUEBA DE RIGGING Y ANIMACIÓN',
            lab_fig_4: 'GENERACIÓN DE SPRITESHEET',
            vr_duration_label: 'RECORRIDO INMERSIVO VR',
            lab_exp3_title: 'Museo Virtual VR UCA',
            lab_exp3_desc: 'Aplicación de museo virtual interactivo desarrollada para visores VR, enfocada en locomoción espacial fluida, inspección de objetos y zonas acústicas ambientales.',
            ue4_studies_kicker: 'ESTUDIOS TÉCNICOS',
            ue4_studies_title: 'Mecánicas en Unreal Engine 4',
            ue4_m1_title: 'Retargeting de Animación',
            ue4_m1_desc: 'Retargeting esquelético entre diversas proporciones humanoides.',
            ue4_m2_title: 'Cambio Dinámico de Malla',
            ue4_m2_desc: 'Cambio de personaje en tiempo de ejecución sin interrupción de estado.',
            ue4_m3_title: 'Máquinas de Estado de Escudo',
            ue4_m3_desc: 'Activación de escudo, disipación de impacto y lógica de audio.',
            section_04_index: '04 // SOBRE MÍ',
            section_04_title: 'Creando juegos responsivos y con excelente game feel.',
            about_lead: 'Soy desarrollador Unity e ingeniero de software en C# con más de 5 años de experiencia práctica en desarrollo de videojuegos.',
            about_p2: 'Me especializo en llevar diseños complejos desde Figma a interfaces listas para producción en Unity uGUI/UI Toolkit, conectarlas con backends LiveOps, optimizar draw calls y escribir sistemas de gameplay limpios y mantenibles en C#.',
            about_loc: 'San Salvador, El Salvador',
            about_lang: 'Inglés Fluido y Español Nativo',
            about_remote: 'Colaboración Remota con Equipos de EE.UU. y Globales',
            tech_stack_title: 'STACK TECNOLÓGICO PRINCIPAL:',
            section_05_index: '05 // CONTACTO',
            section_05_title: 'Construyamos grandes juegos juntos.',
            contact_p: 'Disponible para oportunidades remotas a tiempo completo, proyectos por contrato y colaboraciones técnicas en UI y sistemas de gameplay en Unity.',
            btn_write_email: 'Enviar un Correo',
            btn_copy_email: 'Copiar Correo',
            link_resume: 'Currículum / CV',
            footer_back_to_top: 'VOLVER ARRIBA',
            modal_block_01: 'EL DESAFÍO',
            modal_block_02: 'ARQUITECTURA E IMPLEMENTACIÓN',
            modal_block_03: 'RESULTADOS TÉCNICOS CLAVE',
            modal_block_04: 'TECNOLOGÍAS APLICADAS',
            btn_close_breakdown: 'CERRAR FICHA',
            toast_copied: 'Correo copiado al portapapeles: ',
            toast_copy_error: 'No se pudo copiar automáticamente. Correo: '
        }
    };

    // ==========================================================================
    // Technical Deep-Dive Data Matrix (Bilingual)
    // ==========================================================================
    const caseDatabase = {
        en: {
            'harmony-liveops': {
                title: 'LiveOps & Progression Flow',
                description: 'Engineered progression maps, event entry points, boosters, multi-tier reward sequences, and decoupled player flow state machines.',
                role: 'UI & Systems Architecture',
                focus: 'State Flow, Events, Rewards & Backend Sync',
                stack: 'Unity · C# · Firebase · Addressables · DOTween',
                tag: 'HARMONY GAMES · PRODUCTION CASE 01',
                challenge: 'Integrating complex progression maps, event entry triggers, boosters, and multi-tier reward popups into a live mobile title. The primary technical hurdle was maintaining smooth 60 FPS scrolling and transition feel across low-end Android and iOS devices while dealing with asynchronous Firebase Remote Config updates and dynamic Addressables asset streaming without memory bloat or GC spikes.',
                architecture: 'Architected a decoupled, event-driven UI state machine where meta-screens observe reactive game state rather than polling backend models. Implemented Addressables-based prefab instancing with strict memory release lifecycle hooks, pooled popup queue coordinators to gracefully handle cascading rewards, and optimistic UI client updates with rollback reconciliation.',
                highlights: [
                    'Zero runtime GC allocations during map zooming and panning.',
                    'Sub-100ms UI screen transition latency on target low-tier mobile chipsets.',
                    'Modular event banner architecture supporting live hot-reloaded campaigns without app binary updates.',
                    'Robust offline resilience and network drop recovery during reward claims.'
                ],
                stackTags: ['Unity 2022 LTS', 'C#', 'Firebase Remote Config', 'Addressables', 'DOTween Pro', 'UniTask', 'uGUI']
            },
            'harmony-tile': {
                title: 'Gameplay Motion & Feedback',
                description: 'Crafted tactile tile physics feel, dealing choreographies, valid placement hints, and snappy board feedback running at steady 60 FPS.',
                role: 'Gameplay & UI Motion',
                focus: 'Tactile Game Feel, Input Handling, Non-Alloc Sequences',
                stack: 'Unity · C# · DOTween · uGUI · Particle FX',
                tag: 'HARMONY GAMES · PRODUCTION CASE 02',
                challenge: 'Translating classic domino board mechanics into a tactile, responsive mobile experience. The design required custom tile dealing choreographies, physics-inspired drag-and-drop feedback, valid placement indicator sweeps, and instant board validation without sacrificing framerate consistency.',
                architecture: 'Created a non-allocating tween sequence manager utilizing pre-cached easing curves. Designed a spatial hash-based grid snapping detection system that minimizes raycast queries per frame. Integrated multi-touch pointer event handlers with DOTween scale/tilt feedback to deliver immediate sensory responsiveness.',
                highlights: [
                    'Instant drag-to-board response under 16ms input latency.',
                    'Custom Bezier motion curves for dealing animation sequences.',
                    'Non-allocating collision and placement validation routines.',
                    'Micro-tuned haptic and visual cues on tile connection.'
                ],
                stackTags: ['Unity', 'C#', 'DOTween Pro', 'uGUI', 'Custom Easings', 'Object Pooling']
            },
            'harmony-streak': {
                title: 'Tile Motion & VFX Rewards',
                description: 'Implemented streak multipliers, particle burst choreography, screen-shake dynamics, and layered VFX canvas hierarchy.',
                role: 'UI Animation & VFX Engineering',
                focus: 'Particle Systems, Timing Choreography, Asset Pooling',
                stack: 'Unity · C# · DOTween · VFX · Custom Shaders',
                tag: 'HARMONY GAMES · PRODUCTION CASE 03',
                challenge: 'Designing high-energy streak multipliers, cascading combo rewards, and screen-shake impact feedback. The key challenge was rendering multiple simultaneous particle bursts and floating number tickers without triggering canvas rebuilds or frame drops during peak combo moments.',
                architecture: 'Built a specialized VFX canvas hierarchy isolating particle rendering from core uGUI layouts to eliminate canvas redraw penalties. Utilized custom ParticleSystem sub-emitters paired with DOTween sequenced punch animations and audio bus triggers for synchronized audiovisual punch.',
                highlights: [
                    'Zero canvas redraw impact during multi-layered 500+ particle bursts.',
                    'Pre-warmed particle and floating label object pools.',
                    'Modular streak multiplier manager easily tunable via ScriptableObjects.',
                    'Adaptive particle density scaling for low-spec mobile profiles.'
                ],
                stackTags: ['Unity', 'C#', 'DOTween', 'Particle Systems', 'Shader Graph', 'Audio Bus Sync']
            },
            'harmony-domino-adventures': {
                title: 'Domino Adventures Minigame',
                description: 'Built this entire standalone minigame loop from first prototype through production polish: rules, board state, UI, and reward payouts.',
                role: 'Full Minigame Architecture',
                focus: 'Minigame Loop, uGUI Architecture, Balance Tuning',
                stack: 'Unity · C# · ScriptableObjects · DOTween',
                tag: 'HARMONY GAMES · STANDALONE MODULE',
                challenge: 'Developing an end-to-end standalone minigame mode with distinct board mechanics, level progression trees, and reward distribution within a tight sprint milestone.',
                architecture: 'Implemented a clean MVP (Model-View-Presenter) architectural pattern isolating core puzzle simulation logic from presentation layers. Level parameters, obstacle modifiers, and reward tables were encapsulated into ScriptableObjects, allowing game designers to iterate balance directly in the Unity Inspector without developer intervention.',
                highlights: [
                    'Shipped full feature loop ahead of release schedule with zero critical post-launch bugs.',
                    'Design-friendly ScriptableObject level authoring pipeline.',
                    'Seamless integration with the main game economy and currency systems.'
                ],
                stackTags: ['Unity', 'C#', 'ScriptableObjects', 'MVP Pattern', 'DOTween', 'uGUI']
            },
            'harmony-endless-horde': {
                title: 'Endless Horde Reward Screen',
                description: 'Built dynamic end-of-run reward screen with tally counters, currency animations, level-up feedback, and back-to-menu routing.',
                role: 'Reward Screen & Tally Systems',
                focus: 'Async Tally Choreography, Audio Sync, Memory Pooling',
                stack: 'Unity · C# · DOTween · uGUI',
                tag: 'HARMONY GAMES · META UI',
                challenge: 'Creating a punchy, satisfying end-of-match summary screen displaying async tally counters, level-up threshold bars, and unlocked loot cards in a rhythmic sequence.',
                architecture: 'Engineered an asynchronous sequencer utilizing UniTask and DOTween that synchronizes numeric counters, sound effects, and chest opening sequences with skip-to-end user tap handling.',
                highlights: [
                    'Smooth number roll-up math with logarithmic acceleration.',
                    'User-interruptible sequence support for impatient players.',
                    'Integrated sound pitch modulation based on reward magnitude.'
                ],
                stackTags: ['Unity', 'C#', 'UniTask', 'DOTween', 'UI Particle VFX']
            },
            'match3d-rewards': {
                title: 'Match3D Reward Screen & SFX',
                description: 'Engineered the level-complete reward popup, score calculation animation, sound effect curation, and audio bus integration.',
                role: 'UI Engineering & Audio Bus',
                focus: 'Completion Flow, Audio Spatialization, UX Clarity',
                stack: 'Unity · C# · SFX Integration · DOTween',
                tag: 'HARMONY GAMES · AUDIO & UI',
                challenge: 'Delivering a vibrant victory screen for 3D item matching with comprehensive audio design, spatial stereo balance, and reward clarity.',
                architecture: 'Integrated a tiered audio playback system with dynamic pitch randomization to prevent player auditory fatigue during repetitive wins. Coordinated 3D camera zoom with UI canvas modal entry.',
                highlights: [
                    'Curated and tuned all sound effects for punchy reward feedback.',
                    'Dynamic pitch variation reducing SFX monotony by 100%.',
                    'Responsive 3D/2D layered camera composition.'
                ],
                stackTags: ['Unity', 'C#', 'SFX Bus Integration', 'AudioSource Pooling', 'DOTween']
            }
        },
        es: {
            'harmony-liveops': {
                title: 'Flujo de LiveOps y Progresión',
                description: 'Diseño e implementación de mapas de progresión, eventos temporales, potenciadores, secuencias de recompensa y máquinas de estado para el flujo del jugador.',
                role: 'Arquitectura de UI y Sistemas',
                focus: 'Flujo de Estados, Eventos, Recompensas y Sincronización Backend',
                stack: 'Unity · C# · Firebase · Addressables · DOTween',
                tag: 'HARMONY GAMES · CASO DE PRODUCCIÓN 01',
                challenge: 'Integrar mapas de progresión complejos, disparadores de eventos en vivo, potenciadores y ventanas emergentes de recompensa en un título móvil en producción. El principal reto técnico fue mantener 60 FPS estables y transiciones fluidas en dispositivos Android e iOS de gama baja, gestionando actualizaciones asíncronas de Firebase Remote Config y streaming de assets con Addressables sin generar sobrecarga de memoria ni picos de Garbage Collection (GC).',
                architecture: 'Se estructuró una máquina de estados de UI reactiva y desacoplada donde las pantallas observan el estado del juego en lugar de realizar consultas continuas. Se implementó instanciación de prefabs con Addressables y gestión estricta del ciclo de vida de memoria, coordinadores de cola para recompensas en cascada y actualizaciones optimistas en cliente con reconciliación automática.',
                highlights: [
                    'Cero asignaciones de GC en tiempo de ejecución durante el paneo y zoom del mapa.',
                    'Latencia de transición de pantallas inferior a 100ms en dispositivos móviles de gama de entrada.',
                    'Arquitectura modular de banners para eventos que permite campañas en vivo sin necesidad de recompilar la aplicación.',
                    'Alta tolerancia a caídas de conexión y recuperación transparente durante el reclamo de recompensas.'
                ],
                stackTags: ['Unity 2022 LTS', 'C#', 'Firebase Remote Config', 'Addressables', 'DOTween Pro', 'UniTask', 'uGUI']
            },
            'harmony-tile': {
                title: 'Animación de Gameplay y Feedback',
                description: 'Física y sensación táctil de fichas, animaciones de reparto, indicadores visuales de jugadas válidas y validación instantánea del tablero a 60 FPS constantes.',
                role: 'Motion de Gameplay y UI',
                focus: 'Game Feel Táctil, Manejo de Input, Secuencias sin Asignación de Memoria',
                stack: 'Unity · C# · DOTween · uGUI · Efectos de Partículas',
                tag: 'HARMONY GAMES · CASO DE PRODUCCIÓN 02',
                challenge: 'Trasladar las mecánicas clásicas del juego de dominó a una experiencia móvil táctil y altamente responsiva. El diseño requería coreografías de reparto de fichas, arrastre con respuesta física, guías visuales de colocación válida y validación instantánea del tablero sin comprometer la tasa de cuadros por segundo.',
                architecture: 'Desarrollo de un gestor de secuencias de animación sin asignación de memoria utilizando curvas de aceleración (easing) precacheadas. Diseño de un sistema de detección de encaje en cuadrícula basado en hashing espacial para minimizar consultas de raycast por cuadro. Integración de controladores táctiles con retroalimentación de escala e inclinación en DOTween.',
                highlights: [
                    'Respuesta de arrastre al tablero inmediata con latencia de entrada menor a 16ms.',
                    'Curvas de Bezier personalizadas para las secuencias de reparto de fichas.',
                    'Rutinas de validación de colisiones y colocación sin asignación de memoria.',
                    'Señales hápticas y visuales calibradas al momento de conectar fichas.'
                ],
                stackTags: ['Unity', 'C#', 'DOTween Pro', 'uGUI', 'Easings Personalizados', 'Object Pooling']
            },
            'harmony-streak': {
                title: 'Movimiento de Fichas y Recompensas VFX',
                description: 'Multiplicadores de rachas, coreografía de ráfagas de partículas, vibración de pantalla dinámica y jerarquía de canvas VFX por capas.',
                role: 'Animación de UI e Ingeniería de VFX',
                focus: 'Sistemas de Partículas, Coreografía Temporal, Reutilización de Assets',
                stack: 'Unity · C# · DOTween · VFX · Shaders Personalizados',
                tag: 'HARMONY GAMES · CASO DE PRODUCCIÓN 03',
                challenge: 'Diseñar multiplicadores de rachas de alto impacto, recompensas de combos en cascada y retroalimentación de vibración de pantalla. El reto fue renderizar múltiples ráfagas simultáneas de partículas y marcadores numéricos flotantes sin provocar reconstrucciones de canvas ni caídas de fotogramas durante los momentos de combo máximo.',
                architecture: 'Construcción de una jerarquía de canvas de VFX independiente para aislar el renderizado de partículas del layout de uGUI, eliminando penalizaciones de redibujado. Uso de sub-emisores de ParticleSystem sincronizados con animaciones de impacto en DOTween y disparadores de audio en buses dedicados.',
                highlights: [
                    'Cero impacto de redibujado de canvas durante ráfagas de más de 500 partículas en capas.',
                    'Pools de objetos precalentados para partículas y etiquetas de puntuación flotante.',
                    'Gestor de multiplicadores modular fácilmente ajustable mediante ScriptableObjects.',
                    'Escalado adaptativo de densidad de partículas para perfiles móviles de bajo rendimiento.'
                ],
                stackTags: ['Unity', 'C#', 'DOTween', 'Sistemas de Partículas', 'Shader Graph', 'Sincronización de Audio']
            },
            'harmony-domino-adventures': {
                title: 'Minijuego Domino Adventures',
                description: 'Desarrollo de este minijuego completo desde el primer prototipo hasta el pulido final: reglas, estado del tablero, UI y entrega de recompensas.',
                role: 'Arquitectura Integral de Minijuego',
                focus: 'Bucle de Minijuego, Arquitectura uGUI, Ajuste de Balance',
                stack: 'Unity · C# · ScriptableObjects · DOTween',
                tag: 'HARMONY GAMES · MÓDULO INDEPENDIENTE',
                challenge: 'Desarrollar un modo de minijuego independiente de principio a fin, con mecánicas de tablero propias, árboles de progresión y distribución de recompensas dentro de un plazo de entrega exigente.',
                architecture: 'Implementación del patrón arquitectónico MVP (Model-View-Presenter) para desacoplar la simulación del puzzle de las capas de presentación visual. Los parámetros de nivel, modificadores de obstáculos y tablas de premios se estructuraron en ScriptableObjects para permitir al equipo de diseño balancear el juego directamente en el Inspector de Unity.',
                highlights: [
                    'Entrega de la funcionalidad completa antes de la fecha límite sin incidencias críticas en producción.',
                    'Pipeline de autoría de niveles ágil basado en ScriptableObjects para diseñadores.',
                    'Integración transparente con la economía global y sistema de monedas del juego.'
                ],
                stackTags: ['Unity', 'C#', 'ScriptableObjects', 'Patrón MVP', 'DOTween', 'uGUI']
            },
            'harmony-endless-horde': {
                title: 'Pantalla de Recompensas Endless Horde',
                description: 'Pantalla dinámica de fin de partida con contadores progresivos, animaciones de divisas, feedback de subida de nivel y navegación al menú.',
                role: 'Pantalla de Recompensas y Sistemas de Conteo',
                focus: 'Coreografía Asíncrona de Conteo, Sincronización de Audio, Object Pooling',
                stack: 'Unity · C# · DOTween · uGUI',
                tag: 'HARMONY GAMES · META UI',
                challenge: 'Crear una pantalla de resumen de partida atractiva y gratificante que mostrara contadores progresivos asíncronos, barras de subida de nivel y cartas de recompensa en una secuencia rítmica y fluida.',
                architecture: 'Desarrollo de un secuenciador asíncrono con UniTask y DOTween que sincroniza números ascendentes, efectos de sonido y apertura de cofres, con soporte para omitir la animación al tocar la pantalla.',
                highlights: [
                    'Cálculo matemático de incremento numérico con aceleración logarítmica suave.',
                    'Secuencia interactiva e interrumpible por el usuario para jugadores rápidos.',
                    'Modulación dinámica del tono de sonido según la magnitud de la recompensa obtenida.'
                ],
                stackTags: ['Unity', 'C#', 'UniTask', 'DOTween', 'VFX de Partículas en UI']
            },
            'match3d-rewards': {
                title: 'Pantalla de Recompensas y Audio Match3D',
                description: 'Implementación de la ventana de nivel completado, cálculo animado de puntuación, selección de efectos de sonido e integración en bus de audio.',
                role: 'Ingeniería de UI y Bus de Audio',
                focus: 'Flujo de Finalización, Espacialización de Audio, Claridad de UX',
                stack: 'Unity · C# · Integración de SFX · DOTween',
                tag: 'HARMONY GAMES · AUDIO Y UI',
                challenge: 'Ofrecer una pantalla de victoria vibrante para un juego de emparejamiento 3D con diseño de sonido integral, equilibrio estéreo y máxima claridad en las recompensas.',
                architecture: 'Integración de un sistema de reproducción de audio por capas con variación aleatoria de tono para evitar la fatiga auditiva. Coordinación entre el zoom de cámara 3D y la animación de entrada del modal 2D.',
                highlights: [
                    'Curaduría y calibración de todos los efectos de sonido para un feedback auditivo contundente.',
                    'Variación dinámica de tono que reduce la monotonía sonora en un 100%.',
                    'Composición responsiva multicámara 3D/2D.'
                ],
                stackTags: ['Unity', 'C#', 'Buses de SFX', 'Pools de AudioSource', 'DOTween']
            }
        }
    };

    // ==========================================================================
    // Language State & Switcher
    // ==========================================================================
    let currentLanguage = 'en';

    function setLanguage(lang) {
        if (!translations[lang]) return;
        currentLanguage = lang;
        document.documentElement.lang = lang;
        localStorage.setItem('gardo_lang', lang);

        // Update translation text nodes
        document.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.dataset.i18n;
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update Language Switcher Buttons
        document.querySelectorAll('.lang-btn').forEach((btn) => {
            const isMatch = btn.dataset.lang === lang;
            btn.classList.toggle('active', isMatch);
            btn.setAttribute('aria-pressed', String(isMatch));
        });

        // Update Active Case Card texts & Active Stage
        document.querySelectorAll('[data-case-trigger]').forEach((trigger) => {
            const caseId = trigger.dataset.caseId;
            const data = caseDatabase[lang][caseId];
            if (data) {
                trigger.dataset.title = data.title;
                trigger.dataset.description = data.description;
                trigger.dataset.role = data.role;
                trigger.dataset.focus = data.focus;
                trigger.dataset.stack = data.stack;
            }
        });

        // Refresh current active featured case view
        const currentActiveCard = document.querySelector('.case-picker .case-card.active') || document.querySelector('[data-case-trigger].active');
        if (currentActiveCard) {
            updateFeaturedCase(currentActiveCard);
        }
    }

    // Attach click listeners to language switchers
    document.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            if (lang && lang !== currentLanguage) {
                setLanguage(lang);
            }
        });
    });

    // ==========================================================================
    // Navigation & Mobile Drawer
    // ==========================================================================
    function updateNavbar() {
        navbar?.classList.toggle('shrink', window.scrollY > 30);
    }

    function toggleMobileNav(forceState) {
        const isCurrentlyOpen = primaryNav?.classList.contains('is-open');
        const shouldOpen = typeof forceState === 'boolean' ? forceState : !isCurrentlyOpen;

        primaryNav?.classList.toggle('is-open', shouldOpen);
        navBackdrop?.classList.toggle('is-open', shouldOpen);
        navToggle?.setAttribute('aria-expanded', String(shouldOpen));
        document.body.style.overflow = shouldOpen ? 'hidden' : '';
    }

    navToggle?.addEventListener('click', () => toggleMobileNav());
    navBackdrop?.addEventListener('click', () => toggleMobileNav(false));

    document.querySelectorAll('#primaryNav .nav-link, #primaryNav .nav-cv').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                toggleMobileNav(false);
            }
        });
    });

    // ==========================================================================
    // Hero Background Video Controller
    // ==========================================================================
    if (heroVideo && heroVideoToggle) {
        heroVideoToggle.addEventListener('click', () => {
            if (heroVideo.paused) {
                heroVideo.play().then(() => {
                    heroVideoToggle.classList.remove('is-paused');
                    heroVideoToggle.setAttribute('aria-label', 'Pause background video');
                }).catch(() => {});
            } else {
                heroVideo.pause();
                heroVideoToggle.classList.add('is-paused');
                heroVideoToggle.setAttribute('aria-label', 'Play background video');
            }
        });

        if (reducedMotion) {
            heroVideo.pause();
            heroVideoToggle.classList.add('is-paused');
        }
    }

    // ==========================================================================
    // Video Helper & Observer
    // ==========================================================================
    function setVideoSource(video, sourceUrl, posterUrl) {
        if (!video || !sourceUrl) return;

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
                // Autoplay gesture policy
            });
        }
    }

    // ==========================================================================
    // Featured Case Stage Controller
    // ==========================================================================
    let currentActiveCaseId = 'harmony-liveops';

    function updateFeaturedCase(trigger) {
        const stage = document.getElementById('featured-case-stage');
        const video = document.getElementById('featured-case-video');
        const title = document.getElementById('featured-case-title');
        const description = document.getElementById('featured-case-description');
        const role = document.getElementById('featured-case-role');
        const focus = document.getElementById('featured-case-focus');
        const stack = document.getElementById('featured-case-stack');
        const openDeepDiveBtn = document.getElementById('openDeepDiveBtn');
        
        const caseId = trigger.dataset.caseId || 'harmony-liveops';
        currentActiveCaseId = caseId;
        const isLandscape = trigger.dataset.orientation === 'landscape';
        const includesAudio = trigger.dataset.audio === 'true';

        const localizedData = caseDatabase[currentLanguage][caseId];

        document.querySelectorAll('[data-case-trigger]').forEach((candidate) => {
            const isActive = candidate === trigger;
            candidate.classList.toggle('active', isActive);
            candidate.setAttribute('aria-pressed', String(isActive));
        });

        stage?.classList.toggle('landscape-active', isLandscape);

        if (title) title.textContent = localizedData?.title || trigger.dataset.title || '';
        if (description) description.textContent = localizedData?.description || trigger.dataset.description || '';
        if (role) role.textContent = localizedData?.role || trigger.dataset.role || '';
        if (focus) focus.textContent = localizedData?.focus || trigger.dataset.focus || '';
        if (stack) stack.textContent = localizedData?.stack || trigger.dataset.stack || '';
        if (openDeepDiveBtn) openDeepDiveBtn.dataset.caseId = caseId;

        if (video) {
            video.muted = !includesAudio;
            setVideoSource(video, trigger.dataset.video, trigger.dataset.poster);
            if (!includesAudio) {
                playWhenAllowed(video);
            }
        }
    }

    document.querySelectorAll('[data-case-trigger]').forEach((trigger) => {
        trigger.addEventListener('click', () => updateFeaturedCase(trigger));
    });

    // ==========================================================================
    // Category Filter Chips Controller
    // ==========================================================================
    const filterChips = document.querySelectorAll('.filter-chip');
    const caseCards = document.querySelectorAll('.case-picker .case-card');
    const sampleCards = document.querySelectorAll('.sample-rail .sample-card');

    filterChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const filter = chip.dataset.filter;

            filterChips.forEach((c) => {
                const isActive = c === chip;
                c.classList.toggle('active', isActive);
                c.setAttribute('aria-pressed', String(isActive));
            });

            // Filter main case cards
            let firstVisibleCard = null;
            caseCards.forEach((card) => {
                const category = card.dataset.category || 'all';
                const match = filter === 'all' || category === filter;
                card.style.display = match ? '' : 'none';
                if (match && !firstVisibleCard) {
                    firstVisibleCard = card;
                }
            });

            // Filter sample cards
            sampleCards.forEach((card) => {
                const category = card.dataset.category || 'all';
                const match = filter === 'all' || category === filter;
                card.style.display = match ? '' : 'none';
            });

            // If current active card is hidden, switch to first visible
            const currentCard = document.querySelector('.case-picker .case-card.active');
            if (currentCard && currentCard.style.display === 'none' && firstVisibleCard) {
                updateFeaturedCase(firstVisibleCard);
            }
        });
    });

    // ==========================================================================
    // Technical Deep-Dive Modal Controller
    // ==========================================================================
    const deepDiveModal = document.getElementById('deepDiveModal');
    const openDeepDiveBtn = document.getElementById('openDeepDiveBtn');
    const closeDeepDiveBtn = document.getElementById('closeDeepDiveBtn');
    const modalCloseAction = document.getElementById('modalCloseAction');
    const modalTitle = document.getElementById('modalTitle');
    const modalTag = document.getElementById('modalTag');
    const modalChallenge = document.getElementById('modalChallenge');
    const modalArchitecture = document.getElementById('modalArchitecture');
    const modalHighlights = document.getElementById('modalHighlights');
    const modalStackTags = document.getElementById('modalStackTags');

    function openDeepDive(caseId) {
        const langData = caseDatabase[currentLanguage] || caseDatabase['en'];
        const data = langData[caseId] || langData['harmony-liveops'];
        if (!deepDiveModal || !data) return;

        if (modalTitle) modalTitle.textContent = data.title;
        if (modalTag) modalTag.textContent = data.tag;
        if (modalChallenge) modalChallenge.textContent = data.challenge;
        if (modalArchitecture) modalArchitecture.textContent = data.architecture;

        if (modalHighlights) {
            modalHighlights.innerHTML = '';
            data.highlights.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item;
                modalHighlights.appendChild(li);
            });
        }

        if (modalStackTags) {
            modalStackTags.innerHTML = '';
            data.stackTags.forEach((tech) => {
                const span = document.createElement('span');
                span.textContent = tech;
                modalStackTags.appendChild(span);
            });
        }

        if (typeof deepDiveModal.showModal === 'function') {
            deepDiveModal.showModal();
        } else {
            deepDiveModal.setAttribute('open', '');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeDeepDive() {
        if (!deepDiveModal) return;
        if (typeof deepDiveModal.close === 'function') {
            deepDiveModal.close();
        } else {
            deepDiveModal.removeAttribute('open');
        }
        document.body.style.overflow = '';
    }

    openDeepDiveBtn?.addEventListener('click', () => {
        const caseId = openDeepDiveBtn.dataset.caseId || currentActiveCaseId;
        openDeepDive(caseId);
    });

    closeDeepDiveBtn?.addEventListener('click', closeDeepDive);
    modalCloseAction?.addEventListener('click', closeDeepDive);

    deepDiveModal?.addEventListener('click', (e) => {
        const rect = deepDiveModal.getBoundingClientRect();
        const isInDialog = (
            rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
            closeDeepDive();
        }
    });

    // ==========================================================================
    // Video Theater / Lightbox Modal Controller
    // ==========================================================================
    const theaterModal = document.getElementById('theaterModal');
    const openTheaterBtn = document.getElementById('openTheaterBtn');
    const closeTheaterBtn = document.getElementById('closeTheaterBtn');
    const theaterTitle = document.getElementById('theaterTitle');
    const theaterVideo = document.getElementById('theaterVideo');

    function openTheater(videoSrc, title) {
        if (!theaterModal || !theaterVideo) return;

        if (theaterTitle) theaterTitle.textContent = title || (currentLanguage === 'es' ? 'Demostración en Video' : 'Demonstration Video');
        theaterVideo.src = videoSrc;
        theaterVideo.currentTime = 0;

        if (typeof theaterModal.showModal === 'function') {
            theaterModal.showModal();
        } else {
            theaterModal.setAttribute('open', '');
        }
        document.body.style.overflow = 'hidden';

        theaterVideo.play().catch(() => {});
    }

    function closeTheater() {
        if (!theaterModal || !theaterVideo) return;
        theaterVideo.pause();
        theaterVideo.src = '';
        if (typeof theaterModal.close === 'function') {
            theaterModal.close();
        } else {
            theaterModal.removeAttribute('open');
        }
        document.body.style.overflow = '';
    }

    openTheaterBtn?.addEventListener('click', () => {
        const activeCard = document.querySelector('.case-picker .case-card.active') || document.querySelector('.sample-rail .sample-card.active');
        const videoSrc = activeCard?.dataset.video || 'assets/img/harmony-liveops-flow.mp4';
        const title = activeCard?.dataset.title || 'LiveOps & Progression Flow';
        openTheater(videoSrc, title);
    });

    closeTheaterBtn?.addEventListener('click', closeTheater);

    theaterModal?.addEventListener('click', (e) => {
        const rect = theaterModal.getBoundingClientRect();
        const isInDialog = (
            rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isInDialog) {
            closeTheater();
        }
    });

    // Handle Escape Key for Modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (deepDiveModal?.open) closeDeepDive();
            if (theaterModal?.open) closeTheater();
            if (primaryNav?.classList.contains('is-open')) toggleMobileNav(false);
        }
    });

    // ==========================================================================
    // Mechanics Showcase Switcher (Kubiak & TreeCloud)
    // ==========================================================================
    window.changeShowcase = function (sectionId, videoSrc, title, description, triggerElement, posterUrl) {
        const video = document.getElementById(sectionId + '-video');
        const titleElement = document.getElementById(sectionId + '-title');
        const descriptionElement = document.getElementById(sectionId + '-desc');
        const container = document.getElementById(sectionId + '-showcase');

        setVideoSource(video, videoSrc, posterUrl);
        playWhenAllowed(video);

        if (titleElement) titleElement.textContent = title;
        if (descriptionElement) descriptionElement.textContent = description;

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

    // ==========================================================================
    // Intersection Observer for In-View Videos
    // ==========================================================================
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
            rootMargin: '120px 0px',
            threshold: 0.1
        });

        projectVideos.forEach((video) => videoObserver.observe(video));
    } else {
        projectVideos.forEach((video) => {
            const source = video.querySelector('source');
            setVideoSource(video, source?.dataset.src || source?.src, video.poster);
        });
    }

    // Handle Details Accordions
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

    // Visibility change pauses/resumes in-view videos
    document.addEventListener('visibilitychange', () => {
        projectVideos.forEach((video) => {
            if (document.hidden) {
                video.pause();
            } else if (video.dataset.inView === 'true') {
                playWhenAllowed(video);
            }
        });
    });

    // ==========================================================================
    // Toast Notification & Copy Email
    // ==========================================================================
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message) {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast-message font-mono';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3100);
    }

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
                    if (!copied) throw new Error('Copy fallback failed');
                }

                const msg = translations[currentLanguage].toast_copied + email;
                if (status) status.textContent = '✓ ' + msg;
                showToast(msg);
            } catch {
                const msg = translations[currentLanguage].toast_copy_error + email;
                if (status) status.textContent = msg;
                showToast(msg);
            }
        });
    });

    // ==========================================================================
    // Section Active Link Highlighting
    // ==========================================================================
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-menu .nav-link'));

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visible = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visible) return;

            navLinks.forEach((link) => {
                const isCurrent = link.getAttribute('href') === '#' + visible.target.id;
                if (isCurrent) {
                    link.setAttribute('aria-current', 'true');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        }, {
            rootMargin: '-25% 0px -55%',
            threshold: [0, 0.1, 0.35]
        });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    // Set Dynamic Year
    document.querySelectorAll('[data-current-year]').forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });

    // Initialize preferred language from localStorage or browser settings
    const savedLang = localStorage.getItem('gardo_lang');
    const browserLang = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
    const initialLang = savedLang || browserLang;
    setLanguage(initialLang);

    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
})();