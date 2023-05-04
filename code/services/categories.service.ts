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

export default class CategoryService implements ServiceSchema {
  public name = "categories";
  public hooks = Hooks();

  @Action({
    rest: "GET /",
  })
  public async list(ctx: Context<any, any>): Promise<any> {
    try {
      const Category = Models.CategoryModel(ctx);
      const categories = await Category.findAll();

      return categories;
    } catch (error) {
      throw apiResponseError(error);
    }
  }
  @Action({
    rest: "POST /",
    params: {
      name: "string",
      type: "string",
      image: "string",
    },
  })
  public async create(ctx: Context<any, any>): Promise<any> {
    const { name, type, image } = ctx.params;

    try {
      const Category = Models.CategoryModel(ctx);
      const category = await Category.create({
        name,
        type,
        image,
      });

      return category;
    } catch (error) {
      throw apiResponseError(error);
    }
  }

  @Action({
    rest: "PUT /:id",
    params: {
      id: "string",
      name: "string",
      type: "string",
      image: "string",
    },
  })
  public async update(ctx: Context<any, any>): Promise<any> {
    const { id } = ctx.params;
    const Category = Models.CategoryModel(ctx);
    const category = await Category.findByPk(id);

    if (!category) {
      throw apiResponseNotFoundError("Category not found!");
    }

    try {
      // Await category.update(ctx.params);
      // Await Category.update(ctx.params, { where: { id: id } });
      await category.update({
        name: ctx.params.name,
        type: ctx.params.type,
        image: ctx.params.image,
      });
      return category;
    } catch (error) {
      throw apiResponseError(error);
    }
  }


}


module.exports = new CategoryService();
