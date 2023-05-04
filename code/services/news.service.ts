import * as Models from "Models";

import { Context, ServiceSchema } from "moleculer";
import {
	apiResponseError,
	apiResponseNotFoundError,
	apiResponseValidationError,
} from "Utils/response";

import { Action } from "moleculer-decorators";
import Hooks from "Hooks";
import { findAndCountAll } from "Utils/model";

export default class NewsService implements ServiceSchema {
	public name = "news";
	public hooks = Hooks();


	@Action({
		rest: "GET /",
	  })
	  public async list(ctx: Context<any, any>): Promise<any> {
		try {
		  const News = Models.NewsModel(ctx);
		  const news = await News.findAll();
		  return news;
		} catch (error) {
		  throw apiResponseError(error);
		}
	  }
	@Action({
		rest: "POST /",
		params: {
			image_sm: "string",
			image_lg: "string",
			title: "string",
			slug: "string",
			description: "string",
			body: "string",
			status:"string",
		},
	})
	public async create(ctx: Context<any, any>): Promise<any> {
		const { image_sm,image_lg, title, slug, description, body,status } = ctx.params;

		try {
			const News = Models.NewsModel(ctx);
			const news = await News.create({
			  image_sm,
			  image_lg,
			  title,
			  slug,
			  description,
			  body,
			  status,
			});

			return news;
		  } catch (error) {
			throw apiResponseError(error);
		  }

	}

	@Action({
		rest: "PUT /:id",
		params: {
			id: "string",
			image_sm: "string",
			image_lg: "string",
			title: "string",
			slug: "string",
			description: "string",
			body: "string",
			status:"string",
		},
	})
	public async update(ctx: Context<any, any>): Promise<any> {
		const { id } = ctx.params;

		const News = Models.NewsModel(ctx);
		const news = await News.findByPk(id);

		if (!news) {
			throw apiResponseNotFoundError("News not fond");
		}

		try {
			await news.update(ctx.params);

			return news;
		} catch (error) {
			throw apiResponseError(error);
		}
	}

}

module.exports = new NewsService();
