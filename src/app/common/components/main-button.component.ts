import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector:'main-button',
    template:`
        <div class="main-btn right" [class.left]="position === 'left'" [class.right]="position === 'right'" (click)="handleAction()">
            <ng-content></ng-content>
        </div>
    `,
    styles:[`
        .main-btn {
            display:block;
            position:fixed;
            bottom: 1rem;
            height:7.5rem;
            width:7.5rem;
            border-radius:50%;
            background-color: #fb8c00;            
            font-size:3.80rem;
            text-align:center;
            padding:1.5rem;
            padding-left:1.8rem;
        }        

        .main-btn:hover {
            background-color: #ffbd45;
        }

        .left{
            left:7.5rem;
        }

        .right{
            right: 1rem;
        }
    `]

})
export class MainButtonComponent{
    @Input() position: string = 'right';
    @Output() action = new EventEmitter();

    handleAction(){
        this.action.emit({});
    }
} 