// services/notifications/providers/push.ts
// Push notification adapter: OneSignal.
// Install: npm install onesignal-node
// Env: ONESIGNAL_APP_ID, ONESIGNAL_REST_API_KEY

export interface PushMessage {
  title:         string
  body:          string
  data?:         Record<string, string>   // deep link data
  imageUrl?:     string
  badgeCount?:   number
  sound?:        string
  priority?:     'normal' | 'high'
  ttl?:          number                   // seconds before expiry
  collapseKey?:  string                   // replaces previous notification with same key
}

export interface PushResult {
  success:       boolean
  notificationId:string
  recipients:    number
  provider:      string
  error?:        string
}

interface PushAdapter {
  name:          string
  send(userId: string, msg: PushMessage): Promise<PushResult>
  sendToSegment(segment: string, msg: PushMessage): Promise<PushResult>
  sendBulk(userIds: string[], msg: PushMessage): Promise<PushResult>
  subscribeUser(userId: string, deviceToken: string, platform: 'ios' | 'android' | 'web'): Promise<void>
  unsubscribeUser(userId: string): Promise<void>
}

// ─── OneSignal Adapter ────────────────────────────────────
export class OneSignalAdapter implements PushAdapter {
  name = 'onesignal'
  // private client: OneSignal.DefaultApi  // from onesignal-node

  constructor(private config: { appId: string; apiKey: string }) {
    // TODO:
    // import * as OneSignal from 'onesignal-node'
    // const configuration = OneSignal.createConfiguration({ appKey: config.apiKey })
    // this.client = new OneSignal.DefaultApi(configuration)
    console.log('[OneSignal] Adapter initialized')
  }

  async send(userId: string, msg: PushMessage): Promise<PushResult> {
    // TODO:
    // const notification = new OneSignal.Notification()
    // notification.app_id           = this.config.appId
    // notification.include_external_user_ids = [userId]
    // notification.channel_for_external_user_ids = 'push'
    // notification.headings         = { en: msg.title }
    // notification.contents         = { en: msg.body }
    // notification.data             = msg.data
    // notification.big_picture      = msg.imageUrl
    // notification.priority         = msg.priority === 'high' ? 10 : 5
    // notification.ttl              = msg.ttl
    // const response = await this.client.createNotification(notification)
    // return { success: true, notificationId: response.id, recipients: response.recipients, provider: this.name }
    throw new Error('[OneSignal] send: not yet integrated. npm install onesignal-node')
  }

  async sendToSegment(segment: string, msg: PushMessage): Promise<PushResult> {
    // Segments: 'Subscribed Users', 'Active Users', 'Gold Members', etc.
    // TODO: notification.included_segments = [segment]
    throw new Error('[OneSignal] sendToSegment: not yet integrated.')
  }

  async sendBulk(userIds: string[], msg: PushMessage): Promise<PushResult> {
    // TODO: notification.include_external_user_ids = userIds
    throw new Error('[OneSignal] sendBulk: not yet integrated.')
  }

  async subscribeUser(userId: string, deviceToken: string, platform: 'ios' | 'android' | 'web'): Promise<void> {
    // TODO: Create OneSignal player (device) entry
    throw new Error('[OneSignal] subscribeUser: not yet integrated.')
  }

  async unsubscribeUser(userId: string): Promise<void> {
    // TODO: DELETE /players/{player_id}
    throw new Error('[OneSignal] unsubscribeUser: not yet integrated.')
  }
}

export function createPushAdapter(): PushAdapter {
  switch (process.env.PUSH_PROVIDER) {
    case 'onesignal': return new OneSignalAdapter({
      appId:  process.env.ONESIGNAL_APP_ID       ?? '',
      apiKey: process.env.ONESIGNAL_REST_API_KEY  ?? '',
    })
    default: return new OneSignalAdapter({ appId: 'mock', apiKey: 'mock' })
  }
}
