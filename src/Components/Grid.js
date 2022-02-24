import Point from './Point'

export default class Grid {
    constructor(size) {
        this.size = size
        this.matrix = []
        for(let i = 0; i < size; i++) {
            this.matrix[i] = []
            for(let j = 0; j < size; j++) {
                this.matrix[i][j] = new Point()
            }
        }
    }

    setPixels(x, y, amount, diffusion, minAmount, maxAmount) {
        this.matrix[x][y].fillPoint(amount, diffusion, minAmount, maxAmount)
    }

    getSize() {
        return this.size
    }

    run() {
        //Diffuse the pixels
        for(let i = 0; i < this.size; i++) {
            for(let j = 0; j < this.size; j++) {
                //Diffuse outwards, if enough amount and it does not overflow other cells
                if(this.matrix[i][j].isEmpty) continue
                var diffusableAmount = this.matrix[i][j].getAmount() * this.matrix[i][j].getDiffusion() / 2
                if(diffusableAmount <= this.matrix[i][j].getMinAmount()) continue
                var maxA = 2
                var minA = -1
                var maxB = 2
                var minB = -1
                if(i === 0) minA = 0
                if(i === this.size - 1) maxA = 1
                if(j === 0) minB = 0
                if(j === this.size - 1) maxB = 1
                for(let a = minA; a < maxA; a++) {
                    for(let b = minB; b < maxB; b++) {
                        var diffWeight = 1/16
                        if(b === 0 || a === 0) diffWeight = 3/16
                        if(!this.matrix[i + a][j + b].isEmpty) {
                            if(this.matrix[i + a][j + b].getAmount() + diffWeight * diffusableAmount >= this.matrix[i][j].getAmount() ||
                            this.matrix[i + a][j + b].getAmount() + diffWeight * diffusableAmount > this.matrix[i + a][j + b].getMaxAmount()) continue
                            else {
                                this.matrix[i + a][j + b].addAmount(diffusableAmount * diffWeight)
                                this.matrix[i][j].subtractAmount(diffusableAmount * diffWeight)
                            }
                        }
                        else {
                            this.matrix[i + a][j + b].fillPoint(diffusableAmount * diffWeight, this.matrix[i][j].getDiffusion(), this.matrix[i][j].getMinAmount(), this.matrix[i][j].getMaxAmount())
                            this.matrix[i][j].subtractAmount(diffusableAmount * diffWeight)
                        }

                    }
                }
            }
        }
    }

    getPixels() {
        return this.matrix
    }

}