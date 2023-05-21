export default class Model {
    constructor() {
        if(new.target === Model) {
            throw new Error("The model class can't be instantiated directly");
        }
    }

    toRequestBody() {
        throw new Error("Method not implemented!");
    }

    toFormData() {
        throw new Error("Method not implemented!");
    }

    getFieldsDiff(targetObject) {
        let diff = {};
        let currentObjectData = this.toRequestBody();
        let targetObjectData = targetObject.toRequestBody();
        for(const field in currentObjectData) {
            if(JSON.stringify(currentObjectData[field]) !== JSON.stringify(targetObjectData[field])) {
                diff[field] = targetObjectData[field];
            }
        }
        return diff;
    }
}