import { LightningElement, api, wire } from 'lwc';
import { registerListener } from 'c/pubSub';
import { CurrentPageReference } from 'lightning/navigation';

export default class AboutSection extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api desktopHeight;
    @api bgColor = 'white';

    connectedCallback () {
        registerListener('siblingEvent', this.handleSiblingEvent, this);
        document.documentElement.style.setProperty('--desktopHeight', `${this.desktopHeight}rem`);        
        document.documentElement.style.setProperty('--bgColor', `${this.bgColor}`);        
    }

    
    handleSiblingEvent(siblingData){
        console.log('Received Sibling event: handleSiblingEvent');
 
        //Check if data was passed from the Sibling component, if it has been then parse the values
        if(siblingData && siblingData.section == 'about') {
            console.log('siblingData from about', siblingData);   
            const topDiv = this.template.querySelector(`[data-id="about"]`);            
            console.log('topDiv', topDiv);
            topDiv.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});            
        }
    }
    
        
}