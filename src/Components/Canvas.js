import { React, useState } from "react";
import Sketch from "react-p5";
import { floor } from "mathjs";
import '../css/Canvas.css'
import Grid from "./Grid";

export default function Canvas() {
    const [running, setRunning] = useState(false)
    const [money, setMoney] = useState(0)

    var gridSize = 100
    var grid = new Grid(gridSize)

    const setup = (p5, parentRef) => {
        p5.createCanvas(gridSize * 2, gridSize * 2).parent(parentRef)
    }

    const draw = p5 => {
        if(running) grid.run()
        p5.loadPixels()
        var matrix = grid.getPixels()
        for(var i = 0; i < grid.getSize(); i++) {
            for(var j = 0; j < grid.getSize(); j++) {
                var color =  -255 * (matrix[i][j].getAmount() / matrix[i][j].getMaxAmount()) + 255
                p5.set(i*2, j*2, p5.color(color))
                p5.set(i*2 + 1, j*2, p5.color(color))
                p5.set(i*2, j*2 + 1, p5.color(color))
                p5.set(i*2 + 1, j*2 + 1, p5.color(color))
            }
        }
        p5.updatePixels()
    }

    const mousePressed = (e) => {
        if(e.target.className === "p5Canvas") {
            var x = floor((e.clientX - e.target.getBoundingClientRect().x) / 2)
            var y = floor((e.clientY - e.target.getBoundingClientRect().y) / 2)
            grid.setPixels(x, y, 500, 0.05, 0.1, 500)
        }
    }
    
    const run = async e => {
        if(running) {
            setRunning(false)
        }
        else {
            setRunning(true)
        }
    }
    
    return(
        <div id="canvasWrapper">
            <p>I am a canvas!</p>
            <div id="sketchWrapper" onClick={e => mousePressed(e)}>
                <Sketch id="sketch" setup={setup} draw={draw}></Sketch>
            </div>
            <input type={"button"} value={running ? "Stop" : "Run"} onClick={e => run(e)}/>
        </div>
    )
}
