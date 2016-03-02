/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        
        public rotateStore1: number = 0;
        public rotateStore2: number = 0;
        public rotateStore3: number = 0;
        public rotateStore4: number = 0;
        public rotateStore5: number = 0;
        public scaleTower: number = 1;
        
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor() {

        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       public resetPosition(): void {
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
        }
        
        
        public addTextures(): void {
            towerStore1.material = towerTexture;
            towerStore2.material = towerTexture;
            towerStore3.material = towerTexture;
            towerStore4.material = towerTexture;
            towerStore5.material = towerTexture;
        }
        
        public randomColors(): void {
            towerStore1.material = new LambertMaterial({color: Math.random() * 0xffffff  }); 
            towerStore2.material = new LambertMaterial({color: Math.random() * 0xffffff  }); 
            towerStore3.material = new LambertMaterial({color: Math.random() * 0xffffff  }); 
            towerStore4.material = new LambertMaterial({color: Math.random() * 0xffffff  }); 
            towerStore5.material = new LambertMaterial({color: Math.random() * 0xffffff  }); 
        }
        
        
        
    }
}
