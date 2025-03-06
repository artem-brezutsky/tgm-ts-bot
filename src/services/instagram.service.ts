import axios from 'axios';
import { igdl } from 'btch-downloader';
import { randomInt } from 'crypto';

export async function downloadInstagramVideo(instagramUrl: string): Promise<{ buffer: Buffer, filename: string } | null> {
    try {
        // 🔹 Получаем информацию о видео через btch-downloader
        const response = await igdl(instagramUrl);

        if (!response || response.length === 0) {
            console.error('❌ Видео не найдено или не удалось получить ссылку.');
            return null;
        }

        const videoUrl = response[0].url;

        // 🔹 Скачиваем видео в Buffer
        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });

        return {
            buffer: Buffer.from(videoResponse.data),
            filename: randomInt(1, 999999)+`_instagram_video.mp4`
        };
    } catch (error) {
        console.error('❌ Ошибка при загрузке видео с Instagram:', error);
        return null;
    }
}