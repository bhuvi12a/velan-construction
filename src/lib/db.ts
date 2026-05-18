// Pure in-memory mock database for Velan Constructions (No MongoDB / Mongoose required!)

export async function connectToDatabase() {
  // Pure in-memory connection helper (No-op)
  return true;
}

// In-memory data store using global variables to survive Next.js dev reloads
let globalStore = (global as any)._velanGlobalStore;
if (!globalStore) {
  globalStore = {
    contacts: [],
    subscribers: [],
    campaigns: [],
    popups: []
  };
  (global as any)._velanGlobalStore = globalStore;
}

export class MockModel {
  private collectionName: 'contacts' | 'subscribers' | 'campaigns' | 'popups';

  constructor(collectionName: 'contacts' | 'subscribers' | 'campaigns' | 'popups') {
    this.collectionName = collectionName;
  }

  private getItems() {
    return globalStore[this.collectionName] || [];
  }

  private setItems(items: any[]) {
    globalStore[this.collectionName] = items;
  }

  find(filter: any = {}) {
    const items = [...this.getItems()];
    const chain = {
      sort: (sortObj: any) => {
        // Simple mock sort by createdAt desc
        items.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        return chain;
      },
      limit: (n: number) => {
        items.splice(n);
        return chain;
      },
      select: (fields: string) => {
        return chain;
      },
      lean: () => {
        return chain;
      },
      // If awaited directly or handled as thenable
      then: (resolve: any) => {
        resolve(items);
        return chain;
      }
    };
    return chain;
  }

  async findOne(query: { email?: string }) {
    const items = this.getItems();
    const email = query?.email;
    if (email) {
      return items.find((item: any) => item.email === email.toLowerCase()) || null;
    }
    return null;
  }

  async create(data: any) {
    const items = this.getItems();
    const newItem = {
      _id: Math.random().toString(36).substring(2, 11),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    // Mock save method for document
    (newItem as any).save = async () => {
      const idx = items.findIndex((i: any) => i._id === newItem._id);
      if (idx !== -1) {
        items[idx] = { ...newItem, updatedAt: new Date() };
      }
      return newItem;
    };
    items.push(newItem);
    this.setItems(items);
    return newItem;
  }

  async countDocuments(filter: any = {}) {
    const items = this.getItems();
    if (filter.status === 'active') {
      return items.filter((item: any) => item.status === 'active').length;
    }
    if (filter.createdAt && filter.createdAt.$gte) {
      const cutoff = new Date(filter.createdAt.$gte).getTime();
      return items.filter((item: any) => new Date(item.createdAt).getTime() >= cutoff).length;
    }
    return items.length;
  }

  async findOneAndUpdate(query: { email?: string }, update: any, options?: any) {
    const items = this.getItems();
    const email = query?.email;
    if (email) {
      const itemIdx = items.findIndex((i: any) => i.email === email.toLowerCase());
      if (itemIdx !== -1) {
        const item = items[itemIdx];
        const updated = { ...item, ...update, updatedAt: new Date() };
        items[itemIdx] = updated;
        this.setItems(items);
        return updated;
      }
    }
    return null;
  }

  async findByIdAndUpdate(id: string, update: any, options?: any) {
    const items = this.getItems();
    const itemIdx = items.findIndex((i: any) => i._id === id);
    if (itemIdx !== -1) {
      const item = items[itemIdx];
      const updated = { ...item, ...update, updatedAt: new Date() };
      items[itemIdx] = updated;
      this.setItems(items);
      return updated;
    }
    return null;
  }
}

export const ContactModel = new MockModel('contacts') as any;
export const NewsletterSubscriberModel = new MockModel('subscribers') as any;
export const NewsletterCampaignModel = new MockModel('campaigns') as any;
export const PopupModel = new MockModel('popups') as any;

const mongooseMock = {
  connect: async () => true,
  Schema: class {},
  model: (name: string, schema: any) => new MockModel(name.toLowerCase() as any),
  models: {}
};

export default mongooseMock;
