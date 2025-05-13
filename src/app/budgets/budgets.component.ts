import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DatepickerViewsSelectionExample } from '../date-picker/date-picker.component';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budgets',
  imports: [FormsModule,DatepickerViewsSelectionExample],
  templateUrl: './budgets.component.html',
  styleUrl: './budgets.component.scss',
})
export class BudgetsComponent implements OnInit {
  public prodName!: string;
  public totalBudget!: number;
  public year:any
  public totalUsed!: number;
  public budget!: any;
  public usedAmount!: any;
  public totalLeft:any;
  public balanceLeft!: any;
  public prodArray: any = [];
  public usedMoney:any = [];
  public name: any;
  public showInput:boolean = false;
  
  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.budgetService.getBudget().subscribe({
      next: (data) => {
        this.prodArray = data.budgets.map((item: any) => ({
          Name: item.name,
          Budget: item.budget,
          usedAmount: item.usedAmount,
          balanceLeft: item.balanceLeft
        }));
  
        this.totalBudget = this.prodArray.reduce((acc: number, item: any) => acc + Number(item.Budget), 0);
        this.total = this.totalBudget;
        this.sumUsed = this.prodArray.reduce((acc: number, item: any) => acc + Number(item.usedAmount), 0);
  
        console.log('💸 Budget data populated:', this.prodArray);
      },
      error: (err) => {
        console.error('❌ Failed to fetch budget:', err);
      },
    });
  }

  showInp(){
    this.showInput = true
  }

  public sumUsed!:any
  onSubmit() {
    this.showInput = false;
    
    // Create an object with all necessary fields
    const budgetData = {
      name: this.prodName,
      budget: this.budget,
      usedAmount: this.usedAmount,
    };
  
    // Add to the array to update the view
    this.prodArray.push({
      Name: this.prodName,
      Budget: this.budget,
      usedAmount: this.usedAmount,
      balanceLeft: this.budget - this.usedAmount,
      totalUsed: this.totalBudget - this.usedAmount
    });
  
    // Call the service to add the new budget
    this.budgetService.addBudget(budgetData).subscribe({
      next: (response) => {
        console.log('New budget added:', response);
      },
      error: (err) => {
        console.error('Error adding new budget:', err);
      }
    });
  
    // Clear the form fields
    this.prodName = '';
    this.budget = '';
    this.usedAmount = '';
    this.balanceLeft = '';
    this.sumUsed = this.prodArray.reduce((acc:any, item:any) => acc + Number(item.usedAmount), 0);
  }
  
  public total:any;
 public addBudgetDisable: boolean = false
  addBudget(){
    this.addBudgetDisable = !this.addBudgetDisable;
    this.total = this.totalBudget
  }
  /* edit */
  editBtn(index:any,name:string,budget:any,usedamount:any){
    this.prodArray.splice(index, 1)
    this.showInput = true
    this.prodName = name;
    this.budget = budget;
    this.usedAmount = usedamount;
  }

}
