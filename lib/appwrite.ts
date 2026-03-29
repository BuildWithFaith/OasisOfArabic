export class DummyClient {
  setEndpoint() { return this; }
  setProject() { return this; }
  setKey() { return this; }
}

export const Client = DummyClient;
export const Account = class {};
export const Databases = class {};
export const TablesDB = class {};
export const Storage = class {};
export const Functions = class {};
export const ID = { unique: () => 'mock-id' };
export const Query = {
  equal: () => 'equal',
  limit: () => 'limit',
  orderDesc: () => 'orderDesc',
  orderAsc: () => 'orderAsc',
  search: () => 'search',
  offset: () => 'offset',
  select: () => 'select'
};
export const Models = {};

export const client = new DummyClient();
export const account = {} as any;
export const databases = {} as any;
export const tablesDB = {
  listRows: async () => ({ total: 0, rows: [] }),
  getRow: async () => ({}),
  createRow: async () => ({}),
  updateRow: async () => ({}),
  deleteRow: async () => ({}),
} as any;
export const storage = {
  getFilePreview: () => 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  getFileView: () => 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  createFile: async () => ({}),
  deleteFile: async () => ({})
} as any;

export const DATABASE_ID = 'db';
export const PRODUCTS_TABLE_ID = 'products';
export const PRODUCT_IMAGES_TABLE_ID = 'images';
export const STORAGE_BUCKET_ID = 'bucket';
export const ORDERS_TABLE_ID = 'orders';
export const CUSTOMERS_TABLE_ID = 'customers';
export const ORDER_ITEMS_TABLE_ID = 'items';
export const ADDRESSES_TABLE_ID = 'addr';
export const DISCOUNT_MANAGEMENT_TABLE_ID = 'disc';

export function createClient() {
  return {
    client,
    account,
    tablesDB,
    storage
  };
}
