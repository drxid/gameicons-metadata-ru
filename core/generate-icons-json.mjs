import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const PATH_TO_ICONS_FOLDER = '/mixer/icons';

const categoriesFile = 'list-categories.txt';
const tagsFile = 'list-tags.txt';

const categoriesRaw = await readFile(categoriesFile, 'utf-8');
const tagsRaw = await readFile(tagsFile, 'utf-8');

// Парсим категории
const iconsMap = new Map();

for (const line of categoriesRaw.split('\n').filter(Boolean)) {
  const [category, iconPath] = line.split(':').map(s => s.trim());
  if (!iconPath) continue;

  iconsMap.set(iconPath, {
    icon: `${PATH_TO_ICONS_FOLDER}/${iconPath}.svg`,
    title: {
      en: path.basename(iconPath).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      ru: path.basename(iconPath).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    },
    category: {
      en: category,
      ru: category,
    },
    tags: {
      en: [],
      ru: [],
    }
  });
}

// Парсим теги и добавляем их к соответствующим иконкам
for (const line of tagsRaw.split('\n').filter(Boolean)) {
  const [iconPath, tagsStr] = line.split(':').map(s => s.trim());
  if (!tagsStr || !iconsMap.has(iconPath)) continue;

  const tags = tagsStr.split(',').map(tag => tag.trim());

  iconsMap.get(iconPath).tags = {
    en: tags,
    ru: tags,
  };
}

// Конвертируем Map в массив
const output = Array.from(iconsMap.values());

// Запись в JSON
await writeFile('./output.json', JSON.stringify(output, null, 2), 'utf-8');

console.log('✅ JSON с иконками создан: output.json');
