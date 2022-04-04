import { LightningElement, api } from 'lwc';

export default class AboutSection extends LightningElement {

    @api desktopHeight;

    connectedCallback () {
        document.documentElement.style.setProperty('--desktopHeight', `${this.desktopHeight}rem`);        
    }
}