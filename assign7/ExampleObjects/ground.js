/**
 * Created by gleicher on 10/9/2015.
 */

/**
 this is even simpler than the simplest object - it's a ground plane underneath
 the objects (at Z=0) - just a big plane. all coloring handled in the vertex
 shader. no normals. it's just a checkerboard that is simple.

 no normals, but a funky shader

 however, I am going to do it with TWGL to keep the code size down
 **/

// this defines the global list of objects
    // if it exists already, this is a redundant definition
    // if it isn't create a new array
var grobjects = grobjects || [];

// a global variable to set the ground plane size, so we can easily adjust it
// in the html file (before things run
// this is the +/- in the X and Z direction (so things will go from -5 to +5 by default)
var groundPlaneSize = groundPlaneSize || 5;

// now, I make a function that adds an object to that list
// there's a funky thing here where I have to not only define the function, but also
// run it - so it has to be put in parenthesis
(function() {
    "use strict";

    // putting the arrays of object info here as well
    var vertexPos = [
        -groundPlaneSize, 0, -groundPlaneSize,
         groundPlaneSize, 0, -groundPlaneSize,
         groundPlaneSize, 0,  groundPlaneSize,
        -groundPlaneSize, 0, -groundPlaneSize,
         groundPlaneSize, 0,  groundPlaneSize,
        -groundPlaneSize, 0,  groundPlaneSize
    ];

    var ground_color = [0.1, 0.1, 0.0];
    var color = [];
    for (var i = 0; i < 6; i++) {
        color = color.concat(ground_color);
    }

    // since there will be one of these, just keep info in the closure
    var shaderProgram = undefined;
    var buffers = undefined;

    // define the pyramid object
    // note that we cannot do any of the initialization that requires a GL context here
    // we define the essential methods of the object - and then wait
    //
    // another stylistic choice: I have chosen to make many of my "private" variables
    // fields of this object, rather than local variables in this scope (so they
    // are easily available by closure).
    var ground = {
        // first I will give this the required object stuff for it's interface
        // note that the init and draw functions can refer to the fields I define
        // below
        name : "Ground Plane",
        // the two workhorse functions - init and draw
        // init will be called when there is a GL context
        // this code gets really bulky since I am doing it all in place
        init : function(drawingState) {
            // an abbreviation...
            var gl = drawingState.gl;
            if (!shaderProgram) {
                shaderProgram = twgl.createProgramInfo(gl,["world-vs","world-fs"]);
            }
            var arrays = { 
                a_pos : {numComponents:3, data:vertexPos },
                a_normal: {numComponents:3, data:
                    [0,1,0, 0,1,0, 0,1,0,
                     0,1,0, 0,1,0, 0,1,0]
                },
                a_color: {numComponents:3, data: color},
            };
            buffers = twgl.createBufferInfoFromArrays(gl,arrays);
        },
        draw : function(drawingState) {
            var modelM = twgl.m4.identity();
            var gl = drawingState.gl;
            gl.useProgram(shaderProgram.program);
            twgl.setBuffersAndAttributes(gl,shaderProgram,buffers);
            twgl.setUniforms(shaderProgram,{
                u_specularness: 0.0,
                u_shininess:    0.0,
                u_emittance:    0.0,
                u_emittance_color:  drawingState.sunColor,
                u_view:drawingState.view,
                u_proj:drawingState.proj,
                u_lightdir:drawingState.sunDirection,
                u_suncolor:drawingState.sunColor,
                u_sunlight: drawingState.sunlight,
                u_model: modelM 
            });

            twgl.drawBufferInfo(gl, gl.TRIANGLES, buffers);
        },

        center : function(drawingState) {
            return [0,0,0];
        }

    };

    // now that we've defined the object, add it to the global objects list
    grobjects.push(ground);
})();
