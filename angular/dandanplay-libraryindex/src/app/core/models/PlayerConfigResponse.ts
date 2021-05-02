import { LibraryItem } from "./LibraryItem";

export interface PlayerConfigResponse {
    id: string,
    video: LibraryItem,
    videoUrl: string,
    imageUrl: string,
    vttUrl: string,
    color: string,
    dmDuration: string,
    dmSize: string,
    dmArea: string,
    videoFiles: RelatedVideoFile[]
}

export interface RelatedVideoFile {
    id: string,
    episodeTitle: string,
    fileName: string,
    isCurrent: boolean
}