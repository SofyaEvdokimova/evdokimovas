const feedContainer = document.getElementById("status-widget");

async function fetchFeed() {
  try {
    const response = await fetch(
      "https://evdokimovas.micro.blog/categories/status/feed.xml",
    );
    const text = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");

    const items = Array.from(xmlDoc.querySelectorAll("item")).map((item) => ({
      title: item.querySelector("title")?.textContent,
      link: item.querySelector("link")?.textContent,
      pubDate: item.querySelector("pubDate")?.textContent,
      contentSnippet: item.querySelector("description")?.textContent,
    }));

    // Оставляем только первый элемент и выводим его
    const firstItem = items[0];

    feedContainer.innerHTML = `
          <div>
            <a href="${firstItem.link}" target="_blank" rel="noopener noreferrer">
              ${firstItem.pubDate || firstItem.contentSnippet}
            </a>
            <p>${firstItem.title || firstItem.contentSnippet}</p>
          </div>
        `;
  } catch (error) {
    console.error("Ошибка при загрузке фида:", error);
  }
}

// Загружаем фид при загрузке страницы
fetchFeed();

// Обновляем фид раз в минуту (60000 мс)
setInterval(fetchFeed, 60000);
