let chai         = require('chai');
let path         = require('path');
let localStorage = require('mock-local-storage');
let should       = chai.should();

let NGWordManager = require(path.join(__dirname, '..', 'zendesk-incident-protector.user.js'));

// define window after require user.js
global.window = {};
window.localStorage = global.localStorage;

describe('NGWordManager', () => {
  const localStorageKey = 'testLocalStorageKey';
  let ngWordManager;

  beforeEach(() => {
    ngWordManager = new NGWordManager(localStorageKey);
  });

  afterEach(() => {
    window.localStorage.clear();
    window.localStorage.itemInsertionCallback = null;
  });

  describe('#isConfigURLEmpty', () => {
    context('localStorage is empty', () => {
      it('should return true', () => {
        ngWordManager.isConfigURLEmpty().should.equal(true);
      });
    });
    context('localStorage exists', () => {
      before(() => {
        window.localStorage.setItem(localStorageKey, 'https://path/to/config.json');
      });

      it('should return false', () => {
        ngWordManager.isConfigURLEmpty().should.equal(false);
      });
    });
  });

  describe('#setConfigURL', () => {
    context('arg is URL', () => {
      it('should set arg to localStorage', () => {
        let arg = 'https://path/to/config.json';

        ngWordManager.setConfigURL(arg);
        window.localStorage.getItem(localStorageKey).should.equal(arg);
      });
    });

    context('arg is not URL', () => {
      it('does not set localStorage', () => {
        let arg = 'not url';

        ngWordManager.setConfigURL(arg);
        should.equal(window.localStorage.getItem(localStorageKey), null);
      });
    });
  });

  describe('#isValidConfigURL', () => {
    context('arg is URL', () => {
      it('should return true', () => {
        ngWordManager.isValidConfigURL('https://path/to/config.json').should.equal(true);
      });
    });

    context('arg is not URL', () => {
      it('should return false', () => {
        ngWordManager.isValidConfigURL('not url').should.equal(false);
      });
    });
  });
});
