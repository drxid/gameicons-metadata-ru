
# 🎮 gameicons-metadata-ru

**Русифицированные метаданные для иконок из [game-icons](https://github.com/game-icons/icons), основанные на проекте [ArnoldSmith86/gameicons-metadata](https://github.com/ArnoldSmith86/gameicons-metadata)**

---

## 📌 Описание

Оригинальный репозиторий [game-icons](https://github.com/game-icons/icons) предоставляет отличный набор SVG-иконок, но не содержит удобной структурированной информации о категориях и тегах. Вопрос об открытости метаданных на [game-icons.net](https://game-icons.net) не получил окончательного ответа, из-за чего они не могут быть использованы напрямую в проектах.

Проект [ArnoldSmith86/gameicons-metadata](https://github.com/ArnoldSmith86/gameicons-metadata) при помощи ИИ-сервисов (ChatGPT, Claude, Mistral и др.) сгенерировал англоязычные категории и теги для иконок game-icons.

Этот репозиторий:

- 🔤 Переводит категории и теги на **русский язык**
- 🔗 Объединяет данные в **структурированный JSON**
- ⚙️ Подходит для **интеграции в проекты** — редакторы, игры, иконопоисковики, интерфейсы

📦 **Формат JSON** удобно использовать в UI-приложениях для поиска и фильтрации иконок.

---

🛠 Пример структуры JSON

```json
{
  "icon": "/path/icons/andymeneely/police-badge.svg",
  "title": {
    "en": "Police Badge",
    "ru": "Полицейский значок"
  },
  "category": {
    "en": "Tool",
    "ru": "Инструмент"
  },
  "tags": {
    "en": ["law enforcement", "shield", "officer"],
    "ru": ["правопорядок", "щит", "офицер"]
  }
}
```

---

## 📄 Лицензия

- Метаданные в этом репозитории распространяются по лицензии **CC0 (общественное достояние)**.
- 🔗 Оригинальные иконки находятся под своей лицензией, см. [https://game-icons.net/about.html](https://game-icons.net/about.html)
- 🚫 **Нельзя** использовать данные с [game-icons.net](https://game-icons.net) напрямую для генерации новых метаданных — только результат работы ArnoldSmith86.

---

## 🇬🇧 English Summary

This repository contains **Russian-translated metadata** for the icon set from [game-icons](https://github.com/game-icons/icons), originally generated by [ArnoldSmith86/gameicons-metadata](https://github.com/ArnoldSmith86/gameicons-metadata).

It includes:

- Russian translation of categories and tags
- Clean structured JSON output
- Ready-to-use format for integration into projects (games, editors, search UIs)

📁 Example:

```json
{
  "icon": "/path/icons/andymeneely/police-badge.svg",
  "title": {
    "en": "Police Badge",
    "ru": "Полицейский значок"
  },
  "category": {
    "en": "Tool",
    "ru": "Инструмент"
  },
  "tags": {
    "en": ["law enforcement", "shield", "officer"],
    "ru": ["правопорядок", "щит", "офицер"]
  }
}
```

Metadata is released under **CC0**, but **icons themselves are not public domain** — see [https://game-icons.net/about.html](https://game-icons.net/about.html).

---

## 🤝 Благодарности

- [game-icons/icons](https://github.com/game-icons/icons)
- [ArnoldSmith86/gameicons-metadata](https://github.com/ArnoldSmith86/gameicons-metadata)
