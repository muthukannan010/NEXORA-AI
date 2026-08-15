// assets/js/router.js

export class Router {
    constructor(rootElementId) {
        this.routes = {};
        this.rootElement = document.getElementById(rootElementId);
        
        // Listen to popstate event (back/forward browser buttons)
        window.addEventListener('popstate', () => {
            this.loadRoute(window.location.pathname);
        });

        // Intercept global link clicks
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('a[data-link]') || e.target.closest('a[data-link]')) {
                e.preventDefault();
                const link = e.target.matches('a[data-link]') ? e.target : e.target.closest('a[data-link]');
                const href = link.getAttribute('href');
                this.navigateTo(href);
            }
        });
    }

    addRoute(path, componentFunction, initFunction = null) {
        this.routes[path] = {
            render: componentFunction,
            init: initFunction
        };
    }

    navigateTo(path) {
        window.history.pushState(null, null, path);
        this.loadRoute(path);
    }

    loadRoute(path) {
        let matchedRoute = null;
        let routeParams = {};

        // Find matching route
        for (const [routePath, route] of Object.entries(this.routes)) {
            // Convert routePath to Regex (e.g., /result/:id -> ^\/result\/([^/]+)$)
            const regexPath = routePath.replace(/:\w+/g, '([^/]+)');
            const regex = new RegExp(`^${regexPath}$`);
            const match = path.match(regex);

            if (match) {
                matchedRoute = route;
                // Extract params
                const paramNames = (routePath.match(/:\w+/g) || []).map(n => n.substring(1));
                paramNames.forEach((name, index) => {
                    routeParams[name] = match[index + 1];
                });
                break;
            }
        }

        // Fallback to 404 or home if not found
        const route = matchedRoute || this.routes['/'];
        
        if (route) {
            // Render the HTML string from the component
            const html = route.render(routeParams);
            
            // For a full SPA, we might have a specific container for views inside #app
            // Assuming #router-view exists inside #app
            const viewContainer = document.getElementById('router-view');
            if (viewContainer) {
                viewContainer.innerHTML = html;
            } else {
                this.rootElement.innerHTML = html;
            }

            // Execute initialization logic if provided (e.g. attaching event listeners)
            if (route.init && typeof route.init === 'function') {
                // Short timeout to ensure DOM is updated before binding events
                setTimeout(() => {
                    route.init(routeParams);
                    this.updateNavLinks(path);
                }, 0);
            }
            
            window.scrollTo(0, 0);
        } else {
            this.rootElement.innerHTML = `<div class="container section text-center"><h2>404 - Page Not Found</h2></div>`;
        }
    }

    updateNavLinks(currentPath) {
        const links = document.querySelectorAll('a[data-link]');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
}
