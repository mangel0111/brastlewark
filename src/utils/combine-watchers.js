export const isValidType = type =>
	`${type}`.match(/[^a-zA-Z0-9_@]/g) === null && !['undefined', 'null'].includes(type);
export const isValidWorker = (worker) => ['function'].includes(typeof worker);
export const areValidWorkers = (workers) => workers.every(isValidWorker);

export default (...watchers) => {
	const stack = {};
	for (let i = 0; i < watchers.length; i++) {
		const bundle = watchers[i];
		for (const type of Object.keys(bundle)) {
			if (!isValidType(type)) {
				throw new Error(`combine-watchers[${i}] invalid action type: ${type}`);
			} else if (Array.isArray(bundle[type])) {
				if (!areValidWorkers(bundle[type])) {
					throw new Error(`combine-watchers[${i}] some of the workers is not a Function: ${type}`);
				}
			} else if (!isValidWorker(bundle[type])) {
				throw new Error(`combine-watchers[${i}] worker is not a Function: ${type}`);
			}
			if (!stack[type]) stack[type] = bundle[type];
			else {
				const currentWatcher = Array.isArray(stack[type]) ? stack[type] : [stack[type]];
				let toCombine;
				if (Array.isArray(bundle[type])) {
					toCombine = bundle[type].filter(w => !currentWatcher.includes(w));
					toCombine = toCombine.length ? toCombine : undefined;
				} else {
					toCombine = !currentWatcher.includes(bundle[type]) ? bundle[type] : undefined;
				}
				if (toCombine) {
					stack[type] = Array.isArray(stack[type]) ? stack[type] : [stack[type]];
					stack[type] = stack[type].concat(toCombine);
				}
			}
		}
	}
	return stack;
};
