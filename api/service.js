import axios from 'axios';

export default class Service {
    constructor() {
        this.API_KEY = "AIzaSyASgg3tiYamb5mDzFiReQNjFNIPk-cuM3U"
        this.FOLDER_ID = "17p8xcfbYWh4ZIy-N6yMdrnqTKnMC5slx"
        this.STORY_ID = "1puz5Ne287awtiy8TuUv-t2Hl1TaTRo17"

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
            this.imageIdMap[file.name] = file.id;
        } 
    }

    async fetchStory() {
        const url = `${this.apiUrl}/${this.STORY_ID}?alt=media&key=${this.API_KEY}`
        const response = await axios.get(url);
        return response.data;
    }

    imageUrl(name) {
        return `${this.driveUrl}?id=${this.imageIdMap[name]}`;
    }
}