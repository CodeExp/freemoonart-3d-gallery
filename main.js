// Configuration de base Three.js
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
    // Sol sans texture
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

    // Arbres spirituels (avec votre positionnement)
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

// Vos œuvres d'art (conservées exactement)
const artworks = [];
const artworkInfo = [
    {
        title: "Contact Maternel",
        description: "Une ode tendre à l'amour inconditionnel entre une mère et son enfant. Cette œuvre touchante immortalise un instant précieux: une maman aux yeux clos berçant délicatement sa petite fille dans ses bras.Le visage serein de la mère exprime toute la plénitude de ce moment suspendu, tandis que l'enfant repose en toute confiance, apaisée par cette étreinte protectrice. Une scène universelle qui capture l'essence même de la tendresse maternelle.",
        file: "./artworks/contact_maternel.jpg",
        width: 3,
        height: 4
    },
    {
        title: "Larmes Douces",
        description: "Une œuvre onirique où la douleur se transforme en beauté cristalline. Au cœur de cette création surréaliste, un œil géant pleure des larmes de cristal qui captent la lumière tel un prisme magique.Deux abeilles aux reflets dorés et noirs dansent autour de ce regard blessé, suspendues dans un ballet éthéré.Des feuilles vivantes encerclent la scène, leurs pétales vibrant d'une énergie mystérieuse, gorgés d'un pollen scintillant qui attire ces créatures ailées. Une métaphore poétique sur la transformation de la souffrance en beauté lumineuse.",
        file: "./artworks/larmes_douces.jpg",
        width: 3,
        height: 4
    },
    {
        title: "Chemin Calme",
        description: "Une invitation à la contemplation sur les chemins apaisants de l'hiver. Cette œuvre poétique nous transporte le long d'une route hivernale silencieuse, bordée d'arbres aux branches nues qui dessinent des dentelles délicates contre le ciel.Les nuances roses et bleues du crépuscule enveloppent le paysage d'une lumière douce et mélancolique. Au loin, les fenêtres illuminées des maisons promettent chaleur et réconfort, créant un contraste saisissant avec la froideur de la saison. Une œuvre qui célèbre la beauté de la solitude hivernale et la promesse du foyer.",
        file: "./artworks/chemin_calme.jpg",
        width: 3,
        height: 4
    },
    {
        title: "Célébration de la Vie",
        description: "Une explosion de joie pure capturée dans un élan spirituel vers le ciel. Cette œuvre vibrante d'énergie immortalise un moment de triomphe absolu : une silhouette aux bras levés vers l'infini, baignée dans une explosion de couleurs éclatantes.Le contraste saisissant entre la figure sombre et les jets de turquoise, rouge, jaune et blanc crée une symphonie visuelle puissante.La technique mixte rugueuse et texturée amplifie l'émotion brute de ce cri de victoire, où l'âme semble littéralement rayonner de bonheur. Un hymne pictural à l'allégresse et à l'éveil spirituel, entre ancrage terrestre et transcendance.",
        file: "./artworks/celebration_de_la_vie.jpg",
        width: 3,
        height: 4
    },
    {
        title: "L'Esprit Tribal",
        description: "Une œuvre vibrante qui célèbre la beauté féminine africaine dans toute sa splendeur. Cette création expressive met en scène une figure féminine ornée de motifs traditionnels colorés, évoluant dans un écrin de verdure naturelle. Les couleurs vives et les patterns authentiques créent une harmonie dynamique entre culture ancestrale et nature luxuriante.",
        file: "./artworks/l_esprit_tribal.jpg",
        width: 3,
        height: 4
    },
    {
        title: "Balade en Ville",
        description: "Une ode nostalgique aux joies simples et à l'insouciance de l'enfance. Cette œuvre attendrissante capture un moment magique: deux enfants pédalent côte à côte sur une route dorée, baignée par les feux d'un coucher de soleil spectaculaire. Le ciel embrasé d'oranges, de jaunes et de bleus accompagne leur escapade innocente, tandis que deux oiseaux en liberté ponctuent cette symphonie de sérénité.Au loin, les silhouettes urbaines floues rappellent discrètement le monde des adultes, créant un contraste poétique entre l'instant présent et l'avenir qui les attend. Un hymne à la simplicité, à l'amitié et aux souvenirs dorés de l'enfance.",
        file: "./artworks/balade_en_ville.jpg",
        width: 3,
        height: 4
    }
];

// Fonction corrigée pour créer les œuvres avec groupement
function createArtworkWithFrame(artworkData, position, rotation) {
    // Groupe pour organiser cadre + peinture
    const artworkGroup = new THREE.Group();
    
    // 1. CADRE
    const frameGeometry = new THREE.BoxGeometry(
        artworkData.width + 0.2, 
        artworkData.height + 0.2, 
        0.2
    );
    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x3d2817,
        roughness: 0.9,
        metalness: 0.1
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(0, 0, 0); // Centré dans le groupe
    artworkGroup.add(frame);
    
    // 2. PEINTURE
    const paintingGeometry = new THREE.PlaneGeometry(
        artworkData.width, 
        artworkData.height
    );
    
    // Charger la texture avec gestion d'erreur
    const artworkTexture = new THREE.TextureLoader().load(
        artworkData.file, 
        (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace;
        },
        undefined,
        (error) => {
            // Créer une texture de fallback
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 400;
            const ctx = canvas.getContext('2d');
            
            ctx.fillStyle = '#cc0000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('IMAGE', canvas.width/2, canvas.height/2 - 20);
            ctx.fillText('MANQUANTE', canvas.width/2, canvas.height/2 + 20);
            ctx.font = '16px Arial';
            ctx.fillText(artworkData.title, canvas.width/2, canvas.height/2 + 50);
            
            const fallbackTexture = new THREE.CanvasTexture(canvas);
            paintingMaterial.map = fallbackTexture;
            paintingMaterial.needsUpdate = true;
        }
    );

    const paintingMaterial = new THREE.MeshStandardMaterial({
        map: artworkTexture,
        roughness: 0.8,
        metalness: 0.2
    });

    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.set(0, 0, 0.11); // Devant le cadre dans le groupe
    painting.userData = artworkData; // Pour les interactions
    
    artworkGroup.add(painting);
    artworks.push(painting); // Pour le raycasting
    
    // 3. POSITIONNEMENT FINAL DU GROUPE
    artworkGroup.position.copy(position);
    artworkGroup.rotation.y = rotation;
    
    // 4. ÉCLAIRAGE SPOT pour chaque tableau
    const artworkSpotLight = new THREE.SpotLight(0xfffaf0, 1);
    
    // Calculer la position du spot en fonction de la rotation pour éclairer la face avant
    let spotX, spotZ;
    
    if (rotation === 0) {
        // Tableaux face au visiteur (mur du fond) - spot devant
        spotX = position.x;
        spotZ = position.z + 3;
    } else if (rotation === Math.PI / 2) {
        // Tableaux mur de gauche (rotation 90°) - spot à droite du tableau
        spotX = position.x + 3;
        spotZ = position.z;
    } else if (rotation === -Math.PI / 2) {
        // Tableaux mur de droite (rotation -90°) - spot à gauche du tableau
        spotX = position.x - 3;
        spotZ = position.z;
    } else {
        // Fallback pour autres rotations
        spotX = position.x;
        spotZ = position.z + 3;
    }
    
    artworkSpotLight.position.set(spotX, position.y + 3, spotZ);
    artworkSpotLight.target = artworkGroup;
    artworkSpotLight.angle = Math.PI / 8;
    artworkSpotLight.penumbra = 0.2;
    artworkSpotLight.decay = 1.5;
    artworkSpotLight.distance = 10;
    scene.add(artworkSpotLight);
    
    return artworkGroup;
}

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
        if (index < artworkInfo.length) {
            const position = new THREE.Vector3(pos.x, pos.y, pos.z);
            const artwork = createArtworkWithFrame(artworkInfo[index], position, pos.ry);
            scene.add(artwork);
        }
    });
}

// Créer l'environnement
createRoom();
createArtworks();

// Position initiale de la caméra
camera.position.set(0, 1.7, 10);
camera.lookAt(0, 1.7, 0);

// Contrôles de mouvement (vos paramètres conservés)
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

// Détection mobile (votre fonction conservée)
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
};

// Configurer l'interface selon l'appareil (avec vos sélecteurs)
function setupDeviceInterface() {
    const isMobileDevice = isMobile();
    const desktopControls = document.querySelector('.desktop-controls');
    const mobileControls = document.querySelector('.mobile-controls');
    
    if (desktopControls && mobileControls) {
        desktopControls.style.display = isMobileDevice ? 'none' : 'block';
        mobileControls.style.display = isMobileDevice ? 'block' : 'none';
    }
}

// Appeler au chargement et au redimensionnement
setupDeviceInterface();
window.addEventListener('resize', setupDeviceInterface);

// Contrôles de la souris pour regarder autour (vos paramètres conservés)
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

        // Rotation verticale désactivée comme dans votre code
        /*
        const newVerticalRotation = camera.rotation.x - deltaMove.y * rotationSpeed;
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

// Variables pour les contrôles tactiles (vos variables conservées)
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let lookDeltaX = 0;
let lookDeltaY = 0;
let joystickActive = false;

// Gestionnaires d'événements pour les contrôles tactiles (votre logique conservée)
const setupMobileControls = () => {
    // Vérification de l'existence des éléments
    const forwardBtn = document.getElementById('forward-btn');
    const backwardBtn = document.getElementById('backward-btn');
    const leftBtn = document.getElementById('left-btn');
    const rightBtn = document.getElementById('right-btn');
    
    if (!forwardBtn) return; // Sortir si les éléments n'existent pas

    // Événements tactiles pour chaque bouton (votre fonction conservée)
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

    // Fonctions de déplacement (vos handlers conservés)
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

    // Joystick pour regarder autour (votre logique conservée)
    const joystick = document.getElementById('look-joystick');
    const knob = document.getElementById('joystick-knob');

    if (joystick && knob) {
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
    }
};

// Initialiser les contrôles tactiles
setupMobileControls();

// Raycaster pour la détection des clics sur les œuvres (votre logique conservée)
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Fonction commune pour gérer les clics/touchers sur les œuvres (votre fonction conservée)
const handleInteraction = (clientX, clientY) => {
    // Normaliser les coordonnées
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(clientY / window.innerHeight) * 2 + 1;

    // Ne pas traiter les clics sur les contrôles mobiles (votre logique conservée)
    const mobileControls = document.getElementById('mobile-controls');
    const joystick = document.getElementById('look-joystick');
    const infoBox = document.getElementById('artwork-info');

    // Vérifier si le clic est sur l'un des éléments d'interface
    if (isMobile() && (mobileControls || joystick || infoBox)) {
        const mobileControlsRect = mobileControls ? mobileControls.getBoundingClientRect() : null;
        const joystickRect = joystick ? joystick.getBoundingClientRect() : null;
        const infoBoxRect = infoBox ? infoBox.getBoundingClientRect() : null;

        if (
            (mobileControlsRect && clientX >= mobileControlsRect.left && clientX <= mobileControlsRect.right &&
                clientY >= mobileControlsRect.top && clientY <= mobileControlsRect.bottom) ||
            (joystickRect && clientX >= joystickRect.left && clientX <= joystickRect.right &&
                clientY >= joystickRect.top && clientY <= joystickRect.bottom) ||
            (infoBox && infoBox.style.display === 'block' && infoBoxRect &&
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
            if (infoBox) {
                const title = infoBox.querySelector('h2');
                const description = infoBox.querySelector('p');
                
                if (title) title.textContent = artwork.userData.title;
                if (description) description.textContent = artwork.userData.description;
                
                infoBox.style.display = 'block';
            }
        }
    }
};

// Gestionnaire de clics pour desktop (vos handlers conservés)
window.addEventListener('click', (event) => {
    handleInteraction(event.clientX, event.clientY);
});

// Gestionnaire de touchers pour mobile (votre logique conservée)
window.addEventListener('touchend', (event) => {
    // Utiliser uniquement si aucun mouvement significatif n'a été détecté
    if (!joystickActive && event.changedTouches.length > 0) {
        const touch = event.changedTouches[0];
        handleInteraction(touch.clientX, touch.clientY);
    }
}, { passive: true });

// Fermer la boîte d'information (votre handler conservé)
const closeBtn = document.getElementById('close-btn');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        const infoBox = document.getElementById('artwork-info');
        if (infoBox) {
            infoBox.style.display = 'none';
        }
    });
}

// Redimensionnement de la fenêtre (votre handler conservé)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    setupDeviceInterface();
});

// Animation (votre logique conservée avec rotation verticale désactivée)
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

    // Appliquer le joystick regarder (mobile) - rotation verticale désactivée comme dans votre code
    if (joystickActive) {
        camera.rotation.y -= lookDeltaX;

        // Rotation verticale désactivée (vos commentaires conservés)
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

        // Limiter la zone de déplacement (vos paramètres conservés)
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

    // Effet d'ambiance : légère oscillation des lumières (vos effets conservés)
    spotLight.intensity = 1 + Math.sin(Date.now() * 0.001) * 0.1;

    // Animation des arbres spirituels (votre logique conservée)
    scene.children.forEach(child => {
        if (child.type === 'PointLight' && child !== spotLight && child.intensity < 1) {
            child.intensity = 0.5 + Math.sin(Date.now() * 0.002 + child.position.x) * 0.3;
        }
    });

    renderer.render(scene, camera);
}

// Démarrer l'animation
animate();