// רישום פלאגין הגלילה של GSAP
gsap.registerPlugin(ScrollTrigger);

// --------------------------------------------------------
// Lenis Smooth Scroll Setup
// --------------------------------------------------------
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing עדין
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
});

// סנכרון Lenis עם ה-ScrollTrigger של GSAP
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// --------------------------------------------------------
// מעקב עכבר (Parallax)
// --------------------------------------------------------
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    // מנרמל את המיקום בין -1 ל 1
    mouseX = (event.clientX - windowHalfX) * 0.001;
    mouseY = (event.clientY - windowHalfY) * 0.001;
});

// --------------------------------------------------------
// הגדרות בסיס - Three.js
// --------------------------------------------------------
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050505, 0.03);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// מגדיר צבע רקע לשחור (חשוב בשביל אפקט ה-Bloom שייראה טוב)
renderer.setClearColor(0x050505, 1); 

// --------------------------------------------------------
// Post-Processing (UnrealBloomPass)
// --------------------------------------------------------
const renderScene = new THREE.RenderPass(scene, camera);

// פרמטרים לבלום: Resolution, Strength, Radius, Threshold
const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5, // עוצמת ההילה
    0.4, // רדיוס הפיזור
    0.85 // סף בהירות (מעל זה, זה זורח)
);

// נשנה את עוצמת הבלום שיתאים לסייברפאנק
bloomPass.threshold = 0.2;
bloomPass.strength = 2.0; 
bloomPass.radius = 0.8;

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

// --------------------------------------------------------
// תאורה
// --------------------------------------------------------
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xff00cc, 2, 20);
pointLight1.position.set(-2, -2, 2);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00ffff, 2, 20); // תכלת/ציאן
pointLight2.position.set(3, 3, 2);
scene.add(pointLight2);

// --------------------------------------------------------
// אובייקטים ומעטפות (Wrappers)
// --------------------------------------------------------
// אנו משתמשים במעטפות (Groups) כדי ש-GSAP ישלוט על הקבוצה
// בזמן שה-animate loop יסובב את המודל עצמו בצורה חלקה ורציפה ללא התנגשויות.

// 1. קוביה 
const cubeGroup = new THREE.Group();
const cubeGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.8 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeGroup.add(cube);
scene.add(cubeGroup);

// 2. קשר טורוס (TorusKnot)
const knotGroup = new THREE.Group();
const knotGeometry = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 32);
const knotMaterial = new THREE.MeshStandardMaterial({ color: 0xff00cc, roughness: 0.1, metalness: 1.0, transparent: true });
const knot = new THREE.Mesh(knotGeometry, knotMaterial);
knotGroup.add(knot);
knotGroup.scale.set(0, 0, 0); // מוסתר בהתחלה
scene.add(knotGroup);

// 3. מבנה רשת (Icosahedron Wireframe)
const icoGroup = new THREE.Group();
const icoGeometry = new THREE.IcosahedronGeometry(2, 1);
const icoMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00ffff, 
    wireframe: true, 
    emissive: 0x005555,
    emissiveIntensity: 0.5
});
const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
icoGroup.add(icosahedron);
icoGroup.scale.set(0, 0, 0); // מוסתר בהתחלה
scene.add(icoGroup);

// 4. סדרת כדורים שמרחפים (Spheres Explosion)
const spheresGroup = new THREE.Group();
const sphereGeo = new THREE.SphereGeometry(0.1, 16, 16);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1, metalness: 1 });
for(let i = 0; i < 50; i++) {
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    // פיזור רנדומלי ברדיוס מסוים
    sphere.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );
    spheresGroup.add(sphere);
}
spheresGroup.scale.set(0, 0, 0);
scene.add(spheresGroup);

// 5. חלקיקים ברקע
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 25;
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffffff,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// --------------------------------------------------------
// אנימציה ורינדור 
// --------------------------------------------------------
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    
    // סיבוב רציף לאובייקטים עצמם
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    
    knot.rotation.x += 0.01;
    knot.rotation.y += 0.005;

    icosahedron.rotation.y -= 0.003;
    icosahedron.rotation.z += 0.002;

    spheresGroup.rotation.y += 0.002;
    
    // תנועת חלקיקים גלית רכה
    particlesMesh.rotation.y = elapsedTime * 0.02;
    
    // החלקת (Lerp) תנועת העכבר ליצירת אפקט Parallax על הסצנה
    targetX = mouseX * 2;
    targetY = mouseY * 2;
    
    scene.rotation.y += 0.05 * (targetX - scene.rotation.y);
    scene.rotation.x += 0.05 * (targetY - scene.rotation.x);
    
    // מרנדר עם ה-Composer (שכולל את אפקט ה-Bloom) במקום המרנדר הרגיל
    composer.render();
}
animate();

// --------------------------------------------------------
// התאמה לשינוי גודל מסך
// --------------------------------------------------------
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --------------------------------------------------------
// GSAP + ScrollTrigger - הטיים ליין המרכזי
// --------------------------------------------------------

const scrollContainer = document.querySelector('.scroll-container');

// הטיים ליין ששולט גם על הגלילה האופקית וגם על האנימציות ב-Three.js
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".animation-wrapper",
        pin: true,            // מדביק את עטיפת האנימציה למסך
        start: "top top",     // מתחיל ברגע שהקצה העליון של העטיפה מגיע לראש המסך
        end: "+=6000",        // נגלל לאורך 6000 פיקסלים (ככל שגדול יותר ככה הגלילה האופקית איטית יותר)
        scrub: 1.5,           // החלקה של האנימציה בגלילה
    }
});

// תנועה אופקית של התוכן (גלילה מצד לצד)
// האתר שלנו RTL, אז אנחנו צריכים להזיז את המכולה ימינה (כיוון חיובי של X) כדי לחשוף את התוכן שמשמאל
tl.to(scrollContainer, {
    x: () => scrollContainer.scrollWidth - window.innerWidth,
    ease: "none", // גלילה חלקה ללא האצות והאטות
    duration: 6   // מסונכרן במדויק עם 6 המעברים של התלת מימד (0 עד 6)
}, 0);

// בניית טיים ליין מורכב עם 7 שלבים -> 6 מעברים עיקריים (0 עד 6)
tl
    // --- מעבר 0 ל-1: שלב 1 -> 2 (תנועת הקוביה) ---
    .to(cubeGroup.position, { x: 2, y: -1, z: -2 }, 0)
    .to(cubeGroup.rotation, { x: Math.PI, z: Math.PI }, 0)
    .to(pointLight1.position, { x: 2, y: 2 }, 0)
    
    // --- מעבר 1 ל-2: שלב 2 -> 3 (העלמת הקוביה והופעת הטורוס) ---
    .to(cubeGroup.scale, { x: 0, y: 0, z: 0 }, 1) 
    .to(knotGroup.scale, { x: 1, y: 1, z: 1 }, 1) 
    .to(knotGroup.position, { x: -1.5, y: 0.5 }, 1)
    .to(camera.position, { z: 4 }, 1)
    
    // --- מעבר 2 ל-3: שלב 3 -> 4 (התקרבות לטורוס, חשיפת רשת האייקוסהדרון) ---
    .to(knotGroup.position, { x: 0, y: 0 }, 2)
    .to(knotGroup.scale, { x: 2, y: 2, z: 2 }, 2)
    .to(knotMaterial.color, { r: 0, g: 1, b: 1 }, 2) // צבע תכלת/ציאן
    .to(icoGroup.scale, { x: 1, y: 1, z: 1 }, 2)
    
    // --- מעבר 3 ל-4: שלב 4 -> 5 (צלילה פנימה לאייקוסהדרון ושינוי צבע) ---
    .to(knotGroup.scale, { x: 5, y: 5, z: 5 }, 3) // הטורוס עוטף את המצלמה
    .to(knotMaterial, { opacity: 0 }, 3) // תיקון באג: פניה לחומר ולא לקבוצה
    .to(camera.position, { z: 1.5 }, 3) // צלילה עמוקה פנימה
    .to(icoMaterial.color, { r: 1, g: 0, b: 0.8 }, 3)
    .to(icoMaterial.emissive, { r: 1, g: 0, b: 0.8 }, 3)
    .to(particlesMaterial.color, { r: 1, g: 0, b: 0.8 }, 3)
    // העצמת הבלום/זוהר בתוך הצורה
    .to(bloomPass, { strength: 3.5, radius: 1.2 }, 3)
    
    // --- מעבר 4 ל-5: שלב 5 -> 6 (שבירה - האייקוסהדרון נעלם וסדרת כדורים מופיעה) ---
    .to(icoGroup.scale, { x: 0, y: 0, z: 0 }, 4)
    .to(camera.position, { z: 6 }, 4) // התרחקות חזרה
    .to(spheresGroup.scale, { x: 1, y: 1, z: 1 }, 4)
    .to(spheresGroup.rotation, { y: Math.PI * 2, x: Math.PI }, 4)
    .to(particlesMaterial, { size: 0.15 }, 4)
    .to(bloomPass, { strength: 2.0, radius: 0.8 }, 4) // החזרת הבלום למצב רגיל
    
    // --- מעבר 5 ל-6: שלב 6 -> 7 (טיסה מטורפת דרך החלקיקים) ---
    .to(camera.position, { z: -10 }, 5) // עפים קדימה בטירוף אל תוך החלקיקים
    .to(spheresGroup.position, { z: 5 }, 5)
    .to(pointLight2, { intensity: 5 }, 5)
    .to(bloomPass, { strength: 4.0 }, 5); // פלאש אור חזק בסוף
