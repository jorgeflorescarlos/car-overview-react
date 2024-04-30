import React, { useEffect } from 'react';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import './App.css';

function App() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  //Keep the 3D object on a global variable so we can access it later
  let object;

  //OrbitControls allow the camera to move around the scene
  let controls;

  //Set which object to render
  let objToRender = 'tesla_model_3';

  //Instantiate a loader for the .gltf file
  const loader = new GLTFLoader();
  const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  useEffect(() => {
    //Load the file
    loader.load(
      `models/${objToRender}/scene.gltf`,
      function (gltf) {
        console.log("loaded")
        //If the file is loaded, add it to the scene
        object = gltf.scene;
        //object.rotation.x = Math.PI / 2; 
        object.rotation.y = Math.PI / 1.5; 
        scene.add(object);
      },
      function (xhr) {
        //While it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        //If there is an error, log it
        console.error(error);
      }
    );
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.add(ambientLight);
    //Add the renderer to the DOM
    document.getElementById("container3D").appendChild(renderer.domElement);
    //Add a listener to the window, so we can resize the window and the camera
    window.addEventListener("resize", function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    //Set how far the camera will be from the 3D model
    camera.position.z =  350;

    //Add lights to the scene, so we can actually see the 3D model
    const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
    topLight.position.set(50, 50, 150) //top-left-ish
    topLight.castShadow = true;
    scene.add(topLight);

    const topLightBack = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
    topLightBack.position.set(-10, -1, -10) //top-left-ish
    topLightBack.castShadow = true;
    scene.add(topLightBack);
    

    controls = new OrbitControls(camera, renderer.domElement);


    animate()
  }, [])

  //Render the scene
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  return (
    <div className="App">
      <div className="Car-view">
        <div className="Map-shadow">
        </div>
        <MapContainer center={[19.9554692, -102.4425766]} zoom={13} scrollWheelZoom={false} className="Mini-map" zoomControl = {false}>
            <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
            url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
          />
        </MapContainer>
        
        
        <div id="container3D"></div>
        <div className="plane"></div>
        <div className="flex controls-bar">
        <div className="w-3/5 bg-gray-950 mr-2 p-0">
          <div className="max-w mx-0 shadow-md overflow-hidden">
            <div className="flex">
              <div className="flex">
                <img className="h-16 object-cover w-16" src="https://f4.bcbits.com/img/a3515588457_10.jpg" alt="Imagen del álbum"/>
              </div>
              <div className="flex w-full">
                <div className="w-full">
                  <div className="tracking-wide text-sm text-white-500 font-semibold">Under the bridge</div>
                  <div className="tracking-wide text-sm text-gray-500 font-semibold">Heathered Pearls</div>
                </div>
                
                <div className="flex">
                  <button className="hover:bg-gray-700 text-white py-2 px-4 mr-2 rounded">Random</button>
                  <button className="hover:bg-gray-700 text-white py-2 px-4 rounded">Repeat</button>
                </div>
              </div>
              

            </div>
            <div className="relative h-4 w-full">
              <div className="absolute top-0 left-0 h-1 bg-gray-200 rounded-full w-full"></div>
              <div className="absolute top-0 left-0 h-1 bg-blue-500 rounded-full" style={{width: "50%"}}></div>
              <div className="absolute -top-1 h-4 w-4 bg-blue-500 rounded-full -translate-x-1/2 left-1/2"></div>
            </div>
          </div>
        </div>
        <div className="w-2/5 bg-gray-950">
          <div className="flex">
            <div className="flex ml-2 text-gray-500 w-full"><span className="text-white mr-2">P</span> R N D</div>
            <div>70%</div>
            </div>
          <div>Start trip</div>
        </div>
      </div>

        
        <a
          className="App-link"
          href="https://skfb.ly/oOHMD"
          target="_blank"
          rel="noopener noreferrer"
        >
        "Tesla Model 3 [Realistic FREE]" (https://skfb.ly/oOHMD) by WARENTERTAINMENT™ is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
        </a>
      </div>
    </div>
  );
}

export default App;
