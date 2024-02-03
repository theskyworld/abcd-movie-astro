export interface SelectedItem {
  index: number;
  newItem: string | number;
}

type SelectorContent = {
  key: string;
  name: string;
};

export interface TVSelectorData {
  title: string;
  content: Array<SelectorContent>;
}
