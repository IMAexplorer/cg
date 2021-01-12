(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.BasicRenderer = {}));
}(this, (function (exports) { 'use strict';


        /* ------------------------------------------------------------ */

        
    function inside(  x, y, primitive  ) {

        if (primitive['shape'] === 'circle')
            return isInsideCircle(x,y,primitive);
        else if (primitive['shape'] === 'triangle')
            return isInsideTriangle(x,y,primitive);
        else if (primitive['shape'] == 'polygon')
            return windingNumber(x, y, primitive);
        else
            return false
    }

    function pointIsInPoly(x, y, primitive) {
        
        var polygon = primitive['vertices'];
        var p = [x, y];
        var isInside = false;
        var minX = polygon[0][0], maxX = polygon[0][0];
        var minY = polygon[0][1], maxY = polygon[0][1];
        
        for (var n = 1; n < polygon.length; n++) {
            
            var q = polygon[n];
            minX = Math.min(q[0], minX);
            maxX = Math.max(q[0], maxX);
            minY = Math.min(q[1], minY);
            maxY = Math.max(q[1], maxY);
        }
    
        if (p[0] < minX || p[0] > maxX || p[1] < minY || p[1] > maxY) {
            return false;
        }
    
        var i = 0, j = polygon.length - 1;
        for (i, j; i < polygon.length; j = i++) {
            if ( (polygon[i][1] > p[1]) != (polygon[j][1] > p[1]) &&
                    p[0] < (polygon[j][0] - polygon[i][0]) * (p[0] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0] ) {
                isInside = !isInside;
            }
        }
    
        return isInside;
    }

    function windingNumber(x, y, primitive) {

        var vs = primitive['vertices'];                
        var wn = 0;
    
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0], yi = vs[i][1];
          var xj = vs[j][0], yj = vs[j][1];
    
          if (yj <= y) {
            if (yi > y) {
              if (isLeft([xj, yj], [xi, yi], [x,y]) > 0) {
                wn++;
              }
            }
          } else {
            if (yi <= y) {
              if (isLeft([xj, yj], [xi, yi], [x, y]) < 0) {
                wn--;
              }
            }
          }
        }
    
        return wn != 0;

    }
        
    function isLeft(p0, p1, point) {
        return (p1[0] - p0[0]) * (point[1] - p0[1]) - (point[0] - p0[0]) * (p1[1] - p0[1]);
    }

    function isInsideTriangle(x,y,primitive) {

        const p1 = primitive['vertices'][0];
        const p2 = primitive['vertices'][1];
        const p3 = primitive['vertices'][2];

        const coord = [x,y];

        const s1 = signal(coord, p1, p2);        
        const s3 = signal(coord, p2, p3);
        const s2 = signal(coord, p3, p1);

        const allSignals = [s1, s2, s3];                

        return verifyVectorSignals(allSignals);
    }

    function verifyVectorSignals(signalArray) {
        
        // If all signals are positive or all signals are negative, the point is in the triangle
        if (signalArray.every((x) => x > 0) ||  signalArray.every((x) => x < 0)) {            
            return true;
        } else
            return false;
    }

    // verify if point is inside a circle
    function isInsideCircle( x, y, primitive) {

        const xc = primitive['center'][0];
        const yc = primitive['center'][1];
        const radius = primitive['radius'];

        if ( (x-xc) ** 2 + (y-yc) ** 2 <= radius ** 2 )
            return true;
        else
            return false;            
    }

    // computes the signal of normal vector in relation to the point
    function signal(p1, p2, p3) {        
        return (p1[0]-p3[0]) * (p2[1]-p3[1]) - (p2[0]-p3[0]) * (p1[1]-p3[1]);
    }
        
    // Constructor
    function Screen( width, height, scene ) {
        this.width = width;
        this.height = height;    
        this.scene = this.preprocess(scene);
        this.createImage(); 
    }

    function computeBoundingBox(primitive) {

        if (primitive['shape'] === 'circle') {

            var xMin, yMin, xMax, yMax;
            var center = primitive['center'];
            var radius = primitive['radius'];

            xMin = center[0] - radius;
            xMax = center[0] + radius;
            yMin = center[1] - radius;
            yMax = center[1] + radius;

        } else {
            var verticeList = primitive['vertices'];
            var xMin = xMax = verticeList[0][0];
            var yMin =  yMax = verticeList[0][1];

            verticeList.forEach(vertice => {
                
                if (vertice[0] < xMin)
                    xMin = vertice[0];
                else if (vertice[0] > xMax) {
                    xMax = vertice[0];
                }
                if (vertice[1] < yMin) {
                    yMin = vertice[1];
                } else if (vertice[1] > yMax) {
                    yMax = vertice[1];
                }             
            });
        }
        
        var minList = [xMin, yMin];
        var maxList = [xMax, yMax];

        primitive['bounds'] = [minList, maxList];
    }


    const multiplyMatrices = (a, b) => {
        
        if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
           throw new Error('arguments should be in 2-dimensional array format');
        }
        let x = a.length,
        z = a[0].length,
        y = b[0].length;
        if (b.length !== z) {
           // XxZ & ZxY => XxY
           throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
        }
        let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
        let product = new Array(x);
        
        for (let p = 0; p < x; p++) {
           product[p] = productRow.slice();
        }
        
        for (let i = 0; i < x; i++) {
           for (let j = 0; j < y; j++) {
              for (let k = 0; k < z; k++) {
                 product[i][j] += a[i][k] * b[k][j];
              }
           }
        }
        
        return product;
    }

    function computeTransformation(i , j, xform) {
        
        const vec = [[i], [j], [1]];
        const transformation = xform;

        const result = multiplyMatrices(transformation, vec);

        return result;
    }

    Object.assign( Screen.prototype, {

            preprocess: function(scene) {
                // Possible preprocessing with scene primitives, for now we don't change anything
                // You may define bounding boxes, convert shapes, etc
                
                var preprop_scene = [];

                for( var primitive of scene ) {  
                    // do some processing
                    // for now, only copies each primitive to a new list   
                    computeBoundingBox(primitive);           

                    preprop_scene.push( primitive );                    
                }
                
                return preprop_scene;
            },

            createImage: function() {
                
                this.image = nj.ones([this.height, this.width, 3]).multiply(255);

                console.log(this.image);
            },

            rasterize: function() {
                var color;
         
                // In this loop, the image attribute must be updated after the rasterization procedure.
                for( var primitive of this.scene ) {

                    var bounds = primitive['bounds'];
                    
                    var lowerXBound = bounds[0][0];
                    var lowerYBound = bounds[0][1];
                    var upperXBound = bounds[1][0];
                    var upperYBound = bounds[1][1];

                    // Loop through all pixels defined by the width and height
                    for (var i = lowerXBound; i < upperXBound; i++) {
                        var x = i + 0.5;
                        for( var j = lowerYBound; j < upperYBound; j++) {
                            var y = j + 0.5;

                            // First, we check if the pixel center is inside the primitive 
                            if ( inside( x, y, primitive ) ) {                                                                
                                
                                var nI = i;
                                var nJ = j;
                                
                                if (primitive.hasOwnProperty('xform')) {

                                    const result = computeTransformation(i , j, primitive['xform']);
                                    nI = Math.round(result[0]);
                                    nJ = Math.round(result[1]);
                                }                                
                                
                                // only solid colors for now
                                color = nj.array(primitive.color);
                                this.set_pixel( nI, this.height - (nJ + 1), color );
                            }
                            
                        }
                    }
                }
                
               
              
            },

            set_pixel: function( i, j, colorarr ) {
                // We assume that every shape has solid color
         
                this.image.set(j, i, 0,    colorarr.get(0));
                this.image.set(j, i, 1,    colorarr.get(1));
                this.image.set(j, i, 2,    colorarr.get(2));
            },

            update: function () {
                // Loading HTML element
                var $image = document.getElementById('raster_image');
                $image.width = this.width; $image.height = this.height;

                // Saving the image
                nj.images.save( this.image, $image );
            }
        }
    );

    exports.Screen = Screen;
    
})));

