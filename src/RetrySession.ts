import { RetryCallback, TimeoutId } from './types';

/**
 * @template R = any
 */
class RetrySession<R = any> {
    /**
     * @type {TimeoutId}
     * @private
     */
    private _retryTimer: TimeoutId;

    /**
     * @type {TimeoutId}
     * @private
     */
    private _limitTimer: TimeoutId;

    /**
     * @type {RetryCallback<R>}
     * @private
     */
    private _callback: RetryCallback<R>;

    /**
     * @type {number}
     * @private
     */
    private readonly _retryPeriod: number;

    /**
     * @type {number}
     * @private
     */
    private readonly _timeLimit: number | undefined;

    /**
     * @type {boolean}
     * @public
     */
    public waitFirst: boolean = false;

    /**
     * Promise resolves with result of callback or rejects when timeLimit is reached.
     *
     * @param {RetryCallback<R>} callback - If it resolves, resolve this promise with the result. If it rejects, retry.
     * @param {number} retryPeriod - Time to retry in milliseconds
     * @param {number} [timeLimit=0] - Time to give up in milliseconds. falsy to never timeout
     * @param {boolean} [waitFirst=false] - Whether to wait retryPeriod before trying the first time
     */
    constructor(
        callback: RetryCallback<R>,
        retryPeriod: number,
        timeLimit?: number,
        waitFirst?: boolean,
    ) {
        this._retryTimer = undefined;
        this._limitTimer = undefined;
        this._callback = callback;
        this._retryPeriod = retryPeriod;
        this._timeLimit = timeLimit;
        this.waitFirst = !!waitFirst;
    }

    /**
     * @returns {Promise<R>}
     */
    start(): Promise<R> {
        this.cancel();

        return new Promise((resolve, reject): void => {
            if (this._timeLimit) {
                this._limitTimer = setTimeout((): void => {
                    clearTimeout(this._retryTimer);
                    reject(new Error(`Met time limit of ${this._timeLimit} ms`));
                }, this._timeLimit);
            }

            const iter = (): void => {
                if (this.waitFirst) {
                    this.waitFirst = false;
                    this._retryTimer = setTimeout(iter, this._retryPeriod);
                } else {
                    Promise.resolve(this._callback())
                        .then((result: R): void => {
                            clearTimeout(this._limitTimer);
                            resolve(result);
                        })
                        .catch(() => this._retryTimer = setTimeout(iter, this._retryPeriod));
                }
            };

            iter();
        });
    }

    /**
     * @returns {void}
     */
    cancel(): void {
        clearTimeout(this._retryTimer);
        clearTimeout(this._limitTimer);
    }
}

export default RetrySession;
