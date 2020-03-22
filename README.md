Реализовал замену на тернарный оператор.

```js
return _.map(collection, fn);
```

будет заменено на:

```js
return (проверка, что collection - это массив) ?
    collection.map(fn) :
    _.map(collection, fn);
```

Для тестирования сделал отельное приложение:
https://github.com/mpoliakov/test-eslint-plugin-lodash-to-native

Для запуска:
1) `npm i`
2) `node index.js` - для просмотра результата
3) `eslint index.js` - для вывода сообщений линтера
4) `eslint index.js --fix` - исправление кода
