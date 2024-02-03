export interface SelectedItem {
  index: number;
  newItem: string | number;
}

type SelectorContent = {
  key: string;
  name: string;
};

export interface VideoSelectorData {
  title: string;
  content: Array<SelectorContent>;
}

export interface VideoSelectorProps {
  videoSelectors: Array<VideoSelectorData>;
}
