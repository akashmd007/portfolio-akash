import { LightningElement } from 'lwc';
//import Util from './stacking';

export default class Timeline extends LightningElement {

    observer;
    once = true;
    elemMap = {};
    num = 0;
    windHeight;
    templateHeight;
    renderedElemList = [];
    scrollOffset = 30;
    startscroll = 0;

    connectedCallback() {
        window.addEventListener('scroll', this.handlescroll);
        window.addEventListener('orientationchange', this.handleOrientChange.bind(this), false);
    }

    renderedCallback () {
        if (!this.once) {
            return;
        }        
        this.once = false;
        let ulDistFromTop = this.template.querySelector('.stack-cards').offsetTop;
        this.windHeight = document.documentElement.scrollHeight;
        let scrollPos = window.scrollY + this.scrollOffset;
        let cardCumulitiveHeight = 0;
        //this.renderedElemList = 
        this.template.querySelectorAll('.stack-card').forEach((elem, i) => {
            let cardGap = i * 50;                      
            let posTop = ulDistFromTop + elem.clientHeight + cardCumulitiveHeight; //elem.offsetTop
            cardCumulitiveHeight = cardCumulitiveHeight + elem.clientHeight;
            let finalVal = 1 - ((1 / this.windHeight) * (scrollPos - posTop - cardGap));
            let finVal = finalVal > 1 ? 1 : finalVal;
            elem.attributeStyleMap.set('transform', `translateY(${cardGap}px) scale(${finVal})`);
            console.log(elem);
            this.renderedElemList.push({element : elem, posTop : posTop, entryNumber: i, cardGap : cardGap, offset: null, ulDistFromTop : ulDistFromTop});
        })

        this.templateHeight = this.template.host.ownerDocument.scrollingElement.offsetHeight;        
        
        this.observer = new IntersectionObserver(this.animationStart, { threshold: [0, 1] });
        
        const mediaCards = this.template.querySelectorAll("[data-media]");
        mediaCards.forEach(element => {
            this.observer.observe(element);    
        });                
    }


    animationStart = (entries) => {
        //function(entries) {
            // isIntersecting is true when element and viewport are overlapping
            // isIntersecting is false when element and viewport don't overlap 

            // My implementation. //If not needed uncommment the other one.                      
            //this.animationfunction1(entries);
            this.animationfunction2(entries);
    }

    animationfunction2 = (entries) => {
        //entries.forEach(entry => {
            //const elemId = entry.target.dataset.media;
            console.log('this.windHeight ', this.windHeight);
            this.elementt = entries[0];
            if (entries[0].isIntersecting) { 
                this.elementt = entries[0];
                entries[0].target.attributeStyleMap.set('transform', 'translateY(0px) scale(1)');
                console.log(entries[0]);
                //if(this.scrollingFn) return; // listener for scroll event already added
                //this.stackCardsInitEvent(this);                 
                //console.log(entries[0].target.dataset.media, 'is intersecting', entries[0]);
                //if(entries[0].intersectionRatio > 0.85){
                    
                //}
              //this.elemMap[elemId].card.add('timeline-Card');                                        
              //this.elemMap[elemId].logo.addPop();
            } else {
                this.elementt = entries[0];
                entries[0].target.attributeStyleMap.set('transform', 'translateY(0px) scale(1)');
                //if(!this.scrollingFn) return; // listener for scroll event already removed
                //window.removeEventListener('scroll', this.scrollingFn);
                //this.scrollingFn = false;
                //console.log(' is not intersecting', entries[0]);
                //this.elemMap[elemId].card.remove('timeline-Card');                                    
                //this.elemMap[elemId].logo.removePop();                    
            }
          //}); 
    }

    animationfunction1 = (entries) => {
        entries.forEach(entry => {
            const elemId = entry.target.dataset.media;
            let card;
            let logo;
            if (this.elemMap[elemId] === undefined) {
                card = this.template.querySelector(`[data-card="${elemId}"]`).classList;            
                logo = this.template.querySelector(`[data-logo="${elemId}"]`);
                this.elemMap[elemId] = {card : card, logo : logo};
            } 
           
            if (entry.isIntersecting) {                  
              this.elemMap[elemId].card.add('timeline-Card');                                        
              this.elemMap[elemId].logo.addPop();
            } else {
                this.elemMap[elemId].card.remove('timeline-Card');                                    
                this.elemMap[elemId].logo.removePop();                    
            }
          });    
    }

    handlescroll = (evt) => {
        //console.log(evt);
        //console.log('this.offsetpos ', this.offsetpos);
        let scrollPos = evt.currentTarget.scrollY + this.scrollOffset;
        this.scaleCardsAdapter({scrollPos : scrollPos});
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

    scaleCardsAdapter = (obj) => {        
        if (!obj.scrollPos) console.error('Missing scrollPos'); 
        if (obj.orientationChange === undefined) {
            obj.orientationChange = false;
        }
        let that = this;
        if(obj.orientationChange) {
            console.log('from orientation change.');        
            setTimeout(function() {
                that.scaleCards(obj);
        }, 300);
        } else {
            that.scaleCards(obj);
        }
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

    handleOrientChange(evt) {
        let scrollPos = evt.currentTarget.scrollY + this.scrollOffset;
        let ulDistFromTop = this.template.querySelector('.stack-cards').offsetTop;
        this.scaleCardsAdapter({orientationChange : true, scrollPos:  scrollPos, ulDistFromTop : ulDistFromTop});        
    }

    openProject = (evt) => {
        this.template.querySelector('c-modal').openModal();
    }

}