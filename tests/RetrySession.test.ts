import 'regenerator-runtime/runtime';

import RetrySession from '@js/RetrySession';

const flushPromises = async () => {
    await Promise.resolve();
    await Promise.resolve();
};

beforeEach(() => {
    jest.useFakeTimers();
});

test('retry 5 times without time limit', async () => {
    // region Arrange
    const retryPeriod = 1000;
    let remainingTries = 4;

    const callback = jest.fn(async () => {
        if (remainingTries--) {
            throw 'try again';
        }
        return 'success';
    });
    // endregion

    // region Act
    const promise = (new RetrySession(
        callback,
        retryPeriod
    )).start();

    while (remainingTries + 1) {
        await flushPromises();
        jest.advanceTimersByTime(retryPeriod);
    }
    // endregion

    // region Assert
    await promise.then(() => expect(callback).toHaveBeenCalledTimes(5));
    await expect(promise).resolves.toEqual('success');
    // endregion
});

test('reach 5s time limit before 10, 1s retries', () => {
    // region Arrange
    let remainingTries = 9;

    const callback = jest.fn(async () => {
        if (remainingTries--) {
            throw 'try again';
        }
        return 'success';
    });
    // endregion

    // region Act
    const promise = (new RetrySession(
        callback,
        1000,
        5000
    )).start();

    jest.runAllTimers();
    // endregion

    // region Assert
    return expect(promise).rejects.toThrow();
    // endregion
});
