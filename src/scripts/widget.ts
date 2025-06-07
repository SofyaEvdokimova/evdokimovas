import Parser from "rss-parser";

const parser: Parser = new Parser();

console.log(1111);

// let widget = document.getElementById('status-widget')

(async () => {
  console.log(2222);
  const feed = await parser.parseURL(
    "https://evdokimovas.micro.blog/categories/status/feed.xml",
  );
  console.log(feed.title); // feed will have a `foo` property, type as a string

  feed.items.forEach((item) => {
    console.log(item.title + ":" + item.link); // item will have a `bar` property type as a number
  });
})();
