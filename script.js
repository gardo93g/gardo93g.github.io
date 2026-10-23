(() => {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navbar = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    const navBackdrop = document.getElementById('navBackdrop');
    const projectVideos = Array.from(document.querySelectorAll('.project-video'));

    // ==========================================================================
    // Bilingual Translation Dictionary
    // ==========================================================================
    const translations = {
        en: {
            skip_link: 'Skip to main content',
            nav_menu_btn: 'Menu',
            nav_selected_work: 'Selected work',
            nav_experience: 'Experience',
            nav_rnd: 'R&D lab',
            nav_about: 'About',
            nav_contact: 'Contact',
            hero_status: 'Available for remote roles',
            hero_kicker_title: 'Unity developer · UI and gameplay systems',
            hero_title: 'I build the UI and game feel of mobile games.',
            hero_summary: '5+ years in Unity and C#: game interfaces, LiveOps flows, and gameplay feedback. Most recently on Domino Delights, a free-to-play puzzle game on iOS and Android.',
            hero_btn_explore: 'See selected work',
            hero_btn_cv: 'Download CV',
            hero_metric_1_strong: '5+ years',
            hero_metric_1_span: 'Mobile games in production',
            hero_metric_2_strong: 'Unity and C#',
            hero_metric_2_span: 'UI, gameplay, LiveOps',
            hero_metric_3_strong: 'Remote',
            hero_metric_3_span: 'US and global teams',
            section_01_title: 'Production work at Harmony Games',
            section_01_subtitle: 'LiveOps flows, progression maps, menus, DOTween feedback, and audio integration.',
            filter_all: 'All work',
            filter_liveops: 'LiveOps and UI',
            filter_gameplay: 'Gameplay and motion',
            case01_card_title: 'LiveOps & progression',
            case01_card_sub: 'Systems / player flow',
            case02_card_title: 'Gameplay feedback',
            case02_card_sub: 'Motion / interaction',
            case03_card_title: 'Tile motion & VFX',
            case03_card_sub: 'DOTween / game feel',
            case04_card_title: 'Domino Adventures',
            case04_card_sub: 'Full minigame loop',
            case05_card_title: 'Endless Horde',
            case05_card_sub: 'Reward tally flow',
            case06_card_title: 'Match3D Rewards',
            case06_card_sub: 'UI + audio',
            btn_expand_theater: 'Expand',
            case_company_eyebrow: 'Harmony Games',
            fact_my_part: 'My part',
            fact_focus: 'Focus',
            fact_built_with: 'Built with',
            btn_deep_dive: 'Technical deep dive',
            section_02_title: 'Experience',
            section_02_subtitle: '5+ years working with US and international teams on mobile games, prototypes, and enterprise software.',
            timeline_loc_remote_usa: 'Remote · USA',
            role_harmony: 'Unity engineer',
            desc_harmony: 'Unity engineer on Domino Delights (iOS/Android), a free-to-play puzzle game with 4,000+ levels in 16 languages. I built core UI screens, LiveOps event flows, meta progression features, and Firebase Remote Config hooks, turning Figma designs into responsive uGUI layouts with DOTween animations.',
            harmony_h1: 'Live menus, events, progression, boosters, and rewards',
            harmony_h2: 'Figma-to-Unity uGUI implementation across mobile aspect ratios',
            harmony_h3: 'Addressables asset delivery and memory optimization',
            harmony_h4: 'Production bug fixing and LiveOps maintenance',
            role_kubiak: 'Mobile game developer',
            desc_kubiak: 'Built gameplay mechanics, touch controls, and menu flows for mobile prototypes on short deadlines.',
            result_kubiak_strong: '3 playable prototypes',
            result_kubiak_span: 'delivered within six weeks from concept to device.',
            role_treecloud: 'Game developer intern',
            desc_treecloud: 'Built Unreal Engine 4 prototypes using Kinect motion input, drone navigation, and LiDAR point-cloud rendering.',
            role_ofbox: 'Junior software developer',
            desc_ofbox: 'Built internal C#/.NET tools, data integration scripts, and bug fixes for existing business applications.',
            archive_label: 'Mechanics archive',
            archive_kubiak_title: 'Kubiak LLC — Mobile prototypes',
            archive_kubiak_sub: 'Five interactive mechanics and UI systems',
            archive_treecloud_title: 'TreeCloud — Technical prototypes',
            archive_treecloud_sub: 'Hardware inputs, LiDAR data, and gesture control',
            archive_explore: 'Explore mechanics',
            kubiak_m1_title: 'Stable cleaning',
            kubiak_m1_sub: 'Interaction system',
            kubiak_m2_title: 'Horse grooming',
            kubiak_m2_sub: 'Shaders & particles',
            kubiak_m3_title: 'Feeding system',
            kubiak_m3_sub: 'Recipe and fill gauge',
            kubiak_m4_title: 'Strategy battle UI',
            kubiak_m4_sub: 'Turn-based combat HUD',
            kubiak_m5_title: 'Race results UI',
            kubiak_m5_sub: 'Results and podium',
            tc_m1_title: 'Kinect ping pong',
            tc_m1_sub: 'Hardware input',
            tc_m2_title: 'Bug smash',
            tc_m2_sub: 'Motion detection',
            tc_m3_title: 'LiDAR visualization',
            tc_m3_sub: 'Data processing',
            tc_m4_title: 'Memory game',
            tc_m4_sub: 'Gesture control',
            kubiak_m1_desc: 'Touch mechanic for cleaning the stall floor against a timer.',
            kubiak_m2_desc: 'Brushing tool that reveals a clean coat using texture masking and particles.',
            kubiak_m3_desc: 'Mixing feed from a recipe and filling the bucket with a measuring gauge.',
            kubiak_m4_desc: 'Turn-based battle HUD for Lost Realms: health bars, round tracker, unit portraits, and damage numbers.',
            kubiak_m5_desc: 'Race results table and podium screen with driver cards and coin rewards.',
            tc_m1_desc: 'Pong-style game on a football pitch, with paddles driven by Kinect body tracking.',
            tc_m2_desc: 'Kinect minigame where players swat bugs crawling across the screen.',
            tc_m3_desc: 'Point-cloud view of a simulated car LiDAR scan driving through a city, in Unreal Engine 4.',
            tc_m4_desc: 'Card-matching memory game controlled with hand gestures.',
            ue4_m1_kicker: 'Rigging and animation',
            ue4_m2_kicker: 'Runtime systems',
            ue4_m3_kicker: 'VFX and state',
            section_03_title: 'R&D: Blender pipelines and engine studies',
            section_03_subtitle: 'Personal experiments in Blender retopology via MCP, 3D-to-2D spritesheet rendering, and VR in Unreal Engine 4.',
            lab_exp1_title: 'Automated character pipeline',
            lab_exp1_desc: 'Using Blender through the Model Context Protocol (MCP) to take a dense, fully triangulated source model to a clean quad-based mesh with baked PBR textures.',
            lab_exp1_note: 'The agent runs cleanup, remeshing, UVs and baking inside Blender through MCP. Every run has to pass automated checks before I review the result visually.',
            lab_s1_label: 'Source mesh',
            lab_s1_val: '50,000 tris · all triangles',
            lab_s2_label: 'Retopology',
            lab_s2_val: '17,531 faces · 99.7% quads',
            lab_s3_label: 'Baked maps',
            lab_s3_val: '5 PBR maps · 2K',
            lab_s4_label: 'Automated checks',
            lab_s4_val: 'Manifold · single shell · re-import',
            lab_s5_label: 'Output',
            lab_s5_val: '28 sheets · 7 animations',
            lab_s6_label: 'Directions',
            lab_s6_val: '2 cameras, rendered separately',
            lab_s7_label: 'Cells',
            lab_s7_val: '512 px · 30 and 50 frames',
            lab_s8_label: 'Alignment',
            lab_s8_val: 'Center drift ≤ 0.5 px',
            sprite_caption: 'Live, played from the sheet',
            lab_fig_5: 'Exported spritesheet · walk · 30 frames',
            lab_fig_1: 'Triangulated source → quad retopology',
            lab_fig_2: 'Concept and look target',
            lab_exp2_title: '3D animation to 2D spritesheet workflow',
            lab_exp2_desc: 'Animating a 3D character in Blender and rendering 28 sprite sheets across 7 animations from two camera angles.',
            lab_fig_3: 'Animation rigging test',
            lab_fig_4: 'Spritesheet generation',
            lab_exp3_title: 'UCA VR museum',
            lab_exp3_desc: 'A virtual museum prototype I programmed in Unreal Engine 4 as my university thesis project at UCA. Visitors move through the rooms in VR, inspect exhibits, open information panels, and watch archive footage.',
            ue4_studies_kicker: 'Earlier personal studies: retargeting, runtime mesh swap, shield VFX',
            ue4_studies_title: 'Unreal Engine 4 mechanics',
            ue4_m1_title: 'Animation retargeting',
            ue4_m1_desc: 'Sharing one animation set across humanoid rigs with different proportions.',
            ue4_m2_title: 'Runtime mesh swap',
            ue4_m2_desc: 'Swapping the character mesh at runtime while keeping animation state.',
            ue4_m3_title: 'Shield VFX logic',
            ue4_m3_desc: 'Shield activation, impact dissipation, and audio sync logic.',
            section_04_title: 'About me',
            about_lead: 'I\'m a Unity developer with 5+ years of experience building mobile games, plus a background in C# software.',
            about_p2: 'My focus is turning Figma designs into responsive Unity UI with uGUI and UI Toolkit, connecting screens to LiveOps services, and writing clear gameplay and feedback systems in C#.',
            about_loc: 'San Salvador, El Salvador',
            about_lang: 'Professional English & native Spanish',
            about_remote: 'Remote work with US and global teams',
            tech_stack_title: 'Core tech stack',
            section_05_title: 'Get in touch',
            contact_p: "I'm open to full-time remote opportunities, contractor roles, and technical collaborations in Unity UI and gameplay systems.",
            btn_write_email: 'Write an email',
            btn_copy_email: 'Copy email',
            link_resume: 'Resume / CV',
            footer_back_to_top: 'Back to top',
            modal_block_01: 'The challenge',
            modal_block_02: 'Architecture and implementation',
            modal_block_03: 'Key technical results',
            modal_block_04: 'Applied technologies',
            btn_close_breakdown: 'Close',
            toast_copied: 'Email copied to clipboard: ',
            toast_copy_error: 'Could not copy automatically. Email: '
        },
        es: {
            skip_link: 'Saltar al contenido principal',
            nav_menu_btn: 'Menú',
            nav_selected_work: 'Trabajos selectos',
            nav_experience: 'Experiencia',
            nav_rnd: 'Laboratorio I+D',
            nav_about: 'Sobre mí',
            nav_contact: 'Contacto',
            hero_status: 'Disponible para roles remotos',
            hero_kicker_title: 'Desarrollador Unity · UI y sistemas de gameplay',
            hero_title: 'Programo la UI y el game feel de juegos móviles.',
            hero_summary: 'Más de 5 años con Unity y C#: interfaces de juego, flujos LiveOps y feedback de gameplay. Lo más reciente: Domino Delights, un juego de puzzle free-to-play para iOS y Android.',
            hero_btn_explore: 'Ver trabajos selectos',
            hero_btn_cv: 'Descargar CV',
            hero_metric_1_strong: '5+ años',
            hero_metric_1_span: 'Juegos móviles en producción',
            hero_metric_2_strong: 'Unity y C#',
            hero_metric_2_span: 'UI, gameplay, LiveOps',
            hero_metric_3_strong: 'Remoto',
            hero_metric_3_span: 'Equipos de EE. UU. y globales',
            section_01_title: 'Trabajo de producción en Harmony Games',
            section_01_subtitle: 'Flujos de LiveOps, mapas de progresión, menús, feedback con DOTween e integración de audio.',
            filter_all: 'Todo',
            filter_liveops: 'LiveOps y UI',
            filter_gameplay: 'Gameplay y animación',
            case01_card_title: 'LiveOps y progresión',
            case01_card_sub: 'Sistemas / flujo de jugador',
            case02_card_title: 'Feedback de gameplay',
            case02_card_sub: 'Animación / interacción',
            case03_card_title: 'Movimiento de fichas y VFX',
            case03_card_sub: 'DOTween / game feel',
            case04_card_title: 'Domino Adventures',
            case04_card_sub: 'Minijuego completo',
            case05_card_title: 'Endless Horde',
            case05_card_sub: 'Conteo de recompensas',
            case06_card_title: 'Match3D Rewards',
            case06_card_sub: 'UI + audio',
            btn_expand_theater: 'Ampliar',
            case_company_eyebrow: 'Harmony Games',
            fact_my_part: 'Mi parte',
            fact_focus: 'Enfoque',
            fact_built_with: 'Tecnologías',
            btn_deep_dive: 'Ficha técnica',
            section_02_title: 'Experiencia',
            section_02_subtitle: 'Más de 5 años trabajando con equipos de EE. UU. e internacionales en juegos móviles, prototipos y software de gestión.',
            timeline_loc_remote_usa: 'Remoto · EE. UU.',
            role_harmony: 'Ingeniero Unity',
            desc_harmony: 'Ingeniero Unity en Domino Delights (iOS/Android), un juego de puzzle free-to-play con más de 4.000 niveles en 16 idiomas. Programé pantallas principales de UI, flujos de eventos LiveOps, sistemas de progresión e integraciones con Firebase Remote Config, llevando diseños de Figma a interfaces uGUI con animaciones en DOTween.',
            harmony_h1: 'Menús en vivo, eventos, progresión, boosters y recompensas',
            harmony_h2: 'Implementación de UI de Figma a Unity uGUI para distintas pantallas móviles',
            harmony_h3: 'Entrega de assets con Addressables y optimización de memoria',
            harmony_h4: 'Corrección de bugs en producción y mantenimiento LiveOps',
            role_kubiak: 'Desarrollador de juegos móviles',
            desc_kubiak: 'Programé mecánicas de gameplay, controles táctiles y menús para prototipos móviles en plazos cortos.',
            result_kubiak_strong: '3 prototipos jugables',
            result_kubiak_span: 'entregados en seis semanas desde el concepto hasta el dispositivo.',
            role_treecloud: 'Pasante de desarrollo de videojuegos',
            desc_treecloud: 'Desarrollé prototipos en Unreal Engine 4 con control por movimiento en Kinect, navegación de drones y visualización de nubes de puntos LiDAR.',
            role_ofbox: 'Desarrollador de software junior',
            desc_ofbox: 'Desarrollé herramientas internas en C#/.NET, scripts de integración de datos y correcciones en aplicaciones empresariales.',
            archive_label: 'Archivo de mecánicas',
            archive_kubiak_title: 'Kubiak LLC — Prototipos móviles',
            archive_kubiak_sub: 'Cinco mecánicas interactivas y sistemas de UI',
            archive_treecloud_title: 'TreeCloud — Prototipos técnicos',
            archive_treecloud_sub: 'Entradas por hardware, datos LiDAR y control por gestos',
            archive_explore: 'Explorar mecánicas',
            kubiak_m1_title: 'Limpieza de establo',
            kubiak_m1_sub: 'Sistema de interacción',
            kubiak_m2_title: 'Cuidado de caballos',
            kubiak_m2_sub: 'Shaders y partículas',
            kubiak_m3_title: 'Sistema de alimentación',
            kubiak_m3_sub: 'Receta y medidor de llenado',
            kubiak_m4_title: 'UI de batalla estratégica',
            kubiak_m4_sub: 'HUD de combate por turnos',
            kubiak_m5_title: 'UI de resultados de carrera',
            kubiak_m5_sub: 'Resultados y podio',
            tc_m1_title: 'Ping pong con Kinect',
            tc_m1_sub: 'Entrada por hardware',
            tc_m2_title: 'Aplastar insectos',
            tc_m2_sub: 'Detección de movimiento',
            tc_m3_title: 'Visualización LiDAR',
            tc_m3_sub: 'Procesamiento de datos',
            tc_m4_title: 'Juego de memoria',
            tc_m4_sub: 'Control por gestos',
            kubiak_m1_desc: 'Mecánica táctil para limpiar el suelo del establo contra reloj.',
            kubiak_m2_desc: 'Herramienta de cepillado que descubre el pelaje limpio con máscaras de textura y partículas.',
            kubiak_m3_desc: 'Preparación de alimento según una receta, llenando el cubo con un medidor.',
            kubiak_m4_desc: 'HUD de combate por turnos para Lost Realms: barras de vida, rondas, retratos de unidades y números de daño.',
            kubiak_m5_desc: 'Tabla de resultados de carrera y pantalla de podio con fichas de pilotos y premios en monedas.',
            tc_m1_desc: 'Juego tipo pong en un campo de fútbol, con paletas controladas por seguimiento corporal con Kinect.',
            tc_m2_desc: 'Minijuego con Kinect donde el jugador aplasta insectos que cruzan la pantalla.',
            tc_m3_desc: 'Nube de puntos del escaneo LiDAR simulado de un coche que recorre una ciudad, en Unreal Engine 4.',
            tc_m4_desc: 'Juego de memoria de emparejar cartas controlado con gestos de las manos.',
            ue4_m1_kicker: 'Rigging y animación',
            ue4_m2_kicker: 'Sistemas en ejecución',
            ue4_m3_kicker: 'VFX y estado',
            section_03_title: 'I+D: pipelines en Blender y estudios de motor',
            section_03_subtitle: 'Experimentos propios de retopología en Blender vía MCP, generación de spritesheets 2D desde 3D y VR en Unreal Engine 4.',
            lab_exp1_title: 'Pipeline automatizado de personajes',
            lab_exp1_desc: 'Uso de Blender mediante Model Context Protocol (MCP) para llevar un modelo denso y totalmente triangulado a una malla limpia basada en quads con texturas PBR horneadas.',
            lab_exp1_note: 'El agente ejecuta la limpieza, el remallado, los UV y el horneado dentro de Blender mediante MCP. Cada ejecución debe superar comprobaciones automáticas antes de que yo revise el resultado visualmente.',
            lab_s1_label: 'Malla de origen',
            lab_s1_val: '50.000 tris · todo triángulos',
            lab_s2_label: 'Retopología',
            lab_s2_val: '17.531 caras · 99,7 % quads',
            lab_s3_label: 'Mapas horneados',
            lab_s3_val: '5 mapas PBR · 2K',
            lab_s4_label: 'Comprobaciones automáticas',
            lab_s4_val: 'Manifold · una sola pieza · reimportación',
            lab_s5_label: 'Salida',
            lab_s5_val: '28 sheets · 7 animaciones',
            lab_s6_label: 'Direcciones',
            lab_s6_val: '2 cámaras, renderizadas por separado',
            lab_s7_label: 'Celdas',
            lab_s7_val: '512 px · 30 y 50 cuadros',
            lab_s8_label: 'Alineación',
            lab_s8_val: 'Deriva del centro ≤ 0,5 px',
            sprite_caption: 'En vivo, reproducido desde el sheet',
            lab_fig_5: 'Spritesheet exportado · caminata · 30 cuadros',
            lab_fig_1: 'Origen triangulado → retopología en quads',
            lab_fig_2: 'Concepto y objetivo visual',
            lab_exp2_title: 'De animación 3D a spritesheets 2D',
            lab_exp2_desc: 'Animación de un personaje 3D en Blender y renderizado automático de 28 spritesheets (7 animaciones desde dos cámaras).',
            lab_fig_3: 'Prueba de rigging y animación',
            lab_fig_4: 'Generación de spritesheet',
            lab_exp3_title: 'Museo VR en la UCA',
            lab_exp3_desc: 'Prototipo de museo virtual que programé en Unreal Engine 4 como proyecto de tesis universitaria en la UCA. Los visitantes recorren las salas en VR, inspeccionan las piezas, abren paneles de información y ven material de archivo.',
            ue4_studies_kicker: 'Estudios personales anteriores: retargeting, cambio de malla en ejecución, VFX de escudo',
            ue4_studies_title: 'Mecánicas en Unreal Engine 4',
            ue4_m1_title: 'Retargeting de animación',
            ue4_m1_desc: 'Reutilización de un mismo set de animaciones entre esqueletos con distintas proporciones.',
            ue4_m2_title: 'Cambio de malla en ejecución',
            ue4_m2_desc: 'Cambio de malla del personaje en plena ejecución conservando el estado de la animación.',
            ue4_m3_title: 'Lógica y VFX de escudo',
            ue4_m3_desc: 'Activación de escudo, disipación de impacto y lógica de audio.',
            section_04_title: 'Sobre mí',
            about_lead: 'Soy desarrollador Unity con más de 5 años de experiencia creando juegos móviles, con base previa en software en C#.',
            about_p2: 'Me enfoco en pasar diseños de Figma a interfaces responsivas en Unity con uGUI y UI Toolkit, conectarlas con servicios LiveOps y programar sistemas de gameplay y feedback claros en C#.',
            about_loc: 'San Salvador, El Salvador',
            about_lang: 'Inglés profesional y español nativo',
            about_remote: 'Trabajo remoto con equipos de EE. UU. y globales',
            tech_stack_title: 'Stack tecnológico principal',
            section_05_title: 'Hablemos',
            contact_p: 'Disponible para oportunidades remotas a tiempo completo, proyectos por contrato y colaboraciones técnicas en UI y sistemas de gameplay en Unity.',
            btn_write_email: 'Enviar un correo',
            btn_copy_email: 'Copiar correo',
            link_resume: 'Currículum / CV',
            footer_back_to_top: 'Volver arriba',
            modal_block_01: 'El desafío',
            modal_block_02: 'Arquitectura e implementación',
            modal_block_03: 'Resultados técnicos clave',
            modal_block_04: 'Tecnologías aplicadas',
            btn_close_breakdown: 'Cerrar',
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
                title: 'LiveOps & progression flow',
                description: 'Built the progression map, live event entry points, booster flows, and reward popups.',
                role: 'UI & systems programming',
                focus: 'Screen flow, live events, rewards & remote config',
                stack: 'Unity · C# · Firebase · Addressables · DOTween',
                tag: 'Harmony Games · Progression and LiveOps',
                challenge: 'Connecting the progression map, live event triggers, boosters, and reward popups in a live mobile game. Map scrolling and screen transitions had to stay smooth on lower-end Android and iOS devices while pulling event data from Firebase Remote Config and loading assets through Addressables.',
                architecture: 'I separated screen state from view logic so menus react to game events instead of polling. Popups and event assets load on demand via Addressables and release when closed, and reward queues display sequential payouts in order without overlapping modals.',
                highlights: [
                    'Map zooming and panning tuned to avoid per-frame allocations.',
                    'Fast screen transitions on low-tier mobile devices.',
                    'Modular event banners driven by remote config, so campaigns change without an app update.',
                    'Ordered popup queue so multiple rewards don\'t overlap on screen.'
                ],
                stackTags: ['Unity 2022 LTS', 'C#', 'Firebase Remote Config', 'Addressables', 'DOTween Pro', 'UniTask', 'uGUI']
            },
            'harmony-tile': {
                title: 'Gameplay motion & feedback',
                description: 'Built the tile dealing animations, drag-and-drop response, valid-move highlights, and board placement feedback.',
                role: 'Gameplay & UI motion',
                focus: 'Game feel, touch input & tween sequences',
                stack: 'Unity · C# · DOTween · uGUI · Particle FX',
                tag: 'Harmony Games · Gameplay feedback',
                challenge: 'Making domino tile interactions feel clear and responsive on touch screens: dealing tiles at the start of a round, dragging and snapping them to valid spots, and showing legal moves without frame drops.',
                architecture: 'I built reusable DOTween sequences with custom easing curves for dealing and placement, and connected touch input handlers to scale, tilt, and highlight feedback so the board responds immediately as the player drags a tile.',
                highlights: [
                    'Immediate drag-to-board response to touch input.',
                    'Custom easing curves for tile dealing and placement.',
                    'Cached tween sequences to avoid recreating animations every turn.',
                    'Tuned haptic and visual cues on tile connection.'
                ],
                stackTags: ['Unity', 'C#', 'DOTween Pro', 'uGUI', 'Custom Easings', 'Object Pooling']
            },
            'harmony-streak': {
                title: 'Streak multipliers & VFX rewards',
                description: 'Built the streak multiplier UI, particle bursts, screen shake, and separate VFX canvas setup.',
                role: 'UI animation & VFX',
                focus: 'Particle systems, animation timing & object pooling',
                stack: 'Unity · C# · DOTween · VFX · Custom Shaders',
                tag: 'Harmony Games · Motion and VFX',
                challenge: 'Playing streak animations, particle bursts, and floating score popups at the same time without forcing expensive uGUI canvas rebuilds.',
                architecture: 'I placed animated VFX and particles on separate canvases so they don\'t dirty the static HUD layout, pooled the floating score labels and particle prefabs, and synced the DOTween punch animations with sound triggers.',
                highlights: [
                    'Layered particle bursts isolated from uGUI canvases to avoid layout rebuilds.',
                    'Pre-warmed pools for particles and floating score labels.',
                    'Streak multiplier values tuned through ScriptableObjects.'
                ],
                stackTags: ['Unity', 'C#', 'DOTween', 'Particle Systems', 'Shader Graph', 'Audio Bus Sync']
            },
            'harmony-domino-adventures': {
                title: 'Domino Adventures minigame',
                description: 'Built this entire standalone minigame loop from first prototype through production polish: rules, board state, UI, and reward payouts.',
                role: 'Feature owner (prototype to release)',
                focus: 'Game loop, UI & ScriptableObject level data',
                stack: 'Unity · C# · ScriptableObjects · DOTween',
                tag: 'Harmony Games · Standalone minigame',
                challenge: 'Building a standalone minigame mode from scratch (board rules, progression path, UI, and reward payouts) within a single milestone.',
                architecture: 'I separated the board rules and state from the uGUI presentation so we could iterate on the visuals without breaking gameplay. Level layouts, obstacles, and reward tables live in ScriptableObjects so designers could tune balance in the Inspector.',
                highlights: [
                    'Owned the full feature loop from first prototype to release.',
                    'ScriptableObject level data that designers edit in the Inspector.',
                    'Connected directly to the main game\'s currency and inventory systems.'
                ],
                stackTags: ['Unity', 'C#', 'ScriptableObjects', 'MVP Pattern', 'DOTween', 'uGUI']
            },
            'harmony-endless-horde': {
                title: 'Endless Horde reward screen',
                description: 'Built the end-of-run summary screen: animated score and currency counters, level-up progress bar, and reward cards.',
                role: 'UI & reward sequence programming',
                focus: 'Async sequences, audio sync & tap-to-skip',
                stack: 'Unity · C# · DOTween · uGUI',
                tag: 'Harmony Games · Meta UI',
                challenge: 'Building an end-of-run summary screen that plays counters, progress bars, and card reveals in sequence, while letting players tap at any point to skip straight to the final totals.',
                architecture: 'I wrote an async sequence with UniTask and DOTween that steps through each counter, progress bar, and chest animation in order, synced with audio cues and a tap-to-skip handler that completes all active tweens cleanly.',
                highlights: [
                    'Animated number counters with eased speed curves.',
                    'Tap-to-skip support that jumps cleanly to the final state.',
                    'Sound pitch rises with the size of the reward.'
                ],
                stackTags: ['Unity', 'C#', 'UniTask', 'DOTween', 'UI Particle VFX']
            },
            'match3d-rewards': {
                title: 'Match3D reward screen & SFX',
                description: 'Built the level-complete reward screen, animated score tally, and sound effect integration.',
                role: 'UI & audio integration',
                focus: 'Victory flow, SFX timing & pitch variation',
                stack: 'Unity · C# · SFX Integration · DOTween',
                tag: 'Harmony Games · Audio and UI',
                challenge: 'Pairing the level-complete UI animations with sound effects so each star, counter, and reward hits on time without sounding repetitive across dozens of levels.',
                architecture: 'I connected the DOTween UI sequence callbacks to pooled AudioSources with slight pitch variation on repeated ticks, and timed the 3D camera zoom to settle as the 2D reward modal opens.',
                highlights: [
                    'Selected and timed sound effects for each step of the reward sequence.',
                    'Dynamic pitch variation so repeated wins do not sound identical.',
                    'Camera zoom timed with the reward popup entrance.'
                ],
                stackTags: ['Unity', 'C#', 'SFX Bus Integration', 'AudioSource Pooling', 'DOTween']
            }
        },
        es: {
            'harmony-liveops': {
                title: 'Flujo de LiveOps y progresión',
                description: 'Programé el mapa de progresión, los accesos a eventos en vivo, el flujo de boosters y las ventanas de recompensa.',
                role: 'Programación de UI y sistemas',
                focus: 'Flujo de pantallas, eventos, recompensas y configuración remota',
                stack: 'Unity · C# · Firebase · Addressables · DOTween',
                tag: 'Harmony Games · Progresión y LiveOps',
                challenge: 'Conectar el mapa de progresión, los eventos en vivo, los boosters y las ventanas de recompensa dentro de un juego en producción. El desplazamiento del mapa y las transiciones debían mantenerse fluidos en teléfonos Android e iOS de gama baja mientras se leían configuraciones de Firebase Remote Config y se cargaban assets con Addressables.',
                architecture: 'Separé el estado de las pantallas de la vista para que los menús respondan a eventos del juego. Las ventanas y los assets de eventos se cargan bajo demanda con Addressables y se liberan al cerrarse, y una cola de ventanas ordena las recompensas en secuencia para que no se solapen.',
                highlights: [
                    'Paneo y zoom del mapa ajustados para evitar asignaciones de memoria por cuadro.',
                    'Transiciones de pantalla rápidas en dispositivos móviles de gama de entrada.',
                    'Banners de eventos modulares controlados por configuración remota: las campañas cambian sin actualizar la aplicación.',
                    'Cola ordenada de ventanas para que las recompensas múltiples no se solapen.'
                ],
                stackTags: ['Unity 2022 LTS', 'C#', 'Firebase Remote Config', 'Addressables', 'DOTween Pro', 'UniTask', 'uGUI']
            },
            'harmony-tile': {
                title: 'Animación de gameplay y feedback',
                description: 'Programé las animaciones de reparto de fichas, la respuesta al arrastrar, los indicadores de jugada válida y el feedback al colocar en el tablero.',
                role: 'Animación de gameplay y UI',
                focus: 'Game feel, control táctil y secuencias de animación',
                stack: 'Unity · C# · DOTween · uGUI · Efectos de Partículas',
                tag: 'Harmony Games · Feedback de gameplay',
                challenge: 'Lograr que el manejo de las fichas de dominó se sintiera claro y ágil en pantalla táctil: repartir al inicio de la ronda, arrastrar y encajar fichas en posiciones válidas y resaltar las jugadas posibles sin tirones.',
                architecture: 'Armé secuencias reutilizables en DOTween con curvas de easing a medida para el reparto y la colocación, y conecté los eventos táctiles con cambios de escala, inclinación y resaltado para que el tablero responda en cuanto el jugador arrastra una ficha.',
                highlights: [
                    'Respuesta inmediata al arrastrar fichas al tablero.',
                    'Curvas de easing ajustadas para el reparto y encaje de fichas.',
                    'Secuencias de animación cacheadas para no recrearlas en cada turno.',
                    'Señales hápticas y visuales calibradas al conectar fichas.'
                ],
                stackTags: ['Unity', 'C#', 'DOTween Pro', 'uGUI', 'Easings Personalizados', 'Object Pooling']
            },
            'harmony-streak': {
                title: 'Multiplicadores de racha y VFX',
                description: 'Implementé la UI del multiplicador de rachas, los efectos de partículas, la vibración de pantalla y la separación de canvas para VFX.',
                role: 'Animación de UI y VFX',
                focus: 'Sistemas de partículas, sincronización y object pooling',
                stack: 'Unity · C# · DOTween · VFX · Shaders Personalizados',
                tag: 'Harmony Games · Animación y VFX',
                challenge: 'Reproducir animaciones de racha, partículas y textos flotantes al mismo tiempo sin forzar reconstrucciones costosas en los canvas de uGUI.',
                architecture: 'Separé los VFX y las partículas en sus propios canvas para no redibujar el HUD estático, usé object pooling para las partículas y etiquetas flotantes, y sincronicé las animaciones de DOTween con los disparos de audio.',
                highlights: [
                    'Ráfagas de partículas aisladas de los canvas de uGUI para evitar reconstrucciones de layout.',
                    'Pools precalentados para partículas y textos de puntuación flotantes.',
                    'Valores del multiplicador de rachas ajustables con ScriptableObjects.'
                ],
                stackTags: ['Unity', 'C#', 'DOTween', 'Sistemas de Partículas', 'Shader Graph', 'Sincronización de Audio']
            },
            'harmony-domino-adventures': {
                title: 'Minijuego Domino Adventures',
                description: 'Desarrollo de este minijuego completo desde el primer prototipo hasta el pulido final: reglas, estado del tablero, UI y entrega de recompensas.',
                role: 'Desarrollo completo del minijuego',
                focus: 'Bucle de juego, UI y datos de nivel en ScriptableObjects',
                stack: 'Unity · C# · ScriptableObjects · DOTween',
                tag: 'Harmony Games · Minijuego independiente',
                challenge: 'Construir un modo de minijuego independiente de principio a fin (reglas de tablero, mapa de avance, UI y entrega de premios) dentro de un mismo ciclo de entrega.',
                architecture: 'Separé la lógica y el estado del tablero de la vista en uGUI para poder iterar la interfaz sin romper las reglas. Los niveles, obstáculos y tablas de premios se configuraron en ScriptableObjects para que diseño ajustara el balance desde el Inspector.',
                highlights: [
                    'Responsable de la funcionalidad completa, del primer prototipo al lanzamiento.',
                    'Datos de nivel en ScriptableObjects que diseño edita desde el Inspector.',
                    'Conectado con el sistema de monedas e inventario del juego principal.'
                ],
                stackTags: ['Unity', 'C#', 'ScriptableObjects', 'Patrón MVP', 'DOTween', 'uGUI']
            },
            'harmony-endless-horde': {
                title: 'Pantalla de recompensas de Endless Horde',
                description: 'Programé la pantalla de resumen de partida: contadores animados de puntos y monedas, barra de subida de nivel y cartas de recompensa.',
                role: 'Programación de UI y secuencia de recompensas',
                focus: 'Secuencias asíncronas, sincronización de audio y salto con toque',
                stack: 'Unity · C# · DOTween · uGUI',
                tag: 'Harmony Games · Meta UI',
                challenge: 'Crear una pantalla de fin de partida que encadenara contadores, barras de progreso y aparición de cartas en orden, permitiendo al jugador tocar en cualquier momento para saltar al resultado final.',
                architecture: 'Programé un secuenciador asíncrono con UniTask y DOTween que encadena cada contador, barra e icono de cofre en orden, sincronizado con efectos de sonido y con soporte para completar el estado final al instante si el jugador toca la pantalla.',
                highlights: [
                    'Contadores numéricos animados con curvas de velocidad suaves.',
                    'Opción de tocar para saltar la animación sin dejar estados a medias.',
                    'El tono del sonido sube según el tamaño de la recompensa.'
                ],
                stackTags: ['Unity', 'C#', 'UniTask', 'DOTween', 'VFX de Partículas en UI']
            },
            'match3d-rewards': {
                title: 'Pantalla de recompensas y SFX de Match3D',
                description: 'Implementé la pantalla de nivel completado, la animación de conteo de puntos y la integración de efectos de sonido.',
                role: 'UI e integración de audio',
                focus: 'Flujo de victoria, sincronización de SFX y variación de tono',
                stack: 'Unity · C# · Integración de SFX · DOTween',
                tag: 'Harmony Games · Audio y UI',
                challenge: 'Sincronizar las animaciones de la pantalla de victoria con los efectos de sonido para que cada estrella, contador y premio suene a tiempo sin volverse repetitivo tras decenas de niveles.',
                architecture: 'Conecté los eventos de la secuencia en DOTween a un pool de AudioSources con ligeras variaciones de tono en conteos repetidos, coordinando el zoom de la cámara 3D con la entrada del modal 2D.',
                highlights: [
                    'Selección y sincronización de efectos de sonido para cada paso de la secuencia.',
                    'Variación dinámica de tono para que las victorias repetidas no suenen idénticas.',
                    'Zoom de cámara sincronizado con la entrada de la ventana de recompensa.'
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

        refreshShowcaseText();
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
    const filterChips = document.querySelectorAll('.filter-bar button.filter-chip');
    const caseCards = document.querySelectorAll('.case-picker .case-card');

    filterChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const filter = chip.dataset.filter || 'all';

            filterChips.forEach((c) => {
                const isActive = c === chip;
                c.classList.toggle('active', isActive);
                c.setAttribute('aria-pressed', String(isActive));
            });

            // Filter all 6 case cards in the unified deck
            let firstVisibleCard = null;
            caseCards.forEach((card) => {
                const category = card.dataset.category || 'all';
                const match = filter === 'all' || category === filter;
                card.style.display = match ? '' : 'none';
                if (match && !firstVisibleCard) {
                    firstVisibleCard = card;
                }
            });

            // If current active card is hidden, switch stage to first visible card
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
        const activeCard = document.querySelector('.case-picker .case-card.active');
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

    // Mechanic titles and descriptions come from the translation table when available
    function showcaseText(trigger) {
        const key = trigger.dataset.textKey;
        const table = translations[currentLanguage] || translations.en;
        return {
            title: (key && table[key + '_title']) || trigger.dataset.title,
            description: (key && table[key + '_desc']) || trigger.dataset.description
        };
    }

    function refreshShowcaseText() {
        document.querySelectorAll('.showcase-container').forEach((container) => {
            const active = container.querySelector('.mechanic-trigger.active');
            if (!active) return;
            const text = showcaseText(active);
            const sectionId = active.dataset.showcase;
            const titleElement = document.getElementById(sectionId + '-title');
            const descriptionElement = document.getElementById(sectionId + '-desc');
            if (titleElement) titleElement.textContent = text.title;
            if (descriptionElement) descriptionElement.textContent = text.description;
        });
    }

    document.querySelectorAll('[data-showcase]').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            const text = showcaseText(trigger);
            window.changeShowcase(
                trigger.dataset.showcase,
                trigger.dataset.video,
                text.title,
                text.description,
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
        toast.className = 'toast-message';
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