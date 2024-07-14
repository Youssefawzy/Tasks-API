// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Express API",
      version: "1.0.0",
      description: "A simple Express API with Swagger documentation",
    },
    paths: {
      "/categories": {
        get: {
          summary: "Get all categories",
          tags: ["Categories"],
          responses: {
            200: {
              description: "A list of categories",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Category",
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          summary: "Create a new category",
          tags: ["Categories"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Category",
                },
                example: {
                  name: "Work Projects", // Example name of the category
                },
              },
            },
          },
          responses: {
            201: {
              description: "The created category With the User ID",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Category",
                  },
                },
              },
            },
            400: {
              description: "Bad request",
            },
          },
        },
      },
      "/categories/{id}": {
        get: {
          summary: "Get a category by ID",
          tags: ["Categories"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "The category ID",
            },
          ],
          responses: {
            200: {
              description: "The category description by ID",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Category",
                  },
                },
              },
            },
            404: {
              description: "Category not found",
            },
          },
        },
        patch: {
          summary: "Update a category by ID",
          tags: ["Categories"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "The category ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Category",
                },
                example: {
                  name: "Health and wellness",
                },
              },
            },
          },
          responses: {
            200: {
              description: "The updated category",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Category",
                  },
                  example: {
                    name: "Health and wellness",
                    user: "6692f0052467b9cd21232101",
                  },
                },
              },
            },
            400: {
              description: "Bad request",
            },
            404: {
              description: "Category not found",
            },
          },
        },
        delete: {
          summary: "Delete a category by ID",
          tags: ["Categories"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: {
                type: "string",
              },
              required: true,
              description: "The category ID",
            },
          ],
          responses: {
            204: {
              description: "Category deleted successfully",
            },
            404: {
              description: "Category not found",
            },
          },
        },
        "/tasks": {
          get: {
            summary: "Get ONLY SHARED",
            tags: ["Tasks"],
            responses: {
              200: {
                description: "A list of tasks",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: {
                        $ref: "#/components/schemas/Task",
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: "Create a new task",
            tags: ["Tasks"],
            security: [
              {
                bearerAuth: [],
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Task",
                  },
                  example: {
                    title: "Build a personal website",
                    category: "Personal Projects",
                    type: "text",
                    is_shared: true,
                    user: "6692f0052467b9cd21232101",
                    textTask: {
                      body: "Design and develop a personal portfolio website to showcase projects and skills.",
                    },
                  },
                },
              },
            },
            responses: {
              201: {
                description: "The created task",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Task",
                    },
                  },
                },
              },
              400: {
                description: "Bad request",
              },
            },
          },
        },
        "/tasks/{id}": {
          get: {
            summary: "Get a task by ID",
            tags: ["Tasks"],
            parameters: [
              {
                in: "path",
                name: "id",
                schema: {
                  type: "string",
                },
                required: true,
                description: "The task ID",
              },
            ],
            responses: {
              200: {
                description: "The task by ID",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Task",
                    },
                  },
                },
              },
              404: {
                description: "Task not found",
              },
            },
          },
          patch: {
            summary: "Update a task by ID",
            tags: ["Tasks"],
            security: [
              {
                bearerAuth: [],
              },
            ],
            parameters: [
              {
                in: "path",
                name: "id",
                schema: {
                  type: "string",
                },
                required: true,
                description: "The task ID",
              },
            ],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Task",
                  },
                  example: {
                    title: "Create a blog post",
                    category: "Personal Projects",
                    type: "list",
                    is_shared: true,
                    user: "6692f0052467b9cd21232101",
                    listTask: {
                      items: [
                        { item_body: "Choose a topic" },
                        { item_body: "Write the content" },
                        { item_body: "Publish the post" },
                      ],
                    },
                  },
                },
              },
            },
            responses: {
              200: {
                description: "The updated task",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Task",
                    },
                  },
                },
              },
              400: {
                description: "Bad request",
              },
              404: {
                description: "Task not found",
              },
            },
          },
          delete: {
            summary: "Delete a task by ID",
            tags: ["Tasks"],
            security: [
              {
                bearerAuth: [],
              },
            ],
            parameters: [
              {
                in: "path",
                name: "id",
                schema: {
                  type: "string",
                },
                required: true,
                description: "The task ID",
              },
            ],
            responses: {
              204: {
                description: "Task deleted successfully",
              },
              404: {
                description: "Task not found",
              },
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Category: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Personal Projects",
            },
            user: {
              type: "string",
              example: "6692f0052467b9cd21232101",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
