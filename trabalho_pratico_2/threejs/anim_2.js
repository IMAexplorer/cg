function LaughAnimation() {}

Object.assign( LaughAnimation.prototype, {

    init: function() {            
        
        let right_upper_arm =  robot.getObjectByName("right_upper_arm");
        let left_upper_arm =  robot.getObjectByName("left_upper_arm");

        let right_lower_arm =  right_upper_arm.getObjectByName("lower_arm"); 
        let left_lower_arm =  left_upper_arm.getObjectByName("lower_arm");
        
        var right_hand = right_lower_arm.getObjectByName("hand");
        // TODO create left hand reference
        

        let rightUpperArmTween = new TWEEN.Tween( {theta:0} )
            .to( {theta: Math.PI/4 }, 500)
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

        // add left arm beharviour to animation
        let leftUpperArmTweed = new TWEEN.Tween( {theta: 0} )
        .to( {theta: Math.PI / 4 }, 500)        
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

        let rightLowerArmTween = new TWEEN.Tween( {theta: 0} )
        .to( {theta: 2 * Math.PI / 3 }, 500)
        .delay(501)
        .onUpdate(function(){
            
            let [x,y,z] = [right_lower_arm.position.x, right_lower_arm.position.y, right_lower_arm.position.z];
            let pivot = {x: 0, y: 2, z: 0};

            right_lower_arm.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z))
            .premultiply( new THREE.Matrix4().makeRotationZ(-this._object.theta))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z))
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))
            ;

            // Updating final world matrix (with parent transforms) - mandatory
            right_upper_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });                    

        let leftLowerArmTweed = new TWEEN.Tween( {theta: 0} )
        .to( {theta: 2 * Math.PI / 3 }, 500)
        .delay(500)
        .onUpdate(function(){
            
            let [x,y,z] = [left_lower_arm.position.x, left_lower_arm.position.y, left_lower_arm.position.z];
            let pivot = {x: 0, y: 2, z: 0};

            left_lower_arm.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z))
            .premultiply( new THREE.Matrix4().makeRotationZ(this._object.theta))
            .premultiply( new THREE.Matrix4().makeTranslation(pivot.x, pivot.y, pivot.z))
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))
            ;

            // Updating final world matrix (with parent transforms) - mandatory
            left_lower_arm.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });


        // add head beharviour to animation ================================================7
        var initial_delay = 100;
        var head_animations = [];

        for (var i = 0; i < 10; i++) {            

            var head_tweed = returns_head_animation(initial_delay, i);            
            head_animations.push(head_tweed);         
            
            initial_delay += 100;
        }
        
        
        // start animations
        rightUpperArmTween.start();
        leftUpperArmTweed.start();
        rightLowerArmTween.start();
        leftLowerArmTweed.start();
        head_animations.forEach(head_tweed => {
            head_tweed.start();
        });
        
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


function returns_head_animation(custom_delay, power) {

    let headTweed = new TWEEN.Tween( {theta: 0} )
        .to( {theta: 0.1 }, 500)
        .delay(custom_delay)
        .onUpdate(function(){
                    
            let head =  robot.getObjectByName("head");
            let [x,y,z] = [head.position.x, head.position.y, head.position.z];

            var rotation_direction = (-1) ** power;

            head.matrix
            .makeTranslation(0,0,0)
            .premultiply( new THREE.Matrix4().makeTranslation(x, y, z))
            .premultiply( new THREE.Matrix4().makeRotationZ(rotation_direction * this._object.theta));        
            ;

            // Updating final world matrix (with parent transforms) - mandatory
            head.updateMatrixWorld(true);
            // Updating screen
            stats.update();
            renderer.render(scene, camera);
        });

    return headTweed;
}
