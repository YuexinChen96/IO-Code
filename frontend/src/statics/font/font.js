import { createGlobalStyle } from 'styled-components';
import Montserrat from './Montserrat-Regular.ttf';

export default createGlobalStyle`
    @font-face {
        font-family: 'Montserrat';
        src: url(${Montserrat}) format('truetype');
    }
`;