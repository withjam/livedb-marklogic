var marklogic = require('marklogic');
var Q = require('q');

/**
 * Creates a connection to MarkLogic that supports LiveDB
 * @class
 */
function LiveML(opts) {
  this.options = opts || {};
  this.db = marklogic.createDatabaseClient(opts);

  // need to support both DB fetches and and OP log via ML

}

/**
 *  Class the represents data as a SnapShot that LiveDB can use
 *  @class
 */
function MLSnapShot(docData) {
  var doc = docData || {};
  var type = doc._type;
  var v = doc._v;
  var docName = doc._id;
  var data = doc._data;
  var meta = doc._m;

  this.data = data;
  this.type = type;
  this.v = v;
  this.docName = docName;
  this.m = meta;
}

/**
 *  Close the underlying database connection if not already closed.
 *
 *  @param (function) callback callback function called as callback(error)
 */
LiveML.prototype.close = function(callback) {
  if (this.closed) {
    callback('connection already closed');
    return;
  }
  var self = this;
  this.db.close(function(err) {
    if (!err) {
      self.closed = true;
    }
    callback.apply(self,arguments);
  });
};

/**
 *  This is a LiveDB integration point.  Essentially finds a document in MarkLogic and passes it, as a SnapShot instance, to the callback.
 *
 *  @param {string} cName the collection name
 *  @param {string} docName the identified of the requested document within the collection
 *  @param {function} callback the callback function once the document has been found called as callback(err,snapshotDoc)
 */
LiveML.prototype.getSnapshot = function(cName, docName, callback) {

  //query MarkLogic
  // pass the data to callback(err, )
  callback(null, new MLSnapShot());

};

/**
 *  An optional LiveDB function that fetches multiple snapshots for better performance. The request object is a hashmap of collection names to an array of document names.  The response is returned as an hash of collection names with an array of matched MLSnapShot objects.
 *
 *  @param {object} requests a hashmap of collection names to document names that should be fetched.  For example { collection1: ['doca','docb'] }
 *  @param {function} callback the callback function invoked as callback(err, resultsObject);
 */
LiveML.prototype.getBulkSnapshot = function(requests, callback) {
  callback(null, {});
};

/**
 *  Query API is optional but ML is good at queries so let's do it.
 *
 */
LiveML.prototype.query = function(liveDb, index, query, options, callback) {

};

// Queries can avoid a lot of CPU load by querying individual documents instead
// of the whole collection.
// TODO:  what does this mean?
LiveML.prototype.queryNeedsPollMode = function(index, query) { return false; };


/**
 *  Not sure what this does either
 */
LiveML.prototype.queryDoc = function(liveDb, index, cName, docName, query, callback) {

};

/**
 *  LiveDB uses an OP log to maintain the order of data changes so that it can be kept in sync properly  (ShareJS)
 *
 *  @param {string} cName the collection name
 *  @param {string} docName the document name
 *  @param {object} opData the data for this OP log entry
 *  @param {function} callback function invoked as callback(err);
 */
LiveML.prototype.writeOp = function(cName, docName, opData, callback) {

};

/**
 *  Gets the current version of the document.
 *
 *  @param {string} cName the collection name
 *  @param {string} docName the document name
 *  @param {function} callback the callback function, invoked as callback(err, version);
 */
LiveML.prototype.getVersion = function(cName, docName, callback) {

};

/**
 *  Get the operations that occurred between the start and end range - containing start but not end.
 *
 *  @param {string} cName the collection name
 *  @param {string} docName the document name
 *  @param {number} start the start of the range - inclusive
 *  @param {number} end the end of the range - noninclusive
 *  @param {function} callback the callback function invoked as callback(err, array)
 */
LiveML.prototype.getOps = function(cName, docName, start, end, callback) {

};

/**
 *  Writes a snapshot to the database.
 *
 *  @param {string} cName the collection name
 *  @param {string} docName the document name for this snapshot
 *  @param {MLSnapShot} snapshot the MLSnapShot to write
 *  @param {function} callback invoked as callback(err);
 */
LiveML.prototype.writeSnapshot = function(cName, docName, snapshot, callback) {

};


/**
 *  Create and return a MarkLogic connection.  Use this to create a db instance for livedb, such as:
 *    var marklogic = require('livedb-marklogic');
 *    livedb.client({ db: marklogic.connect(opts) });
 *
 * @param {object} opts MarkLogic connection options
 * @returns {LiveML}
 */
exports.connect = function(opts) {
  return new LiveML(opts);
};