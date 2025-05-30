// Configuration de base
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x271c19); // Couleur de fond chaude et terreuse
document.body.appendChild(renderer.domElement);

// Lumières
const ambientLight = new THREE.AmbientLight(0xccb7a3, 0.5); // Lumière ambiante douce
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffedd8, 0.8); // Lumière principale chaude
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

const spotLight = new THREE.SpotLight(0xe9c46a, 1); // Lumière spot dorée
spotLight.position.set(0, 15, 0);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.1;
spotLight.decay = 2;
spotLight.distance = 200;
scene.add(spotLight);

// Créer la salle d'exposition
function createRoom() {
    // Sol
    const floorTexture = new THREE.TextureLoader().load('/api/placeholder/1024/1024');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(8, 8);

    const floorGeometry = new THREE.PlaneGeometry(60, 60);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x594539,
        roughness: 0.8,
        metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    scene.add(floor);

    // Ciel étoilé (dôme)
    const skyGeometry = new THREE.SphereGeometry(50, 32, 32);
    const skyMaterial = new THREE.MeshBasicMaterial({
        color: 0x05052b,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.9
    });
    const sky = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(sky);

    // Ajouter des étoiles
    const starGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    for (let i = 0; i < 1000; i++) {
        const star = new THREE.Mesh(starGeometry, starMaterial);
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 45 + Math.random() * 3;

        star.position.x = radius * Math.sin(phi) * Math.cos(theta);
        star.position.y = radius * Math.sin(phi) * Math.sin(theta);
        star.position.z = radius * Math.cos(phi);

        star.scale.setScalar(Math.random() * 2);
        scene.add(star);
    }

    // Arbres spirituels
    createSpiritualTree(20, 8, 0);
    createSpiritualTree(-10, 8, 15);
    createSpiritualTree(-18, 8, -10);

    // Éléments sacrés
    createSacredCircle(0, -1.9, 0, 8);
}

// Créer un arbre spirituel
function createSpiritualTree(x, y, z) {
    // Tronc
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.8, 10, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x3d2817,
        roughness: 0.9
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y - 5, z);
    scene.add(trunk);

    // Feuillage sacré
    const foliageGeometry = new THREE.DodecahedronGeometry(3.5, 0);
    const foliageMaterial = new THREE.MeshStandardMaterial({
        color: 0x2d5d3c,
        roughness: 0.8,
        metalness: 0.1
    });

    for (let i = 0; i < 3; i++) {
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.set(
            x + (Math.random() - 0.5) * 2,
            y + i * 2,
            z + (Math.random() - 0.5) * 2
        );
        foliage.scale.set(0.7, 0.7, 0.7);
        foliage.rotation.set(Math.random(), Math.random(), Math.random());
        scene.add(foliage);
    }

    // Lumière spirituelle
    const spiritLight = new THREE.PointLight(0xc7eaff, 0.8, 10);
    spiritLight.position.set(x, y + 6, z);
    scene.add(spiritLight);
}

// Créer un cercle sacré
function createSacredCircle(x, y, z, radius) {
    const circleGeometry = new THREE.CircleGeometry(radius, 32);
    const circleMaterial = new THREE.MeshStandardMaterial({
        color: 0x5c3e2a,
        roughness: 0.7,
        metalness: 0.2,
        side: THREE.DoubleSide
    });
    const circle = new THREE.Mesh(circleGeometry, circleMaterial);
    circle.rotation.x = -Math.PI / 2;
    circle.position.set(x, y, z);
    scene.add(circle);

    // Symboles
    const symbolCount = 8;
    for (let i = 0; i < symbolCount; i++) {
        const angle = (i / symbolCount) * Math.PI * 2;
        const sx = x + Math.cos(angle) * (radius - 1);
        const sz = z + Math.sin(angle) * (radius - 1);

        const symbolGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 8);
        const symbolMaterial = new THREE.MeshStandardMaterial({
            color: 0xe9c46a,
            emissive: 0xe9c46a,
            emissiveIntensity: 0.5
        });
        const symbol = new THREE.Mesh(symbolGeometry, symbolMaterial);
        symbol.position.set(sx, y + 0.11, sz);
        symbol.rotation.x = Math.PI / 2;
        scene.add(symbol);

        // Lumière subtile pour chaque symbole
        const symbolLight = new THREE.PointLight(0xe9c46a, 0.2, 3);
        symbolLight.position.set(sx, y + 0.3, sz);
        scene.add(symbolLight);
    }
}

// Créer les œuvres d'art
const artworks = [];
const artworkInfo = [
    {
        title: "Esprit de la Forêt",
        description: "Cette œuvre capture l'essence spirituelle des forêts africaines sacrées. Les teintes vertes et terreuses représentent la connexion entre le monde matériel et spirituel, tandis que les formes ondulantes évoquent les esprits qui habitent ces lieux ancestraux."
    },
    {
        title: "Danse Cosmique",
        description: "Inspirée des rituels traditionnels africains, cette toile illustre la danse entre les forces célestes et terrestres. Les motifs circulaires symbolisent les cycles de la vie, tandis que les éclats dorés représentent la sagesse ancestrale transmise à travers les générations."
    },
    {
        title: "Vision Lunaire",
        description: "Cette œuvre explore la signification de la lune dans les spiritualités africaines. Les tons bleus profonds et argentés captent l'énergie féminine et intuitive associée à l'astre nocturne, source d'inspiration et guide spirituel pour de nombreuses traditions."
    },
    {
        title: "Gardiens des Savoirs",
        description: "Représentation des ancêtres veillant sur le savoir sacré. Les silhouettes stylisées sont entourées de symboles de protection et de sagesse, créant un pont entre le passé et le présent, entre le visible et l'invisible."
    },
    {
        title: "Rythme de l'Âme",
        description: "Cette création vibrante capture l'énergie des tambours et des danses rituelles. Les touches de rouge et d'ocre évoquent la terre et le sang, sources de vie, tandis que les motifs répétitifs rappellent les battements du cœur et les rythmes traditionnels."
    },
    {
        title: "Équilibre Sacré",
        description: "Cette œuvre explore l'harmonie entre les forces opposées et complémentaires qui structurent l'univers selon de nombreuses philosophies africaines. Le jeu entre ombre et lumière, formes géométriques et organiques, symbolise cette recherche d'équilibre."
    }
];

function createArtworks() {
    const positions = [
        { x: -10, y: 2, z: -15, ry: 0 },
        { x: 0, y: 2, z: -15, ry: 0 },
        { x: 10, y: 2, z: -15, ry: 0 },
        { x: -15, y: 2, z: 0, ry: Math.PI / 2 },
        { x: -15, y: 2, z: 10, ry: Math.PI / 2 },
        { x: 15, y: 2, z: 0, ry: -Math.PI / 2 }
    ];

    positions.forEach((pos, index) => {
        // Cadre
        const frameGeometry = new THREE.BoxGeometry(5.2, 4.2, 0.2);
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x3d2817,
            roughness: 0.9,
            metalness: 0.1
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.set(pos.x, pos.y, pos.z);
        frame.rotation.y = pos.ry;
        scene.add(frame);

        // Toile
        const paintingGeometry = new THREE.PlaneGeometry(5, 4);

        // Créer une texture procédurale pour chaque œuvre
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');

        // Fond de la toile
        const bgColors = [
            'rgb(45, 82, 65)', // vert forêt
            'rgb(70, 40, 90)', // violet profond
            'rgb(25, 25, 60)', // bleu nuit
            'rgb(60, 30, 15)', // brun terre
            'rgb(150, 50, 30)', // rouge terre
            'rgb(35, 60, 70)'  // bleu-vert
        ];

        ctx.fillStyle = bgColors[index];
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner des motifs africains stylisés
        const drawPatterns = (i) => {
            switch (i) {
                case 0: // Esprit de la Forêt - motifs organiques
                    ctx.strokeStyle = 'rgba(200, 230, 180, 0.7)';
                    for (let j = 0; j < 20; j++) {
                        ctx.beginPath();
                        ctx.lineWidth = 2 + Math.random() * 5;
                        let x = Math.random() * canvas.width;
                        let y = Math.random() * canvas.height;
                        ctx.moveTo(x, y);
                        for (let k = 0; k < 5; k++) {
                            x += (Math.random() - 0.5) * 100;
                            y += (Math.random() - 0.5) * 100;
                            ctx.lineTo(x, y);
                        }
                        ctx.stroke();
                    }
                    break;
                case 1: // Danse Cosmique - cercles et spirales
                    for (let j = 0; j < 15; j++) {
                        const size = 30 + Math.random() * 70;
                        const x = Math.random() * canvas.width;
                        const y = Math.random() * canvas.height;
                        ctx.strokeStyle = `rgba(${200 + Math.random() * 55}, ${160 + Math.random() * 95}, ${100 + Math.random() * 50}, 0.7)`;
                        ctx.lineWidth = 1 + Math.random() * 3;

                        ctx.beginPath();
                        ctx.arc(x, y, size, 0, Math.PI * 2);
                        ctx.stroke();

                        if (Math.random() > 0.5) {
                            ctx.beginPath();
                            ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
                            ctx.stroke();
                        }
                    }
                    break;
                case 2: // Vision Lunaire
                    // Grande lune
                    ctx.fillStyle = 'rgba(220, 220, 240, 0.9)';
                    ctx.beginPath();
                    ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, Math.PI * 2);
                    ctx.fill();

                    // Détails lunaires
                    ctx.fillStyle = 'rgba(200, 200, 230, 0.6)';
                    for (let j = 0; j < 10; j++) {
                        ctx.beginPath();
                        ctx.arc(
                            canvas.width / 2 + (Math.random() - 0.5) * 150,
                            canvas.height / 2 + (Math.random() - 0.5) * 150,
                            5 + Math.random() * 20,
                            0, Math.PI * 2
                        );
                        ctx.fill();
                    }

                    // Étoiles
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    for (let j = 0; j < 100; j++) {
                        ctx.beginPath();
                        ctx.arc(
                            Math.random() * canvas.width,
                            Math.random() * canvas.height,
                            Math.random() * 2,
                            0, Math.PI * 2
                        );
                        ctx.fill();
                    }
                    break;
                case 3: // Gardiens des Savoirs - silhouettes
                    ctx.fillStyle = 'rgba(220, 180, 120, 0.8)';

                    // Silhouettes stylisées
                    for (let j = 0; j < 3; j++) {
                        const centerX = 150 + j * 120;
                        const centerY = canvas.height / 2;

                        // Tête
                        ctx.beginPath();
                        ctx.arc(centerX, centerY - 60, 30, 0, Math.PI * 2);
                        ctx.fill();

                        // Corps
                        ctx.beginPath();
                        ctx.moveTo(centerX, centerY - 30);
                        ctx.lineTo(centerX - 40, centerY + 100);
                        ctx.lineTo(centerX + 40, centerY + 100);
                        ctx.closePath();
                        ctx.fill();

                        // Symboles autour
                        ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
                        ctx.lineWidth = 2;
                        for (let k = 0; k < 5; k++) {
                            const angle = (k / 5) * Math.PI * 2;
                            const x = centerX + Math.cos(angle) * 70;
                            const y = centerY + Math.sin(angle) * 70;

                            ctx.beginPath();
                            ctx.moveTo(x - 10, y);
                            ctx.lineTo(x + 10, y);
                            ctx.moveTo(x, y - 10);
                            ctx.lineTo(x, y + 10);
                            ctx.stroke();
                        }
                    }
                    break;
                case 4: // Rythme de l'Âme - motifs rythmiques
                    // Fond texturé
                    for (let j = 0; j < 20; j++) {
                        ctx.strokeStyle = `rgba(${180 + Math.random() * 75}, ${60 + Math.random() * 40}, ${20 + Math.random() * 30}, 0.6)`;
                        ctx.lineWidth = 10 + Math.random() * 20;

                        ctx.beginPath();
                        ctx.moveTo(0, j * canvas.height / 20);

                        let x = 0;
                        while (x < canvas.width) {
                            x += 20 + Math.random() * 30;
                            const y = (j * canvas.height / 20) + (Math.random() - 0.5) * 30;
                            ctx.lineTo(x, y);
                        }
                        ctx.stroke();
                    }

                    // Cercles rythmiques
                    for (let j = 0; j < 10; j++) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
                        ctx.lineWidth = 2;

                        const x = 100 + Math.random() * (canvas.width - 200);
                        const y = 100 + Math.random() * (canvas.height - 200);
                        const size = 20 + Math.random() * 40;

                        ctx.beginPath();
                        ctx.arc(x, y, size, 0, Math.PI * 2);
                        ctx.stroke();

                        if (Math.random() > 0.5) {
                            ctx.beginPath();
                            ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
                            ctx.stroke();
                        }
                    }
                    break;
                case 5: // Équilibre Sacré - géométrie sacrée
                    // Arrière-plan avec grille subtile
                    ctx.strokeStyle = 'rgba(100, 150, 180, 0.3)';
                    ctx.lineWidth = 1;

                    for (let j = 0; j < 10; j++) {
                        ctx.beginPath();
                        ctx.moveTo(0, j * canvas.height / 10);
                        ctx.lineTo(canvas.width, j * canvas.height / 10);
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.moveTo(j * canvas.width / 10, 0);
                        ctx.lineTo(j * canvas.width / 10, canvas.height);
                        ctx.stroke();
                    }

                    // Motifs géométriques
                    ctx.strokeStyle = 'rgba(220, 200, 150, 0.8)';
                    ctx.lineWidth = 2;

                    // Grand cercle central
                    ctx.beginPath();
                    ctx.arc(canvas.width / 2, canvas.height / 2, 120, 0, Math.PI * 2);
                    ctx.stroke();

                    // Hexagone inscrit
                    ctx.beginPath();
                    for (let j = 0; j < 6; j++) {
                        const angle = (j / 6) * Math.PI * 2;
                        const x = canvas.width / 2 + Math.cos(angle) * 120;
                        const y = canvas.height / 2 + Math.sin(angle) * 120;

                        if (j === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.closePath();
                    ctx.stroke();

                    // Triangle inscrit
                    ctx.beginPath();
                    for (let j = 0; j < 3; j++) {
                        const angle = (j / 3) * Math.PI * 2;
                        const x = canvas.width / 2 + Math.cos(angle) * 120;
                        const y = canvas.height / 2 + Math.sin(angle) * 120;

                        if (j === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    }
                    ctx.closePath();
                    ctx.stroke();

                    // Point central
                    ctx.fillStyle = 'rgba(230, 210, 160, 0.9)';
                    ctx.beginPath();
                    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
                    ctx.fill();
                    break;
            }
        };

        drawPatterns(index);

        // Convertir le canvas en texture
        const texture = new THREE.CanvasTexture(canvas);

        const paintingMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.8,
            metalness: 0.2
        });

        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
        painting.position.set(pos.x, pos.y, pos.z + (pos.ry === 0 ? -0.11 : 0));
        painting.position.x += (pos.ry === Math.PI / 2) ? -0.11 : (pos.ry === -Math.PI / 2) ? 0.11 : 0;
        painting.rotation.y = pos.ry;

        // Ajouter l'info
        painting.userData = artworkInfo[index];

        // Rendre l'œuvre cliquable
        artworks.push(painting);

        scene.add(painting);

        // Éclairage spot pour chaque tableau
        const spotLight = new THREE.SpotLight(0xfffaf0, 1);
        spotLight.position.set(
            pos.x + (pos.ry === 0 ? 0 : (pos.ry === Math.PI / 2 ? -1 : 1) * 2),
            pos.y + 3,
            pos.z + (pos.ry === 0 ? 3 : 0)
        );
        spotLight.target = painting;
        spotLight.angle = Math.PI / 8;
        spotLight.penumbra = 0.2;
        spotLight.decay = 1.5;
        spotLight.distance = 10;
        scene.add(spotLight);
    });
}

// Créer l'environnement
createRoom();
createArtworks();

// Position initiale de la caméra
camera.position.set(0, 1.7, 10);
camera.lookAt(0, 1.7, 0);

// Contrôles de mouvement
const moveSpeed = 0.15;
const keys = {
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
    z: false, q: false, s: false, d: false,
    w: false, a: false
};

window.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = true;
    }
});

window.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key.toLowerCase())) {
        keys[e.key.toLowerCase()] = false;
    }
});

// Détection mobile
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
};

// Configurer l'interface selon l'appareil
function setupDeviceInterface() {
    const isMobileDevice = isMobile();
    document.querySelector('.desktop-controls').style.display = isMobileDevice ? 'none' : 'block';
    document.querySelector('.mobile-controls').style.display = isMobileDevice ? 'block' : 'none';
}

// Appeler au chargement et au redimensionnement
setupDeviceInterface();
window.addEventListener('resize', setupDeviceInterface);

// Contrôles de la souris pour regarder autour
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

document.addEventListener('mousedown', (e) => {
    isDragging = true;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaMove = {
            x: e.clientX - previousMousePosition.x,
            y: e.clientY - previousMousePosition.y
        };

        const rotationSpeed = 0.003;

        // Rotation horizontale (regarder à gauche/droite)
        camera.rotation.y -= deltaMove.x * rotationSpeed;

        // Rotation verticale (regarder en haut/bas) avec limite
        /*
        const newVerticalRotation = camera.rotation.x - deltaMove.y * rotationSpeed;
        */
        // Limiter la rotation verticale à environ +/- 85 degrés
        /*
        if (newVerticalRotation < Math.PI / 2.1 && newVerticalRotation > -Math.PI / 2.1) {
            camera.rotation.x = newVerticalRotation;
        }
        */
    }

    previousMousePosition = {
        x: e.clientX,
        y: e.clientY
    };
});

// Variables pour les contrôles tactiles
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let lookDeltaX = 0;
let lookDeltaY = 0;
let joystickActive = false;

// Gestionnaires d'événements pour les contrôles tactiles de mouvement
const setupMobileControls = () => {
    // Boutons de déplacement
    const forwardBtn = document.getElementById('forward-btn');
    const backwardBtn = document.getElementById('backward-btn');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');

    // Événements tactiles pour chaque bouton
    const addMobileBtnEvents = (element, pressHandler, releaseHandler) => {
        element.addEventListener('touchstart', (e) => {
            e.preventDefault();
            pressHandler();
        }, { passive: false });

        element.addEventListener('touchend', (e) => {
            e.preventDefault();
            releaseHandler();
        }, { passive: false });
    };

    // Fonctions de déplacement
    addMobileBtnEvents(forwardBtn,
        () => { moveForward = true; },
        () => { moveForward = false; }
    );

    addMobileBtnEvents(backwardBtn,
        () => { moveBackward = true; },
        () => { moveBackward = false; }
    );

    addMobileBtnEvents(leftBtn,
        () => { moveLeft = true; },
        () => { moveLeft = false; }
    );

    addMobileBtnEvents(rightBtn,
        () => { moveRight = true; },
        () => { moveRight = false; }
    );

    // Joystick pour regarder autour
    const joystick = document.getElementById('look-joystick');
    const knob = document.getElementById('joystick-knob');

    joystick.addEventListener('touchstart', (e) => {
        e.preventDefault();
        joystickActive = true;
    }, { passive: false });

    joystick.addEventListener('touchmove', (e) => {
        if (!joystickActive) return;
        e.preventDefault();

        const touch = e.touches[0];
        const joystickRect = joystick.getBoundingClientRect();

        // Position du centre du joystick
        const centerX = joystickRect.left + joystickRect.width / 2;
        const centerY = joystickRect.top + joystickRect.height / 2;

        // Position relative du toucher par rapport au centre
        const touchX = touch.clientX - centerX;
        const touchY = touch.clientY - centerY;

        // Calcul de la distance
        const distance = Math.min(joystickRect.width / 2 - 20, Math.sqrt(touchX * touchX + touchY * touchY));
        const angle = Math.atan2(touchY, touchX);

        // Nouvelle position du curseur
        const knobX = Math.cos(angle) * distance;
        const knobY = Math.sin(angle) * distance;

        // Mise à jour de la position du curseur
        knob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;

        // Mise à jour des valeurs de regard
        const joystickSensitivity = 0.003;
        lookDeltaX = touchX * joystickSensitivity;
        lookDeltaY = touchY * joystickSensitivity;
    }, { passive: false });

    const resetJoystick = () => {
        joystickActive = false;
        lookDeltaX = 0;
        lookDeltaY = 0;
        knob.style.transform = 'translate(-50%, -50%)';
    };

    joystick.addEventListener('touchend', resetJoystick, { passive: false });
    joystick.addEventListener('touchcancel', resetJoystick, { passive: false });
};

// Initialiser les contrôles tactiles
setupMobileControls();

// Raycaster pour la détection des clics sur les œuvres
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Fonction commune pour gérer les clics/touchers sur les œuvres
const handleInteraction = (clientX, clientY) => {
    // Normaliser les coordonnées
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    // Ne pas traiter les clics sur les contrôles mobiles
    const mobileControls = document.getElementById('mobile-controls');
    const joystick = document.getElementById('look-joystick');
    const infoBox = document.getElementById('artwork-info');

    // Vérifier si le clic est sur l'un des éléments d'interface
    if (isMobile()) {
        const mobileControlsRect = mobileControls.getBoundingClientRect();
        const joystickRect = joystick.getBoundingClientRect();
        const infoBoxRect = infoBox.getBoundingClientRect();

        if (
            (clientX >= mobileControlsRect.left && clientX <= mobileControlsRect.right &&
                clientY >= mobileControlsRect.top && clientY <= mobileControlsRect.bottom) ||
            (clientX >= joystickRect.left && clientX <= joystickRect.right &&
                clientY >= joystickRect.top && clientY <= joystickRect.bottom) ||
            (infoBox.style.display === 'block' &&
                clientX >= infoBoxRect.left && clientX <= infoBoxRect.right &&
                clientY >= infoBoxRect.top && clientY <= infoBoxRect.bottom)
        ) {
            return;
        }
    }

    // Mise à jour du raycaster et détection des intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(artworks);

    if (intersects.length > 0) {
        const artwork = intersects[0].object;
        if (artwork.userData) {
            const infoBox = document.getElementById('artwork-info');
            infoBox.querySelector('h2').textContent = artwork.userData.title;
            infoBox.querySelector('p').textContent = artwork.userData.description;
            infoBox.style.display = 'block';
        }
    }
};

// Gestionnaire de clics pour desktop
window.addEventListener('click', (event) => {
    handleInteraction(event.clientX, event.clientY);
});

// Gestionnaire de touchers pour mobile
window.addEventListener('touchend', (event) => {
    // Utiliser uniquement si aucun mouvement significatif n'a été détecté
    if (!joystickActive && event.changedTouches.length > 0) {
        const touch = event.changedTouches[0];
        handleInteraction(touch.clientX, touch.clientY);
    }
}, { passive: true });

// Fermer la boîte d'information
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('artwork-info').style.display = 'none';
});

// Redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
    requestAnimationFrame(animate);

    // Mouvement de caméra basé sur les entrées
    const moveVector = new THREE.Vector3(0, 0, 0);

    // Direction avant/arrière (clavier ou tactile)
    if (keys.z || keys.w || keys.ArrowUp || moveForward) {
        moveVector.z = -moveSpeed;
    } else if (keys.s || keys.ArrowDown || moveBackward) {
        moveVector.z = moveSpeed;
    }

    // Direction gauche/droite (clavier ou tactile)
    if (keys.q || keys.a || keys.ArrowLeft || moveLeft) {
        moveVector.x = -moveSpeed;
    } else if (keys.d || keys.ArrowRight || moveRight) {
        moveVector.x = moveSpeed;
    }

    // Appliquer le joystick regarder (mobile)
    if (joystickActive) {
        camera.rotation.y -= lookDeltaX;

        /*
        const newVerticalRotation = camera.rotation.x - lookDeltaY;
        if (newVerticalRotation < Math.PI / 2.1 && newVerticalRotation > -Math.PI / 2.1) {
            camera.rotation.x = newVerticalRotation;
        }
        */
    }

    // Appliquer la rotation de la caméra au vecteur de mouvement
    if (moveVector.length() > 0) {
        // Créer une matrice de rotation à partir de l'orientation de la caméra
        const rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(camera.rotation.y);

        // Appliquer la rotation au vecteur de mouvement
        moveVector.applyMatrix4(rotationMatrix);

        // Mettre à jour la position de la caméra
        camera.position.add(moveVector);

        // Limiter la zone de déplacement
        const boundaryRadius = 25;
        const floorHeight = -1.9; // Hauteur du sol
        const ceilingHeight = 15; // Hauteur maximale

        // Limiter la distance horizontale depuis le centre
        const horizontalDistance = Math.sqrt(camera.position.x * camera.position.x + camera.position.z * camera.position.z);
        if (horizontalDistance > boundaryRadius) {
            camera.position.x *= boundaryRadius / horizontalDistance;
            camera.position.z *= boundaryRadius / horizontalDistance;
        }

        // Limiter la hauteur
        camera.position.y = Math.max(floorHeight + 1.7, Math.min(ceilingHeight, camera.position.y));
    }

    // Effet d'ambiance : légère oscillation des lumières
    spotLight.intensity = 1 + Math.sin(Date.now() * 0.001) * 0.1;

    // Animation des arbres spirituels
    scene.children.forEach(child => {
        if (child.type === 'PointLight' && child !== spotLight && child.intensity < 1) {
            child.intensity = 0.5 + Math.sin(Date.now() * 0.002 + child.position.x) * 0.3;
        }
    });

    renderer.render(scene, camera);
}

// Démarrer l'animation
animate();