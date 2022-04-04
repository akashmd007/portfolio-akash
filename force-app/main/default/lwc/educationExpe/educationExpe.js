import { LightningElement, wire } from 'lwc';
import { registerListener } from 'c/pubSub';
import { CurrentPageReference } from 'lightning/navigation';
import { scrollToView } from 'c/utilFunctions';

export default class EducationExpe extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    connectedCallback () {
        registerListener('siblingEvent', this.handlesibevt, this);       
    }

    handlesibevt(siblingData) {
        console.log('Received Sibling event: handleSiblingEvent');
 
        //Check if data was passed from the Sibling component, if it has been then parse the values
        if(siblingData && siblingData.section == 'edu') {
            console.log('siblingData EducationExpe', siblingData);
            const topDiv = this.template.querySelector('[data-id="edu"]');  
            scrollToView(topDiv);
        }
    }
}