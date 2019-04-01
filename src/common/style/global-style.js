import { createGlobalStyle } from 'styled-components'
import eot from 'common/fonts/music-icon.eot'
import ttf from 'common/fonts/music-icon.ttf'
import woff from 'common/fonts/music-icon.woff'
import svg from 'common/fonts/music-icon.svg?#music-icon'

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

  @font-face {
    font-family: 'music-icon';
    src: url(${eot});
    src: url(${eot}?#iefix) format('embedded-opentype'),
      url(${ttf}) format('truetype'),
      url(${woff}) format('woff'),
      url(${svg}) format('svg');
    font-weight: normal;
    font-style: normal;
  }
  [class^="icon-"], [class*=" icon-"] {
    font-family: 'music-icon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .icon-ok:before { 
    content: "\\e900";
  }
  .icon-close:before {
    content: "\\e901";
  }
  .icon-add:before {
    content: "\\e902";
  }
  .icon-play-mini:before {
    content: "\\e903";
  }
  .icon-playlist:before {
    content: "\\e904";
  }
  .icon-music:before {
    content: "\\e905";
  }
  .icon-search:before {
    content: "\\e906";
  }
  .icon-clear:before {
    content: "\\e907";
  }
  .icon-delete:before {
    content: "\\e908";
  }
  .icon-favorite:before {
    content: "\\e909";
  }
  .icon-not-favorite:before {
    content: "\\e90a";
  }
  .icon-pause:before {
    content: "\\e90b";
  }
  .icon-play:before {
    content: "\\e90c";
  }
  .icon-prev:before {
    content: "\\e90d";
  }
  .icon-loop:before {
    content: "\\e90e";
  }
  .icon-sequence:before {
    content: "\\e90f";
  }
  .icon-random:before {
    content: "\\e910";
  }
  .icon-back:before {
    content: "\\e911";
  }
  .icon-mine:before {
    content: "\\e912";
  }
  .icon-next:before {
    content: "\\e913";
  }
  .icon-dismiss:before {
    content: "\\e914";
  }
  .icon-pause-mini:before {
    content: "\\e915";
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