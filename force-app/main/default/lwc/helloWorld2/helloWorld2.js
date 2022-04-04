import { LightningElement, api, wire } from 'lwc';  
import { registerListener } from 'c/pubSub';
import { CurrentPageReference } from 'lightning/navigation';
import partcle from '@salesforce/resourceUrl/Particle';
import { loadScript } from 'lightning/platformResourceLoader';
import { configData } from 'c/utilFunctions'

export default class HelloWorld2 extends LightningElement {
@wire(CurrentPageReference) pageRef;

@api backgroundImage;
@api opacity;
@api minHeight;
@api backgroundPositionX;
@api backgroundPositionY;
@api backgroundPosXMobPor;
@api backgroundPosYMobPor;
@api backgroundPosXMobLan;
@api backgroundPosYMobLan;    
@api imageScrubSpeed;
@api translateval;    
@api scale;      
@api imgScale;  
@api tabScale;
@api deskScale;
offsetpos;
execOnce = true;
portraitMobheight;
lanscapeMobheight;
portraitMobheightcc;
maxbottomheight;
initheight;
firsttime;
offsetLandScape;
d3Initialized = false;    

connectedCallback () {  
    console.log('connected callback');
    window.addEventListener('scroll', this.handlescroll);  
    document.documentElement.style.setProperty('--dxp-c-section-content-spacing-inline-start-mobile', '0.2rem');
    document.documentElement.style.setProperty('--dxp-c-section-content-spacing-inline-end-mobile', '0.2rem');
    document.documentElement.style.setProperty('--dxp-c-section-content-spacing-inline-start', '0rem');
    document.documentElement.style.setProperty('--dxp-c-section-content-spacing-inline-end', '0rem');
    document.documentElement.style.setProperty('--offsetLandScape', '0px');
    //window.addEventListener('scroll', this.handlescroll);
    document.documentElement.style.setProperty('--heightu', `${window.innerHeight}px`);  
    
    if (screen.orientation.type.includes('landscape')){
        this.portraitMobheight = `${window.innerHeight}px`;
        this.maxbottomheight = (this.maxbottomheight < this.portraitMobheight ? this.portraitMobheight : this.maxbottomheight);
        //this.lanscapeMobheight = `${(window.innerWidth) / 2}px`;
    } else {
        // for portrait
        this.portraitMobheight = `${window.innerHeight / 2}px`; //`${(window.innerHeight) / 2}px`;
        //this.lanscapeMobheight = `${(window.innerWidth) / 2}px`;
    }
    document.documentElement.style.setProperty('--portraitMobheight', this.portraitMobheight);  
    document.documentElement.style.setProperty('--maxbottomheight', this.maxbottomheight);   

    window.addEventListener('orientationchange', this.handleOrientChange.bind(this), false);
    window.addEventListener('resize', this.handlelandscapechange.bind(this), false);
    registerListener('siblingEvent', this.handlesibevt, this);
    //console.log('screen.orientation ', screen.orientation);
   /*
    if (screen.orientation.type === 'landscape-primary'){
        this.portraitMobheight = `${((window.innerWidth) / 2)}px`;
        //this.lanscapeMobheight = `${(window.innerWidth) / 2}px`;
    } else {
        this.portraitMobheight = `${(window.innerHeight) / 2}px`;
        //this.lanscapeMobheight = `${(window.innerWidth) / 2}px`;
    }
    document.documentElement.style.setProperty('--portraitMobheight', this.portraitMobheight);
     */
    //this.offsetpos = this.template.querySelector('[data-id="hello"]');//.offsetTop;
    //console.log('this.offsetpos ', this.offsetpos);        
    document.documentElement.style.setProperty('--opacity', this.opacity);        
    document.documentElement.style.setProperty('--backgroundImage', `url(${this.backgroundImage})`);
    document.documentElement.style.setProperty('--minHeight', `${this.minHeight}rem`);
    document.documentElement.style.setProperty('--backgroundPositionX', `${this.backgroundPositionX}px`);
    document.documentElement.style.setProperty('--backgroundPositionY', `${this.backgroundPositionY}px`);
    
    document.documentElement.style.setProperty('--backgroundPosXMobPor', `${this.backgroundPosXMobPor}px`);
    document.documentElement.style.setProperty('--backgroundPosYMobPor', `${this.backgroundPosYMobPor}px`);     
    document.documentElement.style.setProperty('--backgroundPosXMobLan', `${this.backgroundPosXMobLan}px`);
    document.documentElement.style.setProperty('--backgroundPosYMobLan', `${this.backgroundPosYMobLan}px`); 

    document.documentElement.style.setProperty('--scale', `translate3d(0px, 0px, 0px) scale(${this.scale})`);                  
    document.documentElement.style.setProperty('--tabScale', `translate3d(0px, 0px, 0px) scale(${this.tabScale})`);
    document.documentElement.style.setProperty('--deskScale', `translate3d(0px, 0px, 0px) scale(${this.deskScale})`);
    document.documentElement.style.setProperty('--imgScale', `${this.imgScale}`);     
}


renderedCallback () {
    if (this.d3Initialized) {
        return;
    }
    this.d3Initialized = true;
    Promise.all([
        loadScript(this, partcle + '/particle.min.js')            
    ]).then (() => {

        //this.callparticle();
        //console.log('partcle ', partcle);
        //console.log('Particles ',Particles);
        //console.log('pJS ', pJS);
        //console.log('particlesJS ', particlesJS);
        
        particlesJS('particles-js', this, configData , function() {
            console.log('callback - particles.js config loaded');
        });
        
        /* Particles.init({selector:'.background-cg'}); */
        /*partcle.init({
            selector: this.template.querySelector('.background')
            }); */ 
        //this.initializeD3();
    }).catch(
        error => console.log(error)
    );  
}
callparticle () {
    console.log('partcle', partcle);
    console.log('pJS', this.pJS);
    
}

handlescroll = (evt) => {
    //console.log(evt);
    //console.log('this.offsetpos ', this.offsetpos);
    let scrollPos = evt.currentTarget.scrollY + this.scrollOffset;
    this.scaleCards({scrollPos : scrollPos});
    /*
    let yax = evt.currentTarget.scrollY; //this.offsetpos -                 
    let finalVal = 1 - ((1 / this.windHeight) * yax);
    console.log('finalVal ', finalVal);        
    this.elementt.target.attributeStyleMap.set('transform', `translateY(0px) scale(${finalVal})`);        
    */
    //let scrollTop = this).scrollTop();

    //console.log(this.template.querySelector(".card1").offsetTop);
    /*$('.background1, .background2').each(function() {
        var topDistance = $(this).offset().top;

        if ( (topDistance+100) < scrollTop ) {
            alert( $(this).text() + ' was scrolled to the top' );
        }
    });*/
}

scaleCards = (obj) => {        
    if (!obj.scrollPos) console.error('Missing scrollPos');         
    let cardCumulitiveHeight = 0;
    let ulDistFromTop;
    /*
    if (obj.orientationChange === undefined) {
        obj.orientationChange = false; */
    if (obj.orientationChange) {
        ulDistFromTop = this.template.querySelector('.stack-cards').offsetTop;
        //ulDistFromTop = this.template.querySelector('.stack-cards').offsetTop;
        //cardCumulitiveHeight = 0;            
    }        

    console.log('evt.currentTarget.scrollY ', obj.scrollPos);
    this.renderedElemList.forEach(entry => {

        //let cardGap = entry.entryNumber * 50;
        if (entry.offset===null) {
            let posTop = entry.ulDistFromTop + entry.element.clientHeight + cardCumulitiveHeight; //elem.offsetTop
            cardCumulitiveHeight = cardCumulitiveHeight + entry.element.clientHeight;
            entry.offset = posTop - entry.cardGap;
        } else if (obj.orientationChange) {
            
            let posTop = ulDistFromTop + entry.element.clientHeight + cardCumulitiveHeight; //elem.offsetTop
            cardCumulitiveHeight = cardCumulitiveHeight + entry.element.clientHeight;
            entry.offset = posTop - entry.cardGap;
        }

        console.log('elem.offsetTop ', entry.posTop);
        if(obj.scrollPos > entry.offset) {
            console.log(entry, ' element touched top');                
            let finalVal = 1 - ((1 / this.windHeight) * (obj.scrollPos - entry.offset));
            let finVal = finalVal > 1 ? 1 : finalVal;
            //console.log(finalVal, ' calculated shrink size');                                
            //entry.cardGap = entry.cardGap- 1;
            entry.element.attributeStyleMap.set('transform', `translateY(${entry.cardGap}px) scale(${finVal})`);                        
        } else {
            //let finalVal = ((1 / this.templateHeight) * scrollPos);
            //entry.element.attributeStyleMap.set('transform', `translateY(0px) scale(${finalVal})`);
        }
    });
}

/*
handlescroll = (evt) => {    
    console.log('this.offsetpos ', this.offsetpos);
    console.log('evt.currentTarget.scrollY ', evt.currentTarget.scrollY);
    let yax = evt.currentTarget.scrollY; //this.offsetpos -                 
    let finalVal = yax * Number(this.imageScrubSpeed);
    this.translateval = `transform: translate3d(0px, ${finalVal}px, 0px);`;
}   
*/

handlelandscapechange(evt) {
    //console.log('handlelandscapechange changed', evt);
    if (evt.target.screen.orientation.type.includes('landscape')) {
        if(this.firsttime){
            this.initheight = window.innerHeight;
            this.firsttime = false;
        }            
        //setTimeout(function() {
        this.portraitMobheight = `${(window.innerHeight)}px`;            
        //this.maxbottomheight = (this.maxbottomheight < this.portraitMobheight ? this.portraitMobheight : this.maxbottomheight);
        //console.log('landscape height ', this.portraitMobheight);
        //console.log('window objetc? ', window); 
        document.documentElement.style.setProperty('--portraitMobheight', this.portraitMobheight);                                    

        this.offsetLandScape = `${(this.initheight - window.innerHeight < 0 ? this.initheight - window.innerHeight : 0)}`;
        this.template.querySelector('.parallaxInfo').style.position = 'relative';
        this.template.querySelector('.parallaxInfo').style.top = `${this.offsetLandScape}px`;
        this.template.querySelector('.parallaxInfo').style.marginBottom = `${this.offsetLandScape}px`;
        this.initheight = window.innerHeight;
        document.documentElement.style.setProperty('--offsetLandScape', `${Math.abs(this.offsetLandScape)}px`);
        /*
        if(this.portraitMobheight == '388px'){

        } else {
            this.template.querySelector('.parallaxInfo').style.position = 'relative';
            this.template.querySelector('.parallaxInfo').style.top = '0';  
        }
        */
                      
        //document.documentElement.style.setProperty('--maxbottomheight', this.maxbottomheight);            
        //info.innerHTML = "innerWidth after orientation change and a pause of: " + pause + 'ms ' + window.innerWidth
        //}, 100);            

    } /*else if (evt.target.screen.orientation.type.includes('portrait')) {
        //setTimeout(function() {
        this.portraitMobheight = `${(window.innerHeight) / 2 }px`;    
        console.log('portrait height ', this.portraitMobheight); 
        document.documentElement.style.setProperty('--portraitMobheight', this.portraitMobheight); 
        document.documentElement.style.setProperty('--maxbottomheight', this.maxbottomheight);          
        //info.innerHTML = "innerWidth after orientation change and a pause of: " + pause + 'ms ' + window.innerWidth
        //}, 100);                      
    } */
}

handleOrientChange(evt) {
    console.log('handleOrientChange changed', evt.target.screen.orientation.type);
   /* if (evt.target.screen.orientation.type.includes('landscape')) {
        setTimeout(function() {
        this.portraitMobheight = `${(window.innerHeight)}px`;
        this.maxbottomheight = (this.maxbottomheight < this.portraitMobheight ? this.portraitMobheight : this.maxbottomheight);
        console.log('landscape height ', this.portraitMobheight);
        console.log('window objetc? ', window); 
        document.documentElement.style.setProperty('--portraitMobheight', this.portraitMobheight); 
        document.documentElement.style.setProperty('--maxbottomheight', this.maxbottomheight);            
        //info.innerHTML = "innerWidth after orientation change and a pause of: " + pause + 'ms ' + window.innerWidth
        }, 100);            

    } */ if (evt.target.screen.orientation.type.includes('portrait')) {
        setTimeout(function() {
        //this.portraitMobheight = `${(window.innerHeight) / 2 }px`;  
        // for portrait  
        this.portraitMobheight = `${window.innerHeight / 2}px`;    
        console.log('portrait height ', this.portraitMobheight); 
        document.documentElement.style.setProperty('--portraitMobheight', this.portraitMobheight); 
        document.documentElement.style.setProperty('--maxbottomheight', this.maxbottomheight);          
        //info.innerHTML = "innerWidth after orientation change and a pause of: " + pause + 'ms ' + window.innerWidth
        }, 100);                      
    }
}

handlesibevt(siblingData) {
    console.log('Received Sibling event: handleSiblingEvent');

    //Check if data was passed from the Sibling component, if it has been then parse the values
    if(siblingData && siblingData.section == 'hello') {
        console.log('siblingData Hello', siblingData);
        const topDiv = this.template.querySelector('[data-id="hello"]');  
        topDiv.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});                     
    }
}    

}