export const init = (on_url_change) => {
	on_url_change(window.location.href);

	document.addEventListener("click", (e) => {
		let target = e.target;

		while (target) {
			if (target === document.body) return;
			if (target.tagName === "A") {
				const url = new URL(target.href);
				if (url.origin !== window.location.origin) return;

				e.preventDefault();
				window.requestAnimationFrame(() => {
					window.history.pushState({}, "", url.href);

					if (url.pathname === window.location.pathname && url.hash) {
						document.querySelector(url.hash)?.scrollIntoView();
					} else {
						window.scrollTo(0, 0);
					}
				});

				return void on_url_change(url.href);
			}

			target = target.parentNode;
		}
	});

	// This lets us listen to the back and forward buttons in the browser
	// and trigger our app's routing.
	window.addEventListener("popstate", () => {
		on_url_change(window.location.href);
	});
}
