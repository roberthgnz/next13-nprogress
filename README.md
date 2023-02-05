# Next.js Progressbar

Nprogress component for Next.js 13 [NProgress](http://ricostacruz.com/nprogress/).

## How to install?

```bash
npm i next13-nprogress
```

## How to use?

After installing the package, import `Next13NProgress` in your `pages/_app.js` file:

```js
import Next13NProgress from 'next13-nprogress';
```

And for rendering add `<Next13NProgress />` to your `return()` in `MyApp()`:

```js
import Next13NProgress from 'next13-nprogress';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Next13NProgress />
      <Component {...pageProps} />;
    </>
  );
}
```

### Default Config

If no props are passed to `<Next13NProgress />`, below is the default configuration applied.

```jsx
<Next13NProgress color="#29D" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
```

- `color`: to change the default color of progressbar. You can also use `rgb(,,)` or `rgba(,,,)`.
- `startPosition`: to set the default starting position : `0.3 = 30%`.
- `stopDelayMs`: time for delay to stop progressbar in `ms`.
- `height`: height of progressbar in `px`.
- `showOnShallow`: You can choose whether you want the progressbar to be displayed if you're using shallow routing. It takes a boolean. Learn more about shallow routing [in Next.js docs](https://nextjs.org/docs/routing/shallow-routing).

### Advanced Config

You can use [other configurations](https://github.com/rstacruz/nprogress#configuration) which NProgress provides by adding a JSON in `options` props.

```jsx
<Next13NProgress options={{ easing: 'ease', speed: 500 }} />
```
