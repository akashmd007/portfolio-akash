import { LightningElement, api, wire } from 'lwc';
import { fireEvent } from 'c/pubSub';
import { CurrentPageReference } from 'lightning/navigation';

export default class LeftNavigation extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    openNav ='';
    scrollTimer;
    start = 1;
    scrollSet = ['hello', 'about', 'edu'];

    connectedCallback () {
        this.toggle();
        // window.addEventListener('scroll', this.handlescroll);
        console.log('from navigation connectedcallback');
    }    

    @api toggle = () => {
        console.log('called from parent');
        console.log(this.openNav ? '' : 'none');
        if(this.openNav == 'none'){
            this.openNav = '';
        } else {
            this.openNav = 'none'
        }
        document.documentElement.style.setProperty('--openNav', this.openNav);
    }

    dataToPassToSibling = {
        section : ''
    };

    fireEvent(){
        fireEvent(this.pageRef, 'siblingEvent', this.dataToPassToSibling);
    }

    sendNewDataEvent() {        
        this.fireEvent();
    }

    scrollToSection = (evt) => {
        this.toggle();
        console.log('scrollSec', evt);
        console.log('scrollSec', evt.target.dataset.section);
        this.setSectionAndSend(evt.target.dataset.section);
    }

    setSectionAndSend = (section) => {
        this.dataToPassToSibling['section'] = section;
        this.sendNewDataEvent();
    }
/*
    handlescroll = () => {
        if (this.scrollTimer != -1)
            clearTimeout(this.scrollTimer);

        this.scrollTimer = setTimeout((evt) => {
            let sec = this.scrollSet[this.start % 3];
            this.start ++;
            this.setSectionAndSend(sec);        
        }, 150);                        
    } 
*/
}