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
        $transactions = Transaction::where('item_id', $item_id)->whereBetween('created_at', [$starting_date, $end_date])->get();

        $sell_count = 0;
        $sell_average_price = 0;
        $buy_count = 0;
        $buy_average_price = 0;
        foreach ($transactions as $key => $transaction) {
            if($transaction->type == 'sell'){
                $sell_count += $transaction->quantity;
                $sell_average_price += $transaction->average_price;
            }
            else if($transaction->type == 'buy'){
                $buy_count += $transaction->quantity;
                $buy_average_price += $transaction->average_price;
            }
        }

        $item->sell_count = $sell_count;
        $item->buy_count = $buy_count;
        $item->sell_average_price = $sell_average_price;
        $item->buy_average_price = $buy_average_price;
        return $item;
    }

    public function getStartingDateFromLastReport()
    {
        $report = $this->getLastReport();
        $starting_date = '';
        if($report){
            $starting_date = "no report";
            $starting_date = $report->end_date;
        }
        else {
            $first_item = Item::first();
            if($first_item){
                $starting_date = $first_item->created_at;
            }
            else {
                $starting_date = Carbon::now();
                $starting_date = "now ";
            }
        }
        return $starting_date;
    }

    public function getLastReport()
    {
        return Report::orderBy('created_at', 'desc')->first();
    }

    public function save(Request $request)
    {
        $item = new Item;
        $item->name = $request->name;
        $item->code = $request->code;
        $item->remaining = $request->remaining;
        $item->save();
        return Item::find($item->id);
    }

    public function update(Request $request)
    {

    }

    public function saveTransaction(Request $request){
        $transaction = new Transaction;
        $transaction->item_id = $request->item_id;
        $transaction->quantity = $request->quantity;
        $transaction->average_price = $request->average_price;
        $transaction->total_price = $request->total_price;
        $transaction->type = $request->type;

        $item = Item::find($request->item_id);
        $remaining = $item->remaining;
        if($request->type == "sell"){
            $remaining -= $request->quantity;
        }
        else {
            $remaining += $request->quantity;
        }
        $item->remaining = $remaining;
        $item->save();
        return Transaction::orderBy('created_at', 'desc')->first();
    }

    public function delete($id)
    {
        $item = Item::find($id);
        $item->status = 0;
        $item->save();
    }

}
