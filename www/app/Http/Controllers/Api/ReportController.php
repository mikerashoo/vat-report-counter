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

class ReportController extends Controller
{
    public function transactions()
    { 
        $transactions = Transaction::orderBy('created_at', 'desc')->whereDate('created_at', Carbon::today())->get();
        foreach ($transactions as $transaction) {
            $transaction->item;
        }
        return $transactions;
    }   

    public function SellTransactionsOnDate($date)
    {
        $items = Item::all(); 
        foreach ($items as $item) {
            $transactions = Transaction::ofType('out')->where('item_id', '=', $item->id)->where('price','>', '0')->whereDate('created_at', $date)->get();
            $sell_quantity = 0;
            $sell_price = 0;

            foreach ($transactions as $transaction) {
                    $sell_quantity += $transaction->quantity;
                    $sell_price += ($transaction->quantity * $transaction->price);
            }

            $item->transactions = $transactions;
            $item->sell_quantity = $sell_quantity;
            $item->sell_price = $sell_price;
        }
        return $items;
    }
 

    public function SellsOnDate($date)
    {
        $sells = Sell::with('transactions', 'customer', 'loan')->orderBy('created_at', 'DESC')->whereDate('created_at', $date)->get(); 
        foreach ($sells as $sell) {
            foreach ($sell->transactions as $transact) {
                $transact->item;
            }
        }
        return $sells;
    }

    public function deleteSell($id)
    {
        $sell = Sell::find($id);
        foreach ($sell->transactions as $trans) {
            $transaction = Transaction::find($trans->id);
            $item_id = $transaction->item_id;
            $quantity = $transaction->quantity;
            $item = Item::find($item_id);
            $item->remaining = $item->remaining += $quantity;
            $item->save();
            $transaction->delete();

        }
        $loan = $sell->loan;
        if($loan && $loan->id){
            $_loan = Loan::find($loan->id);
            $_loan->delete();
        }
        return $sell->delete();
    } 
}
