<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Transaction;
use App\Models\Report;
use Carbon\Carbon;

class ItemController extends Controller
{
    public function items()
    {
        return Item::all();
    }

    public function save(Request $request)
    {
        $starting_date = $this->getStartingDateFromLastReport();
        $end_date = Carbon::now();
        $item = new Item;
        $item->name = $request->name;
        $item->code = $request->code;
        $item->remaining = $request->remaining;
        $item->save();
        return $this->getItemTransactionValues($item->id, $starting_date, $end_date);
    }

    public function update(Request $request)
    {

    }

    public function delete($id)
    {
        $item = Item::find($id);
        $item->status = 0;
        $item->save();
    }

    public function itemsFromLastReport()
    {
        $starting_date = $this->getStartingDateFromLastReport();
        $end_date = Carbon::now();
        $items = Item::all();
        foreach ($items as $key => $item) {
            $items[$key] = $this->getItemTransactionValues($item->id, $starting_date, $end_date);
        }
        return $items;
    }

    public function getItemTransactionValues($item_id, $starting_date, $end_date)
    {
        $item = Item::find($item_id);
        $item_transactions = Transaction::where('item_id', $item_id)->get();
        $transactions = [];
        foreach($item_transactions as $transaction){
            $carbon_created_at = new Carbon($transaction->created_at);
            if($carbon_created_at >= new Carbon($starting_date) && $carbon_created_at <= new Carbon($end_date)){
                array_push($transactions, $transaction);
            }
        }

        $sell_count = 0;
        $sell_amount = 0;

        $buy_count = 0;
        $buy_amount = 0;
        foreach ($transactions as $key => $transaction) {
            if($transaction->type == 'sell'){
                $sell_count += $transaction->quantity;
                $sell_amount += $transaction->total_price;
            }
            else if($transaction->type == 'buy'){
                $buy_amount += $transaction->total_price;
                $buy_count += $transaction->quantity;
            }
        }

        $item->sell_amount = $sell_amount;
        $item->sell_count = $sell_count;
        $item->buy_count = $buy_count;
        $item->buy_amount = $buy_amount;
        $item->transactions = $transactions;
        return $item;
    }

    public function getStartingDateFromLastReport()
    {
        $report = $this->getLastReport();
        $starting_date = '';
        if($report){
            $starting_date = $report->end_date;
        }
        else {
            $first_item = Item::first();
            if($first_item){
                $starting_date = $first_item->created_at;
            }
            else {
                $starting_date = Carbon::now();
            }
        }
        return $starting_date;
    }

    public function getLastReport()
    {
        return Report::orderBy('created_at', 'desc')->first();
    }

    public function saveSell(Request $request)
    {
        # code...
    }
    public function saveTransaction(Request $request){
        $transaction = new Transaction;
        $transaction->item_id = $request->item_id;
        $transaction->quantity = $request->quantity;
        $transaction->average_price = $request->average_price;
        $transaction->total_price = $request->total_price;
        $transaction->type = $request->type;
        $transaction->save();

        $item = Item::find($request->item_id);
        $remaining = $item->remaining;
        if($request->type == "sell"){
            $remaining -= $request->quantity;
        }
        else {
            $transaction->fs_no = $request->fs_no;
            $transaction->registered_date = $request->registered_date;
            $transaction->save();
            $remaining += $request->quantity;
        }
        $item->remaining = $remaining;
        $item->save();
        return Transaction::orderBy('created_at', 'desc')->first();
    }


}
