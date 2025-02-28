"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadInstagramVideo = downloadInstagramVideo;
const axios_1 = require("axios");
const btch_downloader_1 = require("btch-downloader");
const crypto_1 = require("crypto");
async function downloadInstagramVideo(instagramUrl) {
    try {
        const response = await (0, btch_downloader_1.igdl)(instagramUrl);
        if (!response || response.length === 0) {
            console.error('❌ Видео не найдено или не удалось получить ссылку.');
            return null;
        }
        const videoUrl = response[0].url;
        const videoResponse = await axios_1.default.get(videoUrl, { responseType: 'arraybuffer' });
        return {
            buffer: Buffer.from(videoResponse.data),
            filename: (0, crypto_1.randomInt)(1, 999999) + `_instagram_video.mp4`
        };
    }
    catch (error) {
        console.error('❌ Ошибка при загрузке видео с Instagram:', error);
        return null;
    }
}
//# sourceMappingURL=instagram.service.js.map