import { createGlobalStyle } from 'styled-components'
import eot from 'common/fonts/iconfont.eot?t=1554131065158'
import ttf from 'common/fonts/iconfont.ttf?t=1554131065158'
import woff from 'common/fonts/iconfont.woff?t=1554131065158'
import svg from 'common/fonts/iconfont.svg?t=1554131065158#iconfont'

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
    url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAATEAAsAAAAACsQAAAR4AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDegqHXIY+ATYCJAMkCxQABCAFhG0HbRtHCSMRJmSRR/bPA9ttSqAY3RnWcuYgTvZw3+Hbv828Re57BtZVlU4WhHvBE/Dyy5oTe058aSAe7t298ceYlBUWB5yFGoaUcTz0O//VYRpahkGAccY9H8hEJzNxrge2L0yEGcrZJ4++664DTjP6+zGXZ9cXmr7pb+vFxYC0hOWFhEcRzzRKhFC4TmtYmFdme0Kgmq/j80AAeSccQUZ0YiZkOa4gqJh1NWWQTRl5DZGINWHJtfkiiyElLh/uKoBF7ufJD3ciC5ygwl+UWh1ViVAB4lnKS3gKKQ9+PDuAw02AAo4AGMgpdU6AhklHUOntY8wbgLKYCj8IQUKKUC+0iWclEtK4QHxrL7cTpcDVSnU6NxQJuJhREPbPI6UiCK0pWQhQCAiEQATSEIIQyEBIQSAFoR4Bg9AqHEPVBgQU4tkmcAAgZ65RB6ABkA6QC652dPegnBLCGG25yVz3UVHdxMjLVvxtterA3TeZ995micQ594Xe+/dLZYtEOffuZd29W19WWuxX4OQLVLyv+oyIPIh372buPU+UUrVi3r7R5lZf2Ld7zr5676hDzb55p3nbyqo9/MAcWWtdvVNec277as3lcF5rxZodCgrzbGp2GeisGu3ZvlsX2bJS3rGu2WM1T4fkbM28fQZk7d78tfh75jQzq5RzzQXN5s9aobDrUlchP7eSSI2umnRDK0yD7eVK6f1M6aCIGRuz+0xk5KI9P+aDh/2UOpYdYmIxO8gOGfkhktC5Tl0DTweewZTyD5mpKXso9KamWko1StvWHaYfPlDIDu/5kAa21gKe6yUjdA8EfbOH5c58LN3/9u0Btp/tDXR/wKN7xfHOccATy72WiTcm6dGj3CQ3RXzIuYAH2STOh6tqWqRP5qadUb5Rm3Zl+qy1uuYu8dFIPySmrSHka39N3l7DVWXjeyXpaJSRKv8bVVhnV3DhEjQZo8XEdS+NWtaAY6o+9wXd66p6DElZFJS2WM7x0i3xR5tVPdZZaTu0ZDfhofIXhfAyMzKlSuyWyksfjEIeACST9ocOgjxjn2nTy9aYNu0BAPZy1wCA0ucf/Ttci1zuUqIS+FtWwQHAg4txfWiS8H6N8sDfUkVr0f83IP0EGE16l3CTXF77laBlX7oFBJDzOAnHlcuLGfDP9arjGam1WscBIk6JDsCJHEDFLhhGuIGUzB2kxZ4g74qYmxV0aAclmQDsMclA1DgEqvQDU+MaxglPITDiM4RqQmGcvOy43lOBdeSXG0MJEooXynXbGGmRi698Ix0qxUmJI/3BNo9Q4OyazbzQgMe4wI5pKGLIcFvTk70MVdVSx20BLW4m0kWeS3XZJ7m6rVcXERgoAhIktiA5rdUwZn1xyX3/G6QGFYVrBt64/4BZ+cZJwOW3wLyUTauBa6m3RqmQUNwg5lDeqpEn2aESyRbpyo8qgCZcWY94J+LRUqat0p1fXb/Wc0CKvzsJFROXQEKJJJZEUtiq1LLv1GBxkJcp1tkuVro813mTO+XH7RrMsusY4yUvaGZYrQA=') format('woff2'),
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