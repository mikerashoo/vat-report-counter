<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\Transaction;
use App\Models\Sell;
use App\Models\Customer;
use App\Models\Loan;
use App\Models\LoanPayment;
use Carbon\Carbon;

class LoanController extends Controller
{   
    public function getUnpaidLoans()
    {
       return Loan::with('customer', 'user', 'payments', 'sell.transactions.item')->where('status', 'unpaid')->orderBy('created_at', 'DESC')->get(); 
    }

    public function saveLoanPayment(Request $request)
    {
        $loan_payment = new LoanPayment;
        $loan_payment->loan_id = $request->loan_id;
        $loan_payment->user_id = $request->user_id;
        $loan_payment->amount = $request->amount;
        $loan_payment->save();
        $loan = Loan::find($request->loan_id);
        $paid = 0;
        foreach($loan->payments as $payment){
            $paid += $payment->amount;
        }
        if($loan->price == $paid){
            $loan->status = 'paid';
            $loan->save();
        }
        return LoanPayment::find($loan_payment->id);
    }

    public function todaysLoanPayments($user_id){
        $loan_payments = LoanPayment::with('loan.customer')->orderBy('created_at', 'DESC')->where('user_id', $user_id)->whereDate('created_at', Carbon::today())->get(); 
        return $loan_payments;
    }
}
