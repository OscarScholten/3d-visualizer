var scene = (function () {
  "use strict";

  var shapes = [
    { name: "achterplaat",   px:  0, py:  0, pz:   0, dx: 84, dy: 56, dz:  2 },
    { name: "onderplaat",    px:  2, py: -2, pz: -52, dx: 80, dy:  2, dz: 74 },
    { name: "linkerplaat",   px:  0, py: -2, pz:   2, dx:  2, dy: 58, dz: 20 },
    { name: "rechterplaat",  px: 82, py: -2, pz:   2, dx:  2, dy: 58, dz: 20 },
    { name: "voorplaat",     px:  0, py: -2, pz:  22, dx: 84, dy: 58, dz:  2 },
    { name: "deksel",        px:  0, py: 56, pz:   0, dx: 84, dy:  1, dz: 24 }
  ];

  function _init(elementid) {
    var element = document.getElementById(elementid);
    var container = document.createElement('div');
    element.appendChild(container);

    var renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 125;
    camera.position.y = 125;
    camera.position.z = 125;
    camera.lookAt(new THREE.Vector3(40, 0, 0));

    var ambientLight = new THREE.AmbientLight(0x606060);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 0.75, 0.5).normalize();
    scene.add(directionalLight);

    var material = new THREE.MeshLambertMaterial( {
      color: 0xfeb74c,
      ambient: 0xfeb74c,
      shading: THREE.FlatShading,
      map: THREE.ImageUtils.loadTexture("texture.png")
    } );

    shapes.forEach(function (shape) {
      var geometry = new THREE.BoxGeometry(shape.dx, shape.dy, shape.dz);

      var cube = new THREE.Mesh(geometry, material);
      cube.position.x = shape.px + 0.5 * shape.dx;
      cube.position.y = shape.py + 0.5 * shape.dy;
      cube.position.z = shape.pz + 0.5 * shape.dz;

      scene.add(cube);
    });

    var render = function () {
      requestAnimationFrame(render);

      renderer.render(scene, camera);
    };

    window.addEventListener('resize', onWindowResize, false);

    render();

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight );
    }
  }

  return {
    init: function (elementid) {
      _init(elementid);
    },

    getShapes: function () {
      return shapes;
    }
  }
}());
