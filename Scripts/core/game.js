/// <reference path="_reference.ts"/>
/*
Author: Douglas Krein
Last Modified by: Douglas Krein
Last Modified: 02-03-2016
File description:
- Controls the general game information, like creating tower and controlls

Revision:
1 - cubes created
2 - controls to rotate added
3 - control to add texture
4 - control to random colors
5 - control to resize tower
*/
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
var ImageUtils = THREE.ImageUtils;
//Custom Game Objects
var gameObject = objects.gameObject;
//variables
var axes;
var plane;
var sky;
var ambientLight;
var spotLight;
var towerStore1;
var towerStore2;
var towerStore3;
var towerStore4;
var towerStore5;
var towerTexture;
var plainColor;
var group;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    // declare game objects
    var scene = new Scene();
    var renderer;
    var camera;
    var control;
    var gui;
    var stats;
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
        plane = new gameObject(new PlaneGeometry(60, 110, 1, 1), 
        //new LambertMaterial({map: ImageUtils.loadTexture('../../Assets/Images/grass.jpg')}), -- TEXTUER NOT RECEIVING SHADOW, OR ITS DIFFCULT TO SEE
        new LambertMaterial({ color: 0x339966 }), 0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        sky = new gameObject(new PlaneGeometry(120, 100, 1, 1), new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/Images/bg.jpg') }), -30, 40, 0);
        sky.rotation.y = 0.5 * Math.PI;
        scene.add(sky);
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0xffffff);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff, 2);
        spotLight.position.set(-40, 60, 20);
        spotLight.castShadow = true;
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
        towerTexture = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/Images/stone.jpg') });
        plainColor = new LambertMaterial({ color: 0xffffff });
        towerStore1 = new gameObject(new CubeGeometry(3, 2, 3), new LambertMaterial({ color: 0x336666 }), 0, 1, 0);
        towerStore2 = new gameObject(new CubeGeometry(2.5, 2, 2.5), new LambertMaterial({ color: 0x336699 }), 0, 3, 0);
        towerStore3 = new gameObject(new CubeGeometry(2, 2, 2), new LambertMaterial({ color: 0x339966 }), 0, 5, 0);
        towerStore4 = new gameObject(new CubeGeometry(1.5, 2, 1.5), new LambertMaterial({ color: 0x666666 }), 0, 7, 0);
        towerStore5 = new gameObject(new CubeGeometry(1, 2, 1), new LambertMaterial({ color: 0x333366 }), 0, 9, 0);
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
    function addControl(controlObject) {
        /* ENTER CODE for the GUI CONTROL HERE */
        gui.add(controlObject, 'rotateStore1', -1, 1);
        gui.add(controlObject, 'rotateStore2', -1, 1);
        gui.add(controlObject, 'rotateStore3', -1, 1);
        gui.add(controlObject, 'rotateStore4', -1, 1);
        gui.add(controlObject, 'rotateStore5', -1, 1);
        gui.add(controlObject, 'resetPosition');
        gui.add(controlObject, 'randomColors');
        gui.add(controlObject, 'addTextures');
        gui.add(controlObject, 'scaleTower', 1, 2);
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
    function gameLoop() {
        stats.update();
        towerStore1.rotation.y += control.rotateStore1;
        towerStore2.rotation.y += control.rotateStore2;
        towerStore3.rotation.y += control.rotateStore3;
        towerStore4.rotation.y += control.rotateStore4;
        towerStore5.rotation.y += control.rotateStore5;
        towerStore1.scale.set(control.scaleTower, control.scaleTower, control.scaleTower);
        towerStore2.scale.set(control.scaleTower, control.scaleTower, control.scaleTower);
        towerStore3.scale.set(control.scaleTower, control.scaleTower, control.scaleTower);
        towerStore4.scale.set(control.scaleTower, control.scaleTower, control.scaleTower);
        towerStore5.scale.set(control.scaleTower, control.scaleTower, control.scaleTower);
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x404040, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 100);
        camera.position.x = 35.3;
        camera.position.y = 18.5;
        camera.position.z = 3; //-28.7;
        camera.rotation.set(-1.10305, 0.49742, -0.1396);
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map