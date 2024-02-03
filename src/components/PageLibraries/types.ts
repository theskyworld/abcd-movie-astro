import { VideoSelectorData } from "@components/VideoSelectors";

export interface PageLibrariesProps {
  videoSelectorsData?: Array<VideoSelectorData>;
  url: string;
  tv?: boolean;
}
