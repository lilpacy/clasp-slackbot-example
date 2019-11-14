import { messagePush } from "./Code";
import { doGet } from "./Code";
import { doPost } from "./Code";

declare const global: {
  [x: string]: any;
};

global.messagePush = function(e: any) {
  return messagePush();
};

global.doGet = function(e: any) {
  return doGet();
}

global.doPost = function(e: any) {
  return doPost();
}
