import { LightningElement, api } from 'lwc';

export default class Modal extends LightningElement {

    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    isModalOpen = false;

    @api openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    @api closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.isModalOpen = false;
    }    
}