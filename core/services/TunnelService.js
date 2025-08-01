/**

 * @author Starass

 * @module TunnelService

 * @description This module handles communication between different parts of the application.

 */

class TunnelService {

  /**
   * Creates an instance of TunnelService.
   */
  constructor() {
    this.channels = {}
  }

  /**
   * Listens for messages on a specific channel.
   * @param {string} channel - The channel to listen on.
   * @param {function} handler - The function to call when a message is received.
   */
  listen(channel, handler) {
    if (!this.channels[channel]) {
      this.channels[channel] = []
    }
    this.channels[channel].push(handler)
  }

  /**
   * Sends a message on a specific channel.
   * @param {string} channel - The channel to send the message on.
   * @param {any} payload - The message payload.
   */
  send(channel, payload) {
    const handlers = this.channels[channel] || []
    for (const handler of handlers) {
      handler(payload)
    }
  }

  /**
   * Broadcasts a message to all channels.
   * @param {any} payload - The message payload.
   */
  broadcast(payload) {
    for (const channel in this.channels) {
      this.send(channel, payload)
    }
  }

  /**
   * Closes a specific channel.
   * @param {string} channel - The channel to close.
   */
  close(channel) {
    delete this.channels[channel]
  }
}

module.exports = TunnelService