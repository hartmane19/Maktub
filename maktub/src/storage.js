// Maktub's data layer.
//
// In the chat prototype, the app talked to Claude's built-in artifact
// storage API (window.storage). That API only exists inside Claude's
// sandbox, so for the real, installed app we re-implement the same
// shape here using the browser's own localStorage — which persists
// permanently on your iPad, tied to this app only.
//
// Every screen (Tasks, Journal, Books) already calls window.storage.get/
// set/list, so nothing else in the app needs to change.

const PREFIX = "maktub:";

function nsKey(key) {
  return `${PREFIX}${key}`;
}

window.storage = {
  async get(key) {
    try {
      const raw = window.localStorage.getItem(nsKey(key));
      if (raw === null) return null;
      return { key, value: raw, shared: false };
    } catch (e) {
      console.error("storage.get failed", e);
      return null;
    }
  },

  async set(key, value) {
    try {
      window.localStorage.setItem(nsKey(key), value);
      return { key, value, shared: false };
    } catch (e) {
      console.error("storage.set failed", e);
      return null;
    }
  },

  async delete(key) {
    try {
      window.localStorage.removeItem(nsKey(key));
      return { key, deleted: true, shared: false };
    } catch (e) {
      console.error("storage.delete failed", e);
      return null;
    }
  },

  async list(prefix = "") {
    try {
      const keys = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const fullKey = window.localStorage.key(i);
        if (fullKey && fullKey.startsWith(PREFIX)) {
          const original = fullKey.slice(PREFIX.length);
          if (original.startsWith(prefix)) keys.push(original);
        }
      }
      return { keys, prefix, shared: false };
    } catch (e) {
      console.error("storage.list failed", e);
      return { keys: [], prefix, shared: false };
    }
  },
};
