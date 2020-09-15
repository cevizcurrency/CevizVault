const BademCurrency = require('nanocurrency')
// When the parent theard requires it, render the HTML
self.addEventListener("message", async (message) => {
  const { blockHash, workerIndex, workerCount, workThreshold } = message.data;
  const result = await BademCurrency.computeWork(blockHash, { workThreshold, workerIndex, workerCount });
  self.postMessage(result);
});