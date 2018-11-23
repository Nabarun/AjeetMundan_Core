import {Component, OnInit, ViewChild} from '@angular/core';
import {Content, IonicPage, NavParams} from 'ionic-angular';

import { ServicedbService } from './servicedb.service'
import { Category } from "./category.model";
import {expand} from "rxjs/operator/expand";

@IonicPage({
    name: 'service',
    segment: 'service/:id',
    defaultHistory: ['home']
})
@Component({
    selector: 'page-service',
    templateUrl: 'service.html'
})
export class ServicePage implements OnInit {

    @ViewChild(Content) content: Content;

    categories: Array<Category>;
    searchCategory: Array<Category>;
    private _id: string;
    private _title: string;
    openCategory: Array<number> = [];
    items: any;
    buttonColor: string = 'dark';
    action:string = 'contract';

    constructor(
        private _dbservice: ServicedbService,
        public params: NavParams
    ) { }

    ngOnInit() {
        if (this.params.get('id')) {
            this._id = this.params.get('id');
            const title = this.params.get('title').toLowerCase;

            var elems = document.getElementsByClassName('colItem');
            var testDivs = Array.prototype.filter.call(elems, function(title, index) {
                return elems[index].innerHTML.trim().toLowerCase() ===  title;
            });
        }

        this._dbservice.allcats().subscribe(res => {
            this.categories = res;
            this.searchCategory = res;
            if (this._id && this._id !== ':id') {

                this._openFromId(this._id);
                this.scrollContent(this._id);
            }
        });
    }

    getCategories(ev: any){
        const val = ev.target.value;

        if (val && val.trim() != '') {
            this.searchCategory = this.categories.filter((item) => {
                //Search for the key word
                return (item.title.toLowerCase().includes(val.toLowerCase()));
            })
        } else {
            this.searchCategory = this.categories;
        }
    }

    private _openFromId(id: string) {
        const index: number = this.categories.findIndex(category => category.$key === id);
        this.toggleContent(index);
    }

    toggleContent(index) {

        if (this.isOpen(index)) {
            this.openCategory.splice(this.openCategory.indexOf(index), 1);
        } else {

            this.openCategory.push(index);

        }
    }

    isOpen (index: number): boolean {
        return (this.openCategory.indexOf(index) > -1);
    }

    expandOrCollapse() {
        if(this.action == 'contract'){
            this.expand();
        } else {
            this.collapse();
        }
    }

    expand(){
        this.buttonColor = 'secondary';
        this.action = 'expand';
        const keys = Object.keys(this.categories);
        for(let key in keys){
            this.openCategory.push(parseInt(key));
        }
    }

    collapse() {
        this.buttonColor = 'dark';
        this.action = 'contract';
        const keys = Object.keys(this.categories);
        for(let key in keys){
            if (this.isOpen(parseInt(key))) {
                this.openCategory.splice(parseInt(key));
            }
        }
    }

    scrollContent(id){
        var index = this.categories.map(function(e) {return e.$key}).indexOf(id);
        if(index > 4){
            setTimeout(()=>{this.content.scrollToBottom();},200);
        } else {
            setTimeout(()=>{this.content.scrollToTop();},200);
        }
    }

}