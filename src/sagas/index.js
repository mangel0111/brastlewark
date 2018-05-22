import watchAccount from './account';
import watchEvent from './event';

export default {
	...watchAccount,
	...watchEvent
};
