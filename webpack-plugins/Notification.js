const notifier = require('node-notifier');
// import notifier from "node-notifier";

class Notification {
    constructor(options) {
        this.options = options
    }
    
    apply(compiler) {
        console.log(`Options : ${this.options}`);
        compiler.hooks.done.tap("notification", (stats) => {
            let time = ((stats.endTime - stats.startTime)/1000).toFixed(2);
            notifier.notify({
                title: "hello mamad",
                message: `Webpack is done in ${time}`
            })
        })
    }
};

module.exports = Notification;