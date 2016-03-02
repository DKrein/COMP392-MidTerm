/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;
import ImageUtils = THREE.ImageUtils;

//Custom Game Objects
import gameObject = objects.gameObject;

//variables
var axes: AxisHelper;
var plane: Mesh;
var sky: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var towerStore1: Mesh;
var towerStore2: Mesh;
var towerStore3: Mesh;
var towerStore4: Mesh;
var towerStore5: Mesh;
var towerTexture: LambertMaterial;
var plainColor: LambertMaterial;
var group: Object3D;


// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    // declare game objects
    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var control: Control;
    var gui: GUI;
    var stats: Stats;

    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        
        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera

        /* ENTER CODE HERE */
        
        // add an axis helper to the scene
        axes = new AxisHelper(80);
        scene.add(axes);
        console.log("Added Axis Helper to scene...");
    
        //Add a Plane to the Scene
        plane = new gameObject(
            new PlaneGeometry(60, 110, 1, 1),
            new LambertMaterial({map: ImageUtils.loadTexture('../../Assets/Images/grass.jpg')}),
            0, 0, 0);

        plane.rotation.x = -0.5 * Math.PI;
        
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        
        sky = new gameObject(
            new PlaneGeometry(120, 100, 1, 1),
            new LambertMaterial({map: ImageUtils.loadTexture('../../Assets/Images/bg.jpg')}),
            -30, 40, 0);

        sky.rotation.y = 0.5 * Math.PI;
        scene.add(sky);        
        
        
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0xffffff);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        
        // Add a SpotLight to the scene
	    spotLight = new SpotLight(0xffffff);
	    spotLight.position.set(-40, 60, 20);
	    spotLight.castShadow = true;
	    scene.add(spotLight);
	    console.log("Added a SpotLight Light to Scene");
        
        towerTexture = new LambertMaterial({map: ImageUtils.loadTexture('../../Assets/Images/stone.jpg')})
        plainColor = new LambertMaterial({color: 0xffffff})
        
        
        towerStore1 = new gameObject(new CubeGeometry(3, 2, 3), new LambertMaterial({color: 0x336666}), 0, 1, 0);
        towerStore2 = new gameObject(new CubeGeometry(2.5, 2, 2.5), new LambertMaterial({color: 0x336699}), 0, 3, 0);
        towerStore3 = new gameObject(new CubeGeometry(2, 2, 2), new LambertMaterial({color: 0x339966}), 0, 5, 0);
        towerStore4 = new gameObject(new CubeGeometry(1.5, 2, 1.5), new LambertMaterial({color: 0x666666}), 0, 7, 0);
        towerStore5 = new gameObject(new CubeGeometry(1, 2, 1), new LambertMaterial({color: 0x333366}), 0, 9, 0);
        
        group = new THREE.Object3D();
        group.add(towerStore1);
        group.add(towerStore2);
        group.add(towerStore3);
        group.add(towerStore4);
        group.add(towerStore5);
        
        scene.add(group);
 
        
        // add controls
        gui = new GUI();
        control = new Control();
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	

    }

    function addControl(controlObject: Control): void {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject,'rotateStore1',-1, 1);
        gui.add(controlObject,'rotateStore2',-1, 1);
        gui.add(controlObject,'rotateStore3',-1, 1);
        gui.add(controlObject,'rotateStore4',-1, 1);
        gui.add(controlObject,'rotateStore5',-1, 1);
        gui.add(controlObject,'resetPosition');
        gui.add(controlObject,'randomColors');
        gui.add(controlObject,'addTextures');
        gui.add(controlObject,'scaleTower',1, 2);
        
    }

    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    // Setup main game loop
    function gameLoop(): void {
        stats.update();
        
        towerStore1.rotation.y += control.rotateStore1;
        towerStore2.rotation.y += control.rotateStore2;
        towerStore3.rotation.y += control.rotateStore3;
        towerStore4.rotation.y += control.rotateStore4;
        towerStore5.rotation.y += control.rotateStore5;
        
        towerStore1.scale.set(control.scaleTower,control.scaleTower,control.scaleTower);
        towerStore2.scale.set(control.scaleTower,control.scaleTower,control.scaleTower);
        towerStore3.scale.set(control.scaleTower,control.scaleTower,control.scaleTower);
        towerStore4.scale.set(control.scaleTower,control.scaleTower,control.scaleTower);
        towerStore5.scale.set(control.scaleTower,control.scaleTower,control.scaleTower);        
        
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 35.3;
        camera.position.y = 18.5;
        camera.position.z = 3;//-28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

