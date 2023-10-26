import { JSDOM } from "jsdom";
import init from "jquery";

export async function render() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
      </body>
    </html>
  `);
  const $ = init(dom.window);
  //@ts-ignore
  $(dom.window.document.body).append("<h1>Hello World</h1>");
  return dom.window.document.documentElement.outerHTML;
}
