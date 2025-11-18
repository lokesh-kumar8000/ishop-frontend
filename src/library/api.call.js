import { axioIsnstance } from "./helper";

const getCategory = async (id = null, limit = null) => {
  try {
    // console.log(limit, "limit");
    let api = "category";
    if (id != null) api += `/${id}`;
    const response = await axioIsnstance.get(api, { params: { limit } });
    if (response.data.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (
  id = null,
  categorySlug = null,
  brandSlug = null,
  colorSlug = null,
  min = null,
  max = null,
  limit = null,
  currentPage = null
) => {
  try {
    let api = "product";
    if (id != null) api += `/${id}`;
    const query = new URLSearchParams();
    if (categorySlug) query.append("categorySlug", categorySlug);
    if (brandSlug) query.append("brandSlug", brandSlug);
    if (colorSlug) query.append("colorSlug", colorSlug);
    if (min) query.append("min", min);
    if (max) query.append("max", max);
    if (limit) query.append("limit", limit);
    if (currentPage) query.append("currentPage", currentPage);
    const response = await axioIsnstance.get(`${api}?${query.toString()}`);
    if (response.data.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const getBrand = async (id = null, limit = null) => {
  try {
    let api = "brand";
    if (id != null) api += `/${id}`;
    const response = await axioIsnstance.get(api, { params: { limit } });
    if (response.data.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const getcolor = async (id = null) => {
  try {
    let api = "color";
    if (id != null) api += `/${id}`;
    const response = await axioIsnstance.get(api);
    if (response.data.success) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getCategory, getcolor, getBrand, getProducts };
