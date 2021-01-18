import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { Message } from 'components/common';

const isClient = typeof window !== 'undefined';

function init() {
  if (!isClient) return;

  const messageContainer = document.createElement('div');
  messageContainer.setAttribute('id', '__messageContainer');

  const { body } = document;
  body.insertBefore(messageContainer, body.firstChild);
}

function message(content: ReactNode): void {
  if (!isClient) return;

  const messageContainer = document.querySelector('#__messageContainer');

  const unmountMessage = () => {
    ReactDOM.render(<></>, messageContainer);
  };

  ReactDOM.render(
    <Message onClose={unmountMessage}>{content}</Message>,
    messageContainer,
  );
}

init();

export default message;
