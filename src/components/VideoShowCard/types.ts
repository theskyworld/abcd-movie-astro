export interface VideoShowCardProps {
  title: string;
  imgURL: string;
  type?: string; // 用于在搜索结果中展示当前视频的类型
  tag?: string;
  episode?: string;
  score?: string;
  isRow?: boolean;
  isDefault?: boolean;
  isColumn?: boolean;
  rank?: number;
}
