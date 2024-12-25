import axios from 'axios';
import { Asset } from 'expo-asset';

export default class Service {
    constructor() {
        this.API_KEY = "AIzaSyASgg3tiYamb5mDzFiReQNjFNIPk-cuM3U"
        this.FOLDER_ID = "17p8xcfbYWh4ZIy-N6yMdrnqTKnMC5slx"
        this.STORY_ID = "11YkU_wWCEjUwJhPjuoJoBQT2NrFKhORR"

        this.apiUrl = "https://www.googleapis.com/drive/v3/files"
        this.driveUrl = "https://drive.google.com/uc"

        this.imageIdMap = {};
    }

    async fillImageIdMap() {
        const q = encodeURIComponent(`'${this.FOLDER_ID}' in parents`);
        const url = `${this.apiUrl}?q=${q}&key=${this.API_KEY}`;

        const response = await axios.get(url);
        const data = response.data;

        for (const file of data.files) {
            this.imageIdMap[file.name] = `${this.apiUrl}/${file.id}?alt=media&key=${this.API_KEY}`;

        }
    }

    async fetchStory() {
        const url = `${this.apiUrl}/${this.STORY_ID}?alt=media&key=${this.API_KEY}`
        const response = await axios.get(url);
        const data = response.data;
        await this.fillImageIdMap();
        for (let img of Object.keys(this.imageIdMap)) {
            let asset = await Asset.fromURI(this.imageIdMap[img]).downloadAsync();
            this.imageIdMap[img] = asset.localUri || asset.uri;
        }

        data.image_id_map = this.imageIdMap;
        
        return response.data;
    }

    async fetchImage(id) {
        const url = `${this.apiUrl}/${id}?alt=media&key=${this.API_KEY}`
        const response = await axios.get(url);
        return response.data;
    }
}