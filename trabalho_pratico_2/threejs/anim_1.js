function WaveAnimation() {}

Object.assign( WaveAnimation.prototype, {

    init: function() {
        
        let right_upper_arm =  robot.getObjectByName("right_upper_arm");
        let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm"); 

        let upperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/2 }, 500)
            .onUpdate(function(){
                
                // This is an example of rotation of the right_upper_arm 
                // Notice that the transform is M = T * R                 
                let [x,y,z] = [right_upper_arm.position.x, right_upper_arm.position.y, right_upper_arm.position.z];
                let pivot = {x: 0, y: 2, z: 0};

                console.log('-------------------');
                console.log(right_upper_arm.position);

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

        let armTweenFoward = new TWEEN.Tween( {theta:0} )
        .to( {theta: Math.PI/2 }, 500)
        .delay(500)
        .onUpdate(function(){

            let [x,y,z] = [right_lower_arm.position.x, right_lower_arm.position.y, right_lower_arm.position.z];
            let pivot = {x: 0, y: 2, z: 0};

            right_lower_arm.matrix.makeTranslation(0,0,0)
                .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z))
                .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta))
                .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z))
                .premultiply( new THREE.Matrix4().makeTranslation(x, y, z));
                                                    

            // Updating final world matrix (with parent transforms) - mandatory
            right_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });

        let armTweenBackward = new TWEEN.Tween( {theta: Math.PI / 2} )
        .to( {theta: 0 }, 500)
        .delay(1000)
        .onUpdate(function(){
            
            let [x,y,z] = [right_lower_arm.position.x, right_lower_arm.position.y, right_lower_arm.position.z];
            let pivot = {x: 0, y: 2, z: 0};

            right_lower_arm.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z))
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z))
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))
            ;

            // Updating final world matrix (with parent transforms) - mandatory
            right_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });
    
        // add head beharviour to animation
        let headTweed = new TWEEN.Tween( {theta: 0} )
        .to( {theta: 0.1 }, 500)
        .delay(500)
        .onUpdate(function(){
            
            let head =  robot.getObjectByName("head");
            let [x,y,z] = [head.position.x, head.position.y, head.position.z];

            head.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta));

            // Updating final world matrix (with parent transforms) - mandatory
            head.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });
        
        // start animations
        upperArmTween.start();
        armTweenFoward.start();
        armTweenBackward.start();
        headTweed.start();          
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




