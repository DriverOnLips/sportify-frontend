const useVibration = (pattern: number[] = [100]) => {
	return window.navigator.vibrate(pattern);
};

export default useVibration;
