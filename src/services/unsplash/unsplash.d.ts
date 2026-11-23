/* eslint-disable camelcase */
type NonEmptyArray<T> = [T, ...T[]];

declare namespace Unsplash {
  interface Urls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  }

  interface HtmlLinks {
    html: string;
  }

  interface User {
    name: string;
    links: HtmlLinks;
  }

  interface Photo {
    blur_hash: string;
    urls: Urls;
    links: HtmlLinks;
    user: User;
  }

  type SuccessApiResponse<Response> = {
    type: 'success';
    response: Response;
    errors?: never;
    status: number;
  };

  type Errors = NonEmptyArray<string>;

  type ErrorApiResponse = {
    type: 'error';
    source: 'api' | 'decoding';
    response?: never;
    errors: Errors;
    status: number;
  };

  type ApiResponse<Response> = SuccessApiResponse<Response> | ErrorApiResponse;

  interface PhotoWithAttribution {
    urls: Urls & {
      blurHash: string;
    };
    pageUrl: string;
    creator: {
      name: string;
      profileUrl: string;
    };
  }
}
