// assets/js/router.js

export class Router {
    /**
     * @param {string} rootElementId
     * @param {string[]} protectedRoutes - Exact paths that require auth
     * @param {RegExp[]} protectedPatterns - Regex patterns for dynamic protected routes
     */
    constructor(rootElementId, protectedRoutes = [], protectedPatterns = []) {
        this.routes = {};
        this.rootElement = document.getElementById(rootElementId);
        this.protectedRoutes = protectedRoutes;
        this.protectedPatterns = protectedPatterns;

        // Listen to popstate (back/forward browser buttons)
        window.addEventListener('popstate', () => {
            this.loadRoute(window.location.pathname);
        });

        // Intercept data-link clicks globally
        document.body.addEventListener('click', (e) => {
            const link = e.target.matches('a[data-link]') ? e.target : e.target.closest('a[data-link]');
            if (link) {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) this.navigateTo(href);
            }
        });
    }

    /**
     * @param {string} path
     * @param {function} componentFunction
     * @param {function|null} initFunction
     * @param {boolean} requiresAuth
     */
    addRoute(path, componentFunction, initFunction = null, requiresAuth = false) {
        this.routes[path] = {
            render: componentFunction,
            init: initFunction,
            requiresAuth
        };
    }

    navigateTo(path) {
        window.history.pushState(null, null, path);
        this.loadRoute(path);
    }

    /**
     * Check if a path requires authentication.
     * @param {string} path
     * @returns {boolean}
     */
    _isProtected(path) {
        if (this.protectedRoutes.includes(path)) return true;
        return this.protectedPatterns.some(p => p.test(path));
    }

    /**
     * Check if the user is authenticated via state.
     * @returns {boolean}
     */
    _isAuthenticated() {
        // Dynamically import to avoid circular dependencies
        const { state } = window.__nexoraState || {};
        if (state) return !!state.get('currentUser');
        // Fallback: check sessionStorage for a token
        return false;
    }

    loadRoute(path) {
        let matchedRoute = null;
        let routeParams = {};

        // Match route
        for (const [routePath, route] of Object.entries(this.routes)) {
            const regexPath = routePath.replace(/:\w+/g, '([^/]+)');
            const regex = new RegExp(`^${regexPath}$`);
            const match = path.match(regex);

            if (match) {
                matchedRoute = route;
                const paramNames = (routePath.match(/:\w+/g) || []).map(n => n.substring(1));
                paramNames.forEach((name, i) => { routeParams[name] = match[i + 1]; });
                break;
            }
        }

        const route = matchedRoute || this.routes['/'];
        if (!route) {
            const container = document.getElementById('router-view') || this.rootElement;
            if (container) container.innerHTML = `
                <div class="container section text-center">
                    <h2>404 — Page Not Found</h2>
                    <p>The page you're looking for doesn't exist.</p>
                    <a href="/" data-link class="btn btn-primary" style="margin-top:16px;">Go Home</a>
                </div>`;
            return;
        }

        // ─── AUTH GUARD ──────────────────────────────────────────────────────
        if (route.requiresAuth || this._isProtected(path)) {
            // Import state lazily to check auth
            import('./state.js').then(({ state }) => {
                if (!state.get('currentUser')) {
                    // Store intended destination
                    sessionStorage.setItem('auth_redirect', path);
                    window.history.pushState(null, null, '/login');
                    this._render(this.routes['/login'], {});
                } else {
                    this._render(route, routeParams, path);
                }
            });
            return;
        }

        this._render(route, routeParams, path);
    }

    _render(route, routeParams, path = window.location.pathname) {
        const html = route.render(routeParams);
        const viewContainer = document.getElementById('router-view') || this.rootElement;
        if (viewContainer) {
            viewContainer.innerHTML = html;
        }

        if (route.init && typeof route.init === 'function') {
            setTimeout(() => {
                route.init(routeParams);
                this.updateNavLinks(path);
            }, 0);
        } else {
            this.updateNavLinks(path);
        }

        window.scrollTo(0, 0);
    }

    updateNavLinks(currentPath) {
        document.querySelectorAll('a[data-link]').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }
}
