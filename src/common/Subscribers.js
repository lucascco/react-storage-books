import PubSub from 'pubsub-js'
import { TOPIC_REGISTERS } from './topicRegisters';

export default class Subscribers {
	constructor() {
		this.functionsPubSub = {
			subscribe: data => {
				PubSub.subscribe(data.topic, data.func);
				return data.func;
			},
			unsubscribe: data => PubSub.unsubscribe(data.func),
			publish: data => PubSub.publish(data.topic, data.data),
		}
	}

	onUpdateList(method, func, data) {
		return this.onPubSub(TOPIC_REGISTERS.UP_LIST, method, func, data);
	}

	onClearForm(method, func, data) {
		return this.onPubSub(TOPIC_REGISTERS.CLEAR_FORM, method, func, data);
	}

	onFormError(method, func, data) {
		return this.onPubSub(TOPIC_REGISTERS.ERROR_FORM, method, func, data);
	}

	onPubSub(topic, method, func, data) {
		return this.functionsPubSub[method]({ topic, func, data });
	}
}
