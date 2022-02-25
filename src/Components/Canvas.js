import { React, useState } from "react";
import Sketch from "react-p5";
import { floor } from "mathjs";
import '../css/Canvas.css'
import Grid from "./Grid";

export default function Canvas() {
    var mouseDown = false
    var isRunning = false
    const [diffusion, setDiffusion] = useState(0.1)
    const [initialAmount, setInitialAmount] = useState(100)
    const [maxAmount, setMaxAmount] = useState(100)
    const [minAmount, setMinAmount] = useState(10)

    var gridSize = 100
    var grid = new Grid(gridSize)

    const setup = (p5, parentRef) => {
        p5.createCanvas(gridSize * 2, gridSize * 2).parent(parentRef)
    }

    const draw = p5 => {
        p5.loadPixels()
        var matrix = grid.getPixels()
        for(var i = 0; i < grid.getSize(); i++) {
            for(var j = 0; j < grid.getSize(); j++) {
                var color =  -255 * (matrix[i][j].getAmount() / matrix[i][j].getMaxAmount()) + 255
                p5.set(i*2, j*2, p5.color(color, 255, 255))
                p5.set(i*2 + 1, j*2, p5.color(color, 255, 255))
                p5.set(i*2, j*2 + 1, p5.color(color, 255, 255))
                p5.set(i*2 + 1, j*2 + 1, p5.color(color, 255, 255))
            }
        }
        p5.updatePixels()
        if(isRunning) grid.run()
    }
    
    const run = async e => {
        if(isRunning) {
            e.target.value = "Run"
        }    
        else e.target.value = "Stop"
        
        isRunning = !isRunning
    }

    const mouseMove = async e => {
        if(e.target.className === "p5Canvas" && mouseDown) {
            var x = floor((e.clientX - e.target.getBoundingClientRect().x) / 2)
            var y = floor((e.clientY - e.target.getBoundingClientRect().y) / 2)
            grid.setPixels(x, y, initialAmount, diffusion, minAmount, maxAmount)       
        }
    }
    
    const mouseDownHandler = async e => {
        if(e.target.className === "p5Canvas") {
            var x = floor((e.clientX - e.target.getBoundingClientRect().x) / 2)
            var y = floor((e.clientY - e.target.getBoundingClientRect().y) / 2)
            grid.setPixels(x, y, initialAmount, diffusion, minAmount, maxAmount)
        }
        mouseDown = true

    }

    function updatePixels() {
        var matrix = grid.getPixels()
        for(var i = 0; i < grid.getSize(); i++) {
            for(var j = 0; j < grid.getSize(); j++) {
                if(!matrix[i][j].isEmpty) {
                    matrix[i][j].updatePoint(matrix[i][j].getAmount(), diffusion, minAmount, maxAmount)
                }
            }
        }
    }

    return(
        <div id="canvasWrapper">
            <h2>I am a canvas!</h2>
            <div id="sketchWrapper" onMouseDown={e => mouseDownHandler(e)} onMouseMove={e => mouseMove(e)} onMouseUp={e => mouseDown = false}>
                <Sketch id="sketch" setup={setup} draw={draw}></Sketch>
            </div>
            <input type={"button"} value={"Run"} onClick={e => run(e)}/>
            <div id="inputWrapper">
                <label for="maxAmountInput">Max Amount</label>
                <input type={"number"} id="maxAmountInput" value={maxAmount} min={0} onChange={e => setMaxAmount(e.target.value)}></input>
                <label for="minAmountInput">Min Amount</label>
                <input type={"number"} id="minAmountInput" value={minAmount} min={0} onChange={e => setMinAmount(e.target.value)}></input>
                <label for="diffusionInput">Diffusion</label>
                <input type={"number"} id="diffusionInput" value={diffusion} min={0} max={1} onChange={e => setDiffusion(e.target.value)}></input>
                <label for="initialAmountInput">Initial Amount</label>
                <input type={"number"} id="initialAmountInput" value={initialAmount} min={0} onChange={e => setInitialAmount(e.target.value)}></input>
            </div>
            <input type={"button"} value="Apply" onClick={updatePixels}></input>
        </div>
    )
}
