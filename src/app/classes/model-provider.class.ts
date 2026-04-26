import { CloneOf } from "src/app/functions/clone-of.func";
import { RandomBetween } from "../functions/randoms.func";

export class ModelProvider<ModelType = unknown> {
    private model: ModelType

    private declare modelName: string

    private declare flatModelDummyData: ModelType

    constructor(name: string, model: ModelType) {
        this.model = model

        this.modelName = name
    }

    getModel = () => CloneOf(this.model)

    getDummyModel(modifier?: (model: ModelType) => ModelType) {
        if(!this.flatModelDummyData) throw Error(`Dummy model data for "${this.modelName}" was not set`)
        
        Object.assign(this.flatModelDummyData, {id: RandomBetween(1, 1_000)})

        if(modifier)
            return modifier(this.flatModelDummyData)
        else
            return this.flatModelDummyData
    }

    getMultipleDummyData (length = 5, modifier: (model: ModelType) => ModelType) {
        const result: ModelType [] = []

        for (let i = 0; i < length; i++) result.push(modifier(this.getDummyModel()))

        return result
    }

    setDummyModel = (data: ModelType) => this.flatModelDummyData = data 
}