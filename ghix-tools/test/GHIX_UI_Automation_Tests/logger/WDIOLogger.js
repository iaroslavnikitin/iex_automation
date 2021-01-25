class WDIOLogger
{

log(msg) {
  try {
    console.log(msg);
    browser.testLogs.push(""+new Date(Date.now()).toString('yyyy-MM-dd hh:mm:ss')+":"+msg);
    return browser.scenarioLogs.push(""+new Date(Date.now()).toString('yyyy-MM-dd hh:mm:ss')+":"+msg);
  } catch (err) {
    throw new Error("Function needs to be attached to browser object: ${err}");
  }
}
}

//export default new WDIOLogger();
module.exports = new WDIOLogger();