import { LightningElement, api } from 'lwc';

export default class Example1 extends LightningElement {

    @api testProp;

    connectedCallback () {        
        //document.documentElement.style.setProperty('--testProp', this.testProp); 
        this.template.host.style.setProperty( '--testProp', this.testProp );       
    }    
}