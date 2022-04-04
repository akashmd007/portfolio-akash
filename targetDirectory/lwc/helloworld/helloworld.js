    import { LightningElement, api } from 'lwc';    
export default class Helloworld extends LightningElement {
    
    @api backgroundImage;
    @api opacity;
    @api minHeight;
    @api backgroundPositionX;
    @api backgroundPositionY;
    @api imageScrubSpeed;
    @api translateval;    
    @api scale;      
    @api imgScale;    

    connectedCallback () {  
        console.log('connected callback');                     
        window.addEventListener('scroll', this.handlescroll);

        document.documentElement.style.setProperty('--opacity', this.opacity);        
        document.documentElement.style.setProperty('--backgroundImage', `url(${this.backgroundImage})`);
        document.documentElement.style.setProperty('--minHeight', `${this.minHeight}rem`);
        document.documentElement.style.setProperty('--backgroundPositionX', `${this.backgroundPositionX}px`);
        document.documentElement.style.setProperty('--backgroundPositionY', `${this.backgroundPositionY}px`);        
        document.documentElement.style.setProperty('--scale', `translate3d(0px, 0px, 0px) scale(${this.scale})`);        
        document.documentElement.style.setProperty('--imgScale', `${this.imgScale}`);        
    }

    handlescroll = (evt) => {
        let yax = evt.currentTarget.scrollY;                
        let finalVal = yax * Number(this.imageScrubSpeed);
        this.translateval = `transform: translate3d(0px, ${finalVal}px, 0px);`;
    }   

}