<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Models\Report;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
     public function getAll()
     {
        return Report::orderBy('created_at', 'desc')->get();
     }

     public function save(Request $request)
     {
        $report = new Report;
        $report->starting_date = $request->starting_date;
        if($report->end_date){
            $report->end_date = $report->end_date;
        }
        else {
            $report->end_date = Carbon::now()->toDateTimeString();
        }
        $report->total_sell = $request->total_sell;
        $report->total_buy = $request->total_buy;
        $report->item_count = $request->item_count;
        $report->save();
        return Report::find($report->id);
     }

     public function reportDetail($report_id)
     {
        $report = Report::find($report_id);
        $items = Item::all();
        foreach($items as $key => $item){
            $items[$key] = $this->getItemTransactionValues($item->id, $report->starting_date, $report->end_date);
        }

        $report->items = $items;
        return $report;
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
}
