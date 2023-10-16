import {
    Scene,
    PerspectiveCamera,
    Clock,
    WebGLRenderer,
    TextureLoader,
    ShaderMaterial,
    NearestFilter,
    FrontSide,
    TorusGeometry,
    Mesh
} from 'three'
import fragmentShader from '../shaders/fragment.glsl';
import vertexShader from '../shaders/vertex.glsl'
import img from '/images/hirem.png';

export default class Sketch {
  constructor(options) {
    this.clock = new Clock()  
    this.container = options.domElement
    this.height = this.container.offsetHeight
    this.width = this.container.offsetWidth
    this.camera = new PerspectiveCamera(
        75,
        this.width / this.height,
        0.1,
        1000,
    )
    this.camera.position.set(0,0,15)
    this.scene = new Scene()
    this.scene.destination = {x:0, y:0}
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true
      })
    this.renderer.setPixelRatio(window.devicePixelRatio*2)
    this.container.appendChild(this.renderer.domElement)
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.resize()
    this.addObjects()
    this.render()
    this.setUpResize()
    this.mouseMove()
  }
 
  mouseMove() {
   window.addEventListener('pointermove', (e) => {
      let x = (e.clientX-this.w/2)/(this.w/2);
      let y = (e.clientY-this.h/2)/(this.h/2);
      this.scene.destination.x = y*0.30;
      this.scene.destination.y = x*0.30;
    
    })
  }

  addObjects() {
    const texture = new TextureLoader().load(img, (texture)=>{
      texture.minFilter = NearestFilter;
    });
     
   this.material = new ShaderMaterial({
      side: FrontSide,
      transparent: true,
      uniforms: {
        time: {type: 'f', value: 0},
        uTexture: {type: 't', value: texture}
      },
      fragmentShader,
      vertexShader
    })

  this.geometry = new TorusGeometry(4, 2, 30, 200);
  this.mesh = new Mesh(this.geometry, this.material)
  this.scene.add(this.mesh)
  }

   animate() {
    const tl = gsap.timeline();
    tl.from(this.mesh.rotation, {
      duration: 1,
      y: -2,
      x: -2,
      z: 1,
      ease: "power4.easeOut",
    }).from(this.mesh.scale, {
      duration: 1,
      x: 0.8,
      y: 0.8,
      z: 0.8,
      ease: "power4.easeOut",
    }, "<")

    const main_sec = document.querySelector('.main_section')

    main_sec.addEventListener('mousedown', () => {
      const tl = gsap.timeline();
      tl.to(this.scene.scale, {
        duration: 0.6,
        x:1.06,
        y:1.06,
        z:1.06,
        ease: "elastic.out(1.2,0.5)"
      })
    })

   main_sec.addEventListener('mouseup', () => {
      const tl = gsap.timeline();
      tl.to(this.scene.scale, {
        duration: 0.6,
        x:1,
        y:1,
        z:1,
        ease: "elastic.out(1.2,0.5)"
      })
    })

  }
 
  render() {
    this.scene.rotation.x += (this.scene.destination.x - this.scene.rotation.x)*0.05;
    this.scene.rotation.y += (this.scene.destination.y - this.scene.rotation.y)*0.05;
    
    this.material.uniforms.time.value = this.clock.getElapsedTime()

    requestAnimationFrame(this.render.bind(this))
    
    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
  }

  setUpResize() {
    window.addEventListener('resize', this.resize.bind(this))
  }
}

