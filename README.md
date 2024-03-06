# Веб-программирование, лаб. 4
## Основные данные

**Автор**: Чайкин Вадим Константинович (aka @Vad1mChK), P3224

**Вариант №**: 412348

## ТЗ

Переписать приложение из [предыдущей лабораторной работы](https://github.com/Vad1mChK/Lab03WebProgr) с использованием следующих технологий:

- Уровень back-end должен быть основан на Java EE (необходимо использовать EJB).
- Уровень front-end должен быть построен на React + Redux (необходимо использовать ES6 и JSX) с использованием набора компонентов Belle
- Взаимодействие между уровнями back-end и front-end должно быть организовано посредством REST API.

Приложение по-прежнему должно включать в себя 2 страницы - стартовую и основную страницу приложения. Обе страницы приложения должны быть адаптированы для отображения в 3 режимах:
- "Десктопный" - для устройств, ширина экрана которых равна или превышает 1195 пикселей.
- "Планшетный" - для устройств, ширина экрана которых равна или превышает 668, но меньше 1195 пикселей.
- "Мобильный"- для устройств, ширина экрана которых меньше 668 пикселей.

Стартовая страница должна содержать следующие элементы:
- "Шапку", содержащую ФИО студента, номер группы и номер варианта.
- Форму для ввода логина и пароля. Информация о зарегистрированных в системе пользователях должна храниться в отдельной таблице БД (пароль должен храниться в виде хэш-суммы). Доступ неавторизованных пользователей к основной странице приложения должен быть запрещён.

Основная страница приложения должна содержать следующие элементы:
- Набор полей ввода для задания координат точки и радиуса области в соответствии с вариантом задания: ~~`Spinner`~~ `TextInput (-3 ... 5)` для координаты по оси X, ~~`Spinner`~~ `TextInput (-5 ... 3)` для координаты по оси Y, и ~~`Spinner`~~ `TextInput (-3 ... 5)` для задания радиуса области.
- Если поле ввода допускает ввод заведомо некорректных данных (таких, например, как буквы в координатах точки или отрицательный радиус), то приложение должно осуществлять их валидацию.
- Динамически обновляемую картинку, изображающую область на координатной плоскости в соответствии с номером варианта и точки, координаты которых были заданы пользователем. Клик по картинке должен инициировать сценарий, осуществляющий определение координат новой точки и отправку их на сервер для проверки её попадания в область. Цвет точек должен зависить от факта попадания / непопадания в область. Смена радиуса также должна инициировать перерисовку картинки.
- Таблицу со списком результатов предыдущих проверок.
- Кнопку, по которой аутентифицированный пользователь может закрыть свою сессию и вернуться на стартовую страницу приложения.

Дополнительные требования к приложению:
- Все результаты проверки должны сохраняться в базе данных под управлением СУБД ~~Oracle~~ PostgreSQL.
- Для доступа к БД необходимо использовать JPA.

## Доп. задания
Из предыдущих лабораторных работ:
- Сервер отображает нужное время в зависимости от временной зоны на клиенте.
- Фильтрация методов запросов.

## Используемые технологии
Front-end:
- HTML
- SCSS
- TS + React + Redux + Belle

```markdown
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
```
