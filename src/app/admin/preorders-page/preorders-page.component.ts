import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {PreorderService} from '../../shared/preorder.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-preorders-page',
  templateUrl: './preorders-page.component.html',
  styleUrls: ['./preorders-page.component.scss']
})
export class PreordersPageComponent implements OnInit, OnDestroy {

  // preorders = [];
  // oSub: Subscription;
  // rSub: Subscription;
  // searchStr = '';

  constructor(private preorderService: PreorderService,
              private http: HttpClient) {}

  ngOnInit() {
    // this.oSub = this.preorderService.getAll().subscribe(preorders => {
    //   this.preorders = preorders;
    // });
  }

  // remove(id: string) {
  //   this.rSub = this.preorderService.remove(id).subscribe(() => {
  //     this.preorders = this.preorders.filter(order => order.id !== id);
  //   });
  // }

  ngOnDestroy(): void {
    // if (this.oSub) {
    //   this.oSub.unsubscribe();
    // }
    //
    // if (this.rSub) {
    //   this.rSub.unsubscribe();
    // }
  }

  onSubmit(contactForm: NgForm) {
    if (contactForm.valid) {
      const email = contactForm.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.http.post('https://formspree.io/f/xwkaowgv',
        { name: email.name, replyto: email.email, message: email.messages },
        { headers: headers }).subscribe(
        response => {
          console.log(response);
          // contactForm.reset();
        }
      );
    }
  }
}
