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

class StockController extends Controller
{
    public function stockItems()
    {
        $stocks = ItemCategory::all();
        foreach($stocks as $stock){
            $items = Item::where('category_id', $stock->id)->where('status', 1)->get();
            $stock->items = $items;
        }
        return $stocks;
    }

    public function newSell(Request $request)
    { 
        $sell = new Sell;
        $sell->user_id = $request->user_id;    
        $sell->total = $request->total;    
        $customer = $request->customer;
        $customer_id = 0;
        if($customer){
            $customer_fetch = Customer::find($customer['value']);

            if(!$customer_fetch){
                $cust = new Customer;
                $cust->name = $customer['value'];
                $cust->save();
                $_cust = Customer::find($cust->id);
                $customer_id = $_cust->id;
            }
            else{
                $customer_id = $customer['value'];
            }
            $sell->customer_id = $customer_id;
        }
        $sell->save();

        foreach ($request->transactions as $transact) {
            if($transact['item_id']){
                $transaction = new Transaction;
                $transaction->user_id = $request->user_id;
                $transaction->item_id = $transact['item_id'];
                $transaction->sell_id = $sell->id;
                $transaction->quantity = $transact['quantity'];
                $transaction->price = $transact['price'];
                $transaction->type = "out";
                $transaction->save();
                $item = Item::find($transact['item_id']);
                $item->remaining = $item->remaining - $transact['quantity'];
                $item->save();
            }           
        }

        
        if($request->customer){ 
            if($request->total - $request->paid > 0){
                $loan = new Loan;
                $loan->customer_id = $customer_id;
                $loan->user_id = $request->user_id;
                $loan->sell_id = $sell->id;
                $loan->price = $request->total - $request->paid;
                $loan->save();
            }           
        }
      
        return $sell;
    }

    public function newTransaction(Request $request){
        $transaction = new Transaction;
        $transaction->user_id = $request->user_id;
        $transaction->item_id = $request->item_id;
        $transaction->quantity = $request->quantity;
        $transaction->type = $request->type;
        if($transaction->save()){
            $item = Item::find($request->item_id);
            $quantity = $item->remaining;
            if($request->type == "in"){
                $item->remaining = $quantity + $request->quantity;
            }
            else{
                $item->remaining = $quantity - $request->quantity;
            }
            $item->save();
            return Item::find($item->id);
        }
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

    public function getCustomers()
    {
        return Customer::all();
    }
 
}
