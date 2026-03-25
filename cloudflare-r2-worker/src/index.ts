/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		const key = url.pathname.slice(1);

		// if the request method is PUT mean put image to the storage
		if (request.method === 'PUT') {
			await env.PORTFOLIO_OG.put(key, request.body);
			return new Response('OK', { status: 200 });
		}

		// Otherwise, get the image from the storage
		const object = await env.PORTFOLIO_OG.get(key);
		if (!object) {
			return new Response('Not Found', { status: 404 });
		}

		return new Response(object.body);
	},
} satisfies ExportedHandler<Env>;
