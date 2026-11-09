import { posix } from "node:path";

const MEDIA_BASE = "/media";
const IMAGE_RX = /\.(jpe?g|png|gif|webp|svg|avif)$/i;
const EXTERNAL_RX = /^([a-z][a-z0-9+.-]*:|\/|#)/i;

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("content:file:beforeParse", (file) => {
    if (!file._id?.endsWith(".md") || typeof file.body !== "string") return;

    const rawDir = "/" + file._id.split(":").slice(1, -1).join("/");
    const stripPrefix = (p: string) => p.replace(/^\d+\./, "");

    const resolve = (href: string) => {
      const [path, hash] = href.split("#");
      const full = posix.normalize(posix.join(rawDir, path));
      if (IMAGE_RX.test(path)) return MEDIA_BASE + full;
      const page = full
        .split("/")
        .map(stripPrefix)
        .join("/")
        .replace(/\.md$/, "")
        .replace(/\/index$/, "")
        .toLowerCase();
      return (page || "/") + (hash ? "#" + hash : "");
    };

    file.body = file.body
      .replace(
        /(\]\()([^)\s]+)(\))/g,
        (m: string, o: string, href: string, c: string) =>
          EXTERNAL_RX.test(href) ? m : o + resolve(href) + c,
      )
      .replace(
        /^([ \t]*-?[ \t]*src:[ \t]*)(\S+)[ \t]*$/gm,
        (m: string, pre: string, href: string) =>
          EXTERNAL_RX.test(href) ? m : pre + resolve(href),
      );
  });
});
