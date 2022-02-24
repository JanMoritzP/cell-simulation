export default class Point {
    constructor(amount, diffusion, minAmount, maxAmount) {
        if(arguments.length === 0) {
            this.isEmpty = true
            return
        }
        this.amount = amount
        this.diffusion = diffusion
        this.minAmount = minAmount
        this.maxAmount = maxAmount
    }
    
    fillPoint(amount, diffusion, minAmount, maxAmount) {
        this.amount = amount
        this.diffusion = diffusion
        this.minAmount = minAmount
        this.maxAmount = maxAmount
        this.isEmpty = false
    }

    addAmount(amount) {
        this.amount += amount
        if(this.amount > this.maxAmount) this.amount = this.maxAmount
    }

    subtractAmount(amount) {
        this.amount -= amount
        if(this.amount < this.minAmount) {
            this.amount = 0
            this.isEmpty = true
        }
    }

    getAmount() {
        if(this.isEmpty) return 0
        else return this.amount
    }

    getDiffusion() {
        if(this.isEmpty) return 0
        else return this.diffusion
    }

    getMinAmount() {
        if(this.isEmpty) return 0
        else return this.minAmount
    }

    getMaxAmount() {
        if(this.isEmpty) return 1
        else return this.maxAmount
    }
}