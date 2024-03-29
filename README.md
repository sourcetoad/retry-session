# RetrySession
A simple-but-flexible utility for executing tasks on intervals and resolving with promises.

## Install (NPM)
Add package to `package.json`
```shell
yarn add @sourcetoad/retry-session
```

## Install (GPR)
Create `.npmrc` next to `package.json`
```text
@sourcetoad:registry=https://npm.pkg.github.com
```

Add package to `package.json`
```shell
yarn add @sourcetoad/retry-session
```

### Import
```js
import RetrySession from 'retry-session';
```

## Usage

### Waiting
Retry until successful.

```js
const getProperty = async () => {
    if (window.aProperty) {
        return window.aProperty;
    }

    throw new Error('Property is not yet available');
};

const propertyRetrySession = new RetrySession(
    getProperty, // Async callback
    1000, // Poll every second
    5000, // Timeout after 5 seconds (optional)
    false // Execute callback immediately on start
);

// Once it exists, the value of window.aProperty is assigned to result
const result = await propertyRetrySession.start();
```

### Polling
Repeat until failure.

Assuming an async function `fetchApiData` that resolves with the data on success and rejects on failure.

We construct a promise explicitly to invert these results--so a successful API request causes
our wrapper function to reject, and the RetrySession to retry.

The difference from a simple timeout or interval is that upon API failure, the session resolves so it can be handled.
The user doesn't have to manage timers, and cancel them at the right times.

```js
const primaryPollRequest = () => new Promise((resolve, reject) => {
    this.fetchApiData()
        .then(data => {
            // Do something with the data
            reject(/* An API request succeeded; retry */);
        })
        .catch(() => {
            resolve(); // An API request failed; end this retry session
        });
});

const primaryPollSession = new RetrySession(
    primaryPollRequest,
    300000 // Refresh data every 5 minutes
);

primaryPollSession.start().then(() => /* An API request failed */);

/*
 * An ongoing session can be canceled.
 * It can be restarted. The timeout (if any) will reset.
 */
primaryPollSession.cancel();
```

### Cascading
Repeat unless failure, then retry faster until success.
```js
const primaryPollRequest = () => new Promise((resolve, reject) => {
    this.fetchApiData()
        .then(data => {
            // Do something with the data
            reject(/* An API request succeeded; retry */);
        })
        .catch(() => {
            resolve(); // An API request failed; end this retry session
        });
});

const primaryPollSession = new RetrySession(
    primaryPollRequest,
    300000, // Refresh data every 5 minutes
    null,
    true
);

const secondaryPollSession = new RetrySession(
    this.fetchApiData, // We don't need to wrap this one in our own promise
    30000, // Retry every 30 seconds until we get a success
    null,
    true
);

/*
 * Poll on primary interval; if all requests fail, poll on secondary interval
 * If secondary interval succeeds, revert to primary interval
 */
const startPrimaryPoll = () => {
    primaryPollSession.start()
        .then(() => {
            // Failed; switch to secondary interval
            secondaryPollSession.start()
                .then(() => {
                    // Recovered; back to primary poll interval
                    startPrimaryPoll();
                });
        });
};

startPrimaryPoll();
```

### Configuration
The following parameters are available to configure the session on instantiation:
1. **callback** _async function_ - If it resolves, resolve this promise with the result. If it rejects, retry.
1. **retryPeriod** _number_ - Time to retry in milliseconds
1. **timeLimit** _bool (optional)_ - Time to give up in milliseconds. falsy to never timeout
1. **waitFirst** _bool (optional)_ - Whether to wait retryPeriod before trying the first time

An instance of `RetrySession` has a public property `waitFirst` which can be modified at any time.

### Creating a release
* Update `package.json` with `"version": "X.Y.Z"`
* Create branch `release-X.Y.Z`
* Commit as `build: version X.Y.Z tagged`
* Tag like `git tag -a vX.Y.Z -m "updated to version vX.Y.Z"`
