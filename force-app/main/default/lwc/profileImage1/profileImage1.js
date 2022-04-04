import { LightningElement, api } from 'lwc';
import Profile_Images from '@salesforce/resourceUrl/ProfileImages';

export default class ProfileImage1 extends LightningElement {
        
    @api imagename;
    @api imgheighht;
    @api imgwidtth;
    image1;
    
    connectedCallback() {
        this.template.host.style.setProperty( '--imgHeight', this.imgheighht );
        this.template.host.style.setProperty( '--imgWidth', this.imgwidtth );
        this.image1 = Profile_Images + `/${(this.imagename != null ? this.imagename : 'Akash.jpg')}`;
    }
    
    @api addPop () {
        this.template.querySelector('.slds-avatar').classList.add('pop');
    }

    @api removePop () {
        this.template.querySelector('.slds-avatar').classList.remove('pop');
    }    

    get image1Getter() {        
        return this.image1;
    }
    
}