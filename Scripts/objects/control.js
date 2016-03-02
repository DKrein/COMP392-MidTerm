/// <reference path="../../typings/tsd.d.ts"/>
/*
Author: Douglas Krein
Last Modified by: Douglas Krein
Last Modified: 02-03-2016
File description:
- Here is where the controls are created and controled

Revision:
1 - controls to rotate added
2 - control to add texture
3 - control to random colors
4 - control to resize tower
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control() {
            this.rotateStore1 = 0;
            this.rotateStore2 = 0;
            this.rotateStore3 = 0;
            this.rotateStore4 = 0;
            this.rotateStore5 = 0;
            this.scaleTower = 1;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.resetPosition = function () {
            this.rotateStore1 = 0;
            this.rotateStore2 = 0;
            this.rotateStore3 = 0;
            this.rotateStore4 = 0;
            this.rotateStore5 = 0;
            towerStore1.rotation.y = 0;
            towerStore2.rotation.y = 0;
            towerStore3.rotation.y = 0;
            towerStore4.rotation.y = 0;
            towerStore5.rotation.y = 0;
        };
        Control.prototype.addTextures = function () {
            towerStore1.material = towerTexture;
            towerStore2.material = towerTexture;
            towerStore3.material = towerTexture;
            towerStore4.material = towerTexture;
            towerStore5.material = towerTexture;
        };
        Control.prototype.randomColors = function () {
            towerStore1.material = new LambertMaterial({ color: Math.random() * 0xffffff });
            towerStore2.material = new LambertMaterial({ color: Math.random() * 0xffffff });
            towerStore3.material = new LambertMaterial({ color: Math.random() * 0xffffff });
            towerStore4.material = new LambertMaterial({ color: Math.random() * 0xffffff });
            towerStore5.material = new LambertMaterial({ color: Math.random() * 0xffffff });
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map