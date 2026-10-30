import prisma from "../config/database.js";

const PRODUCT_STATUSES = ["ACTIVE", "INACTIVE", "OUT_OF_STOCK"];
const MAX_NAME_LENGTH = 191;
const MAX_DESCRIPTION_LENGTH = 65535;
const MAX_PRICE = 9999999999.99;
const MAX_STOCK_QUANTITY = 2147483647;
const MAX_PAGE_NUMBER = 1000000;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

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

const parsePaginationParam = (value, fallback, max) => {
    if (value === undefined) {
        return fallback;
    }

    if (typeof value !== "string" || !/^\d+$/.test(value)) {
        return null;
    }

    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed < 1 || parsed > max) {
        return null;
    }

    return parsed;
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

const parsePrice = (value, errors) => {
    if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
    ) {
        errors.push({ field: "price", message: "Price is required" });
        return undefined;
    }

    if (typeof value !== "number" && typeof value !== "string") {
        errors.push({
            field: "price",
            message: "Price must be a valid number"
        });
        return undefined;
    }

    const price = Number(value);

    if (!Number.isFinite(price)) {
        errors.push({
            field: "price",
            message: "Price must be a valid number"
        });
        return undefined;
    }

    const roundedPrice = Math.round(price * 100) / 100;

    if (roundedPrice <= 0) {
        errors.push({
            field: "price",
            message: "Price must be greater than 0"
        });
        return undefined;
    }

    if (roundedPrice > MAX_PRICE) {
        errors.push({
            field: "price",
            message: `Price must not exceed ${MAX_PRICE}`
        });
        return undefined;
    }

    return roundedPrice;
};

const parseStockQuantity = (value, errors) => {
    if (value === undefined || value === null) {
        errors.push({
            field: "stockQuantity",
            message: "Stock quantity is required"
        });
        return undefined;
    }

    if (
        (typeof value !== "number" && typeof value !== "string") ||
        (typeof value === "string" && value.trim() === "")
    ) {
        errors.push({
            field: "stockQuantity",
            message: "Stock quantity must be a non-negative integer"
        });
        return undefined;
    }

    const stockQuantity = Number(value);

    if (
        !Number.isInteger(stockQuantity) ||
        stockQuantity < 0 ||
        stockQuantity > MAX_STOCK_QUANTITY
    ) {
        errors.push({
            field: "stockQuantity",
            message: `Stock quantity must be a non-negative integer not exceeding ${MAX_STOCK_QUANTITY}`
        });
        return undefined;
    }

    return stockQuantity;
};

const parseStatus = (value, errors) => {
    if (typeof value !== "string") {
        errors.push({
            field: "status",
            message: `Status must be one of: ${PRODUCT_STATUSES.join(", ")}`
        });
        return undefined;
    }

    const status = value.trim().toUpperCase();

    if (!PRODUCT_STATUSES.includes(status)) {
        errors.push({
            field: "status",
            message: `Status must be one of: ${PRODUCT_STATUSES.join(", ")}`
        });
        return undefined;
    }

    return status;
};

const parseCategoryId = (value, errors) => {
    if (value === undefined || value === null || value === "") {
        errors.push({ field: "categoryId", message: "Category ID is required" });
        return undefined;
    }

    const categoryId = parsePositiveId(value);

    if (categoryId === null) {
        errors.push({
            field: "categoryId",
            message: "Category ID must be a positive integer"
        });
        return undefined;
    }

    return categoryId;
};

const validateProductPayload = (body, { partial = false } = {}) => {
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

    if (!partial || body.price !== undefined) {
        const price = parsePrice(body.price, errors);
        if (price !== undefined) data.price = price;
    }

    if (!partial || body.stockQuantity !== undefined) {
        const stockQuantity =
            body.stockQuantity === undefined
                ? 0
                : parseStockQuantity(body.stockQuantity, errors);
        if (stockQuantity !== undefined) data.stockQuantity = stockQuantity;
    }

    if (!partial || body.unit !== undefined) {
        const unit = parseRequiredString(
            body.unit,
            "unit",
            "Unit",
            MAX_NAME_LENGTH,
            errors
        );
        if (unit !== undefined) data.unit = unit;
    }

    if (!partial || body.image !== undefined) {
        const image = parseOptionalString(
            body.image,
            "image",
            "Image",
            MAX_NAME_LENGTH,
            errors
        );
        if (image !== undefined) data.image = image;
    }

    if (!partial || body.status !== undefined) {
        const status =
            body.status === undefined && !partial
                ? "ACTIVE"
                : parseStatus(body.status, errors);
        if (status !== undefined) data.status = status;
    }

    if (!partial || body.categoryId !== undefined) {
        const categoryId = parseCategoryId(body.categoryId, errors);
        if (categoryId !== undefined) data.categoryId = categoryId;
    }

    if (partial && errors.length === 0 && Object.keys(data).length === 0) {
        errors.push({
            field: "body",
            message: "At least one valid field must be provided for update"
        });
    }

    return { data, errors };
};

const categoryExists = async (categoryId) => {
    const category = await prisma.category.findUnique({
        where: { id: categoryId },
        select: { id: true }
    });

    return Boolean(category);
};

const serializeProduct = (product) => ({
    ...product,
    price: Number(product.price)
});

const sendValidationError = (res, errors) =>
    res.status(400).json({
        success: false,
        message: "Validation failed",
        errors
    });

export const getProducts = async (req, res, next) => {
    try {
        const errors = [];
        const page = parsePaginationParam(
            req.query.page,
            1,
            MAX_PAGE_NUMBER
        );
        const limit = parsePaginationParam(
            req.query.limit,
            DEFAULT_PAGE_SIZE,
            MAX_PAGE_SIZE
        );

        if (page === null) {
            errors.push({
                field: "page",
                message: "Page must be a positive integer"
            });
        }

        if (limit === null) {
            errors.push({
                field: "limit",
                message: `Limit must be a positive integer not exceeding ${MAX_PAGE_SIZE}`
            });
        }

        let status;
        if (req.query.status !== undefined) {
            if (typeof req.query.status !== "string") {
                errors.push({
                    field: "status",
                    message: `Status must be one of: ${PRODUCT_STATUSES.join(", ")}`
                });
            } else {
                status = req.query.status.trim().toUpperCase();
                if (!PRODUCT_STATUSES.includes(status)) {
                    errors.push({
                        field: "status",
                        message: `Status must be one of: ${PRODUCT_STATUSES.join(", ")}`
                    });
                }
            }
        }

        const rawCategory =
            req.query.categoryId !== undefined
                ? req.query.categoryId
                : req.query.category;
        let categoryId;

        if (rawCategory !== undefined) {
            categoryId = parsePositiveId(rawCategory);
            if (categoryId === null) {
                errors.push({
                    field: "category",
                    message: "Category filter must be a positive integer"
                });
            }
        }

        let search;
        if (req.query.search !== undefined) {
            if (typeof req.query.search !== "string") {
                errors.push({
                    field: "search",
                    message: "Search must be a string"
                });
            } else {
                search = req.query.search.trim();
                if (search.length > MAX_NAME_LENGTH) {
                    errors.push({
                        field: "search",
                        message: `Search must not exceed ${MAX_NAME_LENGTH} characters`
                    });
                }
            }
        }

        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        const where = {};

        if (search) {
            where.OR = [
                { nameEn: { contains: search } },
                { nameSw: { contains: search } }
            ];
        }

        if (categoryId !== undefined) {
            where.categoryId = categoryId;
        }

        if (status !== undefined) {
            where.status = status;
        }

        const [products, total] = await prisma.$transaction([
            prisma.product.findMany({
                where,
                include: { category: true },
                orderBy: [{ createdAt: "desc" }, { id: "desc" }],
                skip: (page - 1) * limit,
                take: limit
            }),
            prisma.product.count({ where })
        ]);

        const totalPages = total === 0 ? 0 : Math.ceil(total / limit);

        res.json({
            success: true,
            message: "Products retrieved successfully",
            data: products.map(serializeProduct),
            pagination: {
                page,
                limit,
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPreviousPage: page > 1
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const id = parsePositiveId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            message: "Product retrieved successfully",
            data: serializeProduct(product)
        });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { data, errors } = validateProductPayload(req.body);

        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        if (!(await categoryExists(data.categoryId))) {
            return res.status(400).json({
                success: false,
                message: "Selected category does not exist",
                errors: [
                    {
                        field: "categoryId",
                        message: "Selected category does not exist"
                    }
                ]
            });
        }

        const product = await prisma.product.create({
            data,
            include: { category: true }
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: serializeProduct(product)
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const id = parsePositiveId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const { data, errors } = validateProductPayload(req.body, {
            partial: true
        });

        if (errors.length > 0) {
            return sendValidationError(res, errors);
        }

        if (
            data.categoryId !== undefined &&
            !(await categoryExists(data.categoryId))
        ) {
            return res.status(400).json({
                success: false,
                message: "Selected category does not exist",
                errors: [
                    {
                        field: "categoryId",
                        message: "Selected category does not exist"
                    }
                ]
            });
        }

        const product = await prisma.product.update({
            where: { id },
            data,
            include: { category: true }
        });

        res.json({
            success: true,
            message: "Product updated successfully",
            data: serializeProduct(product)
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const id = parsePositiveId(req.params.id);

        if (id === null) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        const product = await prisma.product.findUnique({
            where: { id },
            select: { id: true }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const orderItemCount = await prisma.orderItem.count({
            where: { productId: id }
        });

        if (orderItemCount > 0) {
            return res.status(409).json({
                success: false,
                message:
                    "Product cannot be deleted because it is referenced by existing order items",
                data: { orderItemCount }
            });
        }

        await prisma.product.delete({ where: { id } });

        res.json({
            success: true,
            message: "Product deleted successfully",
            data: { id }
        });
    } catch (error) {
        next(error);
    }
};
