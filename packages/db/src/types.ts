import {
  ColumnType,
  Generated,
} from 'kysely'

export interface DB {
  orders: OrdersTable;
  order_events: OrderEventsTable;
  checkpoints: CheckpointsTable;
}

export interface OrdersTable {
  order_id: string;
  created_at: Date;
  fulfilled_at?: Date;
  src_chain: string;
  dst_chain: string;
  token: string;
  amount: number;
};

export interface OrderEventsTable {
  id: Generated<number>;
  order_id: string;
  type: 'created' | 'fulfilled';
  timestamp: Date;
};

export interface CheckpointsTable {
  id: Generated<number>;
  name: string;
  last_processed_slot: string;
  updated_at: ColumnType<Date, string | undefined, string | undefined>;
};