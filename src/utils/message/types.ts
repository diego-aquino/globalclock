import messages from 'globals/messages';

export type MessageType = 'info' | 'success' | 'error' | 'warning' | 'loading';

type ContentSpecifications =
  | { content: string; contentKey?: undefined }
  | { content?: undefined; contentKey: keyof typeof messages };

export type MessageOptionsWithoutKey = ContentSpecifications & {
  duration?: number;
};

export type MessageOptions = MessageOptionsWithoutKey & {
  key?: string;
};

export type MessageInstance = { key: string } & {
  [key in MessageType]: (options: MessageOptionsWithoutKey) => void;
};

export type MessageApi = {
  [key in MessageType]: (options: MessageOptions) => MessageInstance;
};

export interface NativeAntdOptions {
  content: string;
  duration?: number;
}
