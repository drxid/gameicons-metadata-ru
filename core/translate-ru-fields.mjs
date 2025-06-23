import fs from 'fs/promises';
import fetch from 'node-fetch';

const API_KEY = '<API_KEY>';
const API_URL = 'https://translate.api.cloud.yandex.net/translate/v2/translate';

const INPUT_FILE = 'output.json';
const OUTPUT_FILE = 'translated_output.json';
const CACHE_FILE = 'core/translation-cache.json';

// 👉 ВКЛ/ВЫКЛ форматирования переводов (Capitalize first, lowercase rest)
const USE_CAPITALIZATION = true;

let cache = new Map();

// Загружаем кэш из файла
async function loadCache() {
  try {
    const raw = await fs.readFile(CACHE_FILE, 'utf-8');
    const obj = JSON.parse(raw);
    cache = new Map(Object.entries(obj));
    console.log(`🔁 Кэш загружен: ${cache.size} записей`);
  } catch {
    console.log('📭 Кэш не найден, будет создан заново.');
    cache = new Map();
  }
}

// Сохраняем кэш в файл
async function saveCache() {
  const obj = Object.fromEntries(cache.entries());
  await fs.writeFile(CACHE_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  console.log(`💾 Кэш сохранён в ${CACHE_FILE}`);
}

// Форматирование строки
function formatTranslation(str) {
  if (!USE_CAPITALIZATION) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Перевод текста с использованием кэша
async function translateText(text) {
  if (cache.has(text)) {
    return cache.get(text);
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Api-Key ${API_KEY}`,
    },
    body: JSON.stringify({
      texts: [text],
      targetLanguageCode: 'ru',
    }),
  });

  const result = await response.json();

  if (result.translations?.[0]?.text) {
    const translated = formatTranslation(result.translations[0].text);
    cache.set(text, translated);
    return translated;
  }

  console.error('❌ Ошибка перевода:', result);
  return text; // fallback
}

async function main() {
  await loadCache();

  const raw = await fs.readFile(INPUT_FILE, 'utf-8');
  const data = JSON.parse(raw);

  for (const obj of data) {
    // Title
    if (obj.title?.en && obj.title.en === obj.title.ru) {
      const translated = await translateText(obj.title.en);
      obj.title.ru = translated;
      console.log(`🔤 Title: "${obj.title.en}" → "${translated}"`);
    }

    // Category
    if (obj.category?.en && obj.category.en === obj.category.ru) {
      const translated = await translateText(obj.category.en);
      obj.category.ru = translated;
      console.log(`📁 Category: "${obj.category.en}" → "${translated}"`);
    }

    // Tags
    if (Array.isArray(obj.tags?.en) && Array.isArray(obj.tags?.ru)) {
      for (let i = 0; i < obj.tags.en.length; i++) {
        const tagEn = obj.tags.en[i];
        const tagRu = obj.tags.ru[i];
        if (tagEn === tagRu) {
          const translated = await translateText(tagEn);
          obj.tags.ru[i] = translated;
          console.log(`🏷️ Tag: "${tagEn}" → "${translated}"`);
        }
      }
    }
  }

  await fs.writeFile(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✅ Перевод завершён. Сохранено в ${OUTPUT_FILE}`);

  await saveCache();
}

main();
