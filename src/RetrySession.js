export default class RetrySession {
    /**
     * @callback RetryCallback
     * @return {Promise<void>}
     */

    /**
     * @private
     * @type {number}
     */
    _retryTimer = null;

    /**
     * @private
     * @type {number}
     */
    _limitTimer = null;

    /**
     * @private
     * @type {RetryCallback}
     */
    _callback = null;

    /**
     * @private
     * @type {number}
     */
    _retryPeriod = null;

    /**
     * @private
     * @type {number}
     */
    _timeLimit = null;

    /**
     * @type {boolean}
     */
    waitFirst = false;

    /**
     * Promise resolves with result of callback or rejects when timeLimit is reached.
     * @param {RetryCallback} callback - If it resolves, resolve this promise with the result. If it rejects, retry.
     * @param {number} retryPeriod - Time to retry in milliseconds
     * @param {number} [timeLimit] - Time to give up in milliseconds. falsy to never timeout
     * @param {boolean} [waitFirst] - Whether to wait retryPeriod before trying the first time
     */
    constructor(
        callback,
        retryPeriod,
        timeLimit,
        waitFirst
    ) {
        this._callback = callback;
        this._retryPeriod = retryPeriod;
        this._timeLimit = timeLimit;
        this.waitFirst = !!waitFirst;
    }

    start() {
        this.cancel();

        return new Promise((resolve, reject) => {
            if (this._timeLimit) {
                this._limitTimer = setTimeout(() => {
                    clearTimeout(this._retryTimer);
                    reject(new Error(`Met time limit of ${this._timeLimit} ms`));
                }, this._timeLimit);
            }

            const iter = () => {
                if (this.waitFirst) {
                    this.waitFirst = false;
                    this._retryTimer = setTimeout(iter, this._retryPeriod);
                } else {
                    this._callback()
                        .then(result => {
                            clearTimeout(this._limitTimer);
                            resolve(result);
                        })
                        .catch(() => this._retryTimer = setTimeout(iter, this._retryPeriod));
                }
            };

            iter();
        });
    }

    cancel() {
        clearTimeout(this._retryTimer);
        clearTimeout(this._limitTimer);
    }
}

