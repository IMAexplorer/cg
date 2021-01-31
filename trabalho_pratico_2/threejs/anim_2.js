function LaughAnimation() {}

Object.assign( LaughAnimation.prototype, {

    init: function() {
        
        let head =  robot.getObjectByName("head");
        let right_upper_arm =  robot.getObjectByName("right_upper_arm");
        let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm"); 
        var right_hand = right_lower_arm.getObjectByName("hand");

        let left_upper_arm =  robot.getObjectByName("left_upper_arm");
        let left_lower_arm =  left_upper_arm.getObjectByName("lower_arm");

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
            right_lower_arm.updateMatrixWorld(true);
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

        let handTween = new TWEEN.Tween( {theta: 0} )
        .to( {theta: Math.PI / 2}, 500)
        .delay(1000)
        .onUpdate(function(){
            
           
            let [x,y,z] = [right_hand.position.x, right_hand.position.y, right_hand.position.z];            
            
            right_hand.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta))
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))            
            ;

            // Updating final world matrix (with parent transforms) - mandatory
            right_hand.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });

        let handTweenBackwards = new TWEEN.Tween( {theta: Math.PI / 2} )
        .to( {theta: 0 }, 500)
        .delay(1500)
        .onUpdate(function(){            
            
            let [x,y,z] = [right_hand.position.x, right_hand.position.y, right_hand.position.z];
            
            right_hand.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta))
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))            
            ;

            // Updating final world matrix (with parent transforms) - mandatory
            right_hand.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });
    
        // add head beharviour to animation
        let headTweed = new TWEEN.Tween( {theta: 0} )
        .to( {theta: 0.1 }, 500)
        .delay(500)
        .onUpdate(function(){
                    
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
    
        // add left arm beharviour to animation
        let leftUpperArmTweed = new TWEEN.Tween( {theta: 0} )
        .to( {theta: Math.PI / 8 }, 500)
        .delay(500)
        .onUpdate(function(){
            
            let [x,y,z] = [left_upper_arm.position.x, left_upper_arm.position.y, left_upper_arm.position.z];
            let pivot = {x: 0, y: 2, z: 0};

            left_upper_arm.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z))
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z))
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))
            ;

            // Updating final world matrix (with parent transforms) - mandatory
            left_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });

        let leftLowerArmTweed = new TWEEN.Tween( {theta: 0} )
        .to( {theta: Math.PI / 8 }, 500)
        .delay(500)
        .onUpdate(function(){
            
            let [x,y,z] = [left_lower_arm.position.x, left_lower_arm.position.y, left_lower_arm.position.z];
            let pivot = {x: 0, y: 2, z: 0};

            left_lower_arm.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z))
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z))
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))
            ;

            // Updating final world matrix (with parent transforms) - mandatory
            left_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });
        
        // start animations
        upperArmTween.start();
        armTweenFoward.start();
        armTweenBackward.start();
        headTweed.start();       
        handTween.start();   
        handTweenBackwards.start();
        leftLowerArmTweed.start();
        leftUpperArmTweed.start();
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

