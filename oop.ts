class Shape {

    info():void{
        console.log("this is a shape");
    }
}

class Rectangle {
    length: number
    width: number

    constructor(length: number, width: number){
        this.length = length
        this.width = width
    }
    area():number{
        return this.length * this.width
    }
    scale():void{
        this.length *= 1.2;
        this.width *= 1.2;
    }
    static connecting (reg1:Rectangle,reg2:Rectangle):Rectangle{
        const side:number = (reg1.area()+reg2.area())**0.5;
        return new Rectangle(side,side)
    }
    info():void{
        console.log("this is a rectangle");
    }
}

class Square extends Rectangle{
    
    constructor(length: number){
        super (length, length)
    }
}

class ColoredRectangle extends Rectangle{
    color: string

    constructor(length: number,width: number,color:string){
        super(length,width)
        this.color = color
    }
    info():void{
        console.log(`this is a ${this.color} rectangle`);
    }
}

//5

class Shape1{
    
    drow():void{
        console.log("drawing a shape");
    }
}

class Triangle1 extends Shape1{

    drow():void{
        console.log("drawing a triangle");
    }
}

class Circle1 extends Shape1{

    drow():void{
        console.log("drawing a circle");
    }
}

class Square1 extends Shape1{

    drow():void{
        console.log("drawing a square");
    }
}

const nderShapes:(Shapes:Shape1[]) => void = (Shapes:Shape1[]) => {
    for (const shape of Shapes) {
        shape.drow;
    }
}