import * as NProgress from 'nprogress';
import * as React from 'react';

declare global {
  interface Window {
    navigation: any;
  }
}

export interface Next13NProgress {
  /**
   * The color of the bar.
   * @default "#f50"
   */
  color?: string;
  /**
   * The start position of the bar.
   * @default 0.3
   */
  startPosition?: number;
  /**
   * The stop delay in milliseconds.
   * @default 200
   */
  stopDelayMs?: number;
  /**
   * The height of the bar.
   * @default 3
   */
  height?: number;
  /**
   * The other NProgress configuration options to pass to NProgress.
   * @default null
   */
  options?: Partial<NProgress.NProgressOptions>;
}

const Next13NProgress = ({
  color = '#f50',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  options,
}: Next13NProgress) => {
  const timer = React.useRef<NodeJS.Timeout | null>();

  React.useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }

    const routeChangeStart = () => {
      NProgress.set(startPosition);

      NProgress.start();
    };

    const routeChangeEnd = () => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    };

    const routeChangeError = () => {
      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    };

    const { navigation } = window;

    if (navigation) {
      navigation.addEventListener('navigate', routeChangeStart);

      navigation.addEventListener('navigateerror', routeChangeError);

      navigation.addEventListener('navigatesuccess', routeChangeEnd);

      return () => {
        navigation.removeEventListener('navigate', routeChangeStart);

        navigation.removeEventListener('navigateerror', routeChangeError);

        navigation.removeEventListener('navigatesuccess', routeChangeEnd);
      };
    }
  }, []);

  const getStyle = () => (<style>{`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${color};

    position: fixed;

    z-index: 1031;

    top: 0;

    left: 0;

    width: 100%;

    height: ${height}px;
  }

  #nprogress .peg {
    display: block;

    position: absolute;

    right: 0px;

    width: 100px;

    height: 100%;

    box-shadow: 0 0 10px ${color}, 0 0 5px ${color};

    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);

    -ms-transform: rotate(3deg) translate(0px, -4px);

    transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: 'block';

    position: fixed;

    z-index: 1031;

    top: 15px;

    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;

    height: 18px;

    box-sizing: border-box;

    border: solid 2px transparent;

    border-top-color: ${color};

    border-left-color: ${color};

    border-radius: 50%;

    -webkit-animation: nprogresss-spinner 400ms linear infinite;

    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;

    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`}</style>);

  return getStyle;
};

export default Next13NProgress;
