define(['framework/ServiceCollection'],
function(ServiceCollection) {
	return {
		initialize: function(registry) {
			registry.register({
				interfaces: 'strut.Glass',
			}, service);
		}
	};
});