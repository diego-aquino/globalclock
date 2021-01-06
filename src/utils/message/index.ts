import { message as antdMessage } from 'antd';

import messages from 'globals/messages';

import {
  MessageApi,
  MessageInstance,
  MessageOptions,
  MessageOptionsWithoutKey,
  MessageType,
  NativeAntdOptions,
} from './types';

const baseMessageClassName = 'antDesign__messageContainer';

function parseToNativeAntdOptions(options: MessageOptions): NativeAntdOptions {
  const content = options.contentKey
    ? messages[options.contentKey]
    : options.content;

  const { duration } = options;

  return { content, duration };
}

function generateMessageKey(options: MessageOptions): string {
  const baseKey = options.key || options.contentKey || null;
  const modifier = String(Date.now());

  return `${baseKey || ''}${modifier}`;
}

function transformMessage(
  messageKey: string,
  newType: MessageType,
  options: MessageOptionsWithoutKey,
) {
  const parsedOptions = parseToNativeAntdOptions(options);

  antdMessage[newType]({
    ...parsedOptions,
    key: messageKey,
    className: baseMessageClassName,
  });
}

function createMessageInstance(messageKey: string): MessageInstance {
  const messageInstance: MessageInstance = {
    key: messageKey,
    info: (options) => transformMessage(messageKey, 'info', options),
    success: (options) => transformMessage(messageKey, 'success', options),
    error: (options) => transformMessage(messageKey, 'error', options),
    warning: (options) => transformMessage(messageKey, 'warning', options),
    loading: (options) => transformMessage(messageKey, 'loading', options),
  };

  return messageInstance;
}

function createMessage(type: MessageType, options: MessageOptions) {
  const parsedOptions = parseToNativeAntdOptions(options);
  const messageKey = generateMessageKey(options);

  antdMessage[type]({
    ...parsedOptions,
    key: messageKey,
    className: baseMessageClassName,
  });

  const messageInstance = createMessageInstance(messageKey);

  return messageInstance;
}

const message: MessageApi = {
  info: (options) => createMessage('info', options),
  success: (options) => createMessage('success', options),
  error: (options) => createMessage('error', options),
  warning: (options) => createMessage('warning', options),
  loading: (options) => createMessage('loading', options),
};

export default message;
