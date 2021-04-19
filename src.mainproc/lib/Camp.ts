import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import sanitize from 'sanitize-filename';

@Serializable()
export default class Camp {
    private _fileName: string;

    @JsonProperty() title: string;

    @JsonProperty() startDate: string;
    @JsonProperty() endDate: string;
    @JsonProperty() dayTimeStart: string;
    @JsonProperty() dayTimeEnd: string;

    constructor (fileName: string = "camp.json"){
        this._fileName = fileName;
        this.title = "";
        this.startDate = "";
        this.endDate = "";
        this.dayTimeStart = "";
        this.dayTimeEnd = "";
    }

    public get fileName() {
        return this._fileName;
    }

    public get sanitizedTitle() {
        return sanitize(this.title).replace(/(\s){2,}/g, ' ');
    }

    public serialize() {
        return serialize(this);
    }

    public toString() {
        return JSON.stringify(this.serialize(), null, 2);
    }
}