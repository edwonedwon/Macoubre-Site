function Mask()
{
	BaseObj.call(this);

	this.init = function()
	{
		this.time = 0.0;

		renderer.setClearColor( 0x777777, 1);

		var manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {

			console.log( item, loaded, total );
		};

		var onProgress = function ( xhr ) {
			if ( xhr.lengthComputable ) {
				var percentComplete = xhr.loaded / xhr.total * 100;
				console.log( Math.round(percentComplete, 2) + '% downloaded' );
			}
		};

		var onError = function ( xhr ) {
		};

		var attributes = {
			position: {	type: 'f', value: null },
			color: { type: 'f', value: null },
			normal: { type: 'f', value: null },
			//data: { type: 'f', value: null }
		};

		uniforms = {
			time: {type: 'f', value: 2.0}
		};

		var shaderMaterial = new THREE.ShaderMaterial( {

			uniforms: 		uniforms,
			attributes:     attributes,
			vertexShader:   document.getElementById( 'vertexShaderMaskNight' ).textContent,
			fragmentShader: document.getElementById( 'fragmentShaderMaskNight' ).textContent,

			blending: 		THREE.AdditiveBlending,
			depthTest: 		true,
			transparent:	true,
		});

		// model
		var loader = new THREE.OBJLoader( manager );
		var thisObj = this;

		console.log("HELOADING");

		loader.load( 'assets/obj/fembotface.obj', function ( object ) {
			object.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {
					child.material = shaderMaterial;
					//child.material.map = texture;
				}
			} );

			thisObj.obj = object;
			object.position.y = - 1;
			scene.add( object );

		}, onProgress, onError );

	};

	this.release = function()
	{
		if ( this.obj ) scene.remove(this.obj);
		if ( this.pointcloud ) scene.remove(this.pointcloud);
		
		this.obj = null;
		this.pointcloud = null;
	};

	this.rotateCamera = function()
	{
		var radius = 9.0;
		var time = this.time * 0.5;
		//time = Math.PI * 2.0;

		camera.position.x = radius * Math.cos(time*0.5);
		camera.position.y = radius * Math.sin(time)*0.2;
		camera.position.z = radius;

		camera.lookAt( camera.position.clone().negate() );
	};

	this.update = function()
	{
		var thisObj = this;
		if ( this.obj )
		{
			this.obj.traverse( function ( child ) {

				if ( child instanceof THREE.Mesh ) {
					child.material.uniforms.time.value = thisObj.time;
					//child.material.uniforms.time.value = 4.0;
					//child.material.map = texture;
				}
			} );
		}

		this.time += g_dt;
		this.rotateCamera();
		//camera.position.z = 9;
	};
}