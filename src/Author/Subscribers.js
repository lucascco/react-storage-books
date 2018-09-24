import PubSub from 'pubsub-js'
import { TOPIC_REGISTERS } from './topicRegisters';

export default class SubscribersAuthor {
	constructor() {
		this.functionsPubSub = {
			subscribe: data => PubSub.subscribe(data.topic, data.func),
			unsubscribe: data => PubSub.unsubscribe(data.func),
			publish: data => PubSub.publish(data.topic, data.data),
		}
	}

	onUpdateList(method, func, data) {
		this.onPubSub(method, { topic: TOPIC_REGISTERS.UP_LIST_AUTHORS, func: func, data: data });
	}

	onClearForm(method, func, data) {
		this.onPubSub(method, { topic: TOPIC_REGISTERS.CLEAR_FORM, func: func, data: data });
	}

	onFormError(method, func, data) {
		this.onPubSub(method, { topic: TOPIC_REGISTERS.ERROR_FORM, func: func, data: data });
	}

	onPubSub(method, data) {
		this.functionsPubSub[method](data);
	}
}
