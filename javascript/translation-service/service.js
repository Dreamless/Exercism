/// <reference path="./global.d.ts" />
// @ts-check
//
// The lines above enable type checking for this file. Various IDEs interpret
// the @ts-check and reference directives. Together, they give you helpful
// autocompletion when implementing this exercise. You don't need to understand
// them in order to use it.
//
// In your own projects, files, and code, you can play with @ts-check as well.

export class TranslationService {
  /**
   * Creates a new service
   * @param {ExternalApi} api the original api
   */
  constructor(api) {
    this.api = api;
  }

  /**
   * Attempts to retrieve the translation for the given text.
   *
   * - Returns whichever translation can be retrieved, regardless the quality
   * - Forwards any error from the translation api
   *
   * @param {string} text
   * @returns {Promise<string>}
   */
  free(text) {
    return this.api.fetch(text).then(v => v.translation);
  }

  /**
   * Checking behaviour difference between handle error inside promise with/without reject
   * - Returns error msg
   *
   * @returns {Promise<error>}
   */

  tryPromiseReject() {
    let prom = new Promise(() => {
      throw new Error('error handler without reject');
    });

    return prom.then(v =>
      v
    );
  }

  tryPromiseReject2() {
    let prom = new Promise((resolve, reject) => {
      reject(new Error('error handler with reject'));
    });

    return prom.then(v =>
      v
    );
  }

  /**
   * Batch translates the given texts using the free service.
   *
   * - Resolves all the translations (in the same order), if they all succeed
   * - Rejects with the first error that is encountered
   * - Rejects with a BatchIsEmpty error if no texts are given
   *
   * @param {string[]} texts
   * @returns {Promise<string[]>}
   */
  batch(texts) {
    return Promise.all(texts.map(v => this.free(v))).then(v => {
      if (!v.length) {
        throw new BatchIsEmpty();
      }
      return v;
    });
  }

  /**
   * Requests the service for some text to be translated.
   *
   * Note: the request service is flaky, and it may take up to three times for
   *       it to accept the request.
   *
   * @param {string} text
   * @param {number} retries
   * @returns {Promise<void>}
   */
  request(text, retries = 2) {
    return new Promise((resolve, reject) => {
      const attemptRequest = (remainingRetries) => {
        this.api.request(text, (err) => {
          if (err) {
            if (remainingRetries === 0) {
              reject(err);
            } else {
              attemptRequest(remainingRetries - 1);
            }
          } else {
            resolve();
          }
        });
      }

      attemptRequest(retries);
    });
  }

  /**
   * Retrieves the translation for the given text
   *
   * - Rejects with an error if the quality can not be met
   * - Requests a translation if the translation is not available, then retries
   *
   * @param {string} text
   * @param {number} minimumQuality
   * @returns {Promise<string>}
   */
  premium(text, minimumQuality) {
    return this.api.fetch(text)
      .catch(() => {
        return this.request(text).then(() => this.api.fetch(text));
      })
      .then((v) => {
        if (v.quality < minimumQuality) {
          throw new QualityThresholdNotMet(text);
        }
        return v.translation;
      });
  }
}

/**
 * This error is used to indicate a translation was found, but its quality does
 * not meet a certain threshold. Do not change the name of this error.
 */
export class QualityThresholdNotMet extends Error {
  /**
   * @param {string} text
   */
  constructor(text) {
    super(
      `
The translation of ${text} does not meet the requested quality threshold.
    `.trim(),
    );

    this.text = text;
  }
}

/**
 * This error is used to indicate the batch service was called without any
 * texts to translate (it was empty). Do not change the name of this error.
 */
export class BatchIsEmpty extends Error {
  constructor() {
    super(
      `
Requested a batch translation, but there are no texts in the batch.
    `.trim(),
    );
  }
}
