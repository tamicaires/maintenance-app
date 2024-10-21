import Cookies from 'js-cookie';
import dayjs from 'dayjs';

interface CookieOptions {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
}

type CookieKey = string;
type CookieValue = string | number | boolean;

const defaultOptions: CookieOptions = {
  path: '/',
  expires: dayjs().add(7, 'days').toDate(),
  domain: "localhost"
};

const setCookie = (key: CookieKey, value: CookieValue, options: CookieOptions = defaultOptions): void => {
  Cookies.set(key, value.toString(), options);
};

const getCookies = (): { [key: string]: string } => {
  return Cookies.get() || {};
};

const getCookie = (key: CookieKey): string | undefined => {
  return Cookies.get(key);
};

const destroyCookies = (key: CookieKey, options: CookieOptions = defaultOptions): void => {
  Cookies.remove(key, options);
};

export { setCookie, getCookies, getCookie, destroyCookies };
