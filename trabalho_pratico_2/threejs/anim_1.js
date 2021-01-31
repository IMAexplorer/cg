function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        
        let right_upper_arm =  robot.getObjectByName("right_upper_arm");

        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/2 }, 500)
            .onUpdate(function(){
                
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R                 
                let [x,y,z] = [right_upper_arm.position.x, right_upper_arm.position.y, right_upper_arm.position.z];
                let pivot = {x: 0, y: 2, z: 0};

                right_upper_arm.matrix.makeTranslation(0,0,0)
                    .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ))
                    .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta))
                    .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ))
                    .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ))
                    ;                        

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            });

            let armTween = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/2 }, 500)
            .onUpdate(function(){
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R 
                let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm");

                let [x,y,z] = [right_lower_arm.position.x, right_lower_arm.position.y, right_lower_arm.position.z];
                let pivot = {x: 0, y: 2, z: 0};

                right_lower_arm.matrix.makeTranslation(0,0,0)
                    .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z ))
                    .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta))
                    .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z ))
                    .premultiply( new THREE.Matrix4().makeTranslation(x, y, z ))
                                                     

                // Updating final world matrix (with parent transforms) - mandatory
                right_upper_arm.updateMatrixWorld(true);
                // Updating screen
                stats.update();
                renderer.render(scene, camera);
            });
        
        
        // start animations
        upperArmTween.start();        
        armTween.start();
    },
    animate: function(time) {
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    },
    run: function() {
        this.init();
        this.animate(0);
    }
});




