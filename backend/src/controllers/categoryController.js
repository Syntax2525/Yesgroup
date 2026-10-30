import prisma from "../config/database.js";

const MAX_NAME_LENGTH = 191;
const MAX_DESCRIPTION_LENGTH = 65535;

const isPlainObject = (value) =>
    value !== null && typeof value === "object" && !Array.isArray(value);

const parsePositiveId = (value) => {
    if (typeof value !== "string" && typeof value !== "number") {
        return null;
    }

    const stringValue = String(value).trim();

    if (!/^[1-9]\d*$/.test(stringValue)) {
        return null;
    }

    const id = Number(stringValue);

    return Number.isSafeInteger(id) && id <= 2147483647 ? id : null;
};

const parseRequiredString = (value, field, label, maxLength, errors) => {
    if (typeof value !== "string" || value.trim() === "") {
        errors.push({ field, message: `${label} is required` });
        return undefined;
    }

    const trimmed = value.trim();

    if (trimmed.length > maxLength) {
        errors.push({
            field,
            message: `${label} must not exceed ${maxLength} characters`
        });
        return undefined;
    }

    return trimmed;
};

const parseOptionalString = (value, field, label, maxLength, errors) => {
    if (value === undefined) {
        return undefined;
    }

    if (value === null) {
        return null;
    }

    if (typeof value !== "string") {
        errors.push({ field, message: `${label} must be a string or null` });
        return undefined;
    }

    const trimmed = value.trim();

    if (trimmed.length > maxLength) {
        errors.push({
            field,
            message: `${label} must not exceed ${maxLength} characters`
        });
        return undefined;
    }

    return trimmed === "" ? null : trimmed;
};

const validateCategoryPayload = (body, { partial = false } = {}) => {
    if (!isPlainObject(body)) {
        return {
            data: {},
            errors: [
                {
                    field: "body",
                    message: "Request body must be a JSON object"
                }
            ]
        };
    }

    const errors = [];
    const data = {};

    if (!partial || body.nameEn !== undefined) {
        const nameEn = parseRequiredString(
            body.nameEn,
            "nameEn",
            "English name",
            MAX_NAME_LENGTH,
            errors
        );
        if (nameEn !== undefined) data.nameEn = nameEn;
    }

    if (!partial || body.nameSw !== undefined) {
        const nameSw = parseRequiredString(
            body.nameSw,
            "nameSw",
            "Swahili name",
            MAX_NAME_LENGTH,
            errors
        );
        if (nameSw !== undefined) data.nameSw = nameSw;
    }

    if (!partial || body.descriptionEn !== undefined) {
        const descriptionEn = parseOptionalString(
            body.descriptionEn,
            "descriptionEn",
            "English description",
            MAX_DESCRIPTION_LENGTH,
            errors
        );
        if (descriptionEn !== undefined) data.descriptionEn = descriptionEn;
    }

    if (!partial || body.descriptionSw !== undefined) {
        const descriptionSw = parseOptionalString(
            body.descriptionSw,
            "descriptionSw",
            "Swahili description",
            MAX_DESCRIPTION_LENGTH,
            errors
        );
        if (descriptionSw !== undefined) data.descriptionSw = descriptionSw;
    }

    if (partial && errors.length === 0 && Object.keys(data).length === 0) {
        errors.push({
            field: "body",
            message: "At least one valid field must be provided for update"
        });
    }

    return { data, errors };
};

const serializeProduct = (product) => ({
    ...product,
    price: Number(product.price)
});

const serializeCategory = (category) => {
    const { _count, products, ...categoryData } = category;
    const result = { ...categoryData };

    if (_count !== undefined) {
        result.productCount = _count.products;
    }

    if (products !== undefined) {
        result.products = products.map(serializeProduct);
    }

    return result;
};

const sendValidationError = (res, errors) =>
    res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
    });

export const getCategories = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: [{ nameEn: "asc" }, { id: "asc" }]
        });

        res.json({
            success: true,
            message: "Categories retrieved successfully",
            data: categories.map(serializeCategory)
        });
    } catch (error) {
        next(error);
    }
};

export const getCategoryById = async (req, res, next) => {
    try {
        const id = parsePositiveId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                products: {
                    orderBy: [{ createdAt: "desc" }, { id: "desc" }]
                },
                _count: {
                    select: { products: true }
                }
            }
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.json({
            success: true,
            message: "Category retrieved successfully",
            data: serializeCategory(category)
        });
    } catch (error) {
        next(error);
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const { data, errors } = validateCategoryPayload(req.body);

        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        const category = await prisma.category.create({
            data,
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: serializeCategory(category)
        });
    } catch (error) {
        next(error);
    }
};

export const updateCategory = async (req, res, next) => {
    try {
        const id = parsePositiveId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }

        const existingCategory = await prisma.category.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const { data, errors } = validateCategoryPayload(req.body, {
            partial: true
        });

        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        const category = await prisma.category.update({
            where: { id },
            data,
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        res.json({
            success: true,
            message: "Category updated successfully",
            data: serializeCategory(category)
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {
        const id = parsePositiveId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                success: false,
                message: "Invalid category ID"
            });
        }

        const category = await prisma.category.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        const productCount = await prisma.product.count({
            where: { categoryId: id }
        });

        if (productCount > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "Category cannot be deleted because it contains products",
                data: { productCount }
            });
        }

        await prisma.category.delete({ where: { id } });

        res.json({
            success: true,
            message: "Category deleted successfully",
            data: { id }
        });
    } catch (error) {
        next(error);
    }
};
