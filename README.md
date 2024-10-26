# Плагины для Лампы

1. [Кинопоиск](README.md#кинопоиск-kinopoiskjs)
2. [Кинопоиск Оценки](README.md#кинопоиск-оценки-kinopoisk_ratingjs)
3. [Synology DLNA](README.md#synology-dlna-synology_dlnajs)
4. [Балансер (источник) Synology NAS](README.md#балансер-источник-synology-nas-synology_nasjs)

## Кинопоиск (kinopoisk.js)

Добавляет в приложение [Лампа](https://cub.red/lampa) список фильмов из папки "[Буду смотреть](https://www.kinopoisk.ru/mykp/folders/3575/?format=mini)" на Кинопоиске. 

<img width="1680" alt="image" src="https://github.com/user-attachments/assets/180ca020-4f91-4416-b68d-21294f6e94ff">


### Установка

1. Откройте приложение Лампа
2. Перейдите в Настройки - Расширения
3. Выберите "Добавить плагин"
4. Укажите следующий адрес плагина
```
https://and7ey.github.io/lampa/kinopoisk.js
```
5. В приложении в меню слева выберите "Кинопоиск"
6. Перейдите на любом устройстве по ссылке https://ya.ru/device и введите код из приложения Лампа (окно "Авторизация")
7. Подождите **несколько минут** для загрузки списка фильмов, Лампа покажет уведомление (зеленое, внизу экрана) о завершении загрузки

### Текущие ограничения

- Загружаются только первые 50 фильмов
- После авторизации список обновляется сразу же, при следующих входах - список актуализируется при повторном входе на экран  
- Поиск фильмов в TMDB осуществляется сначала по id Кинопоиска, если ничего не нашлось, то по названию и году релиза
- Другие списки фильмов не поддерживаются

### Технические особенности
- Кинопоиск ограничивает доступ к данным (даже через API) через CORS Policy, потому в плагине используется CORS Proxy в виде Google Apps Script
- Данные авторизации (токен) хранятся в Local Storage браузера, выход из аккаунта возможен путем удаления этих данных (`kinopoisk_*`) или в [Управлении аккаунтом](https://passport.yandex.ru/profile/access) Яндекса
- "Опечатки" в коде наследуют наименования в исходном коде приложения Лампа: https://github.com/yumata/lampa-source

### Ошибки
Для поиска ошибок посмотрите в консоль Лампы (в левом меню Лампы выберите пункт меню "Консоль" - он находится в самом низу). Для просмотра ошибок плагина перейдите на вкладку "Кинопоиск".

<img width="1651" alt="image" src="https://github.com/user-attachments/assets/1a40f8f8-ddb1-454c-95a6-71ba49119fbb">

## Кинопоиск Оценки (kinopoisk_rating.js)

Отображает в Лампе ваши оценки фильмов на Кинопоиске. Позволяет оценивать фильмы на Кинопоиске через Лампу.

<img width="1680" alt="image" src="https://github.com/user-attachments/assets/b7dce383-9379-47a5-993f-0035c8826fed">


### Установка

1. Установите плагин "Кинопоиск" по инструкции выше
2. Аналогично установите плагин "Кинопоиск Оценки", указав адрес
```
https://and7ey.github.io/lampa/kinopoisk_rating.js
```
3. Обязательно пройдите авторизацию, по схеме, указанной в описании плагина "Кинопоиск" выше
4. Укажите в Настройки Лампы, в меню Остальное, Основной источник: CUB. Это необязательно, но так плагин будет работать быстрее

> [!IMPORTANT]
> Данный плагин не работает самостоятельно, без плагина "Кинопоиск" (через него осуществляется авторизация на Кинопоиске)

### Особенности работы
- При каждом запуске плагина с Кинопоиска в Лампу импортируются последние 20 оценок
- В Настройках плагина можно вручную импортировать все оценки
- Если в Настройках Лампы Основным источником указан TMDB (а не CUB), то возможность проставления оценки после открытия карточки фильма появляется с задержкой (требуется дополнительное время для определения id фильма на Кинопоиске)
- Опция "Дублировать в реакциях":
  - Добавляет реакцию Лампы в соответствии с выставленной оценкой: 
    | Оценка        | Реакция       |
    | ------------- | ------------- |
    | 1-2           | 💩 Плохо       |
    | 3-4           | 😴 Скучно      |
    | 5-6           | 🤔 Непонятно   |
    | 7-8           | 👍 Неплохо     |
    | 9-10          | 🔥 Супер      |
  - Изменение оценки **не** удаляет ранее выставленные реакции
  - Удаление оценки **не** удаляет ранее выставленные реакции
- Опция "Удалять фильм из Буду смотреть"
  - При простановке оценки в Лампе удаляет фильм из папки "[Буду смотреть](https://www.kinopoisk.ru/mykp/folders/3575/?format=mini)" на Кинопоиске
  - Удаление оценки **не** возвращает фильм в эту папку
- Цвет кнопки-звёздочки "Оценить на Кинопоиске" соответствует оценке на Кинопоиске:
    | Оценка        | Цвет кнопки       |
    | ------------- | ------------- |
    | 1-4           | Красный       |
    | 5-7           | Серый     |
    | 8-10          | Зелёный      |
    | отсутствует   | Белый      |

## Synology DLNA (synology_dlna.js)

Добавляет в приложение [Лампа](https://cub.red/lampa) возможность просматривать файлы (видео и фото) с DLNA-сервера, запущенного на Synology NAS. 

<img width="1651" alt="image" src="https://github.com/user-attachments/assets/a3345456-6717-486b-948f-d9a516478dac">

Плагин основан на [плагине](https://fredy314.github.io/dlna.js) от @fredy314, в котором сделаны следующие изменения:
- Добавлена возможность указывать прокси
- SOAPAction передается в кавычках

DLNA-сервер на старых (?) Synology NAS использует старую версию библиотеки [The Portable SDK for UPnP Devices](https://github.com/pupnp/pupnp), которая требует указания SOAPAction в кавычках и защищает запросы через CORS (что [исправлено](https://github.com/pupnp/pupnp/releases/tag/release-1.14.20) в новых версиях).

### Особенности работы
- Необходим прокси, установленный в локальной сети (возможно, требуется только для старых версий Synology)
- Если вы используете [Lampac](https://github.com/immisterio/Lampac), то в нем есть встроенный прокси http://ip:9118/proxy, который необходимо включить в `init.conf`:
```json
{
  "serverproxy": {
    "encrypt": false,
    "verifyip": false
  }
}
```

## Балансер (источник) Synology NAS (synology_nas.js)

Добавляет DLNA-сервер от Synology NAS в приложение [Лампа](https://cub.red/lampa) как балансер (источник видео). 

<img width="1651" alt="image" src="https://github.com/user-attachments/assets/df7f23ec-2526-49a9-bbf7-a84bb553b644">

### Особенности работы
- Необходим прокси, установленный в локальной сети (возможно, требуется только для старых версий Synology); инструкция по использованию локального прокси [Lampac](https://github.com/immisterio/Lampac) приведена выше
- Поиск видео производится только в указанной в настройках папке, вложенные папки не учитываются
- Подходящий видеофайл ищется по
  - названию видео
  - оригинальному названию видео
  - транслитерации названия видео
  - вхождению строки поиска
- В результатах поиска выводятся 10 наиболее подходящих файлов
- Если поиском видео не нашлось, то задайте в строке поиска часть имени файла - у такого поиска наивысший приоритет
- Кнопки Сортировать и Фильтр не работают
