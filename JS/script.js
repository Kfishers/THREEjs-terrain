//Loader
const loader = new THREE.TextureLoader()
const texture = loader.load('/static/terrain.jpg')
const height = loader.load('/static/height.png')
const alpha = loader.load('/static/alphamap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 128, 128)

// Materials

const material = new THREE.MeshStandardMaterial({
   
    map: texture,
    displacementMap: height,
    displacementScale:.7,
    alphaMap: alpha,
    transparent:true,
    depthTest:false,
    
})

// Mesh

const plane = new THREE.Mesh(geometry, material)
scene.add(plane)

plane.rotation.x = 181
//gui.add(plane.rotation, 'x').min(0).max(500)

// Lights

const pointLight = new THREE.PointLight(0x7e84cf, 4.2)
pointLight.position.x = 2
pointLight.position.y = 5
pointLight.position.z = 4
scene.add(pointLight)

gui.add(pointLight.position, 'x').min(0).max(5)
gui.add(pointLight.position, 'y').min(0).max(5)
gui.add(pointLight.position, 'z').min(0).max(5)
gui.add(pointLight, 'intensity').min(0).max(10)

const col = {color: 0x5264b6}
gui.addColor(col, 'color').onChange(()=>{
    pointLight.color.set(col.color)
})
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth ,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth 
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 2.9

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
   
    
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3))

/**
 * Animate
 */
document.addEventListener('mousemove', animateTerrain)

let mouseY = 0

function animateTerrain(event){
    mouseY = event.clientY
}
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime
    plane.rotation.z = .5 * elapsedTime
    plane.material.displacementScale = 1.8 + mouseY * 0.0014
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()