import { createGlobalStyle } from 'styled-components'
import eot from 'common/fonts/iconfont.eot?t=1554140355057'
import ttf from 'common/fonts/iconfont.ttf?t=1554140355057'
import woff from 'common/fonts/iconfont.woff?t=1554140355057'
import svg from 'common/fonts/iconfont.svg?t=1554140355057#iconfont'

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure,
  footer, header, menu, nav, section {
    display: block;
  }

  body {
    -webkit-text-size-adjust: none;
    line-height: 1;
    font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', arial, sans-serif, 'Droid Sans Fallback';
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    color: #222222;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: #7e8c8d;
    -webkit-backface-visibility: hidden;
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  @font-face {font-family: "iconfont";
    src: url(${eot}); /* IE9 */
    src: url(${eot}#iefix) format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAWEAAsAAAAAC9wAAAU2AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCEHgqJOIdxATYCJAMsCxgABCAFhG0HfBs1ChGVpD2Q/Sywm6kD+DFGrhTC/AyETfOxaDM06Ox70D+t6bz9ewiJiyuQbB2QRRVja2wdgVM1FlBdjTwe+L9394316QN1skQnaGBhgScUcRhInMD+/7/T7uS9KmhTEH8Gp/CXgIU8Z6VkAVytaYhchVlhHmWmLqRKrC6XvQc8+um7IqkaRUpVOLBVvWc/l2fNQ9PbPK2Xb3J/b0PF0hKWFxIexa2RCBlCoQRKaqiE16V7YYIvhyC1sEF7J48A6DJeElqcUpNjoTsS5QiL9HANODTbEy/Ao8cW2gWocKX9vF7gBn7glAT8lc6THBNgzYG/FkT+J4lAJ0AWlw7cjoLBBvDoGph5Dcio3GCmT33sCKiFUxoDwbHk2HG8OWmcXG7L//8MTLHwaHP6I1hmrb77FDiT1r1/ecWQJVSBl3PoLqtSBpACcAwEHYQWiBIBLRElBtohioDeiBIC0xAlAOYgSgLMRQCe/xZkKWkynKKpDsDNwOu3dZYki4KhSmVxxWQisS7GEkwRRXldkMGT2Gwmq3xIa+4GvfXWuUMTm8cvM9pMUUwkuXbgjPsvdvi88exJdZ7s8hvPAm4+D6S4wbc4JbduBVFU8M2bgTdupMXG+OczavRwqbw06ThF/Cw3bgSs3EZ5J3a3LdZkJfrE0rlWnaSFGt3kxbaDpFZC4jxZ3koMaCTN0MVap/rEugBfxLv7pxmMNs3kWVnJ3priqTkpmBOvdM37ZV69TZIIXpi2RVliYCGsKfnFrWIBYXJrfCpe/IHdjNlXu3j6XQ/BU9Nb6py6AV+6WM6xycm+TAH1lEE9DuweUmP3rFgqnU7yok90zDUd6TPJkKxjHzQ235au2KEtxZYDdzS0HQVXGAeJd/76H09qtmiIgGWqoLCCAr6FKUWkrqRFgsBqrPzOVczl4hW8qoirxNGu+oXl98sfACTyNlZSwreFqJKSzFMb1uTgGnr1CkFYu5LgubSccJKP/q+mU4Dlfw33BqQLenv+fBkv4WsCWuIIOpUraeAKvtQW1DwuN6CNDVoDrZFIiDSOgNCA3cFo9nUwDhidcTRxHJ0NMB5QI1mFwl0dTOHYt58g2nUu0nVEjYRGXrJ4+ST4eARfjghhUW2fPdshUwEuFI0WkGNnOtzYet1HaMGIvQfsgiNkLUxmXUybyMJi2XtSy1p5c5cRzqv+szXJ18wXI7HaRKHO1eD/lTCiLKUd0o6UxDDCEo7uBN7MWlmUYt49cQoGT/Y9+ubRsvE1yIoBMK7aNeQHxgb7bRVfW7O9RZlP6zcJVAzAP2gXoQIm3qEyksZF5NnzO/5GH16IFlr+GjMwAN7OZB7XthxJfxGRBBBzqx85V5Lqd6H8l+PpIgaVqMQDeumMWZktG128mAoxcJ7ktn5JmSSWOS2ViQVOZAYmtqDyug0IZDYhFNuD1LrZ0ZmOUKecAGsuGUjtE5zSK5jal8rrfiAw9Q+hOtQhNQ9Lp8wshaA3EkgULmBeQkCzlIkpqqe33ERPx0TYOc26i0IGJeCYtrtmhimKIvaQhecqxYCJLIEpuxrGcQa5yEKkyvSVyoeWxYI+yKRZUuk5IiBCQQtgrgQCVCbFlNmVnuf7NyGPFiNExICf0F1IkIK5A4fJTqCayWmiAZvSXip4XIrKGcBuzTMJMKV0FAuVGZAHbxRClGLyM5TnhiyaiCWVzeqVZH7HASn+lbLgZPIKFCpSrESpMuUEZy0D2shjUjZzYkWwJe5HBPUbc0KjbhKkgRG8WSPFY9XIBRY9LxVPbJgZWKkAAAA=') format('woff2'),
    url(${woff}) format('woff'),
    url(${ttf}) format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url(${svg}) format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-music:before {
    content: "\\e642";
  }

  .icon-play:before {
    content: "\\e600";
  }

  .icon-pause:before {
    content: "\\e789";
  }

  .icon-search:before {
    content: "\\e671";
  }

  .icon-back:before {
    content: "\\e66a";
  }

  .icon-mini-play:before {
    content: "\\e64f";
  }

  .icon-next:before {
    content: "\\e63c";
  }

  .icon-prev:before {
    content: "\\e63d";
  }

  .icon-mini-pause:before {
    content: "\\e670";
  }

  .icon-mine:before {
    content: "\\e601";
  }

  .slider-enter {
    transform translateX(100%);
  }
  .slider-enter-active {
    transform: translateX(0);
    transition: all 250ms ease-in-out;
  }
  .slider-exit {
    transform: translateX(0);
  }
  .slider-exit-active {
    transform: translateX(100%);
    transition: all 250ms ease-in;
  }
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms;
  }
`

export default GlobalStyle