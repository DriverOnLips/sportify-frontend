declare global {
	interface Window {
		YooMoneyPayoutWidget: any;
		Telegram: {
			WebApp: any; // Укажите здесь точную типизацию, если известно, какие свойства и методы присутствуют в WebApp
		};
	}
}

export {};
