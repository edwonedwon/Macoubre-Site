function RyanCube()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.time = 0.0;
		//renderer.setClearColor( 0xA67C52, 1);

		var geometry = new THREE.BufferGeometry();
		var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

		var positions = [];
		var colors = [];
		var indices_array = [];

		var box_center = new THREE.Vector3(0,0,0);
		var box_width = 1.8;

		positions.push( -box_width, -box_width, -box_width );
		positions.push(  box_width, -box_width, -box_width );
		positions.push( box_width, 	box_width, -box_width );
		positions.push( -box_width, box_width, -box_width );
		positions.push( -box_width, -box_width, box_width );
		positions.push(  box_width, -box_width, box_width );
		positions.push( box_width, 	box_width, box_width );
		positions.push( -box_width, 	box_width, box_width );

		for ( i = 0; i < 8; i+=1 )
		{
			colors.push(0.8,1,1,1.0);
		}

		indices_array.push(0, 1);	
		indices_array.push(1, 2);	
		indices_array.push(2, 3);	
		indices_array.push(3, 0);	
		indices_array.push(4, 5);	
		indices_array.push(5, 6);	
		indices_array.push(6, 7);	
		indices_array.push(7, 4);

		indices_array.push(1, 5);	
		indices_array.push(2, 6);	
		indices_array.push(3, 7);	
		indices_array.push(0, 4);	

		// vert attrib
		geometry.addAttribute( 'index', new THREE.BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geometry.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( positions ), 3 ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( new Float32Array( colors ), 4 ) );
		geometry.computeBoundingSphere();

		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			//data: { type: 'f', value: null }
		};

		uniforms = {
			time: {type: 'f', value: 2.0}
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader:   document.getElementById( 'vertexShaderCube' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShaderLines' ).textContent,

			//blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	true,
		});

		this.mesh = new THREE.Line( geometry, shaderMaterial, THREE.LinePieces );
		//this.mesh = new THREE.Mesh( geometry, shaderMaterial );
		scene.add( this.mesh );

		/*var cube = new THREE.Mesh(new THREE.CubeGeometry(4, 4, 4), new THREE.MeshBasicMaterial({
	        wireframe: true,
	        color: 'white'
	      }));
	      cube.rotation.x = Math.PI * 0.1;
	      scene.add(cube);*/
	};

	this.release = function()
	{
		scene.remove(this.mesh);
		this.mesh = null;
	};

	this.update = function()
	{
		this.time += g_dt;
		//this.mesh.material.uniforms.time.value = this.time;
	};
}