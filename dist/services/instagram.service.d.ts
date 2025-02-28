export declare function downloadInstagramVideo(instagramUrl: string): Promise<{
    buffer: Buffer;
    filename: string;
} | null>;
