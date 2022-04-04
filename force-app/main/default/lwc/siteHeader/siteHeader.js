import { LightningElement, api } from 'lwc';

export default class SiteHeader extends LightningElement {
    @api desktopHeight;
    @api bgColor;    
    scrollTimer;
    
    openNavigation = (event) => {
        this.template.querySelector("c-left-navigation").toggle();         
    }  
    

}